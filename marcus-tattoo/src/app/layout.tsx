import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { artistConfig, locationConfig, siteConfig } from "@/config/site";

// Display: Oswald (condensada, editorial, forte). Body: Inter (limpa).
const display = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    siteName: artistConfig.brand,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

/**
 * JSON-LD — SEO local (Schema.org). Só campos com dados REAIS e confirmados:
 * nome, endereço e descrição do estúdio. NUNCA telefone, horário, avaliações,
 * preços ou coordenadas que não foram fornecidos pelo Marcus.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  name: locationConfig.name,
  description: siteConfig.description,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  url: siteConfig.url,
  sameAs: [artistConfig.instagramUrl],
  address: {
    "@type": "PostalAddress",
    streetAddress: `${locationConfig.street}, ${locationConfig.reference}`,
    addressLocality: locationConfig.city,
    addressRegion: locationConfig.state,
    addressCountry: "BR",
  },
  areaServed: `${locationConfig.city} e região`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
