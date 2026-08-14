"use client";

import { socialConfig } from "@/config/site";

/**
 * Mostra somente redes sociais REAIS presentes em socialConfig. Se um campo
 * não existir (undefined), o link correspondente simplesmente não aparece —
 * nunca inventamos um perfil.
 */
export default function SocialLinks({ className = "" }: { className?: string }) {
  const links = [
    socialConfig.instagram && { label: "Instagram", href: socialConfig.instagram },
  ].filter(Boolean) as { label: string; href: string }[];

  if (links.length === 0) return null;

  return (
    <ul className={`flex flex-col gap-2 ${className}`}>
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block text-smoke hover:text-bone transition-colors"
          >
            {l.label}
            <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-bone transition-all duration-300 group-hover:w-full" />
          </a>
        </li>
      ))}
    </ul>
  );
}
