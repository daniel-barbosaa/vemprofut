import { Clock, Flame, Timer, Trophy, UserMinus } from "lucide-react";
import { motion } from "motion/react";

import { cn } from "@/app/utils/class-name-merger";
import { fadeLeft, fadeRight, fadeUp } from "./utils/animation-variables";

const sessions = [
  {
    name: "Pelada de Sábado",
    date: "16 ago 2026",
    players: 12,
    matches: 8,
    winner: "Time A",
  },
  {
    name: "Pelada da Firma",
    date: "13 ago 2026",
    players: 10,
    matches: 6,
    winner: "Time B",
  },
  {
    name: "Pelada dos Amigos",
    date: "09 ago 2026",
    players: 14,
    matches: 10,
    winner: "Time C",
  },
  {
    name: "Pelada de Quarta",
    date: "06 ago 2026",
    players: 12,
    matches: 7,
    winner: "Time D",
  },
];

const matchHistory = [
  {
    match: 1,
    date: "16 ago",
    time: "19:12",
    duration: "07:42",
    teamA: "Time A",
    teamB: "Time B",
    scoreA: 2,
    scoreB: 1,
    winner: "Time A",
    endReason: "2 gols",
    streak: {
      team: "Time A",
      wins: 2,
    },
    substitutions: 0,
  },
  {
    match: 2,
    date: "16 ago",
    time: "19:21",
    duration: "06:18",
    teamA: "Time C",
    teamB: "Time D",
    scoreA: 0,
    scoreB: 2,
    winner: "Time D",
    endReason: "2 gols",
    streak: null,
    substitutions: 1,
  },
  {
    match: 3,
    date: "16 ago",
    time: "19:30",
    duration: "08:05",
    teamA: "Time A",
    teamB: "Time C",
    scoreA: 2,
    scoreB: 0,
    winner: "Time A",
    endReason: "2 gols",
    streak: {
      team: "Time A",
      wins: 3,
    },
    substitutions: 0,
  },
  {
    match: 4,
    date: "16 ago",
    time: "19:40",
    duration: "07:00",
    teamA: "Time B",
    teamB: "Time D",
    scoreA: 1,
    scoreB: 1,
    winner: null,
    endReason: "Tempo",
    streak: null,
    substitutions: 2,
  },
];

export function HistorySection() {
  return (
    <>
      <section className="py-24">
        <div className="mx-auto max-w-300 px-6">
          <div className="grid items-start gap-14 md:grid-cols-2">
            <motion.div {...fadeLeft}>
              <span className="text-[11px] font-bold tracking-[0.16em] text-emerald-400 uppercase">
                Histórico
              </span>

              <h2 className="mt-3.5 text-[38px] leading-[1.1] font-extrabold tracking-[-1px] text-white md:text-5xl">
                Terminou a pelada?
                <br />
                <span className="text-emerald-400">A história fica.</span>
              </h2>

              <p className="mt-3.5 max-w-lg text-base leading-relaxed text-zinc-500">
                Cada pelada fica registrada com seus jogadores, partidas,
                resultados e campeão da noite.
              </p>
            </motion.div>

            <motion.div {...fadeRight} className="flex flex-col gap-2.5">
              {sessions.map((session, index) => (
                <motion.div
                  key={session.name}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.07,
                    duration: 0.4,
                  }}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3.5 transition-colors hover:border-emerald-700/30"
                >
                  <div className="min-w-0">
                    <h3 className="mb-1 text-sm font-bold text-white">
                      {session.name}
                    </h3>

                    <div className="flex flex-wrap gap-x-2.5 text-[11px] text-zinc-500">
                      <span>{session.date}</span>
                      <span>· {session.players} jogadores</span>
                      <span>· {session.matches} partidas</span>
                    </div>
                  </div>

                  <span className="flex shrink-0 items-center gap-1 text-[11px] font-bold text-emerald-400">
                    <Trophy className="size-3" />
                    {session.winner}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white/1.5 py-24">
        <div className="mx-auto max-w-300 px-6">
          <motion.div {...fadeUp} className="mb-12">
            <span className="text-[11px] font-bold tracking-[0.16em] text-emerald-400 uppercase">
              Partidas
            </span>

            <h2 className="mt-3.5 text-[38px] leading-[1.1] font-extrabold tracking-[-1px] text-white md:text-5xl">
              Cada partida,
              <br />
              <span className="text-emerald-400">cada resultado.</span>
            </h2>

            <p className="mt-3 max-w-lg text-base leading-relaxed text-zinc-500">
              Placar, duração, resultado e tudo o que aconteceu durante a
              partida ficam registrados.
            </p>
          </motion.div>

          <div className="grid gap-3 md:grid-cols-2">
            {matchHistory.map((match, index) => {
              const isDraw = match.scoreA === match.scoreB;
              const teamAWon = match.winner === match.teamA;
              const teamBWon = match.winner === match.teamB;

              return (
                <motion.div
                  key={match.match}
                  {...fadeUp}
                  transition={{
                    ...fadeUp.transition,
                    delay: index * 0.08,
                  }}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <Clock className="size-3" />

                      <span>
                        {match.date} · {match.time}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-zinc-500">
                      <Timer className="size-3" />
                      {match.duration}
                    </div>
                  </div>

                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                    <div>
                      <div
                        className={cn(
                          "mb-1 text-[13px] font-bold",
                          teamAWon ? "text-emerald-400" : "text-zinc-500",
                        )}
                      >
                        {match.teamA}
                      </div>

                      <div
                        className={cn(
                          "text-[38px] leading-none font-extrabold",
                          teamAWon ? "text-white" : "text-white/40",
                        )}
                      >
                        {match.scoreA}
                      </div>
                    </div>

                    <span className="text-lg font-extrabold text-zinc-800">
                      ×
                    </span>

                    <div className="text-right">
                      <div
                        className={cn(
                          "mb-1 text-[13px] font-bold",
                          teamBWon ? "text-emerald-400" : "text-zinc-500",
                        )}
                      >
                        {match.teamB}
                      </div>

                      <div
                        className={cn(
                          "text-[38px] leading-none font-extrabold",
                          teamBWon ? "text-white" : "text-white/40",
                        )}
                      >
                        {match.scoreB}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {isDraw ? (
                      <span className="rounded-full border border-blue-700/30 bg-blue-900/20 px-2.5 py-1 text-[10px] font-semibold text-blue-400">
                        ⚖️ Empate
                      </span>
                    ) : (
                      <span className="rounded-full border border-emerald-700/30 bg-emerald-900/20 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
                        🏆 Vitória: {match.winner}
                      </span>
                    )}

                    <span className="rounded-full bg-zinc-800/70 px-2.5 py-1 text-[10px] font-medium text-zinc-500">
                      {match.endReason}
                    </span>

                    {match.streak && (
                      <span className="flex items-center gap-1 rounded-full border border-amber-700/30 bg-amber-900/20 px-2.5 py-1 text-[10px] font-semibold text-amber-400">
                        <Flame className="size-3" />
                        {match.streak.team} · {match.streak.wins} seguidas
                      </span>
                    )}

                    {match.substitutions > 0 && (
                      <span className="flex items-center gap-1 rounded-full border border-red-700/30 bg-red-900/20 px-2.5 py-1 text-[10px] font-semibold text-red-400">
                        <UserMinus className="size-3" />
                        {match.substitutions}{" "}
                        {match.substitutions === 1
                          ? "substituição"
                          : "substituições"}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
