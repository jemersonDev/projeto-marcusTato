"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Seleção de imagem de referência. IMPORTANTE: o arquivo NÃO é enviado a
 * lugar nenhum — validamos tipo/tamanho e guardamos só o nome, mostrando uma
 * prévia local. A imagem em si o cliente envia na conversa do WhatsApp.
 * (Arquitetura pronta para, no futuro, subir para um storage configurado.)
 */
const MAX_MB = 8;

export default function ReferenceUpload({
  onFile,
  onSkip,
}: {
  onFile: (name: string) => void;
  onSkip: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handle = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Envie um arquivo de imagem (JPG, PNG, etc.).");
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`Imagem muito grande (máximo ${MAX_MB}MB).`);
      return;
    }
    setError(null);
    setPreview(URL.createObjectURL(file));
    onFile(file.name);
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => handle(e.target.files?.[0])}
      />

      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt="Prévia da referência"
          className="w-full max-h-40 object-cover border border-ash"
        />
      )}

      {error && (
        <p className="text-xs" style={{ color: "#d68a8a" }} role="alert">
          {error}
        </p>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex-1 text-sm border border-ash text-bone px-4 py-3 hover:bg-carbon transition-colors"
        >
          Anexar imagem
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="text-sm border border-ash text-smoke px-4 py-3 hover:text-bone transition-colors"
        >
          Pular
        </button>
      </div>
    </div>
  );
}
