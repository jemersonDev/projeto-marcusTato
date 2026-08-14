"use client";

import Image from "next/image";
import GalleryReveal from "./GalleryReveal";
import { useParallax } from "@/hooks/useParallax";
import type { CinematicItem } from "@/data/cinematic";

/**
 * Um "quadro" da narrativa: uma única imagem posicionada de forma assimétrica,
 * com bastante espaço negativo, parallax sutil na imagem e legenda que
 * acompanha. Não é card de grade — cada bloco respira sozinho.
 */
export default function GalleryItem({ item, index }: { item: CinematicItem; index: number }) {
  const imgParallax = useParallax<HTMLDivElement>({ from: 6, to: -6 });
  const isFull = item.layout === "full";
  const isLeft = item.layout === "left";

  const caption = (
    <div className={`flex flex-col justify-center ${isFull ? "" : "lg:h-full"}`}>
      <span className="eyebrow text-smoke/90 mb-3">
        {String(index + 1).padStart(2, "0")} — {item.style}
      </span>
      <h3 className="display text-bone text-4xl md:text-5xl">{item.title}</h3>
    </div>
  );

  const media = (
    <GalleryReveal
      className="group relative w-full overflow-hidden bg-carbon"
      from={isLeft ? "right" : "left"}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: `${item.width} / ${item.height}` }}
      >
        {/* camada com parallax (transform) — separada do clip-path do wrapper */}
        <div ref={imgParallax} className="absolute inset-[-8%] will-change-transform">
          <Image
            src={item.image}
            alt={`${item.title} — ${item.style} — Marcus Tattoo`}
            fill
            sizes={isFull ? "100vw" : "(max-width: 1024px) 100vw, 55vw"}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div className="absolute inset-0 bg-ink/10 group-hover:bg-ink/0 transition-colors duration-500" />
      </div>
    </GalleryReveal>
  );

  // FULL: imagem em largura total, legenda sobreposta no canto
  if (isFull) {
    return (
      <div className="relative">
        {media}
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
          <span className="eyebrow text-bone/80 mb-2 block">
            {String(index + 1).padStart(2, "0")} — {item.style}
          </span>
          <h3 className="display text-bone text-4xl md:text-6xl drop-shadow-lg">{item.title}</h3>
        </div>
      </div>
    );
  }

  // LEFT / RIGHT: grid assimétrico de 12 colunas no desktop, empilhado no mobile
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
      {isLeft ? (
        <>
          <div className="lg:col-span-7 lg:col-start-1">{media}</div>
          <div className="lg:col-span-4 lg:col-start-9">{caption}</div>
        </>
      ) : (
        <>
          {/* legenda à esquerda, imagem à direita */}
          <div className="lg:col-span-4 lg:col-start-1 order-1">{caption}</div>
          <div className="lg:col-span-7 lg:col-start-6 order-2">{media}</div>
        </>
      )}
    </div>
  );
}
