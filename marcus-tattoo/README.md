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

---

## Sobre + Especialidades

Componentes:
- src/sections/About.tsx — seção "Sobre" (editorial assimétrica)
- src/sections/Specialties.tsx — especialidades (hover interativo no desktop,
  cards editoriais no mobile)

### Como alterar os dados do Marcus (Sobre)
Edite `aboutConfig` em src/data/content.ts:
- paragraphs: a trajetoria/experiencia (escreva livremente)
- philosophy: frase-conceito em destaque (ou "" para esconder)
- vision: frase opcional (vazio = nao aparece)
- stats: SOMENTE dados reais, ex.: [{ value: "10", label: "anos tatuando" }].
  Deixe [] para nao mostrar nada. Nunca invente numeros.
- image: foto do artista. Coloque a real em public/images/artist/ e aponte aqui.
Nome, funcoes e marca vem de `artistConfig` (src/config/site.ts).

### Como adicionar/remover especialidades
Edite `specialties` em src/data/specialties.ts. Cada item:
  { id, name, description, image }  (image = foto real do portfolio)
So liste estilos CONFIRMADOS. No fim do arquivo ha um catalogo comentado
(Portrait, Fine Line, Fechamento, Personagens, Oriental, Old School) — quando
o Marcus confirmar, descomente e aponte uma imagem. Se a lista ficar vazia, a
secao inteira some.

### Interacao
- Desktop: passar o mouse sobre um estilo troca a imagem (cross-fade GSAP),
  destaca o texto e revela a descricao; painel com parallax sutil.
- Mobile: cards verticais com image-reveal (clip-path) e stagger no scroll.
- Respeita prefers-reduced-motion.

---

## Galeria Cinematográfica (narrativa visual)

NÃO é um segundo portfólio. O portfólio é grade/exploração; esta é uma
narrativa curada em scroll (poucas obras, ritmo editorial, obra principal).

Componentes:
- src/sections/CinematicGallery.tsx — orquestra a narrativa
- src/components/gallery/GalleryItem.tsx — bloco assimétrico (left/right/full)
- src/components/gallery/GalleryFeature.tsx — a OBRA PRINCIPAL (quase tela cheia)
- src/components/gallery/GalleryReveal.tsx — wrapper de reveal (clip-path)
- src/hooks/useParallax.ts — parallax reutilizavel (scrub)

### Como alterar as imagens
Edite `cinematicGalleryData` em src/data/cinematic.ts. Cada item:
  { id, image, width, height, title, style, layout }
- image: foto real em public/images/portfolio/
- width/height: dimensoes REAIS (mantem proporcao, sem distorcer)
- layout: "right" | "left" | "feature" | "full"
    right/left = imagem de um lado, legenda do outro
    feature    = obra principal, quase tela cheia, cresce no scroll
    full       = largura total (bom para horizontais)
- style: rotulo exibido (ex.: "Realismo")
Para trocar qual e a obra principal, mude o `layout` de um item para "feature".

### Animacoes e acessibilidade
- reveal por clip-path, scale no feature, parallax sutil, stagger, hover leve no desktop
- mobile nao depende de hover (tudo por scroll)
- respeita prefers-reduced-motion: imagens continuam visiveis e a secao funciona
- next/image com lazy loading (imagens nao carregam todas de uma vez)

---

## Processo de Atendimento

Componentes:
- src/sections/Process.tsx — jornada (painel fixo no desktop, sequencia no mobile)
- src/components/process/ProcessStep.tsx — uma etapa (variant desktop/mobile)

### Como alterar as etapas
Edite em src/data/content.ts:
- processConfig: title, subtitle, ctaLabel, ctaButton
- processData: lista de etapas { n, title, text, image }
  - text: editavel livremente (NAO invente pagamento, sinal, prazo, disponibilidade)
  - image: foto real em public/images/portfolio/
Adicionar/remover etapa = adicionar/remover item no array (a linha de progresso
e a contagem se ajustam sozinhas).

### Comportamento
- Desktop: painel de imagem FIXO (sticky) que troca conforme a etapa ativa,
  numero grande, linha de progresso que enche, etapa ativa destacada.
  (A secao NAO usa overflow-hidden — isso quebraria o position:sticky.)
- Mobile: sequencia vertical com trilha continua, numero, imagem e texto por etapa.
- CTA final "INICIAR ATENDIMENTO" abre o WhatsApp (pode ser repontado para o
  fluxo de orcamento quando ele existir — veja o comentario em Process.tsx).
- Respeita prefers-reduced-motion (conteudo visivel, sem depender de animacao).

---

## Formação & Aperfeiçoamento

Componentes:
- src/sections/Formation.tsx — orquestra pilares + linha do tempo + mensagem final
- src/components/formation/FormationPillars.tsx — 3 pilares conceituais (linha desenhada, numeros entrando)
- src/components/formation/CourseTimeline.tsx — linha do tempo de cursos REAIS (so aparece se houver dados)

### Dois niveis (importante)
1. formationConfig.pillars (em src/data/content.ts): pilares CONCEITUAIS sempre
   visiveis (Formacao/Aperfeicoamento/Especializacao). Falam da abordagem, NAO
   sao credenciais — pode editar os textos.
2. coursesData (em src/data/content.ts): cursos REAIS. Enquanto a lista estiver
   vazia ([]), a linha do tempo NAO aparece (nada falso no site).

### Como adicionar um novo curso
Edite `coursesData` em src/data/content.ts e adicione um objeto:
  {
    title: "Nome do curso",
    institution: "Instituicao",   // opcional
    instructor: "Professor",       // opcional
    year: "2024",                  // opcional
    description: "O que foi o curso", // opcional
    certificate: "/images/cert-xyz.jpg" // opcional (imagem em public/images/)
  }
Assim que houver ao menos 1 item, a linha do tempo interativa aparece sozinha
(underline animado, selecao revela descricao e certificado). NAO invente dados.

### Auditoria
- overflow 0 em todos os breakpoints (corrigido: titulos display agora quebram/
  hifenizam palavras longas como "APERFEICOAMENTO" via overflow-wrap + hyphens).
- respeita prefers-reduced-motion (linhas e numeros ficam visiveis sem animar).

---

## Cuidados com a Tatuagem

Componentes:
- src/sections/Aftercare.tsx — orquestra os blocos + linha de progresso (scroll)
- src/components/aftercare/AftercareBlock.tsx — um bloco (default/note/alert)

### Como alterar as orientacoes
Edite em src/data/content.ts:
- aftercareConfig: title, intro
- aftercareData: lista de blocos { id, n, title, description?, items[], image?, kind? }
  - kind: "default" | "note" (destaque suave) | "alert" (discreto)
  - items: orientacoes gerais (uma por linha)
  - image: foto real do portfolio (acento visual, opcional)
Regras: conteudo GERAL e seguro. NAO invente recomendacoes especificas,
produtos, medicamentos ou diagnosticos. O bloco de cicatrizacao ja traz a frase
"Orientacoes especificas serao fornecidas apos o procedimento". O bloco de
alerta e discreto e apenas orienta procurar um profissional de saude.

### Reuso pelo atendimento 24h (futuro)
aftercareData e uma lista serializavel (id/title/items). O sistema de
atendimento 24h podera consumir esses mesmos dados para responder perguntas
basicas sobre cuidados — sem duplicar texto. (Integracao nao feita agora.)

### Auditoria
- overflow 0 em todos os breakpoints; reduced-motion mantem tudo visivel.
- hierarquia semantica (h2/h3/ul/li); imagens de acento com alt vazio (decorativas).
