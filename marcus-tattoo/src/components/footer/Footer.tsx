"use client";

import Image from "next/image";
import { artistConfig, locationConfig, legalConfig } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import FooterLinks from "@/components/footer/FooterLinks";
import SocialLinks from "@/components/footer/SocialLinks";

export default function Footer() {
  const talkLink = whatsappLink("Olá, Marcus! Vi o site e quero começar meu projeto.");
  const openAssistant = () => window.dispatchEvent(new Event("marcus:open-assistant"));

  return (
    <footer className="bg-ink border-t border-ash">
      <div className="container-x py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-12">
          {/* Marca */}
          <div className="col-span-2 md:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt={`Logo ${artistConfig.brand}`}
                width={40}
                height={40}
                className="rounded-full bg-white/95 p-0.5"
              />
              <span className="display text-bone text-lg">{artistConfig.brand}</span>
            </div>
            <p className="text-smoke font-light">Tatuagem como arte.</p>
          </div>

          {/* Localização */}
          <div className="col-span-2 sm:col-span-1 md:col-span-3">
            <p className="eyebrow text-smoke/90 mb-4">Localização</p>
            <address className="not-italic text-smoke font-light leading-relaxed space-y-0.5">
              <p>{locationConfig.street}</p>
              <p>{locationConfig.reference}</p>
              <p>{locationConfig.neighborhood}</p>
              <p>
                {locationConfig.city} — {locationConfig.state}
              </p>
            </address>
          </div>

          {/* Links */}
          <div className="col-span-1 sm:col-span-1 md:col-span-2">
            <p className="eyebrow text-smoke/90 mb-4">Links</p>
            <FooterLinks />
          </div>

          {/* Atendimento */}
          <div className="col-span-1 md:col-span-2">
            <p className="eyebrow text-smoke/90 mb-4">Atendimento</p>
            <ul className="flex flex-col gap-2">
              <li>
                <button
                  type="button"
                  onClick={openAssistant}
                  className="group relative inline-block text-left text-smoke hover:text-bone transition-colors"
                >
                  Iniciar atendimento 24h
                  <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-bone transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
              {talkLink && (
                <li>
                  <a
                    href={talkLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-block text-smoke hover:text-bone transition-colors"
                  >
                    WhatsApp
                    <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-bone transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Redes sociais */}
          <div className="col-span-2 sm:col-span-1 md:col-span-2">
            <p className="eyebrow text-smoke/90 mb-4">Redes</p>
            <SocialLinks />
          </div>
        </div>

        {/* Linha final: copyright + legal */}
        <div className="mt-16 pt-8 border-t border-ash flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-smoke/90 text-sm">{legalConfig.copyright}</p>
          {legalConfig.privacyPolicyUrl && (
            <a
              href={legalConfig.privacyPolicyUrl}
              className="text-smoke/90 hover:text-bone text-sm transition-colors underline underline-offset-4 decoration-ash"
            >
              Política de Privacidade
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
