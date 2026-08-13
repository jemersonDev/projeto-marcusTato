"use client";

import FormationPillars from "@/components/formation/FormationPillars";
import CourseTimeline from "@/components/formation/CourseTimeline";
import { formationConfig } from "@/data/content";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Formation() {
  const headerRef = useScrollReveal<HTMLDivElement>({ childrenSelector: "[data-reveal]" });

  return (
    <section id="formacao" className="bg-ink py-24 md:py-36">
      <div className="container-x">
        {/* Cabeçalho */}
        <div ref={headerRef} className="max-w-3xl mb-16 md:mb-24">
          <p data-reveal className="eyebrow mb-5">
            Bastidores
          </p>
          <h2 data-reveal className="display text-bone text-5xl md:text-7xl">
            {formationConfig.title}
          </h2>
          <p data-reveal className="text-smoke font-light text-lg mt-6 max-w-xl">
            {formationConfig.intro}
          </p>
        </div>

        {/* Pilares conceituais (sempre) */}
        <FormationPillars />

        {/* Linha do tempo de cursos reais (só se houver dados) */}
        <CourseTimeline />

        {/* Mensagem final */}
        {formationConfig.closing && (
          <p className="display text-bone text-3xl md:text-5xl max-w-3xl mt-20 md:mt-28 border-t border-ash pt-12">
            {formationConfig.closing}
          </p>
        )}
      </div>
    </section>
  );
}
