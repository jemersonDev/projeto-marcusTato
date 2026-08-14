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

---

## Atendimento 24h (Marcus Tattoo Assist)

Fluxo conversacional DETERMINISTICO (sem IA agora), pronto para IA depois.

Componentes (src/components/chat/):
- ChatAssistant.tsx — botao flutuante + painel (abrir/fechar, ESC, foco, lock mobile)
- ChatWindow.tsx — renderiza a conversa e o controle de entrada atual
- ChatMessage.tsx — bolha de mensagem
- ChatOptions.tsx — opcoes/chips
- ChatInput.tsx — campo de texto com validacao (erros elegantes, sem alert)
- ReferenceUpload.tsx — anexo de referencia client-side (valida tipo/tamanho; NAO faz upload)
- WhatsAppButton.tsx — handoff para o WhatsApp
- useAssistant.ts — maquina de estados (menu, orcamento, duvidas, agendar, marcus)
Config/dados: src/config/chat.ts (chatConfig + bookingConfig), src/lib/quoteMessage.ts
FAQ reutiliza `faq` de src/data/content.ts.

### Como alterar o numero do WhatsApp
src/config/site.ts -> contactConfig.whatsapp (so numeros, DDI+DDD). O assistente
usa esse numero para todos os handoffs. Nunca ha numero inventado.

### Como alterar as perguntas (orcamento e duvidas)
- Orcamento: src/config/chat.ts -> chatConfig.quoteSteps (array editavel).
  Cada passo: { key, label, question, type: text|tel|choice|upload, required?,
  multiline?, placeholder?, options?, dependsOn? }. label vira a linha da
  mensagem do WhatsApp. Adicionar/remover/reordenar = editar o array.
- Duvidas: usa `faq` (src/data/content.ts) + chatConfig.quickQuestions
  (Preco/Disponibilidade). Preco e disponibilidade tem respostas FIXAS e seguras
  (priceAnswer / availabilityAnswer) — nunca inventam valores nem vagas.

### Como alterar o fluxo
A logica esta em src/components/chat/useAssistant.ts (reducer). O menu inicial
esta em chatConfig.menu. Agendamento: enquanto bookingConfig.calendarEnabled for
false, encaminha para o WhatsApp (sem agenda falsa).

### Como conectar uma IA depois
Hoje as respostas sao deterministicas. Para plugar IA:
1. Crie uma rota server-side (ex.: app/api/chat/route.ts) que chame o provedor
   usando uma chave em VARIAVEL DE AMBIENTE (nunca no frontend).
2. No useAssistant, troque as respostas fixas por chamadas a essa rota
   (mantendo as regras: nunca inventar preco/horario/disponibilidade).
3. chatConfig.ai.enabled serve de flag. O restante da UI nao muda.
OBS: export estatico (Hostinger) nao roda rotas de API; a IA exigira um backend
(ex.: serverless/edge em outro provedor). A arquitetura ja isola isso.

### Auditoria (testada)
- fluxos: menu, orcamento completo, validacao (nome obrigatorio, WhatsApp),
  resumo + link wa.me com o numero real, duvidas com preco/disponibilidade seguros.
- abrir/fechar, ESC, foco no painel e retorno ao launcher.
- mobile fullscreen (100dvh, campo visivel), overflow 0 em 320/375/390/430.
- prefers-reduced-motion: abre normalmente.

---

## Localização + Google Maps

Componente: src/sections/Location.tsx

Usa 100% os dados ja existentes em src/config/site.ts (locationConfig,
fullAddress, googleMapsUrl, googleMapsDirectionsUrl) — nada duplicado, nada
inventado. Sem API key: o mapa e um IFRAME de busca por texto do Google Maps
(?q=...&output=embed) com o MESMO endereco de locationConfig. Nunca usa
latitude/longitude inventadas.

### Como alterar o endereço
Só em src/config/site.ts -> locationConfig. Endereço exibido, os 3 links
(Como chegar / Abrir no Google Maps / Falar com Marcus) e o mapa embed se
atualizam sozinhos.

### Layout
Desktop: endereço + CTAs à esquerda, mapa à direita (grid 5/7, mapa contido,
não "gigante"). Mobile: empilhado (endereço → botões → mapa responsivo).
Etiqueta "UBERABA • MG" sempre visível.

### Nota sobre o preview
O mapa (iframe do Google) não renderiza NESTE ambiente de sandbox porque a
rede aqui bloqueia www.google.com — isso é uma limitação do ambiente de
build, não do código. No navegador real do usuário final ele carrega
normalmente.

