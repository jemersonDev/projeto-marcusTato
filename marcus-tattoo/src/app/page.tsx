import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Specialties from "@/sections/Specialties";
import PortfolioSection from "@/sections/Portfolio";
import CinematicGallery from "@/sections/CinematicGallery";
import Process from "@/sections/Process";
import Formation from "@/sections/Formation";
import Aftercare from "@/sections/Aftercare";

export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main>
        <Hero />
        <About />
        <Specialties />
        <PortfolioSection />
        <CinematicGallery />
        <Process />
        <Formation />
        <Aftercare />

        {/*
          PRÓXIMAS SEÇÕES (cada uma em src/sections/):
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
