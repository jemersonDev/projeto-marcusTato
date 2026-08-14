import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Necessário para o export estático (output: "export").
export const dynamic = "force-static";

/**
 * Sitemap gerado a partir de siteConfig.url — nenhuma URL fixa duplicada
 * pelo projeto. Este é um site de página única (âncoras internas, não rotas
 * separadas), então o sitemap lista apenas a URL real que existe: a raiz.
 * Não inventamos URLs de subpáginas que não existem.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