### Auditoria
overflow 0 em todos os breakpoints; todos os links verificados (endereço real,
WhatsApp real, sem coordenadas inventadas).

---

## Localização — auditoria adicional (revisão)

Correções aplicadas após reconferir contra a spec completa:
- Subtítulo "Encontre o estúdio e venha transformar sua ideia em arte." adicionado.
- aria-label descritivo em cada botão/link (Como chegar, Abrir no Google Maps,
  Falar com Marcus, Encontrar no Google).
- Endereço em tag semântica <address>.
- CTA discreto "Encontrar no Google" (consistência com Google Business Profile —
  aponta para a mesma busca do Google Maps; sem link de GBP inventado).
- iframe do mapa com title + aria-label (descrição acessível) e loading="lazy".
- Entrada dos botões em stagger individual (useScrollReveal em "[data-btn]").
- Parallax muito sutil no bloco do mapa (useParallax).
- Texto oculto (sr-only) com o endereço completo, complementar ao mapa para
  leitores de tela.

Testado: 0 erros de console, 0 overflow em 320-1920, foco por teclado chega
corretamente nos links, hydration ok.

---

## FAQ + Depoimentos

Componentes:
- src/sections/Faq.tsx — accordion + ponte "Iniciar atendimento 24h"
- src/components/faq/FAQItem.tsx — item do accordion (GSAP height, teclado, semantico)
- src/sections/Testimonials.tsx — destaque editorial + carrossel + transicao
- src/components/testimonials/TestimonialCard.tsx — card menor (carrossel)

### Como adicionar perguntas
Edite `faq` em src/data/content.ts (array de { q, a }). E' o mesmo dado usado
pelo atendimento 24h (importado la como `faq as faqData`) — editar aqui
atualiza os dois lugares. NAO inventar preco/horario/pagamento/prazo/
disponibilidade; use respostas gerais e aponte para a secao relevante do site
quando fizer sentido.

### Como adicionar depoimentos reais
Edite `testimonialsData` em src/data/content.ts:
  { name, text, date?, image?, source? }
NAO inventar nomes, textos ou avaliacoes. `image` so deve ser preenchido com
foto REAL do cliente e autorizacao de uso — sem autorizacao, deixe de fora.
A secao "Quem ja viveu a experiencia" fica OCULTA por completo enquanto a
lista estiver vazia (nao mostra nada fabricado). O primeiro item vira o
destaque editorial grande; os demais entram no carrossel (sem autoplay —
movimento so por interacao do usuario: clique, teclado com foco no carrossel,
ou swipe nativo no mobile).

### Como conectar o CTA ao atendimento 24h
Os botoes "Iniciar atendimento 24h" (FAQ) e "Comecar meu projeto" (transicao
apos depoimentos) disparam `window.dispatchEvent(new Event("marcus:open-assistant"))`
— o MESMO evento global que o ChatAssistant ja escuta (src/components/chat/ChatAssistant.tsx).
Nao ha chatbot duplicado; e' sempre a mesma instancia montada em page.tsx.

### Nota de design
A transicao "Agora e' a sua vez." + "Comecar meu projeto" aparece mesmo sem
depoimentos reais ainda — nao e' prova social, e' so um convite, entao nao
depende de dados fabricados. Mantem o funil de conversao vivo. A secao maior
"CTA final" (com imagem de fundo, estilo do Hero) e' a proxima etapa; esta e'
apenas uma ponte discreta.

### Auditoria (testada)
- accordion: clique abre/fecha, single-open (abrir uma fecha a anterior),
  navegacao por teclado (ArrowUp/ArrowDown/Home/End), aria-expanded/aria-controls.
- carrossel: botoes proximo/anterior, indicadores (dots), teclado (ArrowLeft/Right
  com foco no carrossel), swipe nativo (scroll-snap) no mobile — testado com
  dados de exemplo (revertidos antes de empacotar).
- overflow 0 em todos os breakpoints; prefers-reduced-motion mantem o accordion
  funcional (abre/fecha sem animacao); console sem erros do FAQ/Depoimentos.

---

## CTA Final + Footer

Componentes:
- src/sections/FinalCta.tsx — encerramento cinematografico (titulo em stagger,
  imagem com parallax sutil, 3 CTAs)
- src/components/footer/Footer.tsx — rodape editorial (marca, localizacao,
  links, atendimento, redes)
- src/components/footer/FooterLinks.tsx — navegacao interna (ancoras)
- src/components/footer/SocialLinks.tsx — apenas redes REAIS (socialConfig)

