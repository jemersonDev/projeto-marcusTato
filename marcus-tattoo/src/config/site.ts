/**
 * CONFIGURAÇÃO CENTRAL DO SITE
 * ----------------------------------------------------------------------------
 * Este é o ÚNICO lugar onde você edita as informações da marca, contato e
 * localização. Nada aqui deve ser inventado — preencha apenas dados reais.
 * Campos vazios ("") são tratados pelo site como "ainda não informado" e a
 * interface se adapta (esconde botões, oculta seções, etc.).
 */

export const artistConfig = {
  name: "Marcus Henrique",
  brand: "Marcus tattoo.Ink",
  roles: ["Tatuador", "Desenhista", "Artista"],
  tagline: "Arte que permanece na pele.",
  subtitle: "Tatuagem autoral, técnica e identidade em cada detalhe.",
  instagram: "@marcustattoo.ink",
  instagramUrl: "https://instagram.com/marcustattoo.ink",
};

/**
 * CONTATO
 * whatsapp: apenas números, com DDI e DDD, sem espaços nem símbolos.
 *   Ex.: "5534997689784". Deixe "" se não quiser exibir o botão de WhatsApp.
 * phone / email: opcionais. Deixe "" para ocultar.
 */
export const contactConfig = {
  whatsapp: "5534997689784", // extraído do link público do Instagram do Marcus
  phone: "",
  email: "",
};

/**
 * LOCALIZAÇÃO
 * Endereço oficial fornecido pelo cliente. Não espalhe o endereço pelo código:
 * tudo que precisa mudar está aqui.
 */
export const locationConfig = {
  name: "Marcus tattoo.Ink",
  street: "Rua Francisca Raimunda Gomes, 716",
  reference: "Esquina com Avenida Ramid Mauad, 209",
  neighborhood: "Pacaembu II",
  city: "Uberaba",
  state: "MG",
  country: "Brasil",
  // Studio privado, somente horário agendado (conforme bio do Instagram).
  note: "Studio privado • Somente com horário agendado",
};

/** Endereço em uma linha, montado a partir do locationConfig. */
export const fullAddress = [
  locationConfig.street,
  locationConfig.reference,
  locationConfig.neighborhood,
  `${locationConfig.city} — ${locationConfig.state}`,
].join(", ");

/**
 * URL do Google Maps montada a partir do endereço real (busca por texto).
 * Não usamos latitude/longitude inventadas. Se você tiver as coordenadas
 * corretas do studio, pode trocar por uma URL de coordenadas depois.
 */
export const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${locationConfig.name}, ${locationConfig.street}, ${locationConfig.neighborhood}, ${locationConfig.city}, ${locationConfig.state}`
)}`;

/** Link "Como chegar" (rota) no Google Maps. */
export const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${locationConfig.street}, ${locationConfig.neighborhood}, ${locationConfig.city}, ${locationConfig.state}`
)}`;

/** SEO / metadata. Troque siteUrl pelo domínio real quando publicar. */
/**
 * CONFIGURAÇÃO CENTRAL DE SEO/SITE  (siteConfig)
 * ----------------------------------------------------------------------------
 * `url` é a ÚNICA fonte do domínio do site — usado em metadata, canonical,
 * Open Graph, Twitter Card, JSON-LD, sitemap.xml e robots.txt (todos lêem
 * daqui). Para trocar o domínio quando a Hostinger estiver configurada,
 * troque APENAS este valor.
 */
export const siteConfig = {
  url: "https://marcustattoo.ink", // TODO: confirmar domínio final na Hostinger
  title: "Marcus Tattoo | Tatuagem em Uberaba - MG",
  // Contém naturalmente: Marcus Tattoo, tatuagem, Uberaba, Minas Gerais,
  // tatuador, atendimento, orçamento — sem repetição forçada (keyword stuffing).
  description:
    "Marcus Tattoo: estúdio de tatuagem autoral em Uberaba, Minas Gerais. Tatuador especializado em realismo e black & grey. Solicite seu orçamento e agende o atendimento.",
  ogImage: "/images/og.jpg", // adicione uma imagem 1200x630 em public/images/
  keywords: [
    "tatuagem Uberaba",
    "tatuador Uberaba",
    "realismo black and grey",
    "lettering",
    "Marcus Tattoo",
    "estúdio de tatuagem Uberaba MG",
  ],
};

/**
 * REDES SOCIAIS  (socialConfig)
 * ----------------------------------------------------------------------------
 * Reaproveita artistConfig — não duplica a URL do Instagram. Adicione outras
 * redes SOMENTE quando o Marcus fornecer (ex.: youtube, tiktok, facebook).
 * Nunca inventar um perfil que não foi confirmado.
 */
export const socialConfig = {
  instagram: artistConfig.instagramUrl,
};

/**
 * LEGAL / RODAPÉ
 * ----------------------------------------------------------------------------
 * Texto de copyright editável. `privacyPolicyUrl` fica null até existir uma
 * página real — nesse caso o Footer não exibe o link (não inventa texto
 * jurídico nem aponta para uma página que não existe).
 */
export const legalConfig = {
  copyright: `© ${new Date().getFullYear()} ${artistConfig.brand}. Todos os direitos reservados.`,
  privacyPolicyUrl: null as string | null,
};
