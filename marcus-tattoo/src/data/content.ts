/**
 * CONTEÚDO EDITORIAL DO SITE
 * ----------------------------------------------------------------------------
 * Especialidades, processo, cuidados, FAQ, formação e depoimentos.
 * Regra de ouro: NÃO invente dados. Deixe listas vazias ([]) quando ainda
 * não houver informação real — o site esconde automaticamente as seções vazias.
 */

/* ---------------------------------------------------------------- SOBRE --- */
export const aboutConfig = {
  title: "Mais que uma tatuagem.",
  // Preencha com a trajetória real do Marcus. Deixado curto e neutro de
  // propósito — sem anos de experiência ou histórias inventadas.
  paragraphs: [
    "Marcus Henrique é tatuador e desenhista à frente do estúdio Marcus Tattoo, em Uberaba (MG).",
    "O trabalho é autoral e feito em studio privado, com atendimento somente por horário agendado. Cada projeto nasce de uma conversa e é desenhado sob medida para a pessoa e o local do corpo.",
  ],
  // Frase de filosofia — edite ou apague.
  philosophy: "Transformando a pele em arte.",
  image: "/images/artist/placeholder-artist.svg",
};

/* ------------------------------------------------------- ESPECIALIDADES --- */
/**
 * Só liste estilos que o Marcus realmente faz. Os estilos abaixo foram
 * inferidos do portfólio público do Instagram (realismo, black & grey,
 * lettering). Adicione/remova conforme confirmação dele.
 */
export type Specialty = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export const specialties: Specialty[] = [
  {
    id: "realismo",
    name: "Realismo",
    description:
      "Retratos, personagens e composições com profundidade e volume, trabalhados em preto e cinza.",
    image: "/images/portfolio/placeholder-02.svg",
  },
  {
    id: "black-grey",
    name: "Black & Grey",
    description:
      "Fechamentos e composições em tons de cinza, com contraste marcado e degradês suaves.",
    image: "/images/portfolio/placeholder-01.svg",
  },
  {
    id: "lettering",
    name: "Lettering",
    description:
      "Escritas autorais e caligrafia com estilo próprio, do delicado ao encorpado.",
    image: "/images/portfolio/placeholder-03.svg",
  },
];

/* -------------------------------------------------------------- PROCESSO --- */
export const processSteps = [
  {
    n: "01",
    title: "Conversa",
    text: "Você conta a ideia pelo WhatsApp e alinhamos referências, estilo e local do corpo.",
  },
  {
    n: "02",
    title: "Ideia",
    text: "Refinamos o conceito juntos — tamanho, composição e o que faz sentido para a pele.",
  },
  {
    n: "03",
    title: "Projeto",
    text: "O desenho é criado sob medida, de forma autoral, para o seu projeto.",
  },
  {
    n: "04",
    title: "Agendamento",
    text: "Com o projeto aprovado, reservamos a data e o horário no studio privado.",
  },
  {
    n: "05",
    title: "Tatuagem",
    text: "A sessão acontece com todo o cuidado técnico e de higiene.",
  },
  {
    n: "06",
    title: "Cuidados",
    text: "Você recebe as orientações de cicatrização para o resultado durar.",
  },
];

/* -------------------------------------------------------------- CUIDADOS --- */
/**
 * Orientações GERAIS e seguras — não é diagnóstico médico. O Marcus pode
 * substituir por suas próprias orientações.
 */
export const aftercare = {
  antes: [
    "Durma bem e alimente-se antes da sessão.",
    "Evite bebida alcoólica nas 24h anteriores.",
    "Use roupas confortáveis que dêem acesso à região a ser tatuada.",
  ],
  durante: [
    "O local é higienizado e todo material é descartável e individual.",
    "Avise sempre que precisar de uma pausa — o conforto faz parte do processo.",
  ],
  depois: [
    "Siga as orientações de higienização e hidratação passadas na sessão.",
    "Evite sol direto, mar, piscina e academia até a pele cicatrizar.",
    "Não coce nem retire as casquinhas; deixe a cicatrização acontecer naturalmente.",
    "Em caso de qualquer dúvida durante a cicatrização, fale com o Marcus.",
  ],
};

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
 * Deixe vazio até ter dados reais. NÃO invente cursos, instituições ou
 * certificados. Estrutura pronta para preencher:
 *   { course, institution, teacher, year, description, certificate }
 */
export type Course = {
  course: string;
  institution?: string;
  teacher?: string;
  year?: string;
  description?: string;
  certificate?: string;
};

export const courses: Course[] = [];

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
