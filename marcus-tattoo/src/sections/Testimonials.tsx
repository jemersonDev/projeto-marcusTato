"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import TestimonialCard from "@/components/testimonials/TestimonialCard";
import { testimonialsData } from "@/data/content";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Testimonials() {
  const headerRef = useScrollReveal<HTMLDivElement>({ childrenSelector: "[data-reveal]" });
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const openAssistant = () => window.dispatchEvent(new Event("marcus:open-assistant"));

  const hasTestimonials = testimonialsData.length > 0;
  const featured = testimonialsData[0];
  const rest = testimonialsData.slice(1);

  const scrollToCard = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i] as HTMLElement | undefined;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
    setIndex(i);
  };

  const onCarouselKeyDown = (e: React.KeyboardEvent) => {
    if (rest.length === 0) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollToCard(Math.min(index + 1, rest.length - 1));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollToCard(Math.max(index - 1, 0));
    }
  };

  return (
    <>
      {/*
        A seção de depoimentos em si (título + conteúdo) só aparece com dados
        REAIS em testimonialsData. Nada fictício é exibido enquanto vazia.
      */}
      {hasTestimonials && (
        <section id="depoimentos" className="bg-ink py-24 md:py-36">
          <div className="container-x">
            <div ref={headerRef} className="max-w-3xl mb-14 md:mb-20">
              <p data-reveal className="eyebrow mb-5">
                Depoimentos
              </p>
              <h2 data-reveal className="display text-bone text-5xl md:text-7xl">
                Quem já viveu a experiência.
              </h2>
            </div>

            {/* Depoimento em destaque — editorial, tipografia grande */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16 md:mb-24">
              <span
                aria-hidden="true"
                className="lg:col-span-2 display text-8xl md:text-9xl text-smoke/20 leading-none"
              >
                “
              </span>
              <div className="lg:col-span-10">
                <p className="display text-bone text-3xl md:text-5xl leading-tight max-w-3xl mb-8">
                  {featured.text}
                </p>
                <div className="flex items-center gap-4">
                  {featured.image && (
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-carbon">
                      <Image
                        src={featured.image}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-bone">{featured.name}</p>
                    {(featured.date || featured.source) && (
                      <p className="text-smoke/90 text-sm">
                        {[featured.date, featured.source].filter(Boolean).join(" • ")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Demais depoimentos — carrossel simples (scroll-snap), sem autoplay */}
            {rest.length > 0 && (
              <div>
                <div
                  ref={trackRef}
                  role="region"
                  aria-label="Mais depoimentos"
                  tabIndex={0}
                  onKeyDown={onCarouselKeyDown}
                  className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 focus-visible:outline-2 focus-visible:outline-bone"
                  style={{ scrollbarWidth: "none" }}
                >
                  {rest.map((t, i) => (
                    <TestimonialCard key={i} item={t} />
                  ))}
                </div>

                {rest.length > 1 && (
                  <div className="flex items-center gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => scrollToCard(Math.max(index - 1, 0))}
                      aria-label="Depoimento anterior"
                      className="h-9 w-9 flex items-center justify-center border border-ash text-bone hover:bg-carbon transition-colors"
                    >
                      ‹
                    </button>
                    <div className="flex items-center gap-2" role="tablist" aria-label="Selecionar depoimento">
                      {rest.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          role="tab"
                          aria-selected={i === index}
                          aria-label={`Ir para depoimento ${i + 1}`}
                          onClick={() => scrollToCard(i)}
                          className={`h-1.5 rounded-full transition-all ${
                            i === index ? "w-6 bg-bone" : "w-1.5 bg-ash"
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => scrollToCard(Math.min(index + 1, rest.length - 1))}
                      aria-label="Próximo depoimento"
                      className="h-9 w-9 flex items-center justify-center border border-ash text-bone hover:bg-carbon transition-colors"
                    >
                      ›
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/*
        Transição de conversão — não depende de haver depoimentos (não é
        conteúdo social, é só um convite). Mantém o funil vivo mesmo antes de
        existirem depoimentos reais. A seção maior "CTA final" vem na próxima
        etapa; este é apenas um bridge discreto.
      */}
      <div className="bg-ink pb-24 md:pb-36">
        <div className="container-x">
          <div className="border-t border-ash pt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <p className="display text-bone text-3xl md:text-4xl">Agora é a sua vez.</p>
            <button
              type="button"
              onClick={openAssistant}
              className="shrink-0 bg-bone text-ink px-8 py-4 text-sm tracking-[0.15em] uppercase hover:bg-white transition-colors"
            >
              Começar meu projeto
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
