"use client";

import Image from "next/image";

export type Step = {
  n: string;
  title: string;
  text: string;
  image: string;
};

/**
 * Uma etapa do processo.
 * variant="desktop": só número + título + texto (a imagem fica no painel fixo).
 * variant="mobile": número + imagem + texto, empilhados (sequência vertical).
 */
export default function ProcessStep({
  step,
  active = false,
  variant,
}: {
  step: Step;
  active?: boolean;
  variant: "desktop" | "mobile";
}) {
  if (variant === "mobile") {
    return (
      <article data-step-mobile className="relative pl-14">
        {/* marcador na trilha */}
        <span
          data-step-dot
          className="absolute left-0 top-1 h-9 w-9 rounded-full border border-ash bg-carbon flex items-center justify-center eyebrow text-[0.6rem] text-bone"
        >
          {step.n}
        </span>
        <div data-step-media className="relative w-full aspect-[4/3] overflow-hidden bg-carbon mb-5">
          <Image
            src={step.image}
            alt={`Etapa ${step.n} — ${step.title}`}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
        </div>
        <h3 data-step-text className="display text-bone text-3xl mb-2">
          {step.title}
        </h3>
        <p data-step-text className="text-smoke font-light leading-relaxed">
          {step.text}
        </p>
      </article>
    );
  }

  // desktop
  return (
    <article
      data-step-desktop
      className="min-h-[62vh] flex flex-col justify-center border-t border-ash/60"
    >
      <span
        className={`eyebrow mb-4 transition-colors duration-300 ${
          active ? "text-bone" : "text-smoke"
        }`}
      >
        Etapa {step.n}
      </span>
      <h3
        className={`display text-5xl xl:text-6xl mb-5 transition-colors duration-300 ${
          active ? "text-bone" : "text-smoke/70"
        }`}
      >
        {step.title}
      </h3>
      <p
        className={`text-lg font-light leading-relaxed max-w-md transition-colors duration-300 ${
          active ? "text-smoke" : "text-smoke/90"
        }`}
      >
        {step.text}
      </p>
    </article>
  );
}
