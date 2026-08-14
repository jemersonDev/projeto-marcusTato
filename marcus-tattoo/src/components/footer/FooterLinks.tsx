"use client";

const LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Portfólio", href: "#trabalhos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Processo", href: "#processo" },
  { label: "Formação", href: "#formacao" },
  { label: "Cuidados", href: "#cuidados" },
  { label: "FAQ", href: "#faq" },
  { label: "Localização", href: "#localizacao" },
];

export default function FooterLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-col gap-2 ${className}`}>
      {LINKS.map((l) => (
        <li key={l.href}>
          <a
            href={l.href}
            className="group relative inline-block text-smoke hover:text-bone transition-all hover:translate-x-1 duration-300"
          >
            {l.label}
            <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-bone transition-all duration-300 group-hover:w-full" />
          </a>
        </li>
      ))}
    </ul>
  );
}
