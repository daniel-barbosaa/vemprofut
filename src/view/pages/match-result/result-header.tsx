import { cn } from "@/app/utils/class-name-merger";
import type { Pelada, Team } from "@/store/pelada/types";
import { motion } from "motion/react";

interface ResultHeaderProps {
  isDraw: boolean;
  winner: Team | null;
  pelada: Pelada | null;
  collapsed: boolean;
}

export function ResultHeader({
  isDraw,
  winner,
  pelada,
  collapsed,
}: ResultHeaderProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-8 text-center"
    >
      <h1
        className={cn(
          "font-medium text-white transition-all duration-300",
          collapsed
            ? "-translate-y-4 scale-95 opacity-0"
            : "translate-y-0 text-2xl opacity-100",
        )}
      >
        {isDraw ? "Empate!" : "Partida Finalizada!"}
      </h1>
      <p className="text-zinc-500">
        {isDraw
          ? "Ambos os times foram para o final da fila"
          : winner && winner.consecutiveWins + 1 >= pelada!.maxConsecutiveWins
            ? "Time fica fora da próxima partida e retorna depois"
            : "Vencedor continua, perdedor vai para a fila"}
      </p>
    </motion.div>
  );
}
