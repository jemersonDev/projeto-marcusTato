"use client";

import { useRef, useState } from "react";
import FAQItem from "@/components/faq/FAQItem";
import { faq as faqData } from "@/data/content";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Faq() {
  const headerRef = useScrollReveal<HTMLDivElement>({ childrenSelector: "[data-reveal]" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  const toggle = (i: number) => setOpenIndex((cur) => (cur === i ? null : i));

  const openAssistant = () => window.dispatchEvent(new Event("marcus:open-assistant"));

  // navegação por teclado entre as perguntas: ↑ ↓ Home End
  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = faqData.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown") next = i === last ? 0 : i + 1;
    else if (e.key === "ArrowUp") next = i === 0 ? last : i - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next !== null) {
      e.preventDefault();
      triggers.current[next]?.focus();
    }
  };

  if (faqData.length === 0) return null;

  return (
    <section id="faq" className="bg-ink py-24 md:py-36">
      <div className="container-x">
        <div ref={headerRef} className="max-w-3xl mb-14 md:mb-20">
          <p data-reveal className="eyebrow mb-5">
            FAQ
          </p>
          <h2 data-reveal className="display text-bone text-5xl md:text-7xl">
            Perguntas frequentes.
          </h2>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl border-t border-ash">
          {faqData.map((item, i) => (
            <FAQItem
              key={item.q}
              id={`faq-${i}`}
              question={item.q}
              answer={item.a}
              open={openIndex === i}
              onToggle={() => toggle(i)}
              triggerRef={(el) => {
                triggers.current[i] = el;
              }}
              onKeyDown={(e) => onKeyDown(e, i)}
            />
          ))}
        </div>

        {/* Ponte para o atendimento 24h (reutiliza o assistente já montado) */}
        <div className="max-w-3xl mt-16 md:mt-20 border-t border-ash pt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <p className="display text-bone text-2xl md:text-3xl">Ainda tem dúvidas?</p>
          <button
            type="button"
            onClick={openAssistant}
            className="shrink-0 bg-bone text-ink px-7 py-3.5 text-xs tracking-[0.15em] uppercase hover:bg-white transition-colors"
          >
            Iniciar atendimento 24h
          </button>
        </div>
      </div>
    </section>
  );
}
