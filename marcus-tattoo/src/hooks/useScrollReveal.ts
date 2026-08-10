"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Options = {
  y?: number;
  duration?: number;
  stagger?: number;
  /** seletor dos filhos a animar em stagger. Se ausente, anima o próprio elemento. */
  childrenSelector?: string;
  start?: string;
};

/**
 * Revela um elemento (ou seus filhos, em stagger) quando entra no viewport.
 * translateY + fade. Respeita prefers-reduced-motion (mostra tudo, sem animar).
 * Retorna uma ref para você anexar ao container.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: Options = {}
) {
  const ref = useRef<T>(null);
  const {
    y = 40,
    duration = 0.9,
    stagger = 0.12,
    childrenSelector,
    start = "top 82%",
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    const targets = childrenSelector
      ? Array.from(el.querySelectorAll(childrenSelector))
      : [el];
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        stagger,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start },
      });
    }, el);

    return () => ctx.revert();
  }, [y, duration, stagger, childrenSelector, start]);

  return ref;
}
