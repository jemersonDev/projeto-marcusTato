"use client";

import Image from "next/image";
import type { BeforeAfterItem } from "@/data/beforeAfter";

type Props = { item: BeforeAfterItem };

function Photo({
  src,
  width,
  height,
  label,
  alt,
}: {
  src: string;
  width: number;
  height: number;
  label: string;
  alt: string;
}) {
  return (
    <figure data-reveal className="relative overflow-hidden bg-carbon">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 50vw, 400px"
        className="w-full h-auto aspect-[3/5] object-cover"
      />
      <figcaption className="absolute left-0 bottom-0 bg-ink/85 text-bone eyebrow px-4 py-2">
        {label}
      </figcaption>
    </figure>
  );
}

/** Par antes/depois lado a lado, com rótulos fixos. Mesmo enquadramento, sem slider
 *  (as fotos originais têm ângulos diferentes, então um slider desalinharia). */
export default function BeforeAfterCard({ item }: Props) {
  return (
    <article className="max-w-3xl mx-auto">
      <div className="grid grid-cols-2 gap-3 md:gap-6">
        <Photo
          src={item.before.image}
          width={item.before.width}
          height={item.before.height}
          label="Antes"
          alt={`${item.title} — antes`}
        />
        <Photo
          src={item.after.image}
          width={item.after.width}
          height={item.after.height}
          label="Depois"
          alt={`${item.title} — depois`}
        />
      </div>
      <div data-reveal className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="display text-bone text-2xl md:text-3xl">{item.title}</h3>
        {item.bodyArea && <span className="eyebrow text-smoke">{item.bodyArea}</span>}
      </div>
      {item.description && (
        <p data-reveal className="text-smoke font-light mt-2 max-w-xl">
          {item.description}
        </p>
      )}
    </article>
  );
}
