/**
 * ATENDIMENTO 24H — CONFIGURAÇÃO  (chatConfig + bookingConfig)
 * ----------------------------------------------------------------------------
 * Todo o texto e o fluxo do assistente ficam aqui. Nada é inventado em runtime:
 * preços e disponibilidade têm respostas FIXAS e seguras (não afirmam valores
 * nem vagas). Para conectar uma IA no futuro, veja o comentário em `ai`.
 */

export type QuoteStep = {
  key: string;
  question: string;
  type: "text" | "tel" | "choice" | "upload";
  required?: boolean;
  multiline?: boolean;
  placeholder?: string;
  options?: string[];
  /** só pergunta este passo se outro campo tiver certo valor */
  dependsOn?: { key: string; value: string };
  /** rótulo usado na mensagem final do WhatsApp */
  label: string;
};

export const chatConfig = {
  name: "Marcus Tattoo Assist",
  subtitle: "Atendimento online 24 horas",
  launcher: "Iniciar atendimento", // texto do botão flutuante
  greeting: "Olá. Como podemos começar seu projeto?",

  // Opções do menu inicial
  menu: [
    { key: "tatuagem", label: "Quero fazer uma tatuagem" },
    { key: "orcamento", label: "Quero fazer um orçamento" },
    { key: "duvidas", label: "Tenho dúvidas" },
    { key: "agendar", label: "Quero agendar" },
    { key: "marcus", label: "Falar com Marcus" },
  ],

  // Passos do orçamento (conversacional, um de cada vez)
  quoteSteps: [
    { key: "nome", label: "Nome", question: "Como você se chama?", type: "text", required: true, placeholder: "Seu nome" },
    { key: "whatsapp", label: "WhatsApp", question: "Qual o seu WhatsApp? (com DDD)", type: "tel", required: true, placeholder: "(34) 9 9999-9999" },
    { key: "descricao", label: "Tatuagem", question: "O que você deseja tatuar?", type: "text", required: true, multiline: true, placeholder: "Descreva a ideia" },
    { key: "estilo", label: "Estilo", question: "Tem um estilo em mente?", type: "choice", options: ["Realismo", "Black & Grey", "Lettering", "Ainda não sei"] },
    { key: "local", label: "Local", question: "Em que local do corpo?", type: "text", placeholder: "Ex.: antebraço" },
    { key: "tamanho", label: "Tamanho", question: "Tamanho aproximado?", type: "choice", options: ["Pequeno", "Médio", "Grande", "Fechamento"] },
    { key: "referencia", label: "Referência", question: "Você tem alguma referência?", type: "choice", options: ["Sim", "Não"] },
    { key: "upload", label: "Imagem", question: "Se quiser, anexe uma imagem de referência.", type: "upload", dependsOn: { key: "referencia", value: "Sim" } },
    { key: "observacoes", label: "Observações", question: "Alguma observação?", type: "text", multiline: true, placeholder: "Opcional" },
    { key: "preferencia", label: "Preferência", question: "Tem preferência de data?", type: "text", placeholder: "Ex.: fins de semana, mês que vem" },
  ] as QuoteStep[],

  // Mensagens fixas e seguras
  done: "Perfeito. Recebemos as informações do seu projeto.",
  // NUNCA inventar preço.
  priceAnswer:
    "O valor depende do projeto, tamanho, localização no corpo e nível de complexidade. Envie os detalhes para receber uma avaliação.",
  // NUNCA inventar disponibilidade.
  availabilityAnswer:
    "Para verificar a disponibilidade, vou encaminhar você para o atendimento.",
  faqIntro: "Sobre o que você quer saber?",
  handoff: "Vou te encaminhar para o atendimento do Marcus no WhatsApp.",

  // Perguntas rápidas extras no menu de dúvidas (além do faqData)
  quickQuestions: [
    { key: "preco", label: "Quanto custa?" },
    { key: "disponibilidade", label: "Tem disponibilidade?" },
  ],

  /**
   * IA (futuro): mantido desligado. Quando houver um agente real, criar uma
   * rota de API server-side (ex.: /api/chat) que use uma chave em variável de
   * ambiente (NUNCA no frontend) e trocar a lógica determinística por chamadas
   * a essa rota. Ver README ("como conectar uma IA").
   */
  ai: { enabled: false as const },
};

/**
 * AGENDAMENTO — arquitetura preparada para integração futura.
 * Enquanto `calendarEnabled` for false, o fluxo encaminha para o WhatsApp.
 * Depois é possível plugar Google Calendar / agenda própria / CRM.
 */
export const bookingConfig = {
  calendarEnabled: false,
  provider: null as null | "google" | "custom" | "crm",
  message:
    "O studio é privado e atende com horário agendado. Para combinar a data, vou te encaminhar para o atendimento.",
};
