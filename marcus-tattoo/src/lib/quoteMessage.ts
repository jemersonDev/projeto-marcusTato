import { chatConfig } from "@/config/chat";

export type QuoteData = Record<string, string>;

/**
 * Monta a mensagem do orçamento para o WhatsApp a partir dos dados coletados.
 * Usa os rótulos definidos em chatConfig.quoteSteps. Só inclui campos
 * preenchidos — não expõe dados desnecessários.
 */
export function buildQuoteMessage(data: QuoteData): string {
  const lines: string[] = ["Olá, Marcus! Gostaria de um orçamento.", ""];

  for (const step of chatConfig.quoteSteps) {
    if (step.type === "upload") continue; // arquivo é enviado à parte
    const value = data[step.key]?.trim();
    if (value) lines.push(`${step.label}: ${value}`);
  }

  if (data.referencia === "Sim") {
    lines.push("", "Tenho uma imagem de referência para enviar.");
  }

  return lines.join("\n");
}
