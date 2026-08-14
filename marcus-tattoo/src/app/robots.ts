import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Necessário para o export estático (output: "export").
export const dynamic = "force-static";

/**
 * robots.txt gerado a partir de siteConfig.url (mesma fonte usada no
 * sitemap e na metadata). Permite indexação total; nada de assets
 * necessários (imagens, CSS, JS) fica bloqueado.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
