import type { Team } from "@/store/pelada/types";
import { Flame, MoveRight, Trophy } from "lucide-react";
import { motion } from "motion/react";

interface PlayingSectionProps {
  teams: Team[];
}

export function PlayingSection({ teams }: PlayingSectionProps) {
  if (!teams.length) {
    return null;
  }

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <Trophy className="size-5 text-emerald-400" />

        <h3 className="text-lg font-bold text-white">Jogando Agora</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {teams.map((team, index) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl border-2 border-emerald-600/50 bg-linear-to-br from-emerald-900/40 to-emerald-950/40 p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-xl font-bold text-emerald-400">
                  {team.name}
                </div>

                {team.justReturned && (
                  <div className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-1">
                    <MoveRight className="size-3.5 text-amber-400" />
                    <span className="text-xs leading-none font-bold text-amber-400">
                      RETORNOU
                    </span>
                  </div>
                )}
              </div>

              {team.consecutiveWins > 0 && (
                <div className="rounded-full bg-amber-500/20 px-3 py-1">
                  <span className="flex gap-2 text-sm font-semibold text-amber-400">
                    <Flame className="size-4" /> {team.consecutiveWins}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              {team.players.map((player, index) => (
                <div
                  key={player.id}
                  className="flex items-center gap-3 rounded-lg bg-emerald-950/30 px-3 py-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-full bg-emerald-500/30 text-xs font-bold text-emerald-300">
                    {index + 1}
                  </div>

                  <span className="text-sm font-medium text-white">
                    {player.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
