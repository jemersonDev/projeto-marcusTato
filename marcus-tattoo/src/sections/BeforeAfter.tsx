"use client";

import BeforeAfterCard from "@/components/beforeafter/BeforeAfterCard";
import { beforeAfterConfig, beforeAfterData } from "@/data/beforeAfter";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function BeforeAfter() {
  const ref = useScrollReveal<HTMLDivElement>({ childrenSelector: "[data-reveal]" });

  if (beforeAfterData.length === 0) return null;

  return (
    <section id="antes-depois" className="bg-ink py-24 md:py-36">
      <div ref={ref} className="container-x">
        <div className="max-w-3xl mb-14 md:mb-20">
          <p data-reveal className="eyebrow mb-5">
            {beforeAfterConfig.eyebrow}
          </p>
          <h2 data-reveal className="display text-bone text-5xl md:text-7xl">
            {beforeAfterConfig.title}
          </h2>
          <p data-reveal className="text-smoke font-light text-lg mt-6 max-w-xl">
            {beforeAfterConfig.intro}
          </p>
        </div>

        <div className="space-y-20 md:space-y-28">
          {beforeAfterData.map((item) => (
            <BeforeAfterCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
