"use client";

import Image from "next/image";
import type { AftercareBlock as Block } from "@/data/content";

/**
 * Um bloco de cuidados. Editorial, não "card médico".
 * kind="alert": versão discreta e calma (quando procurar orientação).
 * kind="note": destaque suave (cicatrização).
 * Imagem opcional entra como acento visual (a tatuagem segue protagonista).
 */
export default function AftercareBlock({ block, index }: { block: Block; index: number }) {
  const isAlert = block.kind === "alert";
  const isNote = block.kind === "note";
  const imageLeft = index % 2 === 1; // alterna o lado das imagens

  if (isAlert) {
    return (
      <article
        data-care-block
        className="border-t border-ash pt-10 md:pt-12 mt-4 grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        <div className="lg:col-span-2">
          <span data-care-num className="eyebrow text-smoke/60">
            {block.n}
          </span>
        </div>
        <div className="lg:col-span-8">
          <h3 data-care-text className="display text-bone text-2xl md:text-3xl mb-3">
            {block.title}
          </h3>
          <p data-care-text className="text-smoke font-light leading-relaxed max-w-2xl">
            {block.description}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article
      data-care-block
      className="border-t border-ash pt-12 md:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
    >
      {/* número grande */}
      <div className="lg:col-span-2">
        <span data-care-num className="display text-bone text-6xl md:text-7xl leading-none">
          {block.n}
        </span>
      </div>

      {/* conteúdo */}
      <div className={`lg:col-span-6 ${block.image ? "" : "lg:col-span-10"}`}>
        <h3 data-care-text className="display text-bone text-3xl md:text-4xl mb-4">
          {block.title}
        </h3>
        {block.description && (
          <p
            data-care-text
            className={`font-light leading-relaxed max-w-xl mb-6 ${
              isNote ? "text-bone border-l-2 border-ash pl-5" : "text-smoke"
            }`}
          >
            {block.description}
          </p>
        )}
        {block.items.length > 0 && (
          <ul className="space-y-3 max-w-xl">
            {block.items.map((item, i) => (
              <li
                data-care-text
                key={i}
                className="text-smoke font-light leading-relaxed flex gap-3"
              >
                <span aria-hidden="true" className="text-smoke/50 mt-1 text-xs">
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* imagem opcional (acento) */}
      {block.image && (
        <div className={`lg:col-span-4 ${imageLeft ? "lg:order-first" : ""}`}>
          <div
            data-care-media
            className="relative w-full aspect-[3/4] overflow-hidden bg-carbon"
          >
            <Image
              src={block.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 30vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
          </div>
        </div>
      )}
    </article>
  );
}
