"use client";

import GalleryItem from "@/components/gallery/GalleryItem";
import GalleryFeature from "@/components/gallery/GalleryFeature";
import { cinematicGalleryData } from "@/data/cinematic";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function CinematicGallery() {
  const introRef = useScrollReveal<HTMLDivElement>({ childrenSelector: "[data-reveal]" });

  if (cinematicGalleryData.length === 0) return null;

  return (
    <section id="galeria" className="bg-ink overflow-hidden">
      {/* Introdução curta e sofisticada */}
      <div ref={introRef} className="container-x pt-28 md:pt-40 pb-16 md:pb-24">
        <p data-reveal className="eyebrow mb-6">
          Galeria
        </p>
        <h2 data-reveal className="display text-bone text-5xl md:text-8xl max-w-4xl">
          Trabalhos que falam por si.
        </h2>
        <p data-reveal className="text-smoke font-light text-lg mt-8 max-w-xl">
          Uma seleção para ser sentida, não apenas vista. Role com calma.
        </p>
      </div>

      {/* Narrativa: cada bloco respira com bastante espaço negativo */}
      <div className="flex flex-col">
        {cinematicGalleryData.map((item, i) =>
          item.layout === "feature" ? (
            <div key={item.id} className="my-16 md:my-28">
              <GalleryFeature item={item} index={i} />
            </div>
          ) : (
            <div key={item.id} className="container-x py-16 md:py-28">
              <GalleryItem item={item} index={i} />
            </div>
          )
        )}
      </div>
    </section>
  );
}
