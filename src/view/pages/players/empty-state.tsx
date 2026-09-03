import { Plus } from "lucide-react";

interface EmptyStateProps {
  totalPlayers: number;
  onAddPlayers(onOpen: boolean): void;
}

export function EmptyState({ totalPlayers, onAddPlayers }: EmptyStateProps) {
  if (totalPlayers > 0) {
    return null;
  }
  return (
    <button
      type="button"
      onClick={() => onAddPlayers(true)}
      className="flex w-full flex-col items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-900/50 p-10 text-center transition-colors hover:border-emerald-500/40 hover:bg-zinc-900"
    >
      <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-zinc-800">
        <Plus className="size-8 text-zinc-400" />
      </div>

      <h2 className="mb-2 text-xl font-semibold text-white">
        Adicionar jogadores
      </h2>

      <p className="max-w-xs text-sm text-zinc-500">
        Comece adicionando os jogadores da pelada.
      </p>
    </button>
  );
}
