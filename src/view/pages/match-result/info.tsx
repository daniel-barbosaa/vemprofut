import { cn } from "@/app/utils/class-name-merger";
import type { Match, Pelada, Team } from "@/store/pelada/types";
import { ArrowLeft, Coffee, HeartHandshake } from "lucide-react";
import { motion } from "motion/react";

interface InfoProps {
  isDraw: boolean;
  winner: Team | null;
  loser: Team | null;
  match: Match | null;
  pelada: Pelada | null;
  nextMatch: {
    team1: Team | null;
    team2: Team | null;
  };
}

interface DrawCardProps {
  match: Match | null;
  nextMatch: {
    team1: Team | null;
    team2: Team | null;
  };
}

interface VictoryCardProps {
  winner: Team;
  loser: Team | null;
  pelada: Pelada | null;
  nextMatch: {
    team1: Team | null;
    team2: Team | null;
  };
}

interface NextMatchCardProps {
  nextMatch: {
    team1: Team | null;
    team2: Team | null;
  };
}

function AnimatedContainer({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="mb-6 space-y-4"
    >
      {children}
    </motion.div>
  );
}

function NextMatchCard({ nextMatch }: NextMatchCardProps) {
  if (!nextMatch.team1 || !nextMatch.team2) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-emerald-700/30 bg-emerald-900/20 p-6">
      <div className="mb-3 text-sm font-semibold tracking-wider text-zinc-500 uppercase">
        ➡ Entram
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[nextMatch.team1, nextMatch.team2].map((team) => (
          <div key={team.id} className="rounded-lg bg-emerald-900/30 p-3">
            <div className="font-bold text-emerald-400">{team.name}</div>

            {team.justReturned && (
              <div className="mt-1 text-xs text-amber-400">
                🔄 Retornou do descanso
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DrawCard({ match, nextMatch }: DrawCardProps) {
  return (
    <AnimatedContainer>
      <div className="rounded-2xl border border-blue-700/30 bg-linear-to-br from-blue-900/30 to-blue-950/30 p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-blue-500/10">
            <HeartHandshake className="size-6 text-blue-400" />
          </div>

          <div>
            <div className="text-lg font-bold text-blue-400">Empate</div>

            <div className="text-sm text-blue-400/70">
              Ambos os times saem da quadra
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-zinc-500 uppercase">
            <ArrowLeft className="size-3.5" />
            Saíram
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[match!.teamA, match!.teamB].map((team) => (
              <div
                key={team.id}
                className="rounded-lg bg-zinc-900/50 p-3 text-center"
              >
                <div className="font-semibold text-white">{team.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NextMatchCard nextMatch={nextMatch} />
    </AnimatedContainer>
  );
}

function VictoryCard({ winner, loser, pelada, nextMatch }: VictoryCardProps) {
  const willRest = winner.consecutiveWins + 1 >= pelada!.maxConsecutiveWins;

  return (
    <AnimatedContainer>
      <div
        className={cn(
          "rounded-2xl p-6",
          willRest
            ? "border border-amber-700/30 bg-linear-to-br from-amber-900/30 to-yellow-900/30"
            : "border border-emerald-700/30 bg-linear-to-br from-emerald-900/30 to-emerald-950/30",
        )}
      >
        <div
          className={cn(
            "mb-2 text-sm font-semibold tracking-wider uppercase",
            willRest ? "text-amber-400" : "text-emerald-400",
          )}
        >
          {willRest ? "👑 Vai Descansar" : "✨ Continua Jogando"}
        </div>

        <div className="mb-2 text-xl font-bold text-white">{winner.name}</div>

        <div className="flex flex-wrap gap-2">
          {winner.players.map((player) => (
            <span key={player.id} className="text-sm text-zinc-400">
              {player.name}
            </span>
          ))}
        </div>

        {willRest && (
          <div className="mt-4 rounded-xl border-2 border-amber-600/50 bg-amber-900/40 p-4">
            <div className="mb-3 flex items-center gap-3">
              <Coffee className="size-6 text-amber-400" />

              <div className="font-bold text-amber-300">
                Entrou na Fila de Descanso
              </div>
            </div>

            <div className="space-y-2 text-sm text-amber-400/90">
              <div className="flex items-center gap-2">
                <span>🔥</span>

                <span>{pelada!.maxConsecutiveWins} vitórias consecutivas</span>
              </div>

              <div className="flex items-center gap-2">
                <span>⏳</span>

                <span>
                  <strong>Fora da próxima partida</strong>
                </span>
              </div>

              {nextMatch.team1 && nextMatch.team2 && (
                <div className="mt-2 flex items-center gap-2 rounded-lg border border-blue-700/30 bg-blue-900/30 p-2">
                  <span>➡️</span>

                  <span>
                    Enquanto isso:{" "}
                    <strong>
                      {nextMatch.team1.name} vs {nextMatch.team2.name}
                    </strong>
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <span>🔄</span>

                <span>Retorna automaticamente após</span>
              </div>

              <div className="flex items-center gap-2">
                <span>♻</span>

                <span>Sequência resetada ao voltar</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {loser && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="mb-2 text-sm font-semibold tracking-wider text-zinc-500 uppercase">
            {willRest ? "⬅ Saiu" : "Vai para o Final da Fila"}
          </div>

          <div className="mb-2 text-xl font-bold text-white">{loser.name}</div>

          <div className="flex flex-wrap gap-2">
            {loser.players.map((player) => (
              <span key={player.id} className="text-sm text-zinc-500">
                {player.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {willRest && <NextMatchCard nextMatch={nextMatch} />}
    </AnimatedContainer>
  );
}

export function Info({
  isDraw,
  winner,
  loser,
  match,
  pelada,
  nextMatch,
}: InfoProps) {
  if (isDraw) {
    return <DrawCard match={match} nextMatch={nextMatch} />;
  }

  if (!winner) {
    return null;
  }

  return (
    <VictoryCard
      winner={winner}
      loser={loser}
      pelada={pelada}
      nextMatch={nextMatch}
    />
  );
}
