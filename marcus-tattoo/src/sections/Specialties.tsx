"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { specialties } from "@/data/specialties";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Specialties() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const headerRef = useScrollReveal<HTMLDivElement>({ childrenSelector: "[data-reveal]" });

  // ---- DESKTOP: painel de imagens empilhadas com cross-fade no hover ----
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || !panelRef.current) return;
    const imgs = panelRef.current.querySelectorAll<HTMLElement>("[data-spec-img]");
    imgs.forEach((el, i) => {
      gsap.to(el, {
        autoAlpha: i === active ? 1 : 0,
        scale: i === active ? 1 : 1.04,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  }, [active, reduced]);

  // parallax sutil do painel (desktop)
  const parallaxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduced || !parallaxRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(parallaxRef.current, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, [reduced]);

  // ---- MOBILE: cards editoriais que entram no scroll ----
  const mobileRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduced || !mobileRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-spec-card]");
      cards.forEach((card) => {
        const img = card.querySelector("[data-card-media]");
        if (img) {
          gsap.set(img, { clipPath: "inset(100% 0% 0% 0%)", scale: 1.08 });
          gsap
            .timeline({ scrollTrigger: { trigger: card, start: "top 82%" } })
            .to(img, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.0, ease: "power4.inOut" })
            .to(img, { scale: 1, duration: 1.1, ease: "power3.out" }, "<0.05");
        }
        const txt = card.querySelectorAll("[data-card-text]");
        gsap.from(txt, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 80%" },
        });
      });
    }, mobileRef);
    return () => ctx.revert();
  }, [reduced]);

  if (specialties.length === 0) return null;

  return (
    <section id="especialidades" className="bg-ink py-24 md:py-36 overflow-hidden">
      <div className="container-x">
        <div ref={headerRef} className="max-w-3xl mb-14 md:mb-20">
          <p data-reveal className="eyebrow mb-5">
            Especialidades
          </p>
          <h2 data-reveal className="display text-bone text-5xl md:text-7xl">
            O traço que define o trabalho.
          </h2>
        </div>

        {/* ===================== DESKTOP ===================== */}
        <div className="hidden lg:grid grid-cols-12 gap-16 items-center">
          {/* lista interativa */}
          <ul className="col-span-6 flex flex-col">
            {specialties.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.id} className="border-b border-ash">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group w-full text-left py-7 flex items-baseline gap-6 transition-colors"
                    aria-pressed={isActive}
                  >
                    <span
                      className={`eyebrow text-xs transition-colors ${
                        isActive ? "text-bone" : "text-smoke"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={`display text-5xl xl:text-6xl transition-all duration-300 ${
                        isActive
                          ? "text-bone translate-x-2"
                          : "text-smoke/70 group-hover:text-smoke"
                      }`}
                    >
                      {s.name}
                    </span>
                  </button>
                  {/* descrição do ativo */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isActive ? "max-h-32 opacity-100 pb-7" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-smoke font-light leading-relaxed max-w-md pl-11">
                      {s.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* painel de imagem */}
          <div className="col-span-6">
            <div ref={parallaxRef}>
              <div
                ref={panelRef}
                className="relative w-full aspect-[4/5] overflow-hidden bg-carbon"
              >
                {specialties.map((s, i) => (
                  <div
                    key={s.id}
                    data-spec-img
                    className="absolute inset-0"
                    style={{ opacity: i === 0 ? 1 : 0 }}
                  >
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      sizes="42vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===================== MOBILE ===================== */}
        <div ref={mobileRef} className="lg:hidden flex flex-col gap-14">
          {specialties.map((s, i) => (
            <article key={s.id} data-spec-card>
              <div
                data-card-media
                className="relative w-full aspect-[4/5] overflow-hidden bg-carbon mb-5"
              >
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                <span className="absolute top-4 left-4 eyebrow text-bone/80">
                  0{i + 1}
                </span>
              </div>
              <h3 data-card-text className="display text-bone text-4xl mb-3">
                {s.name}
              </h3>
              <p data-card-text className="text-smoke font-light leading-relaxed">
                {s.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