Config: socialConfig e legalConfig em src/config/site.ts (reaproveitam
artistConfig/locationConfig — nada duplicado).

### Como alterar redes sociais
src/config/site.ts -> socialConfig. Reaproveita artistConfig.instagramUrl (nao
duplica a URL). So adicione OUTRAS redes quando o Marcus fornecer o link real
— nunca inventar perfil.

### Onde alterar o WhatsApp
src/config/site.ts -> contactConfig.whatsapp (mesmo campo usado no site
inteiro). CTA final e footer usam esse mesmo numero real.

### Onde alterar o endereço
src/config/site.ts -> locationConfig (mesmo usado na secao Localizacao — sem
duplicar).

### Botoes do CTA final
- "Iniciar meu projeto" -> dispara o MESMO evento global do atendimento 24h
  (marcus:open-assistant) — nao duplica o chatbot.
- "Ver portfolio" -> rola ate #trabalhos (scroll suave via Lenis, mesmo
  mecanismo dos links do header).
- "Falar com Marcus" -> WhatsApp real (contactConfig.whatsapp).

### Bugs encontrados e corrigidos na auditoria (importante)
1. **Overflow de 15px em 768px**: a coluna "Redes" do footer (md:col-span-1)
   era estreita demais para a palavra "Instagram" (sem espaço para quebrar
   linha). Corrigido rebalanceando as colunas do grid
   (Marca 3 / Localizacao 3 / Links 2 / Atendimento 2 / Redes 2 = 12).
2. **Botao "Iniciar meu projeto" ficava com opacity:0 permanentemente** em
   alguns cenarios de scroll. Causa raiz: o botao usava a classe Tailwind
   `transition-all` (que inclui opacity e transform) NO MESMO elemento que o
   GSAP estava animando via scroll-trigger (opacity + translateY) — os dois
   sistemas (CSS transition e GSAP) competiam pelas mesmas propriedades no
   mesmo frame. Corrigido trocando para `transition-colors` (mesmo padrao dos
   outros 2 botoes do CTA, que nunca tiveram o problema).
   REGRA GERAL para futuras secoes: nunca aplicar `transition-all`,
   `transition-transform` ou `transition-opacity` num elemento que tambem e
   alvo de um tween GSAP de opacity/transform — use `transition-colors` (ou
   liste propriedades especificas que NAO conflitam, ex.: `transition-[background-color]`).
3. **ScrollTrigger com posicoes desatualizadas em paginas longas**: como o
   site troca a fonte fallback pela fonte final (next/font) apos o carregamento,
   o texto pode mudar de altura em qualquer secao, desatualizando os triggers
   mais abaixo. Corrigido globalmente em src/components/SmoothScroll.tsx: um
   `ScrollTrigger.refresh()` dispara quando as fontes terminam de carregar
   (`document.fonts.ready`) e no `window.load`, com uma rede de seguranca
   adicional (timeout).

### Auditoria (testada)
- CTA final: os 3 botoes abrem o assistente / rolam ate o portfolio / abrem
  WhatsApp real — testado programaticamente, incluindo cenarios de scroll
  direto (scrollIntoView) e scroll gradual (wheel), com verificacao de que
  NENHUM botao fica preso em opacity:0 apos a secao entrar em vista.
- Footer: todos os 11 links verificados (9 ancoras internas + WhatsApp real +
  Instagram real). "Iniciar atendimento 24h" abre o mesmo assistente (sem
  duplicar). Politica de Privacidade corretamente AUSENTE (privacyPolicyUrl
  e null — nao existe pagina ainda, entao nao inventamos o link).
- overflow 0 em 320-1920 (com scroll completo da pagina, nao so viewport
  inicial); 0 elementos "presos" em opacity:0 que nao sejam hover states
  intencionais; 0 erros de console reais (o unico erro capturado e o 403 do
  iframe do Google Maps, bloqueado apenas neste sandbox de build).
- prefers-reduced-motion: titulo do CTA final aparece em opacity:1 imediatamente.

---

## Vídeos + Mídia

Componentes:
- src/sections/Videos.tsx — orquestra featured + secundarios + modal
- src/components/video/FeaturedVideo.tsx — video principal (thumbnail + play + titulo + categoria)
- src/components/video/VideoCard.tsx — videos secundarios (menores)
- src/components/video/VideoModal.tsx — player (controles NATIVOS: play/pause/
  volume/fullscreen/legendas — acessiveis e confiaveis por padrao)

