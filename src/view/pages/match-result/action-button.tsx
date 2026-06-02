import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
interface ActionButtonProps {
  handleNextMatch(): void;
}
export function ActionButton({ handleNextMatch }: ActionButtonProps) {
  return (
    <motion.button
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      onClick={handleNextMatch}
      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-6 text-lg font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-600 active:scale-95"
    >
      Continuar
      <ArrowRight className="size-6" />
    </motion.button>
  );
}
