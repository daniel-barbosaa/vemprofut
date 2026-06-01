import { motion } from "motion/react";

import type { Substitution } from "@/store/pelada/types";
import { ChevronUp } from "lucide-react";

interface RecentSubstitutionsProps {
  substitutions: Substitution[];
}

export function RecentSubstitutionsCard({
  substitutions,
}: RecentSubstitutionsProps) {
  if (!substitutions.length) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="mb-6 rounded-xl border border-blue-700/30 bg-blue-900/20 p-5"
    >
      <div className="mb-3 text-sm font-semibold tracking-wider text-blue-400 uppercase">
        Substituições Recentes
      </div>

      <div className="space-y-2">
        {substitutions.slice(0, 3).map((substitution, index) => (
          <div
            key={`${substitution.timestamp}-${index}`}
            className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3"
          >
            <div className="flex items-center gap-2">
              <div className="flex size-5 items-center justify-center rounded-full bg-emerald-500/10">
                <ChevronUp className="size-3.5 text-emerald-400" />
              </div>

              <span className="font-medium text-white">
                {substitution.inPlayerName}
              </span>

              <span className="text-zinc-500">entrou no</span>

              <span className="font-medium text-emerald-400">
                {substitution.toTeamName}
              </span>
            </div>

            <div className="mt-1 ml-6 text-sm text-zinc-500">
              veio de {substitution.fromTeamName}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
