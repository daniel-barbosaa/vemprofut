import { ClipboardList, ListOrdered, Scale, Users } from "lucide-react";
import { motion } from "motion/react";
import { fadeUp } from "./utils/animation-variables";

const pains = [
  {
    icon: Users,
    question: '"Quem vai?"',
    description: "Organizar a lista de jogadores no grupo vira uma bagunça.",
  },
  {
    icon: Scale,
    question: '"Quem joga com quem?"',
    description:
      "Times montados no improviso, briga por equilíbrio e aquela discussão de sempre antes de começar.",
  },
  {
    icon: ListOrdered,
    question: '"De quem é a vez?"',
    description:
      "Fila, substituições e próximas partidas sem controle. Ninguém concorda com a ordem.",
  },
  {
    icon: ClipboardList,
    question: '"E o resultado?"',
    description:
      "Depois da pelada, ninguém lembra o placar. Nenhum registro. Nenhuma estatística.",
  },
];

export function ProblemSection() {
  return (
    <section className="bg-white/1.5 py-24">
      <div className="mx-auto max-w-300 px-6">
        <motion.div {...fadeUp} className="mb-14 text-center">
          <span className="text-[11px] font-bold tracking-[0.16em] text-emerald-400 uppercase">
            O problema
          </span>

          <h2 className="mt-3.5 text-[38px] leading-[1.1] font-extrabold tracking-[-1px] text-white sm:text-5xl">
            Organizar uma pelada não deveria
            <br className="hidden sm:block" />
            dar tanto trabalho.
          </h2>
        </motion.div>

        <div className="mb-12 grid gap-3.5 sm:grid-cols-2">
          {pains.map(({ icon: Icon, question, description }, index) => (
            <motion.div
              key={question}
              {...fadeUp}
              transition={{
                ...fadeUp.transition,
                delay: index * 0.09,
              }}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5.5 py-6.5 transition-colors hover:border-zinc-700"
            >
              <Icon className="mb-3 size-7 text-emerald-400" />

              <h3 className="mb-2 text-lg font-bold text-white">{question}</h3>

              <p className="text-sm leading-relaxed text-zinc-500">
                {description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp}>
          <div className="rounded-2xl border border-emerald-700/30 bg-linear-to-br from-emerald-900/30 to-emerald-950/30 px-6 py-7 text-center">
            <h2 className="text-2xl leading-[1.1] font-extrabold tracking-[-0.5px] text-emerald-400 sm:text-[30px]">
              O VemProFut resolve tudo isso em um único lugar.
            </h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
