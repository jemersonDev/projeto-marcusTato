"use client";

/**
 * Botão de envio/handoff para o WhatsApp. `href` vem pronto (com a mensagem),
 * montado a partir de contactConfig — nunca com número inventado. Se não houver
 * número configurado, o botão fica desabilitado com uma nota.
 */
export default function WhatsAppButton({
  href,
  label,
  onBack,
}: {
  href: string | null;
  label: string;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center text-sm bg-bone text-ink px-4 py-3 font-medium tracking-wide hover:bg-white transition-colors"
        >
          {label}
        </a>
      ) : (
        <p className="text-xs text-smoke border border-ash px-4 py-3">
          WhatsApp ainda não configurado. Adicione o número em contactConfig.
        </p>
      )}
      <button
        type="button"
        onClick={onBack}
        className="text-center text-sm border border-ash text-bone px-4 py-3 hover:bg-carbon transition-colors"
      >
        Voltar
      </button>
    </div>
  );
}
