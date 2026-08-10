# Marcus Tattoo — Website

Site oficial do estúdio Marcus Tattoo (Uberaba/MG). Next.js + TypeScript +
Tailwind CSS 4 + GSAP/ScrollTrigger + Lenis. Exporta site estático pronto para
a Hostinger.

> **Status:** fundação completa e funcional (config editável, design system,
> preloader, header, hero, smooth scroll, SEO/JSON-LD, deploy pronto).
> As demais seções entram em `src/sections/` seguindo a ordem já mapeada em
> `src/app/page.tsx`.

---

## 1. Estrutura do projeto

    src/
      app/          layout (SEO, fontes, JSON-LD), page (monta seções), globals.css (design system)
      components/   Preloader, Header, SmoothScroll
      sections/     Hero
      hooks/        useScrollReveal, useImageReveal
      lib/          whatsapp.ts
      config/       site.ts  <- MARCA, CONTATO, LOCALIZACAO, SEO
      data/         portfolio.ts, content.ts  <- conteudo editavel
    public/
      images/       logo.png, portfolio/, hero/, artist/
      .htaccess     config Apache/Hostinger
      robots.txt

## 2. Tecnologias

- Next.js 16 (App Router, output: "export" -> site 100% estatico)
- TypeScript
- Tailwind CSS 4
- GSAP + ScrollTrigger (animacoes e scroll reveals)
- Lenis (smooth scroll, sincronizado ao ScrollTrigger)
- next/font (Oswald para titulos, Inter para textos)

## 3. Como instalar

    npm install

## 4. Como executar (desenvolvimento)

    npm run dev

Abra http://localhost:3000

## 5. Como adicionar tatuagens

1. Coloque a imagem em public/images/portfolio/ (JPG ou WebP, ~1200px de largura).
2. Em src/data/portfolio.ts adicione um item:

    {
      id: "trabalho-09",
      image: "/images/portfolio/minha-tattoo.jpg",
      title: "Fechamento de braco",
      style: "black-grey",   // realismo | black-grey | lettering | outros
      bodyArea: "Braco",
      featured: true,
    }

## 6. Como adicionar cursos (formacao)

Em src/data/content.ts preencha o array `courses` (deixe [] se nao houver — a secao some sozinha).

## 7. Como alterar o endereco

Somente em src/config/site.ts -> objeto locationConfig. Endereco em uma linha,
URL do Google Maps e JSON-LD se atualizam sozinhos.

## 8. Como alterar o WhatsApp

src/config/site.ts -> contactConfig.whatsapp. Apenas numeros com DDI+DDD
(ex.: "5534997689784"). Deixe "" para esconder os botoes de WhatsApp.

## 9. Como alterar outras informacoes

- Marca, tagline, Instagram: artistConfig em src/config/site.ts
- Sobre, especialidades, processo, cuidados, FAQ: src/data/content.ts
- SEO (titulo, descricao, dominio): seoConfig em src/config/site.ts

Regra do projeto: nunca inventar dados. Campos vazios ("" ou []) sao tratados
como "nao informado" e a interface se adapta.

## 10. Como fazer build

    npm run build

Gera a pasta out/ com o site estatico completo.

## 11. Como publicar na Hostinger

1. Rode npm run build.
2. Abra a pasta out/.
3. No hPanel da Hostinger -> Gerenciador de Arquivos -> pasta public_html.
4. Envie TODO o conteudo de dentro de out/ para public_html (inclusive o .htaccess).
   Nao envie a pasta out em si, e sim o que esta dentro dela.
5. Confirme que o dominio aponta para a Hostinger e acesse o site.

Alternativa: FTP (FileZilla) para public_html.

---

### Observacoes

- No modo estatico o next/image nao otimiza em runtime — comprima as imagens antes de subir.
- Antes de publicar, troque seoConfig.siteUrl pelo dominio final e adicione
  public/images/og.jpg (1200x630) para compartilhamento.
- As fontes vem do Google Fonts no build — precisa de internet ao buildar.

---

## Portfolio + Lightbox (galeria)

Componentes (em src/components/portfolio/):
- PortfolioSection (src/sections/Portfolio.tsx) — orquestra filtros, grid e lightbox
- PortfolioFilters — filtros; so mostra categorias que tem trabalho
- PortfolioGrid — masonry editorial (CSS columns) + animacoes GSAP
- PortfolioCard — card com hover premium e reveal
- PortfolioLightbox — modal com teclado, swipe, contador, scroll lock

### Como classificar uma tatuagem
Cada item em src/data/portfolio.ts tem um campo `style`. Use um dos ids de
`portfolioFilters` (menos "todos"): realismo, black-grey, lettering, portrait, outros.
A classificacao e MANUAL — nada e adivinhado pelo codigo. O que nao encaixar
nos estilos vai em "outros".

### Como marcar como destaque (featured)
Adicione `featured: true` ao item. Featured ganha formato mais alto no masonry,
o selo "Destaque" e um parallax sutil. Sem featured, o card usa proporcao
variada automatica (so estetica; nao muda a categoria).

### Como funciona o Lightbox
Clique em qualquer trabalho para abrir. Controles:
- ESC fecha | seta esquerda/direita navega | swipe no celular
- contador 01 / NN (dentro do filtro ativo)
- botoes anterior/proximo (laterais no desktop, canto no mobile)
- fundo preto, scroll do body travado enquanto aberto, foco no botao fechar
A imagem usa object-contain: aparece inteira, sem cortar a tatuagem.

### Filtros
A lista de categorias esta em `portfolioFilters` (src/data/portfolio.ts).
"Todos" sempre aparece; as demais so aparecem quando ha ao menos 1 trabalho.
Com uma unica categoria alem de "Todos", a barra de filtros some (nao agrega nada).

### Animacoes e acessibilidade
- reveal (fade + slide + stagger) via ScrollTrigger.batch; parallax sutil nos featured
- respeita prefers-reduced-motion: sem movimento, tudo aparece normalmente
- as imagens ficam visiveis por padrao (CSS); a animacao so ESCONDE quando o
  GSAP roda — logo, sem JS as imagens continuam visiveis
- cleanup correto: cada efeito usa gsap.context e faz revert()

---

## Galeria dirigida por proporção real (importante)

A galeria NÃO força um aspect-ratio. A proporção de cada foto vem dos campos
`width` e `height` do item em src/data/portfolio.ts — as dimensões REAIS da
imagem em pixels. Consequências:
- foto vertical fica vertical, horizontal fica horizontal — sem distorção;
- object-cover só preenche a célula, que já tem a proporção da foto, então NÃO
  há corte (a menos que width/height informados não batam com a imagem);
- o masonry (grid com row-span calculado por JS) empacota as alturas variadas,
  criando o ritmo editorial a partir das proporções reais;
- `featured: true` faz o trabalho ocupar 2 colunas em telas médias/grandes,
  ganhando presença; no mobile tudo é 1 coluna e a tatuagem aparece inteira.

Ao trocar os placeholders pelas fotos reais, atualize width/height de cada uma
e o ritmo se ajusta sozinho. Sem JS, a galeria cai para um grid simples com as
proporções naturais preservadas (imagens continuam visíveis).
