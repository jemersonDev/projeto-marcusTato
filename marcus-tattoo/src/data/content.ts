/**
 * CONTEÚDO EDITORIAL DO SITE
 * ----------------------------------------------------------------------------
 * Especialidades, processo, cuidados, FAQ, formação e depoimentos.
 * Regra de ouro: NÃO invente dados. Deixe listas vazias ([]) quando ainda
 * não houver informação real — o site esconde automaticamente as seções vazias.
 */

/* ---------------------------------------------------------------- SOBRE --- */
/**
 * Textos da seção "Sobre". Tudo aqui é editável e NADA é inventado.
 * - paragraphs: a trajetória/experiência do Marcus (escreva livremente).
 * - philosophy: uma frase-conceito em destaque (ou apague).
 * - vision: opcional; se vazio (""), não aparece.
 * - stats: SOMENTE dados reais. Deixe [] para não mostrar nada. Nunca invente
 *   números (anos de experiência, nº de clientes, etc.).
 *   Formato: { value: "10", label: "anos tatuando" }
 * As especialidades foram para src/data/specialties.ts (specialtiesData).
 */
export const aboutConfig = {
  title: "Mais que uma tatuagem.",
  paragraphs: [
    "Marcus Henrique é tatuador e desenhista à frente do estúdio Marcus Tattoo, em Uberaba (MG).",
    "O trabalho é autoral e feito em studio privado, com atendimento somente por horário agendado. Cada projeto nasce de uma conversa e é desenhado sob medida para a pessoa e o local do corpo.",
  ],
  philosophy: "Transformando a pele em arte.",
  vision: "", // opcional — frase sobre a visão dele sobre tatuagem
  stats: [] as { value: string; label: string }[], // só dados reais
  image: "/images/artist/placeholder-artist.svg",
};

/* -------------------------------------------------------------- PROCESSO --- */
/**
 * PROCESSO DE ATENDIMENTO  (processConfig + processData)
 * Textos editáveis. NÃO invente políticas de pagamento, sinal, prazo ou
 * disponibilidade. `image` = foto real do portfólio (ambientação visual).
 */
export const processConfig = {
  title: "Do primeiro contato à tatuagem.",
  subtitle: "Cada projeto começa com uma conversa.",
  ctaLabel: "Quero começar meu projeto",
  ctaButton: "Iniciar atendimento",
};

export const processData = [
  {
    n: "01",
    title: "Conversa",
    text: "O cliente entra em contato e apresenta sua ideia.",
    image: "/images/portfolio/mascaras-antebraco.webp",
  },
  {
    n: "02",
    title: "Ideia & referências",
    text: "O cliente envia referências, explica o que deseja e conversa sobre o projeto.",
    image: "/images/portfolio/anjo-dinheiro-antebraco.webp",
  },
  {
    n: "03",
    title: "Projeto",
    text: "A ideia é analisada e transformada em uma proposta artística.",
    image: "/images/portfolio/buda-braco.webp",
  },
  {
    n: "04",
    title: "Agendamento",
    text: "Após alinhar o projeto, o atendimento segue para o agendamento.",
    image: "/images/portfolio/leao-aguia-braco.webp",
  },
  {
    n: "05",
    title: "Tatuagem",
    text: "O projeto ganha vida na pele.",
    image: "/images/portfolio/palhaco-perna.webp",
  },
  {
    n: "06",
    title: "Cuidados",
    text: "Após o procedimento, o cliente recebe as orientações necessárias.",
    image: "/images/portfolio/querubim-dinheiro.webp",
  },
];

/* -------------------------------------------------------------- CUIDADOS --- */
/**
 * CUIDADOS COM A TATUAGEM  (aftercareConfig + aftercareData)
 * ----------------------------------------------------------------------------
 * Conteúdo GERAL e seguro — não é diagnóstico médico e não inventa
 * recomendações específicas, produtos ou medicamentos. O Marcus pode revisar
 * e substituir por suas próprias orientações.
 *
 * ESTRUTURA REUTILIZÁVEL: `aftercareData` é uma lista serializável (id, title,
 * description, items). No futuro, o atendimento 24h pode consumir esses mesmos
 * dados para responder perguntas básicas sobre cuidados — sem duplicar texto.
 *
 * `kind`:
 *   "default" — bloco normal
 *   "note"    — bloco com aviso em destaque (ex.: cicatrização)
 *   "alert"   — bloco discreto de "quando procurar orientação"
 */
export const aftercareConfig = {
  title: "Cuidados com sua tatuagem.",
  intro:
    "Orientações gerais para você chegar preparado e cuidar bem do resultado. As instruções específicas do seu caso são passadas pelo tatuador na sessão.",
};

export type AftercareBlock = {
  id: string;
  n: string;
  title: string;
  description?: string;
  items: string[];
  image?: string;
  kind?: "default" | "note" | "alert";
};

