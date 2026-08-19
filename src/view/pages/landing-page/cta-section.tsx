import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { fadeUp } from "./utils/animation-variables";

export function CTASection() {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_50%,rgba(16,185,129,0.07)_0%,transparent_65%)]" />

      <div className="relative mx-auto max-w-215 px-6 text-center">
        <motion.div {...fadeUp} className="flex flex-col items-center gap-5">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-700/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold text-emerald-400 sm:text-[11px]">
            Bora pra próxima pelada
          </div>

          <h2 className="max-w-200 text-[42px] leading-[1.08] font-extrabold tracking-[-1.5px] text-white sm:text-5xl md:text-[60px] lg:text-[64px]">
            Sua próxima pelada pode ser{" "}
            <span className="text-emerald-400">muito mais organizada.</span>
          </h2>

          <p className="max-w-125 text-sm leading-relaxed text-zinc-500 sm:text-base">
            Pare de organizar tudo no improviso. Crie sua pelada no VemProFut e
            deixe o jogo acontecer.
          </p>

          <div className="mt-2">
            <button
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border-none bg-emerald-500 px-8 py-4 text-base font-semibold text-white shadow-[0_8px_32px_rgba(16,185,129,0.25)] transition-all hover:bg-emerald-600 hover:shadow-[0_10px_40px_rgba(16,185,129,0.3)] active:scale-[0.97]"
              onClick={() => navigate("/login")}
            >
              Começar agora
            </button>
          </div>

          <span className="text-[11px] font-medium text-zinc-700">
            Grátis para começar · Sem complicação
          </span>
        </motion.div>
      </div>
    </section>
  );
}
