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
    image: "/images/portfolio/palhaco-dinheiro-panturrilha.webp",
    width: 891,
    height: 1600,
    title: "Palhaço e dinheiro",
    style: "Realismo",
    layout: "right",
  },
  {
    id: "cine-sleeve",
    image: "/images/portfolio/sleeve-mafioso-antebraco.webp",
    width: 860,
    height: 1600,
    title: "Sleeve de antebraço",
    style: "Black & Grey",
    layout: "left",
  },
  {
    id: "cine-costas",
    image: "/images/portfolio/costas-completas.webp",
    width: 989,
    height: 1600,
    title: "Costas fechadas",
    style: "Black & Grey",
    layout: "feature", // OBRA PRINCIPAL
  },
  {
    id: "cine-ceia",
    image: "/images/portfolio/ultima-ceia-braco.webp",
    width: 927,
    height: 1600,
    title: "Última Ceia",
    style: "Realismo",
    layout: "right",
  },
  {
    id: "cine-lettering",
    image: "/images/portfolio/lettering-peito.webp",
    width: 1079,
    height: 1600,
    title: "Lettering no peito",
    style: "Lettering",
    layout: "left",
  },
  {
    id: "cine-lobo",
    image: "/images/portfolio/lobo-braco.webp",
    width: 958,
    height: 1600,
    title: "Lobo na floresta",
    style: "Realismo",
    layout: "right",
  },
];
