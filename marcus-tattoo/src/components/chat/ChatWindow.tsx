"use client";

import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatOptions from "./ChatOptions";
import ChatInput from "./ChatInput";
import ReferenceUpload from "./ReferenceUpload";
import WhatsAppButton from "./WhatsAppButton";
import { useAssistant } from "./useAssistant";
import { chatConfig } from "@/config/chat";
import { faq as faqData } from "@/data/content";

export default function ChatWindow({ onClose }: { onClose: () => void }) {
  const { state, pickMenu, submitText, pickChoice, skip, setFile, pickFaq, back, waHref } =
    useAssistant();
  const endRef = useRef<HTMLDivElement>(null);

  // rola para a última mensagem
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [state.messages.length, state.input.kind]);

  const input = state.input;
  const isSummary = input.kind === "whatsapp" && state.quoteIndex >= chatConfig.quoteSteps.length;
  const waLabel = isSummary ? "Enviar pelo WhatsApp" : "Falar no WhatsApp";

  return (
    <div className="flex flex-col h-full">
      {/* Cabeçalho */}
      <header className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-ash">
        <div>
          <p className="display text-bone text-lg leading-none">{chatConfig.name}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            <span className="eyebrow text-[0.6rem] text-smoke">{chatConfig.subtitle}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Fechar atendimento"
          className="eyebrow text-bone hover:text-smoke transition-colors p-2"
        >
          Fechar ✕
        </button>
      </header>

      {/* Mensagens */}
      <div className="flex-1 min-h-0 overflow-y-auto px-5 py-5 flex flex-col gap-3">
        {state.messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
        <div ref={endRef} />
      </div>

      {/* Controle de entrada */}
      <div className="shrink-0 border-t border-ash px-5 py-4">
        {input.kind === "menu" && (
          <ChatOptions options={chatConfig.menu} onPick={pickMenu} />
        )}

        {input.kind === "text" && (
          <ChatInput
            key={input.step.key}
            step={input.step}
            error={state.error}
            onSubmit={submitText}
            onSkip={skip}
          />
        )}

        {input.kind === "choice" && (
          <div className="flex flex-col gap-2">
            <ChatOptions
              options={(input.step.options ?? []).map((o) => ({ key: o, label: o }))}
              onPick={pickChoice}
            />
            {!input.step.required && (
              <button
                type="button"
                onClick={skip}
                className="text-sm border border-ash text-smoke px-4 py-3 hover:text-bone transition-colors"
              >
                Pular
              </button>
            )}
          </div>
        )}

        {input.kind === "upload" && <ReferenceUpload onFile={setFile} onSkip={skip} />}

        {input.kind === "faq" && (
          <div className="flex flex-col gap-2">
            <ChatOptions
              options={[
                ...chatConfig.quickQuestions,
                ...faqData.map((f, i) => ({ key: String(i), label: f.q })),
              ]}
              onPick={pickFaq}
            />
            <button
              type="button"
              onClick={back}
              className="text-sm border border-ash text-smoke px-4 py-3 hover:text-bone transition-colors"
            >
              Voltar ao menu
            </button>
          </div>
        )}

        {input.kind === "whatsapp" && (
          <WhatsAppButton href={waHref} label={waLabel} onBack={back} />
        )}
      </div>
    </div>
  );
}
