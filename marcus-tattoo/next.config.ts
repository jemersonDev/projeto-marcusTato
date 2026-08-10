import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportação estática — gera a pasta /out pronta para subir na Hostinger
  // via gerenciador de arquivos ou FTP. Não exige Node no servidor.
  output: "export",

  // next/image não otimiza em runtime no modo export. Servimos as imagens
  // como estão (otimize-as antes de subir; veja README).
  images: {
    unoptimized: true,
  },

  // Gera URLs com barra final (ex.: /sobre/) — casa melhor com o Apache
  // padrão da Hostinger e evita 404 em subpáginas.
  trailingSlash: true,
};

export default nextConfig;
