"use client";

import { useEffect, useRef } from "react";
import type { VideoItem } from "@/data/video";

/**
 * Modal do player. Usa <video controls> NATIVO (play, pause, volume,
 * fullscreen e legendas já vêm prontos, acessíveis e confiáveis) — a
 * "elegância" vem da moldura ao redor (fundo escuro, título, categoria,
 * fechar), não de controles customizados reinventando a roda.
 *
 * Performance: o <video> só existe no DOM quando o modal está aberto — o
 * arquivo não é baixado antes do clique do usuário.
 */
export default function VideoModal({
  video,
  onClose,
}: {
  video: VideoItem;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // ESC fecha
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // trava scroll do body, foca o botão fechar, devolve o foco ao fechar
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const lastFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      lastFocused?.focus?.();
    };
  }, []);

  const handleClose = () => {
    videoRef.current?.pause();
    onClose();
  };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${video.title} — ${video.category}`}
      className="fixed inset-0 z-[90] bg-ink flex flex-col"
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
    >
      {/* barra superior */}
      <div className="flex items-start justify-between px-5 md:px-8 py-4 shrink-0">
        <div>
          <p className="eyebrow text-bone/70">{video.category}</p>
          <p className="display text-bone text-lg md:text-xl mt-1">{video.title}</p>
        </div>
        <button
          ref={closeBtnRef}
          onClick={handleClose}
          aria-label="Fechar vídeo"
          className="eyebrow text-bone hover:text-smoke transition-colors p-2 shrink-0"
        >
          Fechar ✕
        </button>
      </div>

      {/* player */}
      <div className="relative flex-1 min-h-0 flex items-center justify-center px-4 md:px-10 pb-6 md:pb-10">
        <div
          className="relative h-full max-h-full"
          style={{ aspectRatio: `${video.width} / ${video.height}`, maxWidth: "100%" }}
        >
          {video.provider === "local" && video.sources && (
            <video
              ref={videoRef}
              className="h-full w-full object-contain bg-ink"
              controls
              autoPlay
              playsInline
              poster={video.thumbnail}
              aria-label={video.title}
            >
              {video.sources.map((s) => (
                <source key={s.src} src={s.src} type={s.type} />
              ))}
              O seu navegador não suporta vídeo HTML5.
            </video>
          )}

          {video.provider !== "local" && video.embedUrl && (
            <iframe
              src={video.embedUrl}
              title={video.title}
              className="h-full w-full"
              style={{ border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </div>
  );
}
