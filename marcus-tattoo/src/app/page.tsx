import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Specialties from "@/sections/Specialties";
import PortfolioSection from "@/sections/Portfolio";
import CinematicGallery from "@/sections/CinematicGallery";
import VideoSection from "@/sections/Videos";
import Process from "@/sections/Process";
import Formation from "@/sections/Formation";
import Aftercare from "@/sections/Aftercare";
import Location from "@/sections/Location";
import Faq from "@/sections/Faq";
import Testimonials from "@/sections/Testimonials";
import FinalCta from "@/sections/FinalCta";
import Footer from "@/components/footer/Footer";
import ChatAssistant from "@/components/chat/ChatAssistant";

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
        <VideoSection />
        <Process />
        <Formation />
        <Aftercare />
        <Location />
        <Faq />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
      <ChatAssistant />
    </>
  );
}
