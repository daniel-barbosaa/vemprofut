import type { Team } from "@/store/pelada/types";
import { Clock } from "lucide-react";
import { motion } from "motion/react";

interface WaitingSectionProps {
  teams: Team[];
}

export function WaitingSection({ teams }: WaitingSectionProps) {
  if (!teams.length) {
    return null;
  }

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <Clock className="size-5 text-zinc-500" />

        <h3 className="text-lg font-bold text-white">Aguardando</h3>
      </div>

      <div className="space-y-3">
        {teams.map((team, index) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-zinc-800">
                  <span className="text-sm font-semibold text-zinc-500">
                    {index + 1}º
                  </span>
                </div>

                <div className="font-bold text-white">{team.name}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {team.players.map((player, index) => (
                <div
                  key={player.id}
                  className="flex items-center gap-2 text-sm text-zinc-400"
                >
                  <span className="text-zinc-700">{index + 1}</span>
                  {player.name}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
