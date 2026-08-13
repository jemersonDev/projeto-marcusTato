"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AftercareBlock from "@/components/aftercare/AftercareBlock";
import { aftercareConfig, aftercareData } from "@/data/content";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Aftercare() {
  const reduced = useReducedMotion();
  const headerRef = useScrollReveal<HTMLDivElement>({ childrenSelector: "[data-reveal]" });
  const listRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current || reduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // linha de progresso: enche conforme percorre a lista de cuidados
      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top center",
              end: "bottom bottom",
              scrub: true,
            },
          }
        );
      }

      // cada bloco: número + textos entram; imagem revela por clip-path
      const blocks = gsap.utils.toArray<HTMLElement>("[data-care-block]");
      blocks.forEach((b) => {
        gsap.from(b.querySelector("[data-care-num]"), {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: b, start: "top 82%" },
        });
        gsap.from(b.querySelectorAll("[data-care-text]"), {
          opacity: 0,
          y: 22,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: b, start: "top 80%" },
        });
        const media = b.querySelector("[data-care-media]");
        if (media) {
          gsap.set(media, { clipPath: "inset(100% 0% 0% 0%)", scale: 1.06 });
          gsap
            .timeline({ scrollTrigger: { trigger: b, start: "top 78%" } })
            .to(media, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power4.inOut" })
            .to(media, { scale: 1, duration: 1.0, ease: "power3.out" }, "<0.05");
        }
      });
    }, listRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="cuidados" className="bg-ink py-24 md:py-36">
      <div className="container-x">
        {/* Cabeçalho */}
        <div ref={headerRef} className="max-w-3xl mb-16 md:mb-24">
          <p data-reveal className="eyebrow mb-5">
            Cuidados
          </p>
          <h2 data-reveal className="display text-bone text-5xl md:text-7xl">
            {aftercareConfig.title}
          </h2>
          <p data-reveal className="text-smoke font-light text-lg mt-6 max-w-xl">
            {aftercareConfig.intro}
          </p>
        </div>

        {/* Lista com linha de progresso à esquerda (desktop) */}
        <div className="relative">
          {/* trilha + preenchimento */}
          <div
            className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-ash"
            aria-hidden="true"
          >
            <div
              ref={progressRef}
              className="absolute left-0 top-0 w-px h-full bg-bone origin-top"
              style={{ transform: "scaleY(1)" }}
            />
          </div>

          <div ref={listRef} className="lg:pl-12 flex flex-col gap-16 md:gap-24">
            {aftercareData.map((block, i) => (
              <AftercareBlock key={block.id} block={block} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
