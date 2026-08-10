"use client";

import Image from "next/image";
import type { PortfolioItem } from "@/data/portfolio";

type Props = {
  item: PortfolioItem;
  index: number;
  /** quantas colunas o card ocupa (2 = destaque em telas maiores) */
  colSpan: number;
  onOpen: (index: number) => void;
};

/**
 * Cartão de um trabalho. A proporção vem das DIMENSÕES REAIS da foto
 * (width/height), então nada é distorcido nem cortado à força: a célula tem
 * exatamente o aspect-ratio da imagem, e object-cover preenche sem recorte.
 *
 * Fica visível por padrão (CSS). A animação de entrada é aplicada por fora
 * (GSAP) e só quando há movimento permitido — sem JS, a imagem continua ali.
 */
export default function PortfolioCard({ item, index, colSpan, onOpen }: Props) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      data-masonry-item
      data-featured={item.featured ? "true" : "false"}
      style={{ gridColumn: `span ${colSpan}` }}
      className="pf-card group relative block w-full overflow-hidden bg-carbon text-left focus-visible:outline-2 focus-visible:outline-bone"
      aria-label={`Abrir ${item.title}`}
    >
      {/* célula com a proporção NATURAL da foto */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: `${item.width} / ${item.height}` }}
      >
        <div className="pf-card-img absolute inset-0 will-change-transform">
          <Image
            src={item.image}
            alt={`${item.title} — Marcus Tattoo`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {item.featured && (
          <span className="absolute top-3 left-3 eyebrow text-[0.6rem] text-bone/80">
            Destaque
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500">
          <p className="display text-bone text-lg leading-tight">{item.title}</p>
          {item.bodyArea && (
            <p className="text-smoke text-xs mt-1 tracking-wide">{item.bodyArea}</p>
          )}
        </div>
      </div>
    </button>
  );
}
