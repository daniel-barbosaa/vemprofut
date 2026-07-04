import { usePeladaStore } from "@/store/pelada/pelada.store";
import { Clock, History, Play, Plus, Trophy, Users } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useHomeController } from "./use-home-controller";

export function Home() {
  const navigate = useNavigate();
  const { pelada, startMatch, startNextMatch } = usePeladaStore();
  const { finishPelada } = useHomeController();
  const isMatchActive = pelada?.currentMatch?.isActive ?? false;
  const hasFinishedMatchPendingQueueUpdate = Boolean(
    pelada?.currentMatch && !pelada.currentMatch.isActive,
  );

  const handleStartMatch = () => {
    if (pelada && pelada.queue.length >= 2) {
      startMatch();
      navigate("/match");
    }
  };

  const handlePrepareNextMatch = () => {
    startNextMatch();
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-xs font-medium tracking-wide text-emerald-400">
          VEMPROFUT
        </p>

        <button
          onClick={() => navigate("/summaries")}
          className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-400 transition hover:text-emerald-400"
        >
          <History className="size-4" />
          Resumos
        </button>
      </div>

      {pelada ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="rounded-2xl border border-emerald-700/30 bg-linear-to-br from-emerald-900/30 to-emerald-950/30 p-6">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 className="mb-1 text-2xl font-bold text-white">
                  {pelada.name}
                </h2>
                <p className="text-sm text-emerald-400">Pelada em andamento</p>
              </div>
              <Trophy className="size-8 text-emerald-400" />
            </div>

            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-zinc-900/50 p-4">
                <div className="mb-1 text-xs text-zinc-400">Jogadores</div>
                <div className="text-2xl font-bold text-white">
                  {pelada.players.length}
                </div>
              </div>
              <div className="rounded-xl bg-zinc-900/50 p-4">
                <div className="mb-1 text-xs text-zinc-400">Partidas</div>
                <div className="text-2xl font-bold text-white">
                  {pelada.matches.length}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {isMatchActive ? (
                <button
                  onClick={() => navigate("/match")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-4 font-semibold text-white transition-all hover:bg-emerald-600 active:scale-95"
                >
                  <Play className="size-5" />
                  Continuar Partida
                </button>
              ) : hasFinishedMatchPendingQueueUpdate ? (
                <button
                  onClick={handlePrepareNextMatch}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-4 font-semibold text-white transition-all hover:bg-emerald-600 active:scale-95"
                >
                  <Play className="size-5" />
                  Organizar Próxima Partida
                </button>
              ) : pelada.queue.length >= 2 ? (
                <button
                  onClick={handleStartMatch}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-4 font-semibold text-white transition-all hover:bg-emerald-600 active:scale-95"
                >
                  <Play className="size-5" />
                  Iniciar Próxima Partida
                </button>
              ) : (
                <button
                  onClick={() => navigate("/players")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-4 font-semibold text-white transition-all hover:bg-emerald-600 active:scale-95"
                >
                  <Plus className="size-5" />
                  Adicionar Jogadores
                </button>
              )}

              <button
                onClick={async () => {
                  const confirmed = confirm(
                    "Tem certeza que deseja encerrar esta pelada?",
                  );

                  if (!confirmed) return;

                  await finishPelada();
                }}
                className="w-full rounded-xl bg-zinc-800 py-3 font-medium text-zinc-300 transition-all hover:bg-zinc-700"
              >
                Encerrar Pelada
              </button>
            </div>
          </div>

          {!isMatchActive && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <h3 className="mb-4 text-lg font-semibold text-white">
                Controle da pelada
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate("/teams")}
                  className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl bg-zinc-800 p-4 text-zinc-200 transition-colors hover:bg-zinc-700 active:scale-95"
                >
                  <Users className="size-6 text-emerald-400" />
                  <span className="text-sm font-semibold">Times</span>
                </button>

                <button
                  onClick={() => navigate("/history")}
                  className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl bg-zinc-800 p-4 text-zinc-200 transition-colors hover:bg-zinc-700 active:scale-95"
                >
                  <History className="size-6 text-emerald-400" />
                  <span className="text-sm font-semibold">Histórico</span>
                </button>
              </div>
            </div>
          )}

          {pelada.queue.find((team) => team.isResting) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border-2 border-amber-600/50 bg-linear-to-br from-amber-900/30 to-yellow-900/30 p-5"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="text-3xl">👑</div>
                <div>
                  <div className="text-lg font-bold text-amber-300">
                    Fila de Descanso
                  </div>
                  <div className="text-sm text-amber-400/70">
                    Time aguardando retorno
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-amber-600/40 bg-amber-900/40 p-4">
                <div className="mb-2 text-lg font-bold text-white">
                  {pelada.queue.find((team) => team.isResting)?.name}
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2 text-amber-300">
                    <span>🔥</span>
                    <span>
                      {pelada.maxConsecutiveWins} vitórias consecutivas
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-300">
                    <span>⏳</span>
                    <span>
                      {(() => {
                        const rt = pelada.queue.find((team) => team.isResting);
                        return rt?.matchesToRest && rt.matchesToRest > 0
                          ? `${rt.matchesToRest} partida${rt.matchesToRest > 1 ? "s" : ""} restante${rt.matchesToRest > 1 ? "s" : ""}`
                          : "Fora da próxima partida";
                      })()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {pelada.matches.length > 0 && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="mb-4 text-lg font-semibold text-white">
                Últimas Partidas
              </h3>
              <div className="space-y-3">
                {pelada.matches
                  .slice(-3)
                  .reverse()
                  .map((match) => (
                    <div
                      key={match.id}
                      className="flex items-center justify-between rounded-xl bg-zinc-800/50 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="size-4 text-zinc-500" />
                        <div>
                          <div className="font-medium text-white">
                            {match.teamA.name} vs {match.teamB.name}
                          </div>
                          <div className="text-sm text-zinc-500">
                            {new Date(match.startTime).toLocaleTimeString(
                              "pt-BR",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-xl font-bold text-emerald-400">
                        {match.teamA.score} - {match.teamB.score}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-16 text-center"
        >
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
            <Trophy className="size-12 text-zinc-700" />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-white">
            Nenhuma pelada ativa
          </h2>
          <p className="mb-8 text-zinc-500">
            Crie uma nova pelada para começar
          </p>

          <button
            onClick={() => navigate("/create")}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-white transition-all hover:bg-emerald-600 active:scale-95"
          >
            <Plus className="size-5" />
            Nova Pelada
          </button>
        </motion.div>
      )}
    </>
  );
}
