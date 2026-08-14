"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { Message } from "./useAssistant";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Bolha de mensagem (assistente à esquerda, usuário à direita). */
export default function ChatMessage({ message }: { message: Message }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isUser = message.role === "user";

  useEffect(() => {
    if (reduced || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, { opacity: 0, y: 10, duration: 0.35, ease: "power2.out" });
    });
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={ref} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-bone text-ink"
            : "bg-carbon text-bone border border-ash"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
