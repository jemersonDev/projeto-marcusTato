"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Smooth scroll (Lenis) sincronizado com o ScrollTrigger do GSAP.
 * Respeita prefers-reduced-motion: se o usuário pediu menos movimento,
 * o smooth scroll é desativado e o scroll nativo do navegador é mantido.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    /**
     * Recalcula as posições de TODOS os ScrollTriggers da página.
     * Necessário porque esta é uma página longa com várias seções: a troca
     * da fonte fallback pela fonte final (next/font) pode alterar levemente
     * a altura de blocos de texto em qualquer seção, o que desatualiza as
     * posições de início/fim já calculadas pelos triggers mais abaixo.
     * Sem isso, animações em seções distantes do topo podem não disparar
     * corretamente dependendo de como o usuário rolou a página.
     */
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready?.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);
    const refreshTimer = window.setTimeout(refresh, 600); // rede de segurança

    // Rolagem suave para âncoras (#sobre, #trabalhos, etc.)
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href^="#"]');
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      window.clearTimeout(refreshTimer);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
