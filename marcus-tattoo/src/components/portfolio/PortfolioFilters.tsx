"use client";

import { portfolioFilters, type CategoryId } from "@/data/portfolio";

type Props = {
  active: CategoryId;
  /** categorias que possuem ao menos 1 trabalho (calculado na seção) */
  available: Set<CategoryId>;
  counts: Record<string, number>;
  onChange: (id: CategoryId) => void;
};

export default function PortfolioFilters({ active, available, counts, onChange }: Props) {
  // "Todos" sempre aparece; as demais só quando têm trabalho.
  const visible = portfolioFilters.filter(
    (f) => f.id === "todos" || available.has(f.id)
  );

  // Com uma só categoria além de "todos", filtro não agrega nada: esconde.
  if (visible.length <= 2) return null;

  return (
    <div
      className="flex flex-wrap gap-x-6 gap-y-3 mb-10 md:mb-14"
      role="group"
      aria-label="Filtrar trabalhos por estilo"
    >
      {visible.map((f) => {
        const isActive = active === f.id;
        return (
          <button
            key={f.id}
            type="button"
            onClick={() => onChange(f.id)}
            aria-pressed={isActive}
            className={`relative eyebrow pb-1 transition-colors ${
              isActive ? "text-bone" : "text-smoke hover:text-bone/80"
            }`}
          >
            {f.label}
            {f.id !== "todos" && (
              <sup className="ml-1 text-[0.55rem] text-smoke/90">
                {counts[f.id] ?? 0}
              </sup>
            )}
            <span
              className={`absolute left-0 -bottom-0.5 h-px bg-bone transition-all duration-300 ${
                isActive ? "w-full" : "w-0"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
