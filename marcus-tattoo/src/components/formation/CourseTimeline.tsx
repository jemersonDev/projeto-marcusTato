"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { coursesData } from "@/data/content";
import type { PortfolioItem } from "@/data/portfolio";
import PortfolioLightbox from "@/components/portfolio/PortfolioLightbox";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Linha do tempo dos CURSOS REAIS. Só é renderizada quando `coursesData` tem
 * itens — enquanto vazia, retorna null (nada falso aparece).
 *
 * Desktop: lista à esquerda, certificado do curso ativo (sticky) à direita.
 * Mobile: cada curso mostra o próprio certificado logo abaixo do título.
 * Clicar no certificado abre o visualizador em tela cheia (zoom, setas, swipe).
 */
export default function CourseTimeline() {
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Certificados no formato esperado pelo visualizador (reaproveita o do portfólio)
  const certItems = useMemo(
    () =>
      coursesData.flatMap((c, courseIndex) =>
        c.certificate
          ? [
              {
                courseIndex,
                item: {
                  id: `cert-${courseIndex}`,
                  image: c.certificate,
                  width: 1400,
                  height: 930,
                  title: c.title,
                  style: "outros",
                  bodyArea: [c.instructor, c.year].filter(Boolean).join(" • ") || undefined,
                } as PortfolioItem,
              },
            ]
          : []
      ),
    []
  );

  useEffect(() => {
    if (!root.current || reduced || coursesData.length === 0) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from("[data-course]", {
        opacity: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  if (coursesData.length === 0) return null;

  const current = coursesData[active];
  const openCert = (courseIndex: number) => {
    const pos = certItems.findIndex((c) => c.courseIndex === courseIndex);
    if (pos >= 0) setLightbox(pos);
  };

  return (
    <div ref={root} className="mt-20 md:mt-28">
      <div className="flex items-end justify-between gap-6 mb-10 border-b border-ash pb-6">
        <h3 className="display text-bone text-3xl md:text-4xl">Cursos e certificados</h3>
        <span className="eyebrow text-smoke tabular-nums">
          {String(coursesData.length).padStart(2, "0")} formações
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* lista (linha do tempo) */}
        <ul className="lg:col-span-7 relative">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-ash" aria-hidden="true" />
          {coursesData.map((c, i) => {
            const isActive = i === active;
            const label = [c.kind, c.year].filter(Boolean).join(" • ");
            return (
              <li data-course key={c.title} className="relative pl-8 pb-12 last:pb-0">
                <span
                  className={`absolute left-[-4px] top-2 h-2 w-2 rounded-full transition-colors ${
                    isActive ? "bg-bone" : "bg-ash"
                  }`}
                />
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="text-left group"
                  aria-pressed={isActive}
                >
                  {label && <span className="eyebrow text-smoke/90">{label}</span>}
                  <h4
                    className={`display text-2xl md:text-3xl mt-1 relative inline-block transition-colors ${
                      isActive ? "text-bone" : "text-smoke/70 group-hover:text-bone"
                    }`}
                  >
                    {c.title}
                    <span
                      className={`absolute left-0 -bottom-1 h-px bg-bone transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </h4>
                  {(c.institution || c.instructor) && (
                    <p className="text-smoke text-sm mt-2">
                      {[c.institution, c.instructor].filter(Boolean).join(" • ")}
                    </p>
                  )}
                </button>

                {/* mobile: descrição + certificado de cada curso, sem precisar tocar */}
                <div className="lg:hidden mt-5">
                  {c.description && (
                    <p className="text-smoke font-light leading-relaxed mb-4">{c.description}</p>
                  )}
                  {c.certificate && (
                    <button
                      type="button"
                      onClick={() => openCert(i)}
                      className="relative block w-full aspect-[3/2] overflow-hidden bg-carbon border border-ash"
                      aria-label={`Ampliar certificado — ${c.title}`}
                    >
                      <Image
                        src={c.certificate}
                        alt={`Certificado — ${c.title}`}
                        fill
                        sizes="100vw"
                        className="object-contain"
                      />
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        {/* desktop: painel do curso ativo (descrição + certificado) */}
        <div className="hidden lg:block lg:col-span-5">
          <div className="sticky top-24">
            {current.certificate && (
              <button
                type="button"
                onClick={() => openCert(active)}
                className="group relative block w-full aspect-[3/2] overflow-hidden bg-carbon border border-ash mb-5 cursor-zoom-in"
                aria-label={`Ampliar certificado — ${current.title}`}
              >
                <Image
                  key={current.certificate}
                  src={current.certificate}
                  alt={`Certificado — ${current.title}`}
                  fill
                  sizes="40vw"
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <span className="eyebrow absolute bottom-3 right-3 bg-ink/80 text-bone px-3 py-1.5">
                  Ampliar ↗
                </span>
              </button>
            )}
            {current.description && (
              <p className="text-smoke font-light leading-relaxed">{current.description}</p>
            )}
          </div>
        </div>
      </div>

      {lightbox !== null && (
        <PortfolioLightbox
          items={certItems.map((c) => c.item)}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onNavigate={(next) => {
            setLightbox(next);
            setActive(certItems[next].courseIndex);
          }}
        />
      )}
    </div>
  );
}
