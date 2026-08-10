/**
 * PORTFÓLIO
 * ----------------------------------------------------------------------------
 * Controla TODA a galeria: categorias (filtros) e trabalhos.
 * A classificação de cada tatuagem é MANUAL — definida aqui, não adivinhada.
 *
 * PARA ADICIONAR UMA TATUAGEM:
 *   1. Coloque a imagem em public/images/portfolio/ (.webp, ~1200px de largura).
 *   2. Adicione um objeto em `portfolio` abaixo.
 *   3. Informe `width` e `height` = as DIMENSÕES REAIS da foto em pixels.
 *      É delas que nasce a proporção na galeria (vertical fica vertical, etc.).
 *   4. Marque `featured: true` para o trabalho ocupar mais espaço na composição.
 *
 * As 9 fotos abaixo são trabalhos REAIS do Marcus (fornecidos por ele).
 * NOTA sobre o campo `style`: quase tudo do Marcus é black & grey. Classifiquei
 * pelo caráter dominante de cada peça — "realismo" para retratos/figuras com
 * profundidade fotográfica, "black-grey" para as composições mais gráficas, e
 * "lettering" para a escrita. Se você discordar de alguma, é só trocar o
 * `style` (uma linha). Categorias sem trabalho não aparecem como filtro.
 */

export type CategoryId =
  | "todos"
  | "realismo"
  | "black-grey"
  | "lettering"
  | "portrait"
  | "outros";

export type PortfolioItem = {
  id: string;
  image: string;
  width: number;
  height: number;
  title: string;
  style: Exclude<CategoryId, "todos">;
  description?: string;
  bodyArea?: string;
  featured?: boolean;
};

export const portfolioFilters: { id: CategoryId; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "realismo", label: "Realismo" },
  { id: "black-grey", label: "Black & Grey" },
  { id: "lettering", label: "Lettering" },
  { id: "portrait", label: "Portrait" },
  { id: "outros", label: "Outros" },
];

export const portfolio: PortfolioItem[] = [
  {
    id: "palhaco-perna",
    image: "/images/portfolio/palhaco-perna.webp",
    width: 798,
    height: 867,
    title: "Palhaço",
    style: "realismo",
    bodyArea: "Perna",
    featured: true,
  },
  {
    id: "mascaras-perna",
    image: "/images/portfolio/mascaras-perna.webp",
    width: 662,
    height: 865,
    title: "Máscaras",
    style: "black-grey",
    bodyArea: "Perna",
  },
  {
    id: "buda-braco",
    image: "/images/portfolio/buda-braco.webp",
    width: 626,
    height: 862,
    title: "Buda",
    style: "realismo",
    bodyArea: "Braço",
    featured: true,
  },
  {
    id: "mascaras-antebraco",
    image: "/images/portfolio/mascaras-antebraco.webp",
    width: 484,
    height: 868,
    title: "Máscaras do teatro",
    style: "realismo",
    bodyArea: "Antebraço",
  },
  {
    id: "peito-favela",
    image: "/images/portfolio/peito-favela.webp",
    width: 644,
    height: 860,
    title: "Composição no peito",
    style: "black-grey",
    bodyArea: "Peito",
  },
  {
    id: "leao-aguia-braco",
    image: "/images/portfolio/leao-aguia-braco.webp",
    width: 482,
    height: 868,
    title: "Leão e águia",
    style: "realismo",
    bodyArea: "Braço (fechamento)",
  },
  {
    id: "anjo-dinheiro-antebraco",
    image: "/images/portfolio/anjo-dinheiro-antebraco.webp",
    width: 819,
    height: 874,
    title: "Anjo",
    style: "realismo",
    bodyArea: "Antebraço",
  },
  {
    id: "querubim-dinheiro",
    image: "/images/portfolio/querubim-dinheiro.webp",
    width: 698,
    height: 870,
    title: "Querubim",
    style: "realismo",
    bodyArea: "Braço",
    featured: true,
  },
  {
    id: "lettering-pescoco",
    image: "/images/portfolio/lettering-pescoco.webp",
    width: 495,
    height: 861,
    title: "Lettering no pescoço",
    style: "lettering",
    bodyArea: "Pescoço",
  },
];
