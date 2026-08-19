import { motion } from "motion/react";
import { fadeUp } from "./utils/animation-variables";

const steps = [
  {
    number: "01",
    title: "Crie sua pelada",
    description:
      "Defina o nome, a duração das partidas, o limite de gols e as regras que vão valer durante as partidas.",
  },
  {
    number: "02",
    title: "Adicione os jogadores",
    description:
      "Monte a lista de quem vai jogar e tenha todos os jogadores organizados em um só lugar.",
  },
  {
    number: "03",
    title: "Sorteie os times",
    description:
      "Com a lista pronta, o VemProFut distribui os jogadores automaticamente e monta os times.",
  },
  {
    number: "04",
    title: "Comece a jogar",
    description:
      "Controle as partidas, registre os gols e acompanhe tudo o que acontece durante a pelada.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-24">
      <div className="mx-auto max-w-300 px-6">
        <motion.div {...fadeUp} className="mb-14">
          <span className="text-[11px] font-bold tracking-[0.16em] text-emerald-400 uppercase">
            Antes do apito
          </span>

          <h2 className="mt-3.5 text-[38px] leading-[1.1] font-extrabold tracking-[-1px] text-white sm:text-5xl">
            Você define as regras.
            <br />
            <span className="text-emerald-400">O VemProFut</span> cuida da
            organização.
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-5 w-px bg-linear-to-b from-emerald-500 via-emerald-500/40 to-transparent sm:left-6.5" />

          <div className="flex flex-col">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                {...fadeUp}
                transition={{
                  ...fadeUp.transition,
                  delay: index * 0.1,
                }}
                className="relative grid grid-cols-[40px_1fr] items-start gap-5 py-6 sm:grid-cols-[52px_1fr]"
              >
                <div
                  className={[
                    "relative z-10 flex aspect-square items-center justify-center rounded-full border",
                    index === 0
                      ? "border-emerald-500 bg-emerald-500 shadow-[0_0_24px_rgba(16,185,129,0.2)]"
                      : "border-zinc-800 bg-zinc-900",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "font-bold",
                      index === 0 ? "text-white" : "text-zinc-500",
                    ].join(" ")}
                  >
                    {step.number}
                  </span>
                </div>

                <div className="pt-1.5 sm:pt-2">
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>

                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-zinc-500">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
