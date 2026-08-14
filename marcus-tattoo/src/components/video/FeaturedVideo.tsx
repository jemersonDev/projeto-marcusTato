"use client";

import Image from "next/image";
import type { VideoItem } from "@/data/video";

export default function FeaturedVideo({
  video,
  onPlay,
}: {
  video: VideoItem;
  onPlay: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPlay}
      data-video-featured
      className="group relative block w-full overflow-hidden bg-carbon text-left focus-visible:outline-2 focus-visible:outline-bone"
      aria-label={`Assistir: ${video.title} — ${video.category}`}
    >
      <div
        className="relative w-full max-h-[78vh] mx-auto overflow-hidden"
        style={{ aspectRatio: `${video.width} / ${video.height}` }}
      >
        <Image
          src={video.thumbnail}
          alt={`${video.title} — Marcus Tattoo`}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-ink/35 group-hover:bg-ink/25 transition-colors duration-500" />

        {/* botão play central */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            data-play-btn
            className="flex items-center justify-center h-20 w-20 md:h-24 md:w-24 rounded-full border border-bone/70 bg-ink/40 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110"
            aria-hidden="true"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="ml-1">
              <path d="M6 4L20 12L6 20V4Z" fill="#ededea" />
            </svg>
          </span>
        </div>

        {/* legenda */}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <p className="eyebrow text-bone/80 mb-2">{video.category}</p>
          <p className="display text-bone text-3xl md:text-5xl leading-tight">{video.title}</p>
        </div>
      </div>
    </button>
  );
}
