"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { coursesData } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Linha do tempo dos CURSOS REAIS. Só é renderizada quando `coursesData` tem
 * itens — enquanto vazia, retorna null (nada falso aparece).
 * Interação: selecionar/passar por um curso revela a descrição e o
 * certificado (se houver), com underline animado.
 */
export default function CourseTimeline() {
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

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

  return (
    <div ref={root} className="mt-20 md:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* lista (linha do tempo) */}
      <ul className="lg:col-span-7 relative">
        <div className="absolute left-0 top-2 bottom-2 w-px bg-ash" aria-hidden="true" />
        {coursesData.map((c, i) => {
          const isActive = i === active;
          return (
            <li data-course key={i} className="relative pl-8 pb-8 last:pb-0">
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
                {c.year && (
                  <span className="eyebrow text-smoke/70">{c.year}</span>
                )}
                <h4
                  className={`display text-2xl md:text-3xl mt-1 relative inline-block transition-colors ${
                    isActive ? "text-bone" : "text-smoke/60 group-hover:text-bone"
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
            </li>
          );
        })}
      </ul>

      {/* painel do curso ativo: descrição + certificado */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-24">
          {current.certificate && (
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-carbon mb-5">
              <Image
                src={current.certificate}
                alt={`Certificado — ${current.title}`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          )}
          {current.description && (
            <p className="text-smoke font-light leading-relaxed">{current.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
