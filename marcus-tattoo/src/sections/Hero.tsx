"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { artistConfig } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const agendar = whatsappLink("Olá, Marcus! Quero agendar uma tatuagem.");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15, defaults: { ease: "power4.out" } });
      tl.from(".hero-img", { scale: 1.12, duration: 1.6, ease: "power2.out" })
        .from(".hero-line", { yPercent: 120, opacity: 0, duration: 1, stagger: 0.12 }, "-=1.1")
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.4")
        .from(".hero-scroll", { opacity: 0, duration: 0.6 }, "-=0.2");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="inicio"
      ref={root}
      className="relative h-[100svh] w-full overflow-hidden flex items-end"
    >
      {/* Imagem de fundo */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/placeholder-hero.svg"
          alt="Tatuagem em destaque — Marcus Tattoo"
          fill
          priority
          sizes="100vw"
          className="hero-img object-cover"
        />
        {/* Overlay escuro sofisticado (duplo, para legibilidade) */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
        <div className="absolute inset-0 bg-ink/25" />
      </div>

      {/* Conteúdo */}
      <div className="container-x relative z-10 pb-20 md:pb-28">
        <p className="eyebrow mb-6">Uberaba • MG</p>

        <h1
          aria-label={artistConfig.brand}
          className="display text-bone text-[15vw] sm:text-[11vw] lg:text-[8.5rem] leading-[0.85]"
        >
          <span className="block overflow-hidden" aria-hidden="true">
            <span className="hero-line block">Marcus</span>
          </span>
          <span className="block overflow-hidden" aria-hidden="true">
            <span className="hero-line block">Tattoo</span>
          </span>
        </h1>

        <p className="hero-sub display text-smoke text-xl md:text-3xl mt-6 max-w-2xl">
          {artistConfig.tagline}
        </p>
        <p className="hero-sub text-smoke/90 text-base md:text-lg mt-4 max-w-xl font-light">
          {artistConfig.subtitle}
        </p>

        <div className="flex flex-wrap gap-4 mt-10">
          {agendar && (
            <a
              href={agendar}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta bg-bone text-ink px-8 py-4 text-sm tracking-[0.15em] uppercase hover:bg-white transition-colors"
            >
              Agendar tatuagem
            </a>
          )}
          <a
            href="#trabalhos"
            className="hero-cta border border-bone/50 text-bone px-8 py-4 text-sm tracking-[0.15em] uppercase hover:bg-bone hover:text-ink transition-colors"
          >
            Ver portfólio
          </a>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="hero-scroll absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="eyebrow text-[0.6rem]">Scroll</span>
        <span className="block w-px h-10 bg-gradient-to-b from-smoke to-transparent" />
      </div>
    </section>
  );
}
