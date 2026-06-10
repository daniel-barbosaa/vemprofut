import { ArrowLeft, Calendar, FileText, Target, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useSummary } from "./use-summary";

export function Summaries() {
  const navigate = useNavigate();
  const { summariesBuilt } = useSummary();

  const formatDate = (dateString: number) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 pb-24">
      <div className="mx-auto max-w-2xl p-6">
        <div className="mb-6 flex items-start gap-3">
          <button
            onClick={() => navigate("/home")}
            className="mb-4 flex size-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all hover:border-zinc-700 hover:bg-zinc-800 hover:text-white active:scale-95"
          >
            <ArrowLeft className="size-5" />
          </button>

          <div>
            <h1 className="text-3xl font-bold text-white">
              Sessões Anteriores
            </h1>

            <p className="text-zinc-500">
              Revise resultados, estatísticas e resumos compartilháveis.
            </p>
          </div>
        </div>

        {summariesBuilt.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-16 text-center"
          >
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
              <FileText className="size-12 text-zinc-700" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-white">
              Nenhum resumo encontrado
            </h2>
            <p className="mx-auto mb-8 max-w-md text-zinc-500">
              As peladas finalizadas aparecerão aqui para consulta e
              compartilhamento.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {summariesBuilt.map((summary, index) => (
              <motion.div
                key={summary.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition-all hover:border-emerald-700/30"
              >
                <div className="mb-3 flex items-center gap-2 text-sm text-zinc-400">
                  <Calendar className="size-4" />
                  <span>{formatDate(summary.pelada.createdAt)}</span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-white">
                  {summary.pelada.name}
                </h3>

                <div className="mb-4 rounded-xl border border-yellow-700/30 bg-linear-to-r from-yellow-900/20 to-amber-900/20 p-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="size-5 text-yellow-400" />
                    <div>
                      <div className="text-xs font-semibold tracking-wide text-yellow-400 uppercase">
                        Campeão
                      </div>
                      <div className="font-bold text-white">
                        {summary.stats?.champion.name}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4 flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="rounded-lg bg-emerald-500/20 p-2">
                      <Trophy className="size-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="font-bold text-white">
                        {summary.stats?.matchesCount}
                      </div>
                      <div className="text-xs text-zinc-500">partidas</div>
                    </div>
                  </div>

                  <div className="h-10 w-px bg-zinc-800" />

                  <div className="flex items-center gap-2 text-sm">
                    <div className="rounded-lg bg-blue-500/20 p-2">
                      <Target className="size-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-bold text-white">
                        {summary.stats?.goals}
                        10
                      </div>
                      <div className="text-xs text-zinc-500">gols</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    navigate(`/summaries/${summary.id}`, {
                      state: {
                        summary,
                      },
                    })
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-600/30 bg-emerald-500/20 px-4 py-2.5 text-sm font-semibold text-emerald-400 transition-all hover:bg-emerald-500/30"
                >
                  <FileText className="size-4" />
                  Ver Resumo
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
