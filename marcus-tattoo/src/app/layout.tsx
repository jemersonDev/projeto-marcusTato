import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { artistConfig, locationConfig, seoConfig, fullAddress } from "@/config/site";

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
  metadataBase: new URL(seoConfig.siteUrl),
  title: seoConfig.title,
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: seoConfig.siteUrl,
    siteName: artistConfig.brand,
    title: seoConfig.title,
    description: seoConfig.description,
    images: [{ url: seoConfig.ogImage, width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

// JSON-LD — SEO local. Só inclui campos com dados reais.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  name: locationConfig.name,
  description: seoConfig.description,
  image: `${seoConfig.siteUrl}${seoConfig.ogImage}`,
  url: seoConfig.siteUrl,
  sameAs: [artistConfig.instagramUrl],
  address: {
    "@type": "PostalAddress",
    streetAddress: locationConfig.street,
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