export const aftercareData: AftercareBlock[] = [
  {
    id: "antes",
    n: "01",
    title: "Antes da tatuagem",
    description: "Chegar bem preparado ajuda na sessão e no resultado.",
    items: [
      "Durma bem na noite anterior.",
      "Alimente-se antes da sessão.",
      "Mantenha-se hidratado nos dias que antecedem.",
      "Evite bebida alcoólica nas horas anteriores.",
      "Use roupas confortáveis que dêem acesso à região.",
      "Informe o tatuador sobre qualquer questão de saúde relevante.",
    ],
    image: "/images/portfolio/anjo-dinheiro-antebraco.webp",
  },
  {
    id: "no-dia",
    n: "02",
    title: "No dia da sessão",
    items: [
      "Chegue no horário combinado.",
      "Leve referências quando fizer sentido.",
      "Comunique qualquer desconforto ou dúvida durante a sessão.",
      "Siga as orientações do tatuador.",
    ],
  },
  {
    id: "apos",
    n: "03",
    title: "Após a tatuagem",
    description: "Orientações gerais — siga sempre o que o tatuador indicar para o seu caso.",
    items: [
      "Mantenha a área higienizada conforme orientado.",
      "Proteja a região recém-tatuada.",
      "Evite exposição solar direta no período recomendado.",
      "Evite mar, piscina e atividades intensas pelo tempo indicado pelo profissional.",
      "Use apenas os produtos recomendados pelo tatuador.",
    ],
    image: "/images/portfolio/querubim-dinheiro.webp",
  },
  {
    id: "cicatrizacao",
    n: "04",
    title: "Cicatrização",
    description:
      "O tempo e o processo de cicatrização variam de pessoa para pessoa. Orientações específicas serão fornecidas após o procedimento.",
    items: [
      "Cada pele reage no seu próprio tempo.",
      "Siga as orientações fornecidas na sua sessão.",
    ],
    kind: "note",
  },
  {
    id: "orientacao",
    n: "05",
    title: "Quando procurar orientação",
    description:
      "Diante de qualquer sinal que gere preocupação ou dúvida sobre a cicatrização, procure a orientação de um profissional de saúde.",
    items: [],
    kind: "alert",
  },
];

/* ------------------------------------------------------------------ FAQ --- */
/** Respostas neutras — sem inventar preços, prazos ou políticas comerciais. */
export const faq = [
  {
    q: "Como funciona o orçamento?",
    a: "O orçamento é feito individualmente. Envie a ideia, referências, estilo, local do corpo e tamanho aproximado pelo WhatsApp para receber uma avaliação.",
  },
  {
    q: "Preciso enviar referência?",
    a: "Ajuda bastante. Qualquer imagem que represente a ideia, o estilo ou o clima que você quer já é um bom ponto de partida.",
  },
  {
    q: "Como funciona o agendamento?",
    a: "O studio é privado e atende somente com horário agendado. Após aprovar o projeto, combinamos a data pelo WhatsApp.",
  },
  {
    q: "Como escolho o estilo?",
    a: "Se estiver em dúvida, é só descrever a ideia. A partir dela conversamos sobre o estilo que melhor se encaixa no que você quer.",
  },
  {
    q: "Como devo me preparar?",
    a: "Durma bem, alimente-se antes e evite álcool nas 24h anteriores. Use roupa confortável que dê acesso à região.",
  },
  {
    q: "Quais cuidados devo ter depois?",
    a: "Você recebe as orientações de cicatrização ao final da sessão. Em geral: higienizar, hidratar e evitar sol, mar e piscina até cicatrizar.",
  },
  {
    q: "Onde fica o estúdio?",
    a: "No Pacaembu II, em Uberaba/MG. O endereço completo e o mapa estão na seção de localização.",
  },
];

/* ------------------------------------------------------------ FORMAÇÃO --- */
/**
 * FORMAÇÃO & APERFEIÇOAMENTO
 * ----------------------------------------------------------------------------
 * Dois níveis:
 *
 * 1) formationConfig.pillars — PILARES CONCEITUAIS (sempre exibidos). Falam da
 *    ABORDAGEM (técnica, estudo, evolução). NÃO são credenciais e não afirmam
 *    curso/instituição/data específicos. Edite os textos à vontade.
 *
 * 2) coursesData — CURSOS REAIS (só aparecem se a lista tiver itens). Enquanto
 *    estiver vazia, a linha do tempo simplesmente não é exibida — nada falso.
 *    NÃO invente título, instituição, professor, ano, prêmio ou certificado.
 */
export const formationConfig = {
  title: "Formação & Aperfeiçoamento",
  intro:
    "Por trás da arte existe técnica. O trabalho é guiado por estudo constante e busca por evolução a cada projeto.",
  closing: "A técnica evolui. A arte também.",
  pillars: [
    {
      n: "01",
      title: "Formação",
      text: "A base de todo traço: desenho, luz e sombra, composição e leitura da pele.",
    },
    {
      n: "02",
      title: "Aperfeiçoamento",
      text: "Estudo contínuo de técnica e referência para elevar cada trabalho.",
    },
    {
      n: "03",
      title: "Especialização",
      text: "Aprofundamento no que define o estúdio: black & grey, realismo e lettering.",
    },
  ],
};

/**
 * CURSOS REAIS — deixe [] até ter dados. Shape editável:
 *   { title, institution, instructor, year, description, certificate }
 * `certificate` é o caminho de uma imagem em public/images/ (opcional).
 */
export type Course = {
  title: string;
  institution?: string;
  instructor?: string;
  year?: string;
  description?: string;
  certificate?: string;
};

export const coursesData: Course[] = [];

/* ---------------------------------------------------------- DEPOIMENTOS --- */
/**
 * Deixe vazio até ter depoimentos REAIS. A seção some sozinha quando vazia.
 *   { name, photo, rating (1-5), text }
 */
export type Testimonial = {
  name: string;
  photo?: string;
  rating?: number;
  text: string;
};

export const testimonials: Testimonial[] = [];
