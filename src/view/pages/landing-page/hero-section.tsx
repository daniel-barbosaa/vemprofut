import { cn } from "@/app/utils/class-name-merger";
import {
  BadgeCheck,
  History,
  Play,
  Smartphone,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { PhoneFrame } from "./components/phone-frame";
import { fadeLeft, fadeRight } from "./utils/animation-variables";

function FloatingBadge({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: {
          delay,
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        },
        scale: {
          delay,
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        },
        y: {
          delay: delay + 0.5,
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className={cn(
        "absolute rounded-[14px] border border-zinc-800 bg-zinc-900 px-3.5 py-2",
        "shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-md",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

function HeroPhoneContent() {
  const matchInfo = [
    ["12", "Jogadores"],
    ["5", "Partidas"],
  ];

  const restQueue = [
    ["Time A", "Próximo"],
    ["Time B", "2º da fila"],
    ["Time C", "3º da fila"],
  ];
  return (
    <div className="h-full overflow-hidden bg-zinc-950">
      <div className="flex items-center justify-between px-4 pt-3 pb-2.5">
        <p className="text-xs font-medium tracking-wide text-emerald-400">
          VEMPROFUT
        </p>

        <button className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-1.5 py-2 text-sm text-[10px] text-zinc-400 transition">
          <History className="size-3" />
          Resumos
        </button>
      </div>

      <div className="mx-3 mt-2.5 rounded-2xl border border-emerald-700/30 bg-linear-to-br from-emerald-900/30 to-emerald-950/30 p-3.5 pb-3">
        <div className="mb-2.5 flex items-start justify-between">
          <div>
            <div className="text-[15px] font-bold text-white">
              Quarta dos Amigos
            </div>
            <div className="mt-0.5 text-[11px] text-emerald-400">
              Pelada em andamento
            </div>
          </div>
          <Trophy className="size-5" color="#34d399" />
        </div>
        <div className="mb-2.5 grid grid-cols-2 gap-2">
          {matchInfo.map(([player, match]) => (
            <div
              key={match}
              className="rounded-[10px] bg-zinc-950/50 px-2.5 py-2"
            >
              <div className="mb-0.5 text-[9px] text-zinc-500">{match}</div>
              <div className="text-xl font-bold text-white">{player}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-1.5 rounded-[10px] bg-emerald-500 py-2">
          <Play className="size-4" color="#fff" />
          <span className="text-xs font-semibold text-white">
            Iniciar Próxima Partida
          </span>
        </div>

        <div className="mt-2 flex items-center justify-center rounded-[10px] bg-zinc-800 py-2 text-zinc-300">
          <span className="text-xs font-semibold">Encerrar pelada</span>
        </div>
      </div>

      <div className="mx-3 mt-2.5 rounded-2xl border border-zinc-800 bg-zinc-900 p-3">
        <div className="mb-2 text-xs font-semibold text-white">
          Fila de Espera
        </div>
        {restQueue.map(([team, queueState]) => (
          <div
            key={team}
            className="mb-1.25 flex items-center justify-between rounded-lg bg-zinc-800/50 px-2 py-1.5"
          >
            <span className="text-[11px] font-semibold text-white">{team}</span>
            <span className="text-[10px] text-zinc-500">{queueState}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  const microInfoItems = [
    { icon: Zap, label: "Times prontos rapidinho" },
    { icon: Smartphone, label: "Tudo pelo celular" },
    { icon: BadgeCheck, label: "Sem complicação" },
  ];
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-25 pb-20">
      <div className="left-[55%]size-120 pointer-events-none absolute top-[30%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.07)_0%,transparent_70%)]" />

      <div className="mx-auto grid w-full max-w-300 items-center gap-14 lg:grid-cols-2 lg:gap-18">
        <motion.div {...fadeLeft} className="flex flex-col gap-5.5">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-700/30 bg-emerald-500/12 px-3 py-1 text-[11px] font-bold tracking-[0.12em] text-emerald-400 uppercase">
            Instale no celular · Leve e rápido
          </span>

          <h1 className="text-[54px] leading-[1.1] font-extrabold tracking-[-1px] text-white lg:text-[70px]">
            Sua pelada nunca mais vai ser uma{" "}
            <span className="text-emerald-400">bagunça.</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-zinc-500">
            Organize os jogadores, monte os times, controle cada partida e tenha
            o histórico completo da sua pelada em um só lugar.
          </p>

          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-7 py-3.75 text-base font-semibold text-white shadow-[0_8px_32px_rgba(16,185,129,0.25)] transition-colors hover:bg-emerald-600 active:scale-[0.97]">
              Começar agora
            </button>
            <a
              href="#como-funciona"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-7 py-3.5 text-base font-semibold text-zinc-300 no-underline transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
            >
              Como funciona
            </a>
          </div>

          <div className="flex flex-wrap gap-7 pt-2">
            {microInfoItems.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="size-4 text-emerald-400" />
                <span className="text-xs text-zinc-500">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeRight} className="relative flex justify-center">
          <PhoneFrame>
            <HeroPhoneContent />
          </PhoneFrame>

          <FloatingBadge className="top-15 -left-2.5" delay={0.3}>
            <div className="flex items-center gap-1.5">
              <Users size={12} className="text-emerald-400" />
              <span className="text-xs font-bold text-white">12 jogadores</span>
            </div>
          </FloatingBadge>

          <FloatingBadge className="top-40 -right-2.5" delay={0.5}>
            <span className="text-xs font-bold text-emerald-400">Time A</span>

            <span className="mx-1.5 text-xs text-zinc-500">2 × 1</span>

            <span className="text-xs font-bold text-white">Time B</span>
          </FloatingBadge>

          <FloatingBadge className="bottom-40 -left-2.5" delay={0.7}>
            <div className="flex items-center gap-1.5">
              <Trophy size={12} className="text-amber-400" />
              <span className="text-xs font-bold text-white">
                3 vitórias seguidas
              </span>
            </div>
          </FloatingBadge>

          <FloatingBadge className="-right-2.5 bottom-15" delay={0.9}>
            <span className="text-[11px] font-semibold text-zinc-500">
              ✓ Pelada finalizada
            </span>
          </FloatingBadge>
        </motion.div>
      </div>
    </section>
  );
}
