import { HistoryIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HistoryEmptyState() {
  const navigate = useNavigate();
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
      <button
        onClick={() => navigate("/match")}
        className="rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-white transition-all hover:bg-emerald-600 active:scale-95"
      >
        Iniciar Partida
      </button>
    </div>
  );
}