Dados: src/data/video.ts (videoData). Enquanto vazio, a secao inteira nao
aparece.

### Vídeos reais usados
Os 2 vídeos que você enviou (Instagram) foram processados e estão no ar:
- public/videos/detalhe-perna.mp4 — reencodado de HEVC (nao tocava no Chrome/
  Firefox/Edge) para H.264/AAC compativel, 720x1280, ~4.2MB (era 11.7MB).
- public/videos/ursos-combinando.mp4 — ja era H.264, reencodado levemente so
  para garantir faststart (carregamento progressivo), 464x832, ~3.8MB.
Ambos mostram trabalhos finalizados (nao filmagem do processo de tatuar em si),
por isso as categorias sao "Detalhes" e "Trabalhos" — nao "Processo", para nao
descrever errado o conteudo real.

### Como adicionar um vídeo
1. Coloque o arquivo MP4 (H.264 + AAC, NUNCA HEVC — nao roda na maioria dos
   navegadores) em public/videos/.
2. Gere um poster (frame de capa) em public/images/videos/ (.webp).
3. Adicione um item em videoData (src/data/video.ts):
   { id, title, category, thumbnail, width, height, provider: "local",
     sources: [{ src: "/videos/arquivo.mp4", type: "video/mp4" }] }
   width/height = dimensoes REAIS do video/poster (mantem a proporcao).
4. Marque `featured: true` em no maximo 1 video (vira o principal).
Para YouTube/Instagram (futuro): provider: "youtube"|"instagram" + embedUrl
com o link REAL fornecido pelo Marcus — nunca inventar URL.

### Formatos suportados
- Local: MP4 (H.264/AAC) — usado hoje. Estrutura `sources[]` já pronta para
  adicionar uma versão .webm do mesmo vídeo no futuro sem mudar o componente
  (não gerei .webm agora: a codificação VP9 é lenta e MP4/H.264 já cobre a
  imensa maioria dos navegadores — ver observação abaixo).
- YouTube / Instagram: via `embedUrl` (iframe), estrutura pronta, sem
  integração real implementada agora (nenhum link inventado).

### Performance (importante)
- O elemento <video> só é criado no DOM quando o usuário clica em play — o
  arquivo NÃO é baixado antes disso (testado: 0 requisições de vídeo antes do
  clique).
- Sem autoplay na página/scroll. O vídeo só reproduz dentro do modal, após
  clique explícito do usuário (autoplay ali é esperado — o usuário pediu para
  assistir).
- `preload` implícito do navegador não baixa nada até o <video> existir no DOM.
- Ao fechar o modal, o <video> é desmontado (pausa e sai do DOM) — não continua
  tocando escondido.

### Auditoria (testada)
- 0 elementos <video> no DOM antes do clique; 1 requisição de vídeo feita
  somente após o clique (a do vídeo aberto).
- Modal: abre/fecha, ESC fecha, foco vai para o botão fechar e volta ao
  elemento de origem ao fechar, controles nativos (play/pause/volume/
  fullscreen) presentes, playsInline ativo.
- Testado o card secundário também (abre o modal certo, com título certo).
- overflow 0 em 320-1920, inclusive com o modal aberto no mobile.
- prefers-reduced-motion: thumbnails aparecem em opacity 1 imediatamente.
- 0 erros de console reais.

---

## Auditoria Final — SEO + Performance + Acessibilidade (Versão Candidata à Produção)

Esta etapa NAO criou novas secoes visuais — apenas endureceu o projeto existente
para producao, corrigindo bugs reais encontrados na auditoria.

### 1. SEO
- `siteConfig` (src/config/site.ts) e a fonte UNICA do dominio, titulo,
  description, keywords e imagem OG — usado por metadata, canonical, Open
  Graph, Twitter Card, JSON-LD, sitemap.xml e robots.txt.
- Titulo: "Marcus Tattoo | Tatuagem em Uberaba - MG"
- Description contem naturalmente: Marcus Tattoo, tatuagem, Uberaba, Minas
  Gerais, tatuador, atendimento, orcamento — sem keyword stuffing.
- Open Graph completo (title/description/url/image/type/locale/site_name) +
  Twitter Card (summary_large_image) adicionados.
- JSON-LD (TattooParlor): nome, endereco real, descricao, Instagram real.
  SEM telefone, horario, avaliacoes, precos ou coordenadas inventadas.

### 2. Sitemap + Robots (bug corrigido)
- **Bug real encontrado**: o robots.txt estatico antigo referenciava
  `sitemap.xml`, mas esse arquivo NUNCA era gerado — link quebrado.
