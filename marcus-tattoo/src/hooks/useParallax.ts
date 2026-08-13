"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Options = {
  from?: number;
  to?: number;
  axis?: "y" | "x";
};

/**
 * Parallax ligado ao scroll (scrub). Move o elemento de `from` até `to`
 * (em %) conforme ele atravessa a viewport. Aplique no elemento INTERNO
 * (a imagem), deixando o reveal/clip-path no wrapper — assim não há conflito
 * de transform. Respeita prefers-reduced-motion (não anima).
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(options: Options = {}) {
  const ref = useRef<T>(null);
  const { from = 8, to = -8, axis = "y" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const prop = axis === "y" ? "yPercent" : "xPercent";

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { [prop]: from },
        {
          [prop]: to,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    });
    return () => ctx.revert();
  }, [from, to, axis]);

  return ref;
}
