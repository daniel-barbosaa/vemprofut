import { Trophy, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

export function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-zinc-950 via-zinc-900 to-emerald-950 p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <div className="relative mb-6 inline-block">
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-3xl"></div>
          <Trophy
            className="relative h-24 w-24 text-emerald-400"
            strokeWidth={1.5}
          />
        </div>

        <h1 className="mb-3 text-5xl font-bold text-white">
          Pelada<span className="text-emerald-400">Pro</span>
        </h1>

        <p className="text-lg text-zinc-400">
          Organize suas peladas com rapidez
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full max-w-md space-y-4"
      >
        <button
          onClick={() => navigate("/home")}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-500 py-5 text-lg font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-600 active:scale-95"
        >
          <Zap className="h-6 w-6" />
          Iniciar Pelada
        </button>

        <div className="flex items-center gap-3 px-4 text-sm text-zinc-500">
          <div className="h-px flex-1 bg-zinc-800"></div>
          <span>Rápido • Simples • Prático</span>
          <div className="h-px flex-1 bg-zinc-800"></div>
        </div>
      </motion.div>
    </div>
  );
}