- Corrigido com os arquivos nativos do Next.js `src/app/sitemap.ts` e
  `src/app/robots.ts` (compativeis com `output: export`), gerados a partir de
  `siteConfig.url` — nenhuma URL fixa duplicada. Sitemap lista so a URL real
  (pagina unica); nao inventa subpaginas.

### 3. Imagem Open Graph (gap encontrado e corrigido)
`public/images/og.jpg` NAO EXISTIA — o compartilhamento no WhatsApp/Instagram
estaria quebrado. Gerei uma usando 100% ativos reais (logo oficial + foto real
do portfolio), 1200x630. Pode ser substituida por uma definitiva quando o
Marcus tiver uma.

### 4. Performance / Client Components
Auditei os 41 componentes com "use client" e achei 5 arquivos puramente
apresentacionais (sem hooks/onClick) que teoricamente nao precisariam da
diretiva. Testei EMPIRICAMENTE removendo-a e comparando o bundle JS gerado:
824.526 bytes antes e depois — EXATAMENTE igual. Como esses componentes sao
filhos diretos de pais que ja sao Client Components (padrao usado em todo o
projeto por causa do GSAP), a remocao nao reduz o JS enviado nesta
arquitetura. Revertido; documentado aqui em vez de alegar uma otimizacao sem
efeito real. Reducao real exigiria reestruturar as secoes para compor via
`children` a partir de Server Components ancestrais — mudanca estrutural
maior, fora do escopo desta etapa de hardening.

### 5. GSAP / Memory leaks
18 arquivos usam `gsap.context()` — todos os 18 tem `ctx.revert()` no cleanup
do useEffect (confirmado via grep + revisao manual). `ScrollTrigger.create` e
`.batch` sempre dentro de contexto (limpos automaticamente). Zero memory leaks
encontrados.

### 6. Imagens (next/image)
- Todo `<Image fill>` tem wrapper com aspect-ratio definido (nunca solto).
- `priority` usado SOMENTE nas 3 imagens realmente criticas acima da dobra
  (logo do Preloader, logo do Header, imagem do Hero) + a imagem atual do
  Lightbox (quando aberto). Confirmado no HTML gerado: 40 imagens com
  `loading="lazy"`, 3 sem (as priority).
- **Bug encontrado e corrigido**: a imagem do Hero usava `fill` sem `sizes`
  explicito — adicionado `sizes="100vw"`.

### 7. Videos
Ja auditado na etapa anterior (Videos + Midia): `<video>` so existe no DOM
apos o clique do usuario (0 requisicoes antes do clique), poster sempre
presente, sem autoplay na pagina, `playsInline` ativo, controles nativos.

### 8. Acessibilidade — Contraste (bugs reais corrigidos)
Calculei o contraste WCAG de TODAS as combinacoes de cor com opacidade
reduzida usadas no site (formula de luminancia relativa oficial). Encontrei
varias falhando o minimo (4.5:1 texto normal / 3:1 texto grande):
- `text-smoke/40` sobre fundo escuro = **1.82:1** (falha grave) — usado em
  estados "inativos" de Processo e Especialidades.
- `text-smoke/50`, `/60`, `/70` em labels pequenos (footer, galeria,
  formacao, etc.) — todos abaixo do minimo.
Corrigido em 12 arquivos: textos grandes (>=24px) subiram para `smoke/70`
(3.35:1, passa o limiar de texto grande); textos pequenos/normais subiram
para `smoke/90` (4.81:1) ou cor solida. Paleta principal (bone/smoke sobre
ink/carbon) ja passava WCAG AAA (16.88:1 e 5.73:1) — nao precisou de ajuste.

### 9. Acessibilidade — Headings (bugs reais corrigidos)
- **h2 aparecia ANTES do h1** no DOM: o Preloader usava `<h2>` para o nome da
  marca na tela de carregamento. Trocado para `<p>` (conteudo transitorio,
  nao faz parte do outline da pagina; alem disso ja tinha `aria-hidden` no
  container pai).
- **h1 do Hero sem espaco acessivel**: "Marcus" e "Tattoo" estavam em spans
  separados sem espaco entre eles, podendo ser lido como "MarcusTattoo" (uma
  palavra) por leitores de tela. Corrigido com `aria-label="Marcus Tattoo"`
  no h1 (nome acessivel correto independente da estrutura visual interna).
