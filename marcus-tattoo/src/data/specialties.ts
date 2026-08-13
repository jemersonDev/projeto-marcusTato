/**
 * ESPECIALIDADES  (specialtiesData)
 * ----------------------------------------------------------------------------
 * Estilos que o Marcus REALMENTE trabalha. Só listamos os confirmados pelo
 * portfólio: Realismo, Black & Grey e Lettering. NÃO afirmamos estilos não
 * confirmados.
 *
 * PARA ADICIONAR/REMOVER uma especialidade:
 *   - adicione (ou remova) um objeto na lista `specialties` abaixo;
 *   - `image` deve apontar para uma foto real em public/images/portfolio/.
 *
 * Abaixo da lista há um CATÁLOGO comentado com outros estilos possíveis
 * (Portrait, Fine Line, Fechamento, Personagens, Oriental, Old School). Quando
 * o Marcus confirmar que faz algum deles, é só descomentar/copiar para a lista
 * e apontar uma imagem real.
 */

export type Specialty = {
  id: string;
  name: string;
  description: string;
  image: string; // foto real do portfólio
};

export const specialties: Specialty[] = [
  {
    id: "realismo",
    name: "Realismo",
    description:
      "Retratos e figuras com profundidade e volume — luz, sombra e textura trabalhadas em preto e cinza.",
    image: "/images/portfolio/buda-braco.webp",
  },
  {
    id: "black-grey",
    name: "Black & Grey",
    description:
      "Composições em tons de cinza, com contraste marcado e degradês suaves — o traço que define o estilo do estúdio.",
    image: "/images/portfolio/peito-favela.webp",
  },
  {
    id: "lettering",
    name: "Lettering",
    description:
      "Escrita autoral e caligrafia com estilo próprio, do delicado ao encorpado.",
    image: "/images/portfolio/lettering-pescoco.webp",
  },
];

/**
 * CATÁLOGO DE ESTILOS POSSÍVEIS (não confirmados — não exibidos).
 * Descomente e mova para `specialties` apenas o que for confirmado.
 *
 * { id: "portrait",    name: "Portrait",    description: "...", image: "/images/portfolio/SEU-ARQUIVO.webp" },
 * { id: "fine-line",   name: "Fine Line",   description: "...", image: "..." },
 * { id: "fechamento",  name: "Fechamento",  description: "...", image: "..." },
 * { id: "personagens", name: "Personagens", description: "...", image: "..." },
 * { id: "oriental",    name: "Oriental",    description: "...", image: "..." },
 * { id: "old-school",  name: "Old School",  description: "...", image: "..." },
 */
