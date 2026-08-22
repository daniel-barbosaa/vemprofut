import type { Match, Pelada } from "@/store/pelada/types";
import { Users } from "lucide-react";

interface QueuePreviewProps {
  match: Match;
  pelada: Pelada;
}
export function QueuePreview({ match, pelada }: QueuePreviewProps) {
  return (
    <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wider text-zinc-400 uppercase">
        <Users className="size-4" />
        Visão da Fila
      </div>

      <div className="space-y-3">
        <div className="rounded-lg border border-emerald-700/30 bg-emerald-900/20 p-3">
          <div className="mb-2 text-xs font-semibold text-emerald-400 uppercase">
            Em Jogo
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-white">{match.teamA.name}</span>
            <span className="text-sm text-emerald-400">VS</span>
            <span className="font-bold text-white">{match.teamB.name}</span>
          </div>
        </div>

        {(() => {
          const restingTeam = pelada.queue.find((t) => t.isResting);
          return restingTeam ? (
            <div className="rounded-lg border-2 border-amber-600/50 bg-amber-900/30 p-3">
              <div className="mb-1 flex items-center gap-1 text-xs font-semibold text-amber-400 uppercase">
                Fila de Descanso
              </div>
              <div className="mb-2 text-lg font-bold text-white">
                {restingTeam.name}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs text-amber-400">
                  <span>🔥</span>
                  <span>{pelada.maxConsecutiveWins} vitórias consecutivas</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-amber-400/90">
                  <span>⏳</span>
                  <span>
                    {restingTeam.matchesToRest && restingTeam.matchesToRest > 0
                      ? `${restingTeam.matchesToRest} partida${restingTeam.matchesToRest > 1 ? "s" : ""} restante${restingTeam.matchesToRest > 1 ? "s" : ""}`
                      : "Fora da próxima partida"}
                  </span>
                </div>
              </div>
            </div>
          ) : null;
        })()}

        {(() => {
          const restingTeam = pelada.queue.find((t) => t.isResting);

          if (
            restingTeam &&
            restingTeam.matchesToRest &&
            restingTeam.matchesToRest > 0
          ) {
            return (
              <div className="rounded-lg border border-zinc-700/50 bg-zinc-900/50 p-3">
                <div className="mb-1 text-xs font-semibold text-zinc-500 uppercase">
                  Próxima Partida
                </div>
                <div className="text-xs text-zinc-400">
                  Definida após o término desta partida
                </div>
              </div>
            );
          }

          const restingTeamReady =
            restingTeam && restingTeam.matchesToRest === 0;
          const nextOpponent = restingTeamReady ? restingTeam : pelada.queue[2];

          if (!nextOpponent) return null;

          return (
            <div className="rounded-lg border border-blue-700/30 bg-blue-900/20 p-3">
              <div className="mb-2 flex items-center gap-1 text-xs font-semibold text-blue-400 uppercase">
                Próxima Partida
              </div>
              <div className="text-sm text-white">
                Vencedor desta partida{" "}
                <span className="mx-1 text-blue-400">VS</span>{" "}
                {nextOpponent.name}
              </div>
              {restingTeamReady && (
                <div className="mt-1 text-xs text-blue-400/70">
                  {restingTeam.name} retorna com prioridade da fila de descanso
                </div>
              )}
            </div>
          );
        })()}

        {(() => {
          const waitingTeams = pelada.queue
            .slice(2)
            .filter((t) => !t.isResting);

          if (waitingTeams.length === 0) return null;

          return (
            <div className="space-y-2">
              <div className="text-xs font-semibold text-zinc-500 uppercase">
                Fila de Espera
              </div>
              {waitingTeams.map((team, idx) => (
                <div
                  key={team.id}
                  className="flex items-center gap-3 rounded-lg bg-zinc-900/50 p-2"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-zinc-500">
                    {idx + 1}º
                  </div>
                  <span className="text-sm font-medium text-zinc-400">
                    {team.name}
                  </span>
                </div>
              ))}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