- **Titulo duplicado**: Portfolio e Galeria Cinematografica usavam o MESMO
  texto de heading ("Trabalhos que falam por si."), confundindo navegacao por
  headings. Portfolio alterado para "O portfolio completo." (Galeria manteve
  o texto original, que foi explicitamente pedido pelo usuario).
- Confirmado: exatamente 1 `<h1>` na pagina apos as correcoes.

### 10. Acessibilidade — Alt text
43 imagens auditadas no HTML gerado: 40 com alt descritivo, 3 com `alt=""`
— todas as 3 legitimas (logo do Preloader com pai `aria-hidden`; 2 imagens de
acento puramente decorativo em Cuidados, onde o texto ao lado ja descreve
tudo). Zero imagens sem atributo alt.

### 11. Links
Nenhum `href="#"` quebrado no projeto. Todos os links verificados: ancoras
internas reais, WhatsApp real (`contactConfig.whatsapp`), Google Maps real,
Instagram real (`socialConfig.instagram`).

### 12. Conteudo ficticio
Varredura completa: nenhum Lorem ipsum, preco, horario, nome de cliente ou
endereco inventado encontrado. `coursesData` e `testimonialsData` continuam
vazios (corretamente — sem dados reais fornecidos ainda).

### 13. Seguranca
Nenhuma API key, token, senha ou credencial no codigo (busca completa, zero
resultados). Criado `.env.example` documentando que o site NAO precisa de
nenhuma variavel de ambiente hoje (100% estatico, sem backend), com nomes de
variaveis reservados (comentados) para quando a IA do atendimento 24h for
conectada no futuro.

### 14. Lint (bugs reais corrigidos)
8 problemas encontrados (4 erros, 4 warnings) — TODOS corrigidos com
mudancas reais de codigo, nunca desativando regras:
- `Preloader.tsx`, `ChatInput.tsx`, `useReducedMotion.ts`: setState sincrono
  dentro de efeito. `useReducedMotion` reescrito com `useSyncExternalStore`
  (padrao React recomendado para assinar APIs do navegador como matchMedia).
  `Preloader` passou a consumir esse hook em vez de duplicar a logica.
  `ChatInput` passou a usar `key={step.key}` no pai (remonta ao trocar de
  pergunta) + ref callback para foco, eliminando o efeito problematico.
- `useAssistant.ts`: `let` que nunca era reatribuido — trocado por `const`.
- `PortfolioLightbox.tsx`: ternario usado como statement (sem efeito) —
  trocado por if/else explicito.
- `ChatAssistant.tsx`: ref potencialmente desatualizada no cleanup do efeito
  — trocada por selecao direta no DOM via atributo `data-chat-launcher`.
- `layout.tsx`, `ChatWindow.tsx`: imports/variaveis nao utilizados removidos.

### 15. Overflow / Mobile / Desktop
Sweep completo com scroll real (nao so viewport inicial) em 320, 375, 390,
430, 768, 1024, 1280, 1440, 1920 — **0px de overflow em todos**, apos todas
as correcoes desta etapa.

### 16. Fluxos testados de ponta a ponta (apos todas as correcoes)
Lightbox (abre/fecha ESC), FAQ (accordion abre), Video modal (abre com
video real), Chat assistant (abre/fecha ESC) — todos confirmados funcionando
via automacao de navegador real, nao apenas leitura de codigo.

### 17. Build final
`npm run build`: compilado com sucesso, TypeScript sem erros, 
`/`, `/robots.txt`, `/sitemap.xml` gerados como conteudo estatico.
`npm run lint`: 0 erros, 0 warnings.

### O que ainda depende do Marcus
- Fotos reais em alta resolucao do portfolio (hoje: 9 fotos processadas de
  screenshots do Instagram — funcionais, mas nao sao os arquivos originais).
- Foto do proprio Marcus para a secao Sobre (hoje: placeholder).
- Cursos/certificados reais (Formacao) — secao preparada, vazia ate ter dados.
- Depoimentos reais de clientes com autorizacao de uso (Testimonials) —
  secao preparada, oculta ate ter dados.
- Confirmar/ajustar as 3 especialidades listadas (Realismo, Black & Grey,
  Lettering) ou adicionar outras do catalogo ja preparado em
  src/data/specialties.ts.
- Dominio final (hoje: marcustattoo.ink como placeholder em siteConfig.url).
- Imagem OG definitiva (hoje: gerada automaticamente com logo + foto real,
  funcional mas generica).
- Numero de WhatsApp: extraido do link publico do Instagram dele — vale
  confirmar que esta correto.
