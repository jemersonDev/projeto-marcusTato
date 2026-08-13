"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CinematicItem } from "@/data/cinematic";

/**
 * OBRA PRINCIPAL. Ocupa quase toda a tela. Ao entrar, a imagem cresce
 * suavemente (scale + máscara abrindo) e a legenda aparece. É o clímax visual
 * da seção. Sem movimento permitido, aparece já no tamanho final e visível.
 */
export default function GalleryFeature({ item, index }: { item: CinematicItem; index: number }) {
  const root = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);
  const caption = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // a "moldura" cresce e a imagem interna faz um leve zoom-out
      gsap.set(media.current, { clipPath: "inset(8% 12% 8% 12%)" });
      gsap.set(img.current, { scale: 1.2 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 75%",
            end: "top 20%",
            scrub: true,
          },
        })
        .to(media.current, { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }, 0)
        .to(img.current, { scale: 1, ease: "none" }, 0);

      // legenda entra depois
      gsap.from(caption.current, {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 45%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative">
      <div
        ref={media}
        className="relative w-full h-[78vh] md:h-[92vh] overflow-hidden bg-carbon"
      >
        <div ref={img} className="absolute inset-0 will-change-transform">
          <Image
            src={item.image}
            alt={`${item.title} — ${item.style} — Marcus Tattoo`}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        {/* overlay para legibilidade da legenda */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/20" />

        <div ref={caption} className="absolute bottom-8 left-6 md:bottom-14 md:left-14 max-w-xl">
          <span className="eyebrow text-bone/80 mb-3 block">
            {String(index + 1).padStart(2, "0")} — Obra em destaque • {item.style}
          </span>
          <h3 className="display text-bone text-6xl md:text-8xl leading-[0.9]">{item.title}</h3>
        </div>
      </div>
    </div>
  );
}
