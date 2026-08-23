import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

import { Screen } from "@/view/components/screen";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <Screen className="flex min-h-screen flex-col bg-zinc-900">
      <div className="mb-6">
        <p className="text-xs font-medium tracking-wide text-emerald-400">
          VEMPROFUT
        </p>
      </div>

      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex flex-1 flex-col items-center justify-center pb-12 text-center"
      >
        <div className="relative">
          <span className="text-[clamp(7rem,32vw,11rem)] leading-none font-black tracking-[-0.08em] text-white/95">
            404
          </span>

          <span className="absolute -bottom-1 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-emerald-500" />
        </div>

        <div className="mt-8 max-w-sm">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Página não encontrada
          </h1>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            O endereço que você acessou não existe ou não está mais disponível.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-8 flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 font-semibold text-white transition-all hover:bg-emerald-600 active:scale-95"
        >
          <ArrowLeft className="size-4" />
          Voltar para o início
        </button>
      </motion.main>
    </Screen>
  );
}
