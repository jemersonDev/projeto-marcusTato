"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ChatWindow from "./ChatWindow";
import { chatConfig } from "@/config/chat";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Raiz do atendimento 24h: botão flutuante "Iniciar atendimento" + painel.
 * Desktop: painel flutuante no canto (site visível ao fundo).
 * Mobile: painel em tela cheia (100dvh) para o teclado não esconder o campo.
 *
 * Outros CTAs do site podem abrir o assistente disparando o evento
 * `window.dispatchEvent(new Event("marcus:open-assistant"))`.
 */
export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const openChat = useCallback(() => setOpen(true), []);
  const closeChat = useCallback(() => setOpen(false), []);

  // permite abrir via evento global (ex.: botão "Iniciar atendimento" do Processo)
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("marcus:open-assistant", handler);
    return () => window.removeEventListener("marcus:open-assistant", handler);
  }, []);

  // ESC fecha; trava o scroll do body no mobile; devolve o foco ao fechar
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    const prevOverflow = document.body.style.overflow;
    if (isMobile) document.body.style.overflow = "hidden";

    // foco inicial no painel
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("button, a, input, textarea")?.focus();
    }, 50);

    // animação de entrada
    let ctx: gsap.Context | undefined;
    if (!reduced && panelRef.current) {
      ctx = gsap.context(() => {
        gsap.from(panelRef.current, { autoAlpha: 0, y: 24, duration: 0.4, ease: "power3.out" });
      });
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
      ctx?.revert();
      // busca o launcher diretamente no DOM (em vez de uma ref capturada no
      // início do efeito) porque ele só existe quando !open — a ref mudaria
      // de valor entre a configuração deste efeito e sua limpeza.
      document.querySelector<HTMLButtonElement>("[data-chat-launcher]")?.focus();
    };
  }, [open, reduced]);

  return (
    <>
      {/* Launcher */}
      {!open && (
        <button
          data-chat-launcher
          onClick={openChat}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 bg-bone text-ink pl-4 pr-5 py-3 shadow-lg hover:bg-white transition-colors"
          aria-label={chatConfig.launcher ?? "Iniciar atendimento"}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500/70 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs tracking-[0.15em] uppercase font-medium">
            {chatConfig.launcher ?? "Iniciar atendimento"}
          </span>
        </button>
      )}

      {/* Painel */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={chatConfig.name}
          className="fixed z-[80] bg-ink flex flex-col inset-0 h-[100dvh] sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[600px] sm:max-h-[85vh] sm:w-[400px] sm:border sm:border-ash sm:shadow-2xl"
        >
          <ChatWindow onClose={closeChat} />
        </div>
      )}
    </>
  );
}
