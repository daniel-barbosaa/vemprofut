import type { Pelada } from "@/store/pelada/types";
import { MoveRight } from "lucide-react";
import { motion } from "motion/react";

interface TeamReturnNoticeProps {
  pelada: Pelada;
}
export function TeamReturnNotice({ pelada }: TeamReturnNoticeProps) {
  const returnedTeam = pelada.queue[0]?.justReturned
    ? pelada.queue[0]
    : pelada.queue[1]?.justReturned
      ? pelada.queue[1]
      : null;

  if (returnedTeam) return null;

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="mb-6 rounded-xl border border-amber-600/50 bg-linear-to-r from-amber-900/40 to-yellow-900/40 p-5"
    >
      <div className="flex items-center gap-3">
        <MoveRight className="size-7 text-amber-400" />

        <div>
          <div className="text-lg font-bold text-amber-300">
            {pelada.queue[0]?.justReturned
              ? pelada.queue[0].name
              : pelada.queue[1]?.name}{" "}
            retornou!
          </div>
          <div className="mt-1 text-sm text-amber-400/70">
            Time volta à quadra após descanso
          </div>
        </div>
      </div>
    </motion.div>
  );
}
