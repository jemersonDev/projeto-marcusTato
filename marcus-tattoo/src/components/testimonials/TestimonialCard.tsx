"use client";

import Image from "next/image";
import type { Testimonial } from "@/data/content";

export default function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <article className="snap-start shrink-0 w-[85%] sm:w-[46%] lg:w-[31%] border border-ash bg-carbon p-6 flex flex-col gap-4">
      <span aria-hidden="true" className="display text-4xl text-smoke/40 leading-none">
        “
      </span>
      <p className="text-smoke font-light leading-relaxed flex-1">{item.text}</p>
      <div className="flex items-center gap-3 pt-2 border-t border-ash">
        {item.image && (
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-ink">
            <Image src={item.image} alt="" fill sizes="36px" className="object-cover" />
          </div>
        )}
        <div className="min-w-0">
          <p className="text-bone text-sm truncate">{item.name}</p>
          {(item.date || item.source) && (
            <p className="text-smoke/90 text-xs truncate">
              {[item.date, item.source].filter(Boolean).join(" • ")}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
