"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import type { PortfolioItem } from "@/data/portfolio";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  items: PortfolioItem[];
  index: number; // índice dentro de `items`
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
};

export default function PortfolioLightbox({ items, index, onClose, onNavigate }: Props) {
  const item = items[index];
  const total = items.length;
  const reduced = useReducedMotion();

  const overlayRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const goNext = useCallback(
    () => onNavigate((index + 1) % total),
    [index, total, onNavigate]
  );
  const goPrev = useCallback(
    () => onNavigate((index - 1 + total) % total),
    [index, total, onNavigate]
  );

  // Teclado: ESC fecha, setas navegam
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, goNext, goPrev]);

  // Trava o scroll do body e devolve o foco ao fechar
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const lastFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      lastFocused?.focus?.();
    };
  }, []);

  // Animação de entrada do overlay (uma vez)
  useEffect(() => {
    if (reduced || !overlayRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(overlayRef.current, { autoAlpha: 0, duration: 0.35, ease: "power2.out" });
    });
    return () => ctx.revert();
  }, [reduced]);

  // Animação a cada troca de imagem
  useEffect(() => {
    if (reduced || !figureRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        figureRef.current,
        { autoAlpha: 0, scale: 0.98 },
        { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, [index, reduced]);

  // Swipe no mobile
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  if (!item) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title}. Imagem ${index + 1} de ${total}`}
      className="fixed inset-0 z-[90] bg-ink flex flex-col"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* barra superior: contador + fechar */}
      <div className="flex items-center justify-between px-5 md:px-8 py-4 shrink-0">
        <span className="eyebrow text-bone/80 tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="eyebrow text-bone hover:text-smoke transition-colors p-2"
          aria-label="Fechar"
        >
          Fechar ✕
        </button>
      </div>

      {/* imagem */}
      <div className="relative flex-1 min-h-0 flex items-center justify-center px-4 md:px-20 pb-4">
        {/* anterior (desktop) */}
        {total > 1 && (
          <button
            onClick={goPrev}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center text-bone/70 hover:text-bone text-3xl transition-colors z-10"
            aria-label="Anterior"
          >
            ‹
          </button>
        )}

        <div ref={figureRef} className="relative w-full h-full max-w-5xl">
          <Image
            src={item.image}
            alt={`${item.title} — Marcus Tattoo`}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>

        {/* próximo (desktop) */}
        {total > 1 && (
          <button
            onClick={goNext}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center text-bone/70 hover:text-bone text-3xl transition-colors z-10"
            aria-label="Próximo"
          >
            ›
          </button>
        )}
      </div>

      {/* legenda + navegação mobile */}
      <div className="shrink-0 px-5 md:px-8 pb-6 md:pb-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="display text-bone text-xl md:text-2xl leading-tight">{item.title}</p>
            {item.bodyArea && <p className="text-smoke text-sm mt-1">{item.bodyArea}</p>}
          </div>
          {total > 1 && (
            <div className="flex md:hidden gap-6">
              <button onClick={goPrev} className="text-bone/70 text-3xl px-2" aria-label="Anterior">
                ‹
              </button>
              <button onClick={goNext} className="text-bone/70 text-3xl px-2" aria-label="Próximo">
                ›
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
