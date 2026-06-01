import type { Team } from "@/store/pelada/types";
import { Bed, Crown, Flame, Hourglass } from "lucide-react";
import { motion } from "motion/react";

interface RestingSectionProps {
  team: Team | null;
  maxConsecutiveWins: number;
}

export function RestingSection({
  team,
  maxConsecutiveWins,
}: RestingSectionProps) {
  if (!team) {
    return null;
  }

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <Crown className="size-5 text-amber-400" />

        <h3 className="text-lg leading-none font-bold text-white">
          Fila de Descanso
        </h3>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border-2 border-amber-600/50 bg-linear-to-br from-amber-900/30 to-yellow-900/30 p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="text-xl font-bold text-amber-400">{team.name}</div>

          <div className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1">
            <Bed className="size-3.5 text-amber-400" />

            <span className="text-xs leading-none font-semibold text-amber-400 uppercase">
              Descansando
            </span>
          </div>
        </div>

        <div className="mb-4 space-y-2 rounded-lg border border-amber-600/40 bg-amber-900/40 p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
            <Flame className="size-4 text-amber-300" />
            <span>{maxConsecutiveWins} vitórias consecutivas</span>
          </div>

          <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
            <Hourglass className="size-4 text-amber-300" />

            <span>
              {team.matchesToRest && team.matchesToRest > 0
                ? `${team.matchesToRest} partida${team.matchesToRest > 1 ? "s" : ""} restante${team.matchesToRest > 1 ? "s" : ""}`
                : "Fora da próxima partida"}
            </span>
          </div>

          <div className="mt-2 border-t border-amber-700/30 pt-2 text-xs text-amber-400/70">
            Retorna automaticamente após o término da próxima partida
          </div>
        </div>

        <div className="space-y-2">
          {team.players.map((player, index) => (
            <div
              key={player.id}
              className="flex items-center gap-3 rounded-lg bg-amber-950/20 px-3 py-2"
            >
              <div className="flex size-6 items-center justify-center rounded-full bg-amber-500/30 text-xs font-bold text-amber-300">
                {index + 1}
              </div>

              <span className="text-sm font-medium text-white">
                {player.name}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
