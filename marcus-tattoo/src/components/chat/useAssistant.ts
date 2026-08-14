"use client";

import { useReducer, useCallback } from "react";
import { chatConfig, bookingConfig, type QuoteStep } from "@/config/chat";
import { faq as faqData } from "@/data/content";
import { buildQuoteMessage } from "@/lib/quoteMessage";
import { whatsappLink } from "@/lib/whatsapp";

export type Message = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

/** modo do controle de entrada exibido no rodapé do chat */
export type InputMode =
  | { kind: "menu" }
  | { kind: "text"; step: QuoteStep }
  | { kind: "choice"; step: QuoteStep }
  | { kind: "upload"; step: QuoteStep }
  | { kind: "faq" }
  | { kind: "whatsapp"; message: string } // botão enviar/whatsapp + voltar
  | { kind: "none" };

type State = {
  messages: Message[];
  input: InputMode;
  quoteIndex: number;
  quote: Record<string, string>;
  error?: string;
  nextId: number;
};

type Action =
  | { type: "RESET" }
  | { type: "MENU"; key: string }
  | { type: "TEXT"; value: string }
  | { type: "CHOICE"; value: string }
  | { type: "SKIP" }
  | { type: "FILE"; name: string }
  | { type: "FAQ"; key: string }
  | { type: "BACK" };

/* ------------------------------------------------------------- helpers --- */
const A = (s: State, text: string): Message => ({ id: s.nextId, role: "assistant", text });
const U = (s: State, text: string): Message => ({ id: s.nextId, role: "user", text });

function greeting(nextId: number): State {
  return {
    messages: [{ id: nextId, role: "assistant", text: chatConfig.greeting }],
    input: { kind: "menu" },
    quoteIndex: -1,
    quote: {},
    error: undefined,
    nextId: nextId + 1,
  };
}

/** valida o passo atual; retorna string de erro ou null */
function validate(step: QuoteStep, value: string): string | null {
  const v = value.trim();
  if (step.required && !v) return "Este campo é obrigatório.";
  if (step.type === "tel" && v) {
    const digits = v.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 13)
      return "Digite um WhatsApp válido com DDD.";
  }
  return null;
}

/** encontra o índice do próximo passo válido (pulando dependências não satisfeitas) */
function nextStepIndex(from: number, quote: Record<string, string>): number {
  const steps = chatConfig.quoteSteps;
  for (let i = from; i < steps.length; i++) {
    const dep = steps[i].dependsOn;
    if (dep && quote[dep.key] !== dep.value) continue;
    return i;
  }
  return steps.length; // acabou
}

function askStep(s: State, index: number, extraMsgs: Message[] = []): State {
  const steps = chatConfig.quoteSteps;
  if (index >= steps.length) {
    // fim do orçamento → resumo
    const waMessage = buildQuoteMessage(s.quote);
    const msg: Message = { id: s.nextId, role: "assistant", text: chatConfig.done };
    return {
      ...s,
      messages: [...s.messages, ...extraMsgs, msg],
      input: { kind: "whatsapp", message: waMessage },
      quoteIndex: index,
      error: undefined,
      nextId: s.nextId + 1,
    };
  }
  const step = steps[index];
  const msg: Message = { id: s.nextId, role: "assistant", text: step.question };
  const kind: InputMode =
    step.type === "choice"
      ? { kind: "choice", step }
      : step.type === "upload"
      ? { kind: "upload", step }
      : { kind: "text", step };
  return {
    ...s,
    messages: [...s.messages, ...extraMsgs, msg],
    input: kind,
    quoteIndex: index,
    error: undefined,
    nextId: s.nextId + 1,
  };
}

function startQuote(s: State): State {
  const idx = nextStepIndex(0, {});
  return askStep({ ...s, quote: {}, quoteIndex: -1 }, idx);
}

