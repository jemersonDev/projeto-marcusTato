"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** direção de abertura da máscara */
  from?: "bottom" | "left" | "right";
};

const CLIP = {
  bottom: "inset(100% 0% 0% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/**
 * Envolve um bloco e o revela com máscara (clip-path) + leve fade quando
 * entra na viewport. O conteúdo fica VISÍVEL por padrão (CSS); a máscara só
 * é aplicada quando o GSAP roda e há movimento permitido. Sem JS ou com
 * prefers-reduced-motion, o conteúdo aparece normalmente.
 */
export default function GalleryReveal({ children, className = "", from = "bottom" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(el, { clipPath: CLIP[from], autoAlpha: 0.001 });
      gsap.to(el, {
        clipPath: "inset(0% 0% 0% 0%)",
        autoAlpha: 1,
        duration: 1.1,
        ease: "power4.inOut",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    }, el);
    return () => ctx.revert();
  }, [from]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
