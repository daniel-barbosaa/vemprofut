import type { Pelada } from "@/store/pelada/types";

interface StatisticsOverviewProps {
  pelada: Pelada;
}
export function StatisticsOverview({ pelada }: StatisticsOverviewProps) {
  const totalGoals = pelada.matches.reduce(
    (sum, match) => sum + match.teamA.score + match.teamB.score,
    0,
  );

  return (
    <div className="mb-6 grid grid-cols-2 gap-4">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <div className="mb-1 text-xs font-semibold text-zinc-500 uppercase">
          Total de Partidas
        </div>
        <div className="text-3xl font-bold text-white">
          {pelada.matches.length.toString()}
        </div>
      </div>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <div className="mb-1 text-xs font-semibold text-zinc-500 uppercase">
          Gols Marcados
        </div>
        <div className="text-3xl font-bold text-white">{totalGoals}</div>
      </div>
    </div>
  );
}
