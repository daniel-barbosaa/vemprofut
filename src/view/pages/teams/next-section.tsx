import type { Team } from "@/store/pelada/types";
import { MoveRight } from "lucide-react";
import { motion } from "motion/react";

interface NextSectionProps {
  team: Team | null;
}

export function NextSection({ team }: NextSectionProps) {
  if (!team) {
    return null;
  }

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <MoveRight className="size-5 text-blue-400" />

        <h3 className="text-lg leading-none font-bold text-white">
          Próximo a Entrar
        </h3>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="rounded-2xl border-2 border-blue-700/30 bg-linear-to-br from-blue-900/20 to-blue-950/20 p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="text-xl font-bold text-blue-400">{team.name}</div>

          <div className="rounded-full bg-blue-500/20 px-3 py-1">
            <span className="text-xs font-semibold text-blue-400 uppercase">
              Próximo
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {team.players.map((player, index) => (
            <div
              key={player.id}
              className="flex items-center gap-3 rounded-lg bg-blue-950/20 px-3 py-2"
            >
              <div className="flex size-6 items-center justify-center rounded-full bg-blue-500/30 text-xs font-bold text-blue-300">
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
