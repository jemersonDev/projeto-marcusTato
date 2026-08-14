"use client";

import Image from "next/image";
import type { VideoItem } from "@/data/video";

export default function VideoCard({
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
      data-video-card
      className="group relative block w-full overflow-hidden bg-carbon text-left focus-visible:outline-2 focus-visible:outline-bone"
      aria-label={`Assistir: ${video.title} — ${video.category}`}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: `${video.width} / ${video.height}` }}
      >
        <Image
          src={video.thumbnail}
          alt={`${video.title} — Marcus Tattoo`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/15 transition-colors duration-500" />

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex items-center justify-center h-14 w-14 rounded-full border border-bone/70 bg-ink/40 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="ml-0.5">
              <path d="M6 4L20 12L6 20V4Z" fill="#ededea" />
            </svg>
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="eyebrow text-bone/70 text-[0.6rem] mb-1">{video.category}</p>
          <p className="display text-bone text-lg leading-tight">{video.title}</p>
        </div>
      </div>
    </button>
  );
}
