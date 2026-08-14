"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProcessStep from "@/components/process/ProcessStep";
import { processConfig, processData } from "@/data/content";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Process() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const total = processData.length;

  const headerRef = useScrollReveal<HTMLDivElement>({ childrenSelector: "[data-reveal]" });
  const stepsRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  // DESKTOP: cada etapa define a etapa "ativa" conforme passa pelo centro
  useEffect(() => {
    if (!stepsRef.current || reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>("[data-step-desktop]");
      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
    }, stepsRef);
    return () => ctx.revert();
  }, [reduced]);

  // DESKTOP: cross-fade das imagens do painel fixo quando muda a etapa ativa
  useEffect(() => {
    if (!panelRef.current || reduced) return;
    const imgs = panelRef.current.querySelectorAll<HTMLElement>("[data-panel-img]");
    imgs.forEach((el, i) => {
      gsap.to(el, {
        autoAlpha: i === active ? 1 : 0,
        scale: i === active ? 1 : 1.05,
        duration: 0.7,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  }, [active, reduced]);

  // MOBILE: reveal de cada etapa (imagem + texto) no scroll
  useEffect(() => {
    if (!mobileRef.current || reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>("[data-step-mobile]");
      steps.forEach((step) => {
        const media = step.querySelector("[data-step-media]");
        if (media) {
          gsap.set(media, { clipPath: "inset(100% 0% 0% 0%)", scale: 1.06 });
          gsap
            .timeline({ scrollTrigger: { trigger: step, start: "top 82%" } })
            .to(media, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power4.inOut" })
            .to(media, { scale: 1, duration: 1.0, ease: "power3.out" }, "<0.05");
        }
        gsap.from(step.querySelectorAll("[data-step-text]"), {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 80%" },
        });
        gsap.from(step.querySelector("[data-step-dot]"), {
          scale: 0.6,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(2)",
          scrollTrigger: { trigger: step, start: "top 82%" },
        });
      });
    }, mobileRef);
    return () => ctx.revert();
  }, [reduced]);

  const progress = ((active + 1) / total) * 100;

  return (
    <section id="processo" className="bg-ink py-24 md:py-36">
      <div className="container-x">
        {/* linha de progresso e sticky dependem de NÃO haver overflow:hidden
            em ancestral — por isso a seção não usa overflow-hidden. */}
        {/* Cabeçalho */}
        <div ref={headerRef} className="max-w-3xl mb-16 md:mb-24">
          <p data-reveal className="eyebrow mb-5">
            Processo
          </p>
          <h2 data-reveal className="display text-bone text-5xl md:text-7xl">
            {processConfig.title}
          </h2>
          <p data-reveal className="text-smoke font-light text-lg mt-6">
            {processConfig.subtitle}
          </p>
        </div>

        {/* ===================== DESKTOP: painel fixo + etapas ===================== */}
        <div className="hidden lg:grid grid-cols-12 gap-16">
          {/* painel fixo (sticky) */}
          <div className="col-span-5">
            <div ref={panelRef} className="sticky top-24">
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-carbon">
                {processData.map((s, i) => (
                  <div
                    key={s.n}
                    data-panel-img
                    className="absolute inset-0"
                    style={{ opacity: i === 0 ? 1 : 0 }}
                  >
                    <Image
                      src={s.image}
                      alt={`Etapa ${s.n} — ${s.title}`}
                      fill
                      sizes="40vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                  </div>
                ))}
                {/* número grande da etapa ativa */}
                <div className="absolute bottom-6 left-6">
                  <span className="display text-bone text-8xl leading-none">
                    {processData[active].n}
                  </span>
                </div>
              </div>

              {/* linha de progresso */}
              <div className="mt-6 flex items-center gap-4">
                <div className="relative h-px flex-1 bg-ash">
                  <div
                    className="absolute left-0 top-0 h-px bg-bone transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="eyebrow text-smoke tabular-nums">
                  {processData[active].n} / {String(total).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* etapas roláveis */}
          <div ref={stepsRef} className="col-span-6 col-start-7">
            {processData.map((s, i) => (
              <ProcessStep key={s.n} step={s} active={i === active} variant="desktop" />
            ))}
          </div>
        </div>

        {/* ===================== MOBILE: sequência vertical ===================== */}
        <div ref={mobileRef} className="lg:hidden relative">
          {/* trilha vertical contínua */}
          <div className="absolute left-[18px] top-2 bottom-2 w-px bg-ash" aria-hidden="true" />
          <div className="flex flex-col gap-16">
            {processData.map((s) => (
              <ProcessStep key={s.n} step={s} variant="mobile" />
            ))}
          </div>
        </div>

        {/* ===================== CTA ===================== */}
        <div className="mt-20 md:mt-28 border-t border-ash pt-12 flex flex-col items-start gap-6">
          <p className="display text-bone text-3xl md:text-4xl max-w-2xl">
            {processConfig.ctaLabel}
          </p>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("marcus:open-assistant"))}
            className="bg-bone text-ink px-8 py-4 text-sm tracking-[0.15em] uppercase hover:bg-white transition-colors"
          >
            {processConfig.ctaButton}
          </button>
        </div>
      </div>
    </section>
  );
}
