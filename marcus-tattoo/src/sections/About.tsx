"use client";

import Image from "next/image";
import { aboutConfig } from "@/data/content";
import { artistConfig } from "@/config/site";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useImageReveal } from "@/hooks/useImageReveal";

export default function About() {
  const textRef = useScrollReveal<HTMLDivElement>({ childrenSelector: "[data-reveal]" });
  const imageRef = useImageReveal<HTMLDivElement>();

  return (
    <section id="sobre" className="bg-ink py-24 md:py-36 overflow-hidden">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Imagem grande (assimétrica) */}
          <div className="lg:col-span-7 lg:pt-16">
            <div
              ref={imageRef}
              className="relative w-full aspect-[4/5] overflow-hidden bg-carbon"
            >
              <Image
                src={aboutConfig.image}
                alt={`${artistConfig.name} — ${artistConfig.brand}`}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
            {/* detalhe tipográfico sob a imagem */}
            <p className="eyebrow mt-4 text-smoke/90">{artistConfig.brand} — Uberaba/MG</p>
          </div>

          {/* Texto editorial */}
          <div ref={textRef} className="lg:col-span-5 lg:pt-4">
            <p data-reveal className="eyebrow mb-6">
              O artista
            </p>

            <h2 data-reveal className="display text-bone text-5xl md:text-6xl mb-8">
              {aboutConfig.title}
            </h2>

            <div data-reveal className="mb-8">
              <p className="display text-bone text-2xl">{artistConfig.name}</p>
              <p className="eyebrow mt-2 text-smoke">
                {artistConfig.roles.join(" • ")}
              </p>
            </div>

            <div className="space-y-5">
              {aboutConfig.paragraphs.map((p, i) => (
                <p data-reveal key={i} className="text-smoke leading-relaxed font-light">
                  {p}
                </p>
              ))}
            </div>

            {aboutConfig.philosophy && (
              <p
                data-reveal
                className="display text-bone text-2xl md:text-3xl mt-10 border-l-2 border-ash pl-6"
              >
                “{aboutConfig.philosophy}”
              </p>
            )}

            {aboutConfig.vision && (
              <p data-reveal className="text-smoke leading-relaxed font-light mt-8">
                {aboutConfig.vision}
              </p>
            )}

            {/* Estatísticas — só aparecem se houver dados reais */}
            {aboutConfig.stats.length > 0 && (
              <div data-reveal className="flex flex-wrap gap-10 mt-12">
                {aboutConfig.stats.map((s, i) => (
                  <div key={i}>
                    <p className="display text-bone text-4xl">{s.value}</p>
                    <p className="eyebrow mt-1 text-smoke">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
