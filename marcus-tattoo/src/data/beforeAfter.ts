/**
 * ANTES E DEPOIS  (beforeAfterData)
 * ----------------------------------------------------------------------------
 * Só trabalhos REAIS do Marcus. Lista vazia = a seção inteira some.
 *
 * PARA ADICIONAR UM PAR:
 *   1. Coloque as duas fotos em public/images/antes-depois/ (.webp).
 *   2. Adicione um objeto abaixo com as dimensões REAIS de cada foto.
 *   O "depois" pode reaproveitar uma foto que já está no portfólio.
 */

export type BeforeAfterPhoto = {
  image: string;
  width: number;
  height: number;
};

export type BeforeAfterItem = {
  id: string;
  title: string;
  bodyArea?: string;
  description?: string;
  before: BeforeAfterPhoto;
  after: BeforeAfterPhoto;
};

export const beforeAfterConfig = {
  eyebrow: "Evolução",
  title: "Antes e depois.",
  intro: "O trabalho evolui a cada sessão: mais contraste, mais profundidade, mais detalhe.",
};

export const beforeAfterData: BeforeAfterItem[] = [
  {
    id: "lobo-braco",
    title: "Lobo na floresta",
    bodyArea: "Braço",
    before: { image: "/images/antes-depois/lobo-antes.webp", width: 909, height: 1600 },
    after: { image: "/images/portfolio/lobo-braco.webp", width: 958, height: 1600 },
  },
];