/* -------------------------------------------------------------- reducer --- */
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "RESET":
      return greeting(state.nextId);

    case "BACK":
      return {
        ...state,
        messages: [...state.messages, A(state, chatConfig.greeting)],
        input: { kind: "menu" },
        error: undefined,
        nextId: state.nextId + 1,
      };

    case "MENU": {
      const key = action.key;
      const label = chatConfig.menu.find((m) => m.key === key)?.label ?? key;
      const s: State = {
        ...state,
        messages: [...state.messages, U(state, label)],
        nextId: state.nextId + 1,
      };
      if (key === "orcamento" || key === "tatuagem") return startQuote(s);
      if (key === "duvidas")
        return {
          ...s,
          messages: [...s.messages, A(s, chatConfig.faqIntro)],
          input: { kind: "faq" },
          nextId: s.nextId + 1,
        };
      if (key === "agendar")
        return {
          ...s,
          messages: [...s.messages, A(s, bookingConfig.message)],
          input: { kind: "whatsapp", message: "Olá, Marcus! Quero agendar uma tatuagem." },
          nextId: s.nextId + 1,
        };
      if (key === "marcus")
        return {
          ...s,
          messages: [...s.messages, A(s, chatConfig.handoff)],
          input: { kind: "whatsapp", message: "Olá, Marcus! Quero falar sobre uma tatuagem." },
          nextId: s.nextId + 1,
        };
      return s;
    }

    case "TEXT": {
      if (state.input.kind !== "text") return state;
      const step = state.input.step;
      const err = validate(step, action.value);
      if (err) return { ...state, error: err };
      const value = action.value.trim();
      const quote = { ...state.quote, [step.key]: value };
      const userMsg = U(state, value || "—");
      const s: State = { ...state, quote, nextId: state.nextId + 1 };
      return askStep({ ...s, messages: [...state.messages] }, nextStepIndex(state.quoteIndex + 1, quote), [userMsg]);
    }

    case "SKIP": {
      if (state.input.kind !== "text" && state.input.kind !== "upload" && state.input.kind !== "choice")
        return state;
      const step =
        state.input.kind === "text" || state.input.kind === "choice" || state.input.kind === "upload"
          ? state.input.step
          : null;
      if (!step || step.required) return state;
      const userMsg = U(state, "Pular");
      const s: State = { ...state, nextId: state.nextId + 1 };
      return askStep(s, nextStepIndex(state.quoteIndex + 1, state.quote), [userMsg]);
    }

    case "CHOICE": {
      if (state.input.kind !== "choice") return state;
      const step = state.input.step;
      const quote = { ...state.quote, [step.key]: action.value };
      const userMsg = U(state, action.value);
      const s: State = { ...state, quote, nextId: state.nextId + 1 };
      return askStep(s, nextStepIndex(state.quoteIndex + 1, quote), [userMsg]);
    }

    case "FILE": {
      if (state.input.kind !== "upload") return state;
      const quote = { ...state.quote, referencia: "Sim" };
      const userMsg = U(state, `Imagem anexada: ${action.name}`);
      const s: State = { ...state, quote, nextId: state.nextId + 1 };
      return askStep(s, nextStepIndex(state.quoteIndex + 1, quote), [userMsg]);
    }

    case "FAQ": {
      const key = action.key;
      // respostas rápidas seguras
      if (key === "preco")
        return pushQA(state, "Quanto custa?", chatConfig.priceAnswer);
      if (key === "disponibilidade")
        return pushQA(state, "Tem disponibilidade?", chatConfig.availabilityAnswer);
      // faqData
      const idx = Number(key);
      const item = faqData[idx];
      if (item) return pushQA(state, item.q, item.a);
      return state;
    }

    default:
      return state;
  }
}

function pushQA(state: State, q: string, a: string): State {
  return {
    ...state,
    messages: [
      ...state.messages,
      { id: state.nextId, role: "user", text: q },
      { id: state.nextId + 1, role: "assistant", text: a },
    ],
    input: { kind: "faq" }, // continua no menu de dúvidas
    nextId: state.nextId + 2,
  };
}

/* ----------------------------------------------------------------- hook --- */
export function useAssistant() {
  const [state, dispatch] = useReducer(reducer, 0, greeting);

  const reset = useCallback(() => dispatch({ type: "RESET" }), []);
  const pickMenu = useCallback((key: string) => dispatch({ type: "MENU", key }), []);
  const submitText = useCallback((value: string) => dispatch({ type: "TEXT", value }), []);
  const pickChoice = useCallback((value: string) => dispatch({ type: "CHOICE", value }), []);
  const skip = useCallback(() => dispatch({ type: "SKIP" }), []);
  const setFile = useCallback((name: string) => dispatch({ type: "FILE", name }), []);
  const pickFaq = useCallback((key: string) => dispatch({ type: "FAQ", key }), []);
  const back = useCallback(() => dispatch({ type: "BACK" }), []);

  const waHref =
    state.input.kind === "whatsapp" ? whatsappLink(state.input.message) : null;

  return { state, reset, pickMenu, submitText, pickChoice, skip, setFile, pickFaq, back, waHref };
}
