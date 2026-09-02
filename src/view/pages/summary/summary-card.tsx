import type { Pelada } from "@/store/pelada/types";

import { Gamepad2, Goal, Star, Trophy } from "lucide-react";

import { motion } from "motion/react";

import type { RefObject } from "react";

import type { SummaryItem } from "./utils/types";

export type SummaryCardData = {
  id: string;
  pelada: Pelada;
  stats: SummaryItem;
};

interface SummaryCardProps {
  summary: SummaryCardData;
  summaryRef: RefObject<HTMLDivElement | null>;
}

export function SummaryCard({ summary, summaryRef }: SummaryCardProps) {
  const { pelada, stats } = summary;

  return (
    <motion.div
      ref={summaryRef}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      className="relative mx-auto aspect-9/16 w-full max-w-md overflow-hidden rounded-[28px] border border-emerald-500/10 bg-zinc-950 shadow-2xl"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 size-64 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="absolute -bottom-32 -left-24 size-72 rounded-full bg-emerald-700/10 blur-3xl" />

        <div className="absolute top-1/3 left-1/2 size-48 -translate-x-1/2 rounded-full bg-emerald-400/5 blur-3xl" />
      </div>

      <div className="relative flex h-full flex-col">
        <div className="shrink-0 px-6 pt-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-black tracking-[0.2em] text-emerald-400 uppercase">
                VemProFut
              </div>

              <div className="mt-1 text-[8px] font-medium tracking-[0.12em] text-zinc-600 uppercase">
                Resumo da pelada
              </div>
            </div>

            <div className="flex size-9 items-center justify-center rounded-xl border border-emerald-500/10 bg-emerald-500/5">
              <span>⚽</span>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="truncate text-[20px] font-black tracking-tight text-white">
              {pelada.name}
            </h2>

            <p className="mt-1 text-[9px] font-medium text-zinc-600">
              {new Date(pelada.createdAt).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="relative z-10 shrink-0 px-6 pt-4">
          <div className="rounded-2xl border border-yellow-500/10 bg-yellow-500/5 p-3.5">
            <div className="mb-2.5 flex items-center justify-between">
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-yellow-500/10">
                  <Trophy className="size-4 text-yellow-400" />
                </div>

                <div className="min-w-0">
                  <div className="text-[8px] font-black tracking-[0.14em] text-yellow-400 uppercase">
                    Campeão
                  </div>

                  <div className="mt-0.5 max-w-48 truncate text-[14px] font-black text-white">
                    {stats.champion.name}
                  </div>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <div className="text-[15px] font-black text-yellow-400">
                  {stats.champion.wins}
                </div>

                <div className="text-[7px] font-bold tracking-wider text-zinc-600 uppercase">
                  vitórias
                </div>
              </div>
            </div>

            <div className="h-px bg-yellow-500/10" />

            <div className="mt-2.5 flex items-center justify-between">
              <span className="text-[8px] font-medium text-zinc-500">
                Aproveitamento
              </span>

              <span className="text-[9px] font-black text-yellow-300">
                {stats.champion.winRate}%
              </span>
            </div>

            {stats.champion.players.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {stats.champion.players.map((player) => (
                  <span
                    key={player.id}
                    className="rounded-full bg-yellow-500/5 px-2 py-1 text-[7px] font-semibold text-yellow-200/70"
                  >
                    {player.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {stats.topScorer && (
          <div className="relative z-10 shrink-0 px-6 pt-2.5">
            <div className="relative overflow-hidden rounded-2xl border border-yellow-500/20 bg-linear-to-br from-yellow-500/10 via-amber-500/5 to-transparent p-3.5">
              <div className="pointer-events-none absolute -top-8 -right-8 size-24 rounded-full bg-yellow-400/10 blur-2xl" />

              <div className="relative">
                <div className="mb-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-yellow-400/10">
                      <Goal className="size-3.5 text-yellow-400" />
                    </div>

                    <span className="text-[8px] font-black tracking-[0.16em] text-yellow-400 uppercase">
                      Artilheiro
                    </span>
                  </div>

                  <span className="text-[7px] font-bold tracking-wider text-yellow-500/60 uppercase">
                    Destaque da pelada
                  </span>
                </div>

                <div className="flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-[17px] font-black tracking-tight text-white">
                      {stats.topScorer.name}
                    </div>

                    <p className="mt-0.5 text-[7px] text-zinc-500">
                      Maior goleador da pelada
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <div className="text-[24px] leading-none font-black text-yellow-400">
                      {stats.topScorer.goals}
                    </div>

                    <div className="mt-1 text-[7px] font-black tracking-wider text-yellow-500/60 uppercase">
                      {stats.topScorer.goals === 1 ? "gol" : "gols"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="relative z-10 shrink-0 px-6 pt-2.5">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-3">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[7px] font-black tracking-[0.12em] text-emerald-400 uppercase">
                  Partidas
                </span>

                <Gamepad2 className="size-4 text-emerald-400/70" />
              </div>

              <div className="text-[18px] font-black text-white">
                {stats.matchesCount}
              </div>

              <div className="text-[7px] text-zinc-600">realizadas</div>
            </div>

            <div className="rounded-2xl border border-blue-500/10 bg-blue-500/5 p-3">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[7px] font-black tracking-[0.12em] text-blue-400 uppercase">
                  Gols
                </span>

                <span className="text-xs opacity-70">🥅</span>
              </div>

              <div className="text-[18px] font-black text-white">
                {stats.goals}
              </div>

              <div className="text-[7px] text-zinc-600">marcados</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 shrink-0 px-6 pt-2.5">
          <div className="mb-2 flex items-center gap-2">
            <Star className="size-3 text-yellow-400" />

            <span className="text-[8px] font-black tracking-[0.14em] text-zinc-500 uppercase">
              Momentos da pelada
            </span>
          </div>

          <div className="space-y-1.5">
            {stats.bestStreak?.length > 0 && (
              <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2">
                <div className="min-w-0">
                  <div className="text-[7px] font-bold tracking-wider text-zinc-600 uppercase">
                    Maior sequência
                  </div>

                  <div className="mt-0.5 truncate text-[9px] font-bold text-white">
                    {stats.bestStreak[0].name}
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <div className="text-[12px] font-black text-emerald-400">
                    {stats.bestStreak[0].maxStreak}x
                  </div>

                  <div className="text-[6px] text-zinc-600">seguidas</div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2">
              <div className="min-w-0">
                <div className="text-[7px] font-bold tracking-wider text-zinc-600 uppercase">
                  Mais vitórias
                </div>

                <div className="mt-0.5 truncate text-[9px] font-bold text-white">
                  {stats.champion.name}
                </div>
              </div>

              <div className="shrink-0 text-right">
                <div className="text-[12px] font-black text-yellow-400">
                  {stats.champion.wins}
                </div>

                <div className="text-[6px] text-zinc-600">vitórias</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
