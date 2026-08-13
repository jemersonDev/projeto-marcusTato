/**
 * GALERIA CINEMATOGRÁFICA  (cinematicGalleryData)
 * ----------------------------------------------------------------------------
 * Esta NÃO é o portfólio. É uma CURADORIA — uma sequência narrativa dos
 * trabalhos mais fortes, pensada como uma "caminhada por uma exposição".
 * Por isso ela mostra poucos trabalhos escolhidos, não todos.
 *
 * PARA ALTERAR AS IMAGENS:
 *   - troque `image` (foto real em public/images/portfolio/);
 *   - informe `width`/`height` REAIS (mantêm a proporção, sem distorcer);
 *   - `layout` define o posicionamento na narrativa:
 *       "right"   → imagem à direita, legenda à esquerda
 *       "left"    → imagem à esquerda, legenda à direita
 *       "feature" → OBRA PRINCIPAL, quase tela cheia, cresce no scroll
 *       "full"    → imagem em largura total (boa para horizontais)
 *   - `style` é só o rótulo exibido (ex.: "Realismo").
 */

export type CinematicItem = {
  id: string;
  image: string;
  width: number;
  height: number;
  title: string;
  style: string;
  layout: "left" | "right" | "feature" | "full";
};

export const cinematicGalleryData: CinematicItem[] = [
  {
    id: "cine-palhaco",
    image: "/images/portfolio/palhaco-perna.webp",
    width: 798,
    height: 867,
    title: "Palhaço",
    style: "Realismo",
    layout: "right",
  },
  {
    id: "cine-leao",
    image: "/images/portfolio/leao-aguia-braco.webp",
    width: 482,
    height: 868,
    title: "Leão e águia",
    style: "Realismo",
    layout: "left",
  },
  {
    id: "cine-querubim",
    image: "/images/portfolio/querubim-dinheiro.webp",
    width: 698,
    height: 870,
    title: "Querubim",
    style: "Black & Grey",
    layout: "feature", // OBRA PRINCIPAL
  },
  {
    id: "cine-buda",
    image: "/images/portfolio/buda-braco.webp",
    width: 626,
    height: 862,
    title: "Buda",
    style: "Realismo",
    layout: "right",
  },
  {
    id: "cine-lettering",
    image: "/images/portfolio/lettering-pescoco.webp",
    width: 495,
    height: 861,
    title: "Lettering no pescoço",
    style: "Lettering",
    layout: "left",
  },
  {
    id: "cine-peito",
    image: "/images/portfolio/peito-favela.webp",
    width: 644,
    height: 860,
    title: "Composição no peito",
    style: "Black & Grey",
    layout: "full",
  },
];
