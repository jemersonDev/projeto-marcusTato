"use client";

import { useMemo, useState } from "react";
import PortfolioFilters from "@/components/portfolio/PortfolioFilters";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import PortfolioLightbox from "@/components/portfolio/PortfolioLightbox";
import { portfolio, type CategoryId } from "@/data/portfolio";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function PortfolioSection() {
  const [active, setActive] = useState<CategoryId>("todos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const headerRef = useScrollReveal<HTMLDivElement>({ childrenSelector: "[data-reveal]" });

  // categorias que realmente têm trabalho + contagem por categoria
  const { available, counts } = useMemo(() => {
    const counts: Record<string, number> = {};
    const available = new Set<CategoryId>();
    for (const item of portfolio) {
      counts[item.style] = (counts[item.style] ?? 0) + 1;
      available.add(item.style);
    }
    return { available, counts };
  }, []);

  const filtered = useMemo(
    () => (active === "todos" ? portfolio : portfolio.filter((p) => p.style === active)),
    [active]
  );

  const handleFilter = (id: CategoryId) => {
    setActive(id);
  };

  return (
    <section id="trabalhos" className="bg-ink py-24 md:py-36">
      <div className="container-x">
        {/* cabeçalho editorial */}
        <div ref={headerRef} className="max-w-3xl mb-12 md:mb-16">
          <p data-reveal className="eyebrow mb-5">
            Portfólio
          </p>
          <h2 data-reveal className="display text-bone text-5xl md:text-7xl">
            O portfólio completo.
          </h2>
          <p data-reveal className="text-smoke mt-6 text-base md:text-lg font-light max-w-xl">
            Cada peça é autoral e feita sob medida. Clique em qualquer trabalho para ver em tela cheia.
          </p>
        </div>

        <PortfolioFilters
          active={active}
          available={available}
          counts={counts}
          onChange={handleFilter}
        />

        {filtered.length > 0 ? (
          <PortfolioGrid
            key={active} /* remonta e reinicia as animações ao trocar filtro */
            items={filtered}
            onOpen={(i) => setLightboxIndex(i)}
          />
        ) : (
          <p className="text-smoke">Nenhum trabalho nesta categoria ainda.</p>
        )}
      </div>

      {lightboxIndex !== null && (
        <PortfolioLightbox
          items={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(i) => setLightboxIndex(i)}
        />
      )}
    </section>
  );
}
