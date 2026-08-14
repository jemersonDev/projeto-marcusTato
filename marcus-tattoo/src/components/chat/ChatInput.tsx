"use client";

import { useRef, useState } from "react";
import type { QuoteStep } from "@/config/chat";

/**
 * Entrada de texto de um passo do orçamento. Mostra erro de validação de forma
 * elegante (sem alert()). Enter envia (Shift+Enter quebra linha no multiline).
 *
 * O componente é remontado pelo pai a cada passo (via `key={step.key}` em
 * ChatWindow), então o valor já nasce vazio — não precisamos de um efeito
 * para resetá-lo. O foco inicial é aplicado via ref callback (roda uma vez,
 * assim que o elemento monta), sem depender de setState num efeito.
 */
export default function ChatInput({
  step,
  error,
  onSubmit,
  onSkip,
}: {
  step: QuoteStep;
  error?: string;
  onSubmit: (value: string) => void;
  onSkip: () => void;
}) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement & HTMLInputElement>(null);

  const focusOnMount = (el: HTMLInputElement | HTMLTextAreaElement | null) => {
    ref.current = el as HTMLTextAreaElement & HTMLInputElement;
    el?.focus();
  };

  const submit = () => onSubmit(value);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !(step.multiline && e.shiftKey)) {
      e.preventDefault();
      submit();
    }
  };

  const common =
    "w-full bg-carbon border text-bone text-sm px-4 py-3 placeholder:text-smoke focus:outline-none";
  const borderCls = error ? "border-[#d68a8a]" : "border-ash focus:border-bone";

  return (
    <div className="flex flex-col gap-2">
      {step.multiline ? (
        <textarea
          ref={focusOnMount}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          rows={3}
          placeholder={step.placeholder}
          aria-label={step.question}
          aria-invalid={!!error}
          className={`${common} ${borderCls} resize-none`}
        />
      ) : (
        <input
          ref={focusOnMount}
          type={step.type === "tel" ? "tel" : "text"}
          inputMode={step.type === "tel" ? "tel" : "text"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={step.placeholder}
          aria-label={step.question}
          aria-invalid={!!error}
          className={`${common} ${borderCls}`}
        />
      )}

      {error && (
        <p className="text-xs" style={{ color: "#d68a8a" }} role="alert">
          {error}
        </p>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={submit}
          className="flex-1 text-sm bg-bone text-ink px-4 py-3 font-medium hover:bg-white transition-colors"
        >
          Enviar
        </button>
        {!step.required && (
          <button
            type="button"
            onClick={onSkip}
            className="text-sm border border-ash text-smoke px-4 py-3 hover:text-bone transition-colors"
          >
            Pular
          </button>
        )}
      </div>
    </div>
  );
}
