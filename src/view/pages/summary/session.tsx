import type { Pelada } from "@/store/pelada/types";
import { Share2 } from "lucide-react";
import { motion } from "motion/react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";
import type { SummaryItem } from "./utils/types";

function SummaryActions() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  return (
    <div className="mt-4 space-y-2">
      <button
        onClick={() => {
          alert("Funcionalidade de compartilhamento em desenvolvimento");
        }}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-sm font-bold text-white transition-all hover:bg-emerald-600 active:scale-95"
      >
        <Share2 className="size-4" />
        Compartilhar Resumo
      </button>

      <button
        onClick={() => navigate(id ? "/summaries" : "/home")}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-3 text-sm font-semibold text-zinc-400 transition-all hover:bg-zinc-700 active:scale-95"
      >
        Voltar
      </button>
    </div>
  );
}

type SummaryCard = {
  id: string;
  pelada: Pelada;
  stats: SummaryItem;
};

export function SessionSummary() {
  const { state } = useLocation();

  const summary = state?.summary as SummaryCard | undefined;

  if (!summary) {
    return <Navigate to="/summaries" />;
  }

  const sessionDate = new Date(summary.pelada.createdAt).toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          id="pelada-summary-card"
          className="flex aspect-9/16 flex-col overflow-hidden rounded-3xl border-2 border-zinc-800 bg-linear-to-br from-zinc-900 via-zinc-900 to-zinc-950"
        >
          <div className="relative shrink-0 overflow-hidden bg-linear-to-r from-emerald-600 to-emerald-500 p-3 text-center">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 size-20 rounded-full bg-white" />
            </div>

            <div className="relative z-10">
              <div className="text-xl">⚽</div>

              <h1 className="text-base font-bold text-white">PeladaPro</h1>

              <p className="text-[10px] font-semibold tracking-wider text-emerald-100 uppercase">
                Resumo da Resenha
              </p>

              <p className="mt-0.5 text-[10px] text-emerald-200/80">
                📅 {sessionDate}
              </p>
            </div>
          </div>

          <div className="flex-1 space-y-2 overflow-hidden px-3 py-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative overflow-hidden rounded-xl border border-yellow-500/50 bg-linear-to-br from-yellow-600/30 to-amber-600/30 p-3"
            >
              <div className="absolute top-0 right-0 text-6xl opacity-10">
                🏆
              </div>

              <div className="relative z-10 text-center">
                <div className="mb-1 text-[10px] font-black tracking-widest text-yellow-400 uppercase">
                  🏆 Campeão
                </div>

                <h3 className="mb-2 truncate text-2xl font-black text-white">
                  {summary.stats.champion.name}
                </h3>

                <div className="flex items-center justify-center gap-3">
                  <div>
                    <div className="text-2xl font-black text-yellow-400">
                      {summary.stats.champion.wins}
                    </div>

                    <div className="text-[10px] font-bold text-yellow-200/70">
                      vitórias
                    </div>
                  </div>

                  <div className="h-8 w-px bg-yellow-500/30" />

                  <div>
                    <div className="text-2xl font-black text-yellow-400">
                      {summary.stats.champion.winRate}%
                    </div>

                    <div className="text-[10px] font-bold text-yellow-200/70">
                      aproveit.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {summary.stats.bestStreak?.maxStreak > 0 &&
              summary.stats.bestStreak?.id !== summary.stats.champion.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-xl border border-orange-700/40 bg-orange-900/20 p-3"
                >
                  <div className="mb-1 flex items-center gap-1 text-xs font-bold tracking-wide text-orange-400 uppercase">
                    🔥 Rei da Sequência
                  </div>
                  <div className="text-sm font-bold text-white">
                    {summary.stats.bestStreak?.name}
                  </div>
                  <div className="mt-0.5 text-xs text-orange-300">
                    Atingiu o limite de 2 vitórias seguidas{" "}
                    {summary.stats.bestStreak?.maxStreak}{" "}
                    {summary.stats.bestStreak?.maxStreak > 1 ? "vezes" : "vez"}
                  </div>
                </motion.div>
              )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl border border-zinc-700 bg-zinc-800/50 p-2.5"
            >
              <div className="mb-2 flex items-center gap-1 text-xs font-bold tracking-wide text-emerald-400 uppercase">
                🥉 Elenco Campeão
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {summary.stats.champion.players
                  .slice(0, 6)
                  .map((player, index) => (
                    <div
                      key={player.id}
                      className="flex items-center gap-1.5 text-xs font-medium text-white"
                    >
                      <div className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                        <span className="text-[10px] font-bold text-emerald-400">
                          {index + 1}
                        </span>
                      </div>
                      <span className="truncate">{player.name}</span>
                    </div>
                  ))}
              </div>
            </motion.div>

            {summary.stats.balancedMatch && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-xl border border-blue-700/40 bg-blue-900/20 p-2.5"
              >
                <div className="mb-1 flex items-center gap-1 text-xs font-bold tracking-wide text-blue-400 uppercase">
                  ⚔️ Jogo da Noite
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="flex-1 text-center">
                    <div className="mb-1 truncate text-xs font-bold text-white">
                      {summary.stats.balancedMatch.teamA.name}
                    </div>
                    <div className="text-2xl font-black text-blue-400">
                      {summary.stats.balancedMatch.teamA.score}
                    </div>
                  </div>
                  <div className="text-xl font-bold text-zinc-600">×</div>
                  <div className="flex-1 text-center">
                    <div className="mb-1 truncate text-xs font-bold text-white">
                      {summary.stats.balancedMatch.teamB.name}
                    </div>
                    <div className="text-2xl font-black text-blue-400">
                      {summary.stats.balancedMatch.teamB.score}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {summary.stats.worstTeam &&
              summary.stats.worstTeam.id !== summary.stats.champion.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="rounded-xl border border-red-800/30 bg-red-900/10 p-2.5"
                >
                  <div className="mb-1 flex items-center gap-1 text-xs font-bold tracking-wide text-red-400 uppercase">
                    🔦 Lanterna
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-white">
                      {summary.stats.worstTeam.name}
                    </div>
                    <div className="text-xs text-red-400">
                      {summary.stats.worstTeam.wins} vitória
                      {summary.stats.worstTeam.wins !== 1 ? "s" : ""} •{" "}
                      {summary.stats.worstTeam.winRate}%
                    </div>
                  </div>
                </motion.div>
              )}
          </div>

          <div className="border-t border-zinc-800 bg-zinc-900/80 p-2.5 text-center backdrop-blur-sm">
            <p className="text-xs font-semibold text-zinc-500">
              Gerado por PeladaPro
            </p>
          </div>
        </motion.div>

        <SummaryActions />
      </div>
    </div>
  );
}
