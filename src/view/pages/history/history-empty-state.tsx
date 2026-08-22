import { HistoryIcon } from "lucide-react";

export function HistoryEmptyState() {
  return (
    <div className="py-16 text-center">
      <div className="mx-auto mb-6 flex size-24 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
        <HistoryIcon className="size-12 text-zinc-700" />
      </div>
      <h2 className="mb-2 text-xl font-semibold text-white">
        Nenhuma partida registrada
      </h2>
      <p className="mb-8 text-zinc-500">
        As partidas aparecerão aqui após serem finalizadas
      </p>
    </div>
  );
}
