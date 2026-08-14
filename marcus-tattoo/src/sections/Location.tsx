"use client";

import {
  locationConfig,
  fullAddress,
  googleMapsUrl,
  googleMapsDirectionsUrl,
} from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useImageReveal } from "@/hooks/useImageReveal";
import { useParallax } from "@/hooks/useParallax";

/**
 * URL de EMBED do Google Maps — modo de busca por texto, sem API key e sem
 * coordenadas inventadas. Usa exatamente o mesmo endereço de locationConfig.
 */
const embedQuery = encodeURIComponent(
  `${locationConfig.name}, ${locationConfig.street}, ${locationConfig.neighborhood}, ${locationConfig.city}, ${locationConfig.state}`
);
const mapsEmbedUrl = `https://www.google.com/maps?q=${embedQuery}&output=embed`;
const mapAccessibleLabel = `Mapa — ${locationConfig.name}, ${locationConfig.street}, ${locationConfig.neighborhood}, ${locationConfig.city}/${locationConfig.state}`;

export default function Location() {
  // stagger do texto: eyebrow, título, subtítulo, etiqueta, endereço, nota
  const textRef = useScrollReveal<HTMLDivElement>({ childrenSelector: "[data-reveal]" });
  // stagger próprio dos botões (entrada individual, levemente atrasada)
  const buttonsRef = useScrollReveal<HTMLDivElement>({
    childrenSelector: "[data-btn]",
    start: "top 90%",
    stagger: 0.08,
  });
  const mapRef = useImageReveal<HTMLDivElement>();
  // parallax muito sutil no bloco do mapa
  const mapParallaxRef = useParallax<HTMLDivElement>({ from: 3, to: -3 });

  const talkLink = whatsappLink("Olá, Marcus! Vi o site e queria falar sobre uma tatuagem.");

  return (
    <section id="localizacao" className="bg-ink py-24 md:py-36">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* ===== Endereço (esquerda no desktop, primeiro no mobile) ===== */}
          <div ref={textRef} className="lg:col-span-5 lg:pt-4">
            <p data-reveal className="eyebrow mb-5">
              Localização
            </p>
            <h2 data-reveal className="display text-bone text-5xl md:text-6xl mb-3">
              Onde a arte acontece.
            </h2>
            <p data-reveal className="text-smoke font-light text-lg mb-6 max-w-md">
              Encontre o estúdio e venha transformar sua ideia em arte.
            </p>

            {/* etiqueta com pequena animação própria (escala) */}
            <span
              data-reveal
              className="eyebrow inline-block border border-ash px-3 py-1.5 text-smoke mb-8 origin-left"
            >
              {locationConfig.city} • {locationConfig.state}
            </span>

            <address
              data-reveal
              className="not-italic space-y-1 text-smoke font-light leading-relaxed mb-2"
            >
              <p className="text-bone">{locationConfig.name}</p>
              <p>{locationConfig.street}</p>
              <p>{locationConfig.reference}</p>
              <p>
                {locationConfig.neighborhood} — {locationConfig.city}/{locationConfig.state}
              </p>
            </address>

            {locationConfig.note && (
              <p data-reveal className="text-smoke/90 text-sm mt-4 mb-10">
                {locationConfig.note}
              </p>
            )}

            {/* Botões — cada um com entrada própria (stagger) e aria-label descritivo */}
            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row flex-wrap gap-3 mt-10"
            >
              <a
                data-btn
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Como chegar — abrir rota até ${locationConfig.name} no Google Maps`}
                className="text-center border border-bone/70 text-bone px-6 py-3.5 text-xs tracking-[0.15em] uppercase hover:bg-bone hover:text-ink transition-colors"
              >
                Como chegar
              </a>
              <a
                data-btn
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir ${locationConfig.name} no Google Maps`}
                className="text-center border border-ash text-bone px-6 py-3.5 text-xs tracking-[0.15em] uppercase hover:bg-carbon transition-colors"
              >
                Abrir no Google Maps
              </a>
              {talkLink && (
                <a
                  data-btn
                  href={talkLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Falar com ${locationConfig.name} pelo WhatsApp`}
                  className="text-center bg-bone text-ink px-6 py-3.5 text-xs tracking-[0.15em] uppercase hover:bg-white transition-colors"
                >
                  Falar com Marcus
                </a>
              )}
            </div>

            {/* Consistência com Google Business Profile — link discreto, mesmo destino de busca */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Encontrar ${locationConfig.name} no Google`}
              className="inline-flex items-center gap-1.5 mt-6 text-xs text-smoke hover:text-bone transition-colors underline underline-offset-4 decoration-ash"
            >
              Encontrar no Google
            </a>
          </div>

          {/* ===== Mapa (direita no desktop, depois no mobile) ===== */}
          <div className="lg:col-span-7">
            <div ref={mapParallaxRef}>
              <div
                ref={mapRef}
                className="relative w-full aspect-[4/3] md:aspect-[16/11] overflow-hidden bg-carbon border border-ash"
              >
                <iframe
                  src={mapsEmbedUrl}
                  title={mapAccessibleLabel}
                  aria-label={mapAccessibleLabel}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full grayscale-[35%] contrast-[1.05] brightness-[0.9]"
                  style={{ border: 0 }}
                />
                {/* véu sutil para casar com a paleta preto/cinza do site */}
                <div className="absolute inset-0 pointer-events-none bg-ink/10" />
              </div>
              {/* descrição textual acessível complementar ao mapa (para leitores de tela) */}
              <p className="sr-only">{fullAddress}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
