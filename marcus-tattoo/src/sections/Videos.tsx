"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeaturedVideo from "@/components/video/FeaturedVideo";
import VideoCard from "@/components/video/VideoCard";
import VideoModal from "@/components/video/VideoModal";
import { videoData } from "@/data/video";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function VideoSection() {
  const reduced = useReducedMotion();
  const headerRef = useScrollReveal<HTMLDivElement>({ childrenSelector: "[data-reveal]" });
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const featured = videoData.find((v) => v.featured) ?? videoData[0];
  const secondary = videoData.filter((v) => v.id !== featured?.id);
  const activeVideo = videoData.find((v) => v.id === activeId) ?? null;

  // reveal do bloco + entrada das thumbnails
  useEffect(() => {
    const el = gridRef.current;
    if (!el || reduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from("[data-video-featured]", {
        opacity: 0,
        y: 32,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
      gsap.from("[data-video-card]", {
        opacity: 0,
        y: 28,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 75%" },
      });
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  if (!featured) return null;

  return (
    <section id="videos" className="bg-ink py-24 md:py-36">
      <div className="container-x">
        <div ref={headerRef} className="max-w-3xl mb-14 md:mb-20">
          <p data-reveal className="eyebrow mb-5">
            Vídeos
          </p>
          <h2 data-reveal className="display text-bone text-5xl md:text-7xl">
            Arte em movimento.
          </h2>
          <p data-reveal className="text-smoke font-light text-lg mt-6 max-w-xl">
            Cada trabalho carrega um processo.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-7">
            <FeaturedVideo video={featured} onPlay={() => setActiveId(featured.id)} />
          </div>

          {secondary.length > 0 && (
            <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-5">
              {secondary.slice(0, 3).map((v) => (
                <VideoCard key={v.id} video={v} onPlay={() => setActiveId(v.id)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveId(null)} />}
    </section>
  );
}
