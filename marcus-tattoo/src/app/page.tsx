import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/sections/Hero";
import PortfolioSection from "@/sections/Portfolio";

export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main>
        <Hero />
        <PortfolioSection />

        {/*
          PRÓXIMAS SEÇÕES (cada uma em src/sections/):
            <About />          — Sobre o artista
            <Specialties />    — Especialidades
            <Gallery />        — Galeria cinematográfica (usa os featured)
            <Process />        — Processo de atendimento
            <Formation />      — Formação (esconde se vazio)
            <Aftercare />      — Cuidados
            <Location />       — Localização + Google Maps
            <Faq />            — FAQ
            <Testimonials />   — Depoimentos (esconde se vazio)
            <FinalCta />       — CTA final
            <Footer />         — Rodapé
        */}
      </main>
    </>
  );
}
