import type { Pelada } from "@/store/pelada/types";
import { Flame, Target, Trophy } from "lucide-react";
import type { TeamStatsMap } from "./use-history";

interface TeamStatisticsProps {
  stats: TeamStatsMap;
  pelada: Pelada;
}
export function TeamStatistics({ stats, pelada }: TeamStatisticsProps) {
  return (
    <>
      {Object.keys(stats).length > 0 && (
        <div className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
            <Trophy className="size-5 text-emerald-400" />
            Estatísticas por Time
          </h3>
          <div className="space-y-3">
            {Object.entries(stats)
              .sort(([, a], [, b]) => b.wins - a.wins)
              .map(([teamId, stat]) => {
                const team = pelada.queue.find((t) => t.id === teamId);
                if (!team) return null;

                return (
                  <div key={teamId} className="rounded-lg bg-zinc-800/50 p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-semibold text-white">
                        {team.name}
                      </span>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1 text-emerald-400">
                          <Trophy className="size-3" /> {stat.wins}
                        </span>
                        <span className="text-zinc-500">|</span>
                        <span className="flex items-center gap-1 text-blue-400">
                          <Target className="size-3" /> {stat.goals}
                        </span>
                        {stat.maxStreak > 1 && (
                          <>
                            <span className="text-zinc-500">|</span>
                            <span className="flex items-center gap-1 text-amber-400">
                              <Flame className="size-3" /> {stat.maxStreak}x
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-zinc-600">
                      {stat.matches} partidas •{" "}
                      {Math.round((stat.wins / stat.matches) * 100)}% de
                      vitórias
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}
