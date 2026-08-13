"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { formationConfig } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Pilares conceituais (Formação / Aperfeiçoamento / Especialização).
 * Desktop: três colunas ligadas por uma linha horizontal desenhada no scroll.
 * Mobile: sequência vertical ligada por uma linha vertical.
 * As linhas ficam VISÍVEIS por padrão (scale 1); o GSAP só as desenha a
 * partir do zero quando há movimento permitido.
 */
export default function FormationPillars() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (!el || reduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // linhas sendo desenhadas
      gsap.utils.toArray<HTMLElement>("[data-draw-line]").forEach((line) => {
        const axis = line.dataset.axis === "y" ? "scaleY" : "scaleX";
        gsap.fromTo(
          line,
          { [axis]: 0 },
          {
            [axis]: 1,
            duration: 1.1,
            ease: "power3.inOut",
            scrollTrigger: { trigger: el, start: "top 75%" },
          }
        );
      });

      // números + textos entrando em stagger
      gsap.from("[data-pillar]", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 72%" },
      });
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={root}>
      {/* ===== Desktop ===== */}
      <div className="hidden md:block relative">
        {/* linha horizontal ligando os números */}
        <div
          data-draw-line
          data-axis="x"
          className="absolute top-[38px] left-0 right-0 h-px bg-ash origin-left"
          aria-hidden="true"
        />
        <div className="grid grid-cols-3 gap-10">
          {formationConfig.pillars.map((p) => (
            <div data-pillar key={p.n} className="relative pt-0">
              <div className="flex items-center gap-4 mb-8">
                <span className="display text-bone text-4xl leading-none relative z-10 bg-ink pr-2">
                  {p.n}
                </span>
              </div>
              <h3 className="display text-bone text-3xl mb-3">{p.title}</h3>
              <p className="text-smoke font-light leading-relaxed max-w-xs">{p.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Mobile ===== */}
      <div className="md:hidden relative pl-12">
        {/* linha vertical */}
        <div
          data-draw-line
          data-axis="y"
          className="absolute left-[19px] top-2 bottom-2 w-px bg-ash origin-top"
          aria-hidden="true"
        />
        <div className="flex flex-col gap-12">
          {formationConfig.pillars.map((p) => (
            <div data-pillar key={p.n} className="relative">
              <span className="absolute -left-12 top-0 display text-bone text-2xl bg-ink py-1">
                {p.n}
              </span>
              <h3 className="display text-bone text-3xl mb-2">{p.title}</h3>
              <p className="text-smoke font-light leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
