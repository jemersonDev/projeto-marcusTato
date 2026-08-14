"use client";

/** Lista de opções (chips) que o usuário pode tocar. */
export default function ChatOptions({
  options,
  onPick,
}: {
  options: { key: string; label: string }[];
  onPick: (key: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          onClick={() => onPick(o.key)}
          className="text-left text-sm border border-ash text-bone px-4 py-3 hover:bg-bone hover:text-ink transition-colors"
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
