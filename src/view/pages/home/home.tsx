import { useActivePelada } from "@/app/hooks/use-active-pelada";
import { usePeladaStore } from "@/store/pelada/pelada.store";
import { Screen } from "@/view/components/screen";
import { Spinner } from "@/view/components/ui/spinner";
import { Clock, History, Play, Plus, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useHomeController } from "./use-home-controller";

export function Home() {
  const navigate = useNavigate();
  const { pelada, startMatch, startNextMatch } = usePeladaStore();
  const { finishPelada } = useHomeController();
  const isMatchActive = pelada?.currentMatch?.isActive ?? false;
  const { isLoading } = useActivePelada();
  const nextTeams = pelada?.queue.slice(0, 2);
  const hasNextMatch = nextTeams?.length === 2;

  const handleStartMatch = () => {
    if (pelada && pelada.queue.length >= 2) {
      startMatch();
      navigate("/match");
    }
  };

  useEffect(() => {
    if (
      pelada?.currentMatch &&
      !pelada.currentMatch.isActive &&
      !pelada.queueManuallyOrganized
    ) {
      startNextMatch();
    }
  }, [pelada?.currentMatch, pelada?.queueManuallyOrganized, startNextMatch]);

  return (
    <Screen>
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

      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <Spinner size="md" />

          <h2 className="mt-2 mb-2 text-lg font-semibold text-white">
            Carregando informações...
          </h2>

          <p className="text-sm text-zinc-500">
            Estamos recuperando os dados da sua última sessão.
          </p>
        </motion.div>
      ) : pelada ? (
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

            {hasNextMatch && !isMatchActive && (
              <div className="mb-6 rounded-2xl border border-emerald-700/30 bg-linear-to-br from-emerald-900/20 to-zinc-900 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
                  <span className="text-xs font-semibold tracking-wide text-emerald-400 uppercase">
                    Próxima partida
                  </span>
                </div>

                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                  <p className="truncate text-right font-semibold text-white">
                    {nextTeams[0].name}
                  </p>
                  <span className="rounded-full border border-zinc-700 bg-zinc-950 px-2.5 py-1 text-xs font-bold text-zinc-400">
                    VS
                  </span>
                  <p className="truncate font-semibold text-white">
                    {nextTeams[1].name}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {isMatchActive ? (
                <button
                  onClick={() => navigate("/match")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-4 font-semibold text-white transition-all hover:bg-emerald-600 active:scale-95"
                >
                  <Play className="size-5" />
                  Continuar Partida
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
    </Screen>
  );
}
