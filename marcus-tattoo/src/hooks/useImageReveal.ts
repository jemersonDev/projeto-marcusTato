"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Revela uma imagem com o efeito descrito no brief:
 * a máscara (clip-path) abre de baixo para cima enquanto a imagem
 * sai de scale 1.08 e estabiliza em scale 1.
 *
 * Estrutura esperada:
 *   <div ref={ref} style={{ overflow: hidden }}>
 *     <img /> ou <Image />  (o filho direto é a imagem)
 *   </div>
 */
export function useImageReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);
    const img = el.querySelector("img");
    if (!img) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(img, { scale: 1.08 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
      tl.to(el, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.1,
        ease: "power4.inOut",
      }).to(img, { scale: 1, duration: 1.3, ease: "power3.out" }, "<0.1");
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}
