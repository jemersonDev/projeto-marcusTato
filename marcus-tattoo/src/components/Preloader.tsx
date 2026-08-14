"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { artistConfig } from "@/config/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Preloader() {
  const [animationDone, setAnimationDone] = useState(false);
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // sem movimento permitido: nada a animar — a visibilidade já é resolvida
    // no render abaixo (if (reduced || animationDone) return null).
    if (reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setAnimationDone(true),
      });
      tl.from(".pre-logo", { scale: 0.85, opacity: 0, duration: 0.8, ease: "power3.out" })
        .from(".pre-name span", { yPercent: 120, duration: 0.7, stagger: 0.04, ease: "power4.out" }, "-=0.3")
        .to(".pre-inner", { opacity: 1, duration: 0.3 })
        .to(root.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
          delay: 0.4,
        });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  if (reduced || animationDone) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] bg-ink flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="pre-inner flex flex-col items-center gap-6">
        <Image
          src="/images/logo.png"
          alt=""
          width={96}
          height={96}
          priority
          className="pre-logo rounded-full bg-white/95 p-1"
        />
        <p className="pre-name display text-bone text-2xl tracking-[0.2em] overflow-hidden flex">
          {artistConfig.brand.split("").map((c, i) => (
            <span key={i} className="inline-block">
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
