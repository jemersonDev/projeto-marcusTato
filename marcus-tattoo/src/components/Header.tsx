"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { artistConfig } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

const NAV = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Trabalhos", href: "#trabalhos" },
  { label: "Processo", href: "#processo" },
  { label: "Formação", href: "#formacao" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const agendar = whatsappLink(
    `Olá, Marcus! Quero agendar uma tatuagem.`
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava o scroll do body quando o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ink/85 backdrop-blur-md border-b border-ash py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container-x flex items-center justify-between">
          <a href="#inicio" className="flex items-center gap-3" aria-label={artistConfig.brand}>
            <Image
              src="/images/logo.png"
              alt={`Logo ${artistConfig.brand}`}
              width={44}
              height={44}
              className="rounded-full bg-white/95 p-0.5"
              priority
            />
            <span className="display text-bone text-lg hidden sm:block">
              {artistConfig.brand}
            </span>
          </a>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Principal">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="eyebrow hover:text-bone transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {agendar && (
              <a
                href={agendar}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-block border border-bone/70 text-bone px-5 py-2.5 text-xs tracking-[0.2em] uppercase hover:bg-bone hover:text-ink transition-colors"
              >
                Agendar
              </a>
            )}
            {/* Botão hambúrguer (mobile) */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-bone p-2"
              aria-label="Abrir menu"
            >
              <span className="block w-7 h-px bg-bone mb-1.5" />
              <span className="block w-7 h-px bg-bone mb-1.5" />
              <span className="block w-5 h-px bg-bone" />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile fullscreen */}
      <div
        className={`fixed inset-0 z-[60] bg-ink transition-all duration-500 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="container-x flex items-center justify-between py-5">
          <span className="display text-bone text-lg">{artistConfig.brand}</span>
          <button
            onClick={() => setOpen(false)}
            className="eyebrow text-bone p-2"
            aria-label="Fechar menu"
          >
            Fechar
          </button>
        </div>
        <nav
          className="container-x flex flex-col gap-6 mt-12"
          aria-label="Menu mobile"
        >
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="display text-bone text-4xl hover:text-smoke transition-colors"
              style={{
                transitionDelay: open ? `${i * 40}ms` : "0ms",
                transform: open ? "translateY(0)" : "translateY(12px)",
                opacity: open ? 1 : 0,
                transitionProperty: "transform, opacity, color",
                transitionDuration: "500ms",
              }}
            >
              {item.label}
            </a>
          ))}
          {agendar && (
            <a
              href={agendar}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-8 border border-bone text-bone text-center px-6 py-4 text-sm tracking-[0.2em] uppercase"
            >
              Agendar tatuagem
            </a>
          )}
        </nav>
      </div>
    </>
  );
}
