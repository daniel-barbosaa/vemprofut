import type { Pelada } from "@/store/pelada/types";
import { Trophy } from "lucide-react";
import { motion } from "motion/react";

interface PlayingTeamsSectionProps {
  pelada: Pelada;
}
export function PlayingTeamsSection({ pelada }: PlayingTeamsSectionProps) {
  const playingTeams = pelada.queue.slice(0, 2);

  if (playingTeams.length < 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wider text-emerald-400 uppercase">
        <Trophy className="size-4" />
        Primeira Partida
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {playingTeams.map((team, index) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl border-2 border-emerald-600/50 bg-linear-to-br from-emerald-900/30 to-emerald-950/30 p-5"
          >
            <div className="mb-3 text-lg font-bold text-emerald-400">
              {team.name}
            </div>
            <div className="space-y-2">
              {team.players.map((player, index) => (
                <div
                  key={player.id}
                  className="flex items-center gap-2 rounded-lg bg-emerald-950/30 px-3 py-2"
                >
                  <span className="flex size-5 items-center justify-center rounded-full bg-emerald-500/30 text-xs font-bold text-emerald-300">
                    {index + 1}
                  </span>
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
