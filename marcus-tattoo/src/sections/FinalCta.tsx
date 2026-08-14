"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { whatsappLink } from "@/lib/whatsapp";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Imagem de fechamento — um trabalho forte do Marcus, real (não placeholder
 * genérico). Troque por outra foto do portfólio se quiser variar o encerramento.
 */
const CLOSING_IMAGE = "/images/portfolio/querubim-dinheiro.webp";

export default function FinalCta() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const talkLink = whatsappLink("Olá, Marcus! Vi o site e quero começar meu projeto.");

  const openAssistant = () => window.dispatchEvent(new Event("marcus:open-assistant"));
  const scrollToPortfolio = () =>
    document.querySelector("#trabalhos")?.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => {
    const el = root.current;
    if (!el || reduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // imagem de fundo: entrada com leve scale-out
      gsap.fromTo(
        ".cta-img",
        { scale: 1.12 },
        {
          scale: 1,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 75%" },
        }
      );

      // parallax extremamente sutil da imagem durante o scroll da seção
      gsap.to(".cta-img", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });

      // título: reveal por palavra (stagger)
      gsap.from(".cta-word", {
        yPercent: 120,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: { trigger: el, start: "top 65%" },
      });

      // subtítulo entrando
      gsap.from(".cta-sub", {
        opacity: 0,
        y: 16,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 60%" },
      });

      // botões entrando em stagger (tween independente — evita conflitos de
      // overlap negativo dentro de uma timeline compartilhada)
      gsap.from(".cta-btn", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 52%" },
      });
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={root}
      id="comecar"
      className="relative min-h-[92vh] w-full overflow-hidden flex items-center justify-center"
    >
      {/* Imagem de fechamento */}
      <div className="absolute inset-0">
        <Image
          src={CLOSING_IMAGE}
          alt="Trabalho autoral de Marcus Tattoo"
          fill
          sizes="100vw"
          className="cta-img object-cover"
        />
        <div className="absolute inset-0 bg-ink/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/40" />
      </div>

      {/* Conteúdo */}
      <div className="container-x relative z-10 text-center flex flex-col items-center py-24">
        <h2 className="display text-bone text-[11vw] sm:text-7xl md:text-8xl leading-[0.92] max-w-5xl">
          {["SUA", "PRÓXIMA", "TATUAGEM", "COMEÇA", "AQUI."].map((w, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
              <span className="cta-word inline-block">{w}</span>
            </span>
          ))}
        </h2>

        <p className="cta-sub text-smoke font-light text-lg md:text-xl mt-8 max-w-xl">
          Conte sua ideia. Vamos transformar sua referência em um projeto único.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
          <button
            type="button"
            onClick={openAssistant}
            className="cta-btn bg-bone text-ink px-9 py-4 text-sm tracking-[0.15em] uppercase hover:bg-white transition-colors"
          >
            Iniciar meu projeto
          </button>
          <button
            type="button"
            onClick={scrollToPortfolio}
            className="cta-btn border border-bone/60 text-bone px-9 py-4 text-sm tracking-[0.15em] uppercase hover:bg-bone hover:text-ink transition-colors"
          >
            Ver portfólio
          </button>
          {talkLink && (
            <a
              href={talkLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn text-smoke hover:text-bone text-sm tracking-[0.15em] uppercase underline underline-offset-4 decoration-ash transition-colors px-2 py-4"
            >
              Falar com Marcus
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
