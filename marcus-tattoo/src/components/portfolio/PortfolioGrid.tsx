"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PortfolioCard from "./PortfolioCard";
import type { PortfolioItem } from "@/data/portfolio";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  items: PortfolioItem[];
  onOpen: (index: number) => void;
};

// unidade de linha e espaçamento do masonry (px)
const ROW = 8;
const GAP = 24;

/** número de colunas por breakpoint */
function colsForWidth(w: number) {
  if (w < 640) return 1;
  if (w < 1024) return 2;
  return 3;
}

export default function PortfolioGrid({ items, onOpen }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [cols, setCols] = useState(1); // mobile-first para casar com o SSR

  // acompanha o número de colunas conforme a largura
  useEffect(() => {
    const update = () => setCols(colsForWidth(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // MASONRY: calcula quantas linhas cada card ocupa a partir da altura REAL
  // (que vem da proporção natural da foto). Em 1 coluna, não há masonry:
  // o grid usa fluxo natural e os cards aparecem inteiros.
  const layout = useCallback(() => {
    const el = root.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-masonry-item]");
    if (cols <= 1) {
      cards.forEach((c) => (c.style.gridRowEnd = ""));
      return;
    }
    cards.forEach((c) => {
      const h = c.getBoundingClientRect().height;
      const span = Math.max(1, Math.ceil((h + GAP) / ROW));
      c.style.gridRowEnd = `span ${span}`;
    });
  }, [cols]);

  useEffect(() => {
    layout();
    const el = root.current;
    if (!el) return;
    const ro = new ResizeObserver(() => layout());
    ro.observe(el);
    el.querySelectorAll<HTMLElement>("[data-masonry-item]").forEach((c) => ro.observe(c));
    // remede depois que a fonte/layout assentam
    const t = setTimeout(layout, 250);
    return () => {
      ro.disconnect();
      clearTimeout(t);
    };
  }, [layout, items]);

  // ANIMAÇÕES (reveal + parallax) — só quando há movimento permitido
  useEffect(() => {
    const el = root.current;
    if (!el || reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    let safety = 0;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".pf-card");
      gsap.set(cards, { autoAlpha: 0, y: 42 });
      ScrollTrigger.batch(cards, {
        start: "top 90%",
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
            overwrite: true,
          }),
      });

      // parallax sutil só nas imagens em destaque
      cards.forEach((card) => {
        const img = card.querySelector<HTMLElement>(".pf-card-img");
        if (!img || card.dataset.featured !== "true") return;
        gsap.to(img, {
          yPercent: -5,
          ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      ScrollTrigger.refresh();

      // REDE DE SEGURANÇA: se por qualquer motivo um card não for revelado
      // pelo scroll (trigger não disparou), garante que ele apareça. Assim a
      // galeria nunca fica com imagens invisíveis.
      safety = window.setTimeout(() => {
        cards.forEach((c) => {
          if (parseFloat(getComputedStyle(c).opacity) < 0.05) {
            gsap.to(c, { autoAlpha: 1, y: 0, duration: 0.4, overwrite: true });
          }
        });
      }, 2500);
    }, el);

    return () => {
      window.clearTimeout(safety);
      ctx.revert();
    };
  }, [items, reduced, cols]);

  const masonry = cols > 1;

  return (
    <div
      ref={root}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        columnGap: GAP,
        rowGap: masonry ? 0 : GAP,
        gridAutoRows: masonry ? `${ROW}px` : "auto",
        alignItems: "start",
      }}
    >
      {items.map((item, i) => (
        <PortfolioCard
          key={item.id}
          item={item}
          index={i}
          // destaque ocupa 2 colunas quando há mais de uma (mais presença)
          colSpan={item.featured && cols > 1 ? 2 : 1}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}
