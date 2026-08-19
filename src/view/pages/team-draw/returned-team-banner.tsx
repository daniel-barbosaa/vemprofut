import type { Pelada } from "@/store/pelada/types";
import { MoveRight } from "lucide-react";
import { motion } from "motion/react";

interface ReturnedTeamBannerProps {
  pelada: Pelada;
}

export function ReturnedTeamBanner({ pelada }: ReturnedTeamBannerProps) {
  const playingTeams = pelada.queue.slice(0, 2);

  const returnedTeam = playingTeams.find((team) => team.justReturned);

  if (!returnedTeam) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="mb-6 rounded-xl border border-amber-600/50 bg-linear-to-r from-amber-900/40 to-yellow-900/40 p-5"
    >
      <div className="flex items-center gap-3">
        <div className="text-3xl">
          <MoveRight className="size-7 text-amber-400" />
        </div>
        <div>
          <div className="font-bold text-amber-300">
            {playingTeams[0]?.justReturned
              ? playingTeams[0].name
              : playingTeams[1]?.name}{" "}
            voltou após descanso!
          </div>
          <div className="mt-1 text-sm text-amber-400/70">
            Time retorna à rotação após cumprir descanso obrigatório
          </div>
        </div>
      </div>
    </motion.div>
  );
}
