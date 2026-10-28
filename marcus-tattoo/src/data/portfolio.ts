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
 * As fotos abaixo são trabalhos REAIS do Marcus (fornecidos por ele).
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
    id: "lobo-braco",
    image: "/images/portfolio/lobo-braco.webp",
    width: 958,
    height: 1600,
    title: "Lobo na floresta",
    style: "realismo",
    bodyArea: "Braço",
    featured: true,
  },
  {
    id: "ultima-ceia-braco",
    image: "/images/portfolio/ultima-ceia-braco.webp",
    width: 927,
    height: 1600,
    title: "Última Ceia",
    style: "realismo",
    bodyArea: "Braço (fechamento)",
    featured: true,
  },
  {
    id: "costas-completas",
    image: "/images/portfolio/costas-completas.webp",
    width: 989,
    height: 1600,
    title: "Costas fechadas",
    style: "black-grey",
    bodyArea: "Costas",
    featured: true,
  },
  {
    id: "lettering-peito",
    image: "/images/portfolio/lettering-peito.webp",
    width: 1079,
    height: 1600,
    title: "Lettering no peito",
    style: "lettering",
    bodyArea: "Peito",
  },
  {
    id: "sleeve-mafioso-antebraco",
    image: "/images/portfolio/sleeve-mafioso-antebraco.webp",
    width: 860,
    height: 1600,
    title: "Sleeve de antebraço",
    style: "black-grey",
    bodyArea: "Antebraço (fechamento)",
  },
  {
    id: "coringa-antebraco",
    image: "/images/portfolio/coringa-antebraco.webp",
    width: 803,
    height: 1600,
    title: "Coringa e máscara",
    style: "realismo",
    bodyArea: "Antebraço",
  },
  {
    id: "palhaco-dinheiro-panturrilha",
    image: "/images/portfolio/palhaco-dinheiro-panturrilha.webp",
    width: 891,
    height: 1600,
    title: "Palhaço e dinheiro",
    style: "realismo",
    bodyArea: "Panturrilha",
  },
  {
    id: "palhaco-balao-antebraco",
    image: "/images/portfolio/palhaco-balao-antebraco.webp",
    width: 807,
    height: 1600,
    title: "Palhaço rasgando a pele",
    style: "realismo",
    bodyArea: "Antebraço",
  },
  {
    id: "lotus-ondas-perna",
    image: "/images/portfolio/lotus-ondas-perna.webp",
    width: 819,
    height: 1600,
    title: "Flor de lótus e ondas",
    style: "outros",
    bodyArea: "Perna",
  },
];
