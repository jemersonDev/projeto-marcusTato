/**
 * VÍDEOS + MÍDIA  (videoData)
 * ----------------------------------------------------------------------------
 * Só vídeos REAIS fornecidos pelo Marcus entram aqui. Não inventar vídeos nem
 * usar clipes aleatórios para preencher espaço. Enquanto a lista estiver
 * vazia, a seção inteira não aparece.
 *
 * PARA ADICIONAR UM VÍDEO:
 *   1. Coloque o arquivo em public/videos/ (MP4, H.264 + AAC — compatível com
 *      todos os navegadores; evite HEVC, que não roda no Chrome/Firefox/Edge).
 *   2. Gere um poster (frame de capa) em public/images/videos/ — pode ser um
 *      .webp extraído do próprio vídeo.
 *   3. Adicione um objeto abaixo. `sources` é uma lista para permitir, no
 *      futuro, adicionar uma versão .webm do MESMO vídeo sem mudar a
 *      estrutura — hoje só existe a fonte MP4 real.
 *   4. Marque `featured: true` em NO MÁXIMO um vídeo (vira o vídeo principal).
 *
 * FORMATOS: a estrutura suporta local (mp4/webm), YouTube e Instagram via o
 * campo `provider`. Hoje só há vídeos locais reais — não inventar links de
 * YouTube/Instagram até o Marcus fornecer.
 */

export type VideoSource = {
  src: string;
  type: "video/mp4" | "video/webm";
};

export type VideoItem = {
  id: string;
  title: string;
  category: string;
  /** imagem de capa exibida antes do play (obrigatória — sem thumbnail, sem autoplay pesado) */
  thumbnail: string;
  /** dimensões REAIS do poster/vídeo — mantêm a proporção correta (retrato) */
  width: number;
  height: number;
  /** "local" = arquivo em public/videos/. "youtube" | "instagram" usam `embedUrl`. */
  provider: "local" | "youtube" | "instagram";
  sources?: VideoSource[]; // usado quando provider === "local"
  embedUrl?: string; // usado quando provider === "youtube" | "instagram"
  featured?: boolean;
};

export const videoData: VideoItem[] = [
  {
    id: "detalhe-perna",
    title: "Detalhe em preto e cinza",
    category: "Detalhes",
    thumbnail: "/images/videos/detalhe-perna-poster.webp",
    width: 1080,
    height: 1920,
    provider: "local",
    sources: [{ src: "/videos/detalhe-perna.mp4", type: "video/mp4" }],
    featured: true,
  },
  {
    id: "ursos-combinando",
    title: "Tatuagens combinando",
    category: "Trabalhos",
    thumbnail: "/images/videos/ursos-combinando-poster.webp",
    width: 464,
    height: 832,
    provider: "local",
    sources: [{ src: "/videos/ursos-combinando.mp4", type: "video/mp4" }],
  },
];
