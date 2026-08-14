"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function FAQItem({
  id,
  question,
  answer,
  open,
  onToggle,
  triggerRef,
  onKeyDown,
}: {
  id: string;
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
  triggerRef: (el: HTMLButtonElement | null) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    if (reduced) {
      // sem animação: só alterna visibilidade diretamente
      el.style.height = open ? "auto" : "0px";
      return;
    }

    if (open) {
      const target = el.scrollHeight;
      gsap.fromTo(
        el,
        { height: 0 },
        {
          height: target,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            el.style.height = "auto";
          },
        }
      );
    } else {
      const current = el.scrollHeight;
      gsap.fromTo(
        el,
        { height: current },
        { height: 0, duration: 0.3, ease: "power2.inOut" }
      );
    }
  }, [open, reduced]);

  return (
    <div className="border-b border-ash">
      <h3 className="m-0">
        <button
          ref={triggerRef}
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          onKeyDown={onKeyDown}
          className="w-full flex items-center justify-between gap-6 py-6 text-left group focus-visible:outline-2 focus-visible:outline-bone"
        >
          <span
            className={`display text-xl md:text-2xl transition-colors duration-300 ${
              open ? "text-bone" : "text-smoke/80 group-hover:text-bone"
            }`}
          >
            {question}
          </span>
          <span
            aria-hidden="true"
            className={`shrink-0 text-2xl font-light text-smoke transition-transform duration-300 ${
              open ? "rotate-45" : "rotate-0"
            }`}
          >
            +
          </span>
        </button>
      </h3>

      <div
        ref={panelRef}
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        style={{ height: open ? undefined : 0 }}
        className="overflow-hidden"
      >
        <p className="text-smoke font-light leading-relaxed pb-6 max-w-2xl">{answer}</p>
      </div>
    </div>
  );
}
