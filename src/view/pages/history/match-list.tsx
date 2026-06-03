import { cn } from "@/app/utils/class-name-merger";
import type { Match, Pelada, Team } from "@/store/pelada/types";
import {
  ArrowRight,
  Clock,
  Crown,
  Flame,
  HeartHandshake,
  HistoryIcon,
  MoveRight,
  Timer,
  UserMinus,
  UserPlus,
} from "lucide-react";
import { motion } from "motion/react";

interface MatchListProps {
  pelada: Pelada;
  formatDuration(seconds?: number): string;
  getEndReasonText(reason?: Match["endReason"]): string;
}

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

interface MatchCardProps {
  match: Match;
  nextMatchStartTime?: number;
  recentSubstitutions?: Pelada["recentSubstitutions"];
  index: number;
  formatDuration(seconds?: number): string;
  getEndReasonText(reason?: Match["endReason"]): string;
}

interface TeamScoreProps {
  team: Team;
  winnerId?: string;
  align?: "left" | "right";
}

function Badge({ children, className }: BadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full px-3 py-1 text-xs",
        className,
      )}
    >
      {children}
    </div>
  );
}

function TeamScore({ team, winnerId, align = "left" }: TeamScoreProps) {
  const isWinner = team.id === winnerId;

  return (
    <div
      className={cn(
        isWinner ? "opacity-100" : "opacity-60",
        align === "right" && "text-right",
      )}
    >
      <div
        className={cn(
          "mb-1 text-sm font-semibold",
          isWinner ? "text-emerald-400" : "text-zinc-500",
        )}
      >
        {team.name}
      </div>

      <div className="text-4xl font-bold text-white tabular-nums">
        {team.score}
      </div>
    </div>
  );
}

function getRecentMatchSubstitutions(
  match: Match,
  nextMatchStartTime?: number,
  recentSubstitutions?: Pelada["recentSubstitutions"],
) {
  const matchEndTime = nextMatchStartTime ?? Number.POSITIVE_INFINITY;

  const matchTeamKeys = [
    match.teamA.id,
    match.teamB.id,
    match.teamA.name,
    match.teamB.name,
  ];

  return (
    recentSubstitutions?.filter(
      (substitution) =>
        substitution.timestamp >= match.startTime &&
        substitution.timestamp <= matchEndTime &&
        (matchTeamKeys.includes(substitution.fromTeamId) ||
          matchTeamKeys.includes(substitution.fromTeamName) ||
          matchTeamKeys.includes(substitution.toTeamId) ||
          matchTeamKeys.includes(substitution.toTeamName)),
    ) ?? []
  );
}

