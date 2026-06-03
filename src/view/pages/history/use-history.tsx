import { usePeladaStore } from "@/store/pelada/pelada.store";
import { useMemo } from "react";

export type TeamStats = {
  wins: number;
  goals: number;
  matches: number;
  maxStreak: number;
};
export type TeamStatsMap = Record<string, TeamStats>;

export type EndReason = "goal_limit" | "time" | "manual";

export function useHistory() {
  const { pelada } = usePeladaStore();

  if (!pelada) {
    throw new Error("History requires pelada");
  }
  const formatDuration = (seconds?: number) => {
    if (!seconds) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${String(secs).padStart(2, "0")}`;
  };

  const stats = useMemo(() => {
    const teamStats: TeamStatsMap = {};

    pelada.matches.forEach((match) => {
      [match.teamA, match.teamB].forEach((team) => {
        if (!teamStats[team.id]) {
          teamStats[team.id] = { wins: 0, goals: 0, matches: 0, maxStreak: 0 };
        }
      });

      teamStats[match.teamA.id].matches++;
      teamStats[match.teamB.id].matches++;

      teamStats[match.teamA.id].goals += match.teamA.score;
      teamStats[match.teamB.id].goals += match.teamB.score;

      if (match.winnerId) {
        teamStats[match.winnerId].wins++;

        if (
          match.teamA.id === match.winnerId &&
          match.teamAConsecutiveWins !== undefined
        ) {
          teamStats[match.teamA.id].maxStreak = Math.max(
            teamStats[match.teamA.id].maxStreak,
            match.teamAConsecutiveWins + 1,
          );
        } else if (
          match.teamB.id === match.winnerId &&
          match.teamBConsecutiveWins !== undefined
        ) {
          teamStats[match.teamB.id].maxStreak = Math.max(
            teamStats[match.teamB.id].maxStreak,
            match.teamBConsecutiveWins + 1,
          );
        }
      }
    });

    return teamStats;
  }, [pelada.matches]);

  const getEndReasonText = (reason?: EndReason) => {
    switch (reason) {
      case "goal_limit":
        return "Limite de gols";
      case "time":
        return "Tempo esgotado";
      case "manual":
        return "Encerrada manualmente";
      default:
        return "Finalizada";
    }
  };

  return { formatDuration, stats, getEndReasonText, pelada };
}
