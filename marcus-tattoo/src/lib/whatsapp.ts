import { contactConfig } from "@/config/site";

/**
 * Monta um link de WhatsApp com mensagem pré-preenchida.
 * Retorna null se não houver número configurado — assim os componentes
 * podem esconder o botão em vez de gerar um link quebrado.
 */
export function whatsappLink(message?: string): string | null {
  const num = contactConfig.whatsapp.replace(/\D/g, "");
  if (!num) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${num}${text}`;
}

export const hasWhatsapp = () => contactConfig.whatsapp.replace(/\D/g, "").length > 0;