function MatchCard({
  match,
  nextMatchStartTime,
  recentSubstitutions,
  index,
  formatDuration,
  getEndReasonText,
}: MatchCardProps) {
  const isDraw = match.teamA.score === match.teamB.score;

  const winner = isDraw
    ? null
    : match.winnerId === match.teamA.id
      ? match.teamA
      : match.teamB;

  const matchSubstitutions = match.substitutions?.length
    ? match.substitutions
    : getRecentMatchSubstitutions(
        match,
        nextMatchStartTime,
        recentSubstitutions,
      );

  const hasSubstitutions = matchSubstitutions.length > 0;

  const returnedTeam = match.teamA.justReturned
    ? match.teamA
    : match.teamB.justReturned
      ? match.teamB
      : null;

  const teamAWon = winner?.id === match.teamA.id;
  const teamBWon = winner?.id === match.teamB.id;
  const teamAStreak = match.teamAConsecutiveWins ?? 0;
  const teamBStreak = match.teamBConsecutiveWins ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Clock className="size-3" />

          <span>
            {new Date(match.startTime).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "short",
            })}
            {" • "}
            {new Date(match.startTime).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          {match.actualDuration && (
            <>
              <span className="text-zinc-700">•</span>

              <Timer className="size-3" />

              <span>{formatDuration(match.actualDuration)}</span>
            </>
          )}
        </div>
      </div>

      <div className="mb-4 grid grid-cols-3 items-center gap-4">
        <TeamScore
          team={match.teamA}
          winnerId={teamAWon ? winner?.id : undefined}
        />

        <div className="text-center">
          <div className="text-xl font-bold text-zinc-700">×</div>
        </div>

        <TeamScore
          team={match.teamB}
          winnerId={teamBWon ? winner?.id : undefined}
          align="right"
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {isDraw && (
          <Badge className="border border-blue-700/30 bg-blue-900/30 font-semibold text-blue-400">
            <HeartHandshake className="size-3 text-blue-400" /> Empate
          </Badge>
        )}

        {match.endReason && (
          <Badge className="bg-zinc-800/50 text-zinc-400">
            {getEndReasonText(match.endReason)}
          </Badge>
        )}

        {teamAStreak > 0 && (
          <Badge className="border border-amber-700/30 bg-amber-900/20 text-amber-400">
            <Flame className="size-3" />
            {match.teamA.name}: {teamAStreak + 1}ª vitória seguida
          </Badge>
        )}

        {teamBStreak > 0 && (
          <Badge className="border border-amber-700/30 bg-amber-900/20 text-amber-400">
            <Flame className="size-3" />
            {match.teamB.name}: {teamBStreak + 1}ª vitória seguida
          </Badge>
        )}

        {match.autoRested && winner && (
          <Badge className="border border-yellow-700/30 bg-yellow-900/20 text-yellow-400">
            <Crown className="size-3" />
            {winner.name} entrou em descanso
          </Badge>
        )}

        {hasSubstitutions && (
          <Badge className="border border-red-700/30 bg-red-900/20 text-red-400">
            <UserMinus className="size-3" />
            {matchSubstitutions.length} substituiç
            {matchSubstitutions.length > 1 ? "ões" : "ão"}
          </Badge>
        )}
      </div>

      {hasSubstitutions && (
        <div className="mb-4 rounded-lg border border-zinc-800 bg-zinc-950/50 p-3">
          <div className="mb-2 text-xs font-semibold text-zinc-500 uppercase">
            Substituições
          </div>

          <div className="space-y-1">
            {matchSubstitutions.map((sub, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                {sub.outPlayerName ? (
                  <>
                    <span className="flex items-center gap-1 text-red-400">
                      <UserMinus className="size-3" />
                      {sub.outPlayerName}
                    </span>

                    <ArrowRight className="size-3 text-zinc-700" />
                  </>
                ) : (
                  <span className="text-zinc-600">{sub.fromTeamName}</span>
                )}

                <span className="flex items-center gap-1 text-emerald-400">
                  <UserPlus className="size-3" />
                  {sub.inPlayerName}
                </span>

                <ArrowRight className="size-3 text-zinc-700" />

                <span className="text-zinc-400">{sub.toTeamName}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {returnedTeam && (
        <div className="rounded-lg border border-amber-700/30 bg-amber-900/20 p-3">
          <div className="mb-1 flex items-center gap-1 text-xs font-semibold text-amber-400 uppercase">
            <MoveRight className="size-4" />
            Time Retornou
          </div>

          <div className="text-xs text-amber-300">
            {returnedTeam.name} voltou após descanso
          </div>
        </div>
      )}
    </motion.div>
  );
}

export function MatchList({
  pelada,
  formatDuration,
  getEndReasonText,
}: MatchListProps) {
  return (
    <div className="mb-6">
      <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
        <HistoryIcon className="size-5 text-zinc-400" />
        Partidas Realizadas
      </h3>

      <div className="space-y-4">
        {pelada.matches
          .map((match, matchIndex) => ({
            match,
            nextMatchStartTime: pelada.matches[matchIndex + 1]?.startTime,
          }))
          .reverse()
          .map(({ match, nextMatchStartTime }, index) => (
            <MatchCard
              key={match.id}
              match={match}
              nextMatchStartTime={nextMatchStartTime}
              recentSubstitutions={pelada.recentSubstitutions}
              index={index}
              formatDuration={formatDuration}
              getEndReasonText={getEndReasonText}
            />
          ))}
      </div>
    </div>
  );
}
