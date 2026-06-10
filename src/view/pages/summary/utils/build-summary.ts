import type { Pelada } from "@/store/pelada/types";
import type { SummaryItem } from "./types";

export function buildSummary(pelada: Pelada): SummaryItem | null {
  if (!pelada.matches.length) {
    return null;
  }

  const teamStats = new Map<
    string,
    {
      id: string;
      name: string;
      players: typeof pelada.players;
      wins: number;
      losses: number;
      draws: number;
      maxStreak: number;
      currentStreak: number;
    }
  >();

  for (const match of pelada.matches) {
    if (match.winnerId) {
      const winner =
        match.winnerId === match.teamA.id ? match.teamA : match.teamB;

      const loser =
        match.winnerId === match.teamA.id ? match.teamB : match.teamA;

      if (!teamStats.has(winner.id)) {
        teamStats.set(winner.id, {
          id: winner.id,
          name: winner.name,
          players: winner.players,
          wins: 0,
          losses: 0,
          draws: 0,
          maxStreak: 0,
          currentStreak: 0,
        });
      }

      if (!teamStats.has(loser.id)) {
        teamStats.set(loser.id, {
          id: loser.id,
          name: loser.name,
          players: loser.players,
          wins: 0,
          losses: 0,
          draws: 0,
          maxStreak: 0,
          currentStreak: 0,
        });
      }

      const winnerStats = teamStats.get(winner.id)!;
      const loserStats = teamStats.get(loser.id)!;

      winnerStats.wins += 1;
      winnerStats.currentStreak += 1;
      winnerStats.maxStreak = Math.max(
        winnerStats.maxStreak,
        winnerStats.currentStreak,
      );

      loserStats.losses += 1;
      loserStats.currentStreak = 0;
    } else {
      [match.teamA, match.teamB].forEach((team) => {
        if (!teamStats.has(team.id)) {
          teamStats.set(team.id, {
            id: team.id,
            name: team.name,
            players: team.players,
            wins: 0,
            losses: 0,
            draws: 0,
            maxStreak: 0,
            currentStreak: 0,
          });
        }

        const stats = teamStats.get(team.id)!;

        stats.draws += 1;
        stats.currentStreak = 0;
      });
    }
  }

  const teams = Array.from(teamStats.values()).map((team) => ({
    ...team,
    totalMatches: team.wins + team.losses + team.draws,
    winRate:
      team.wins + team.losses + team.draws > 0
        ? Math.round((team.wins / (team.wins + team.losses + team.draws)) * 100)
        : 0,
  }));

  const champion = [...teams].sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins;
    return b.winRate - a.winRate;
  })[0];

  const bestStreak = [...teams].sort((a, b) => b.maxStreak - a.maxStreak)[0];

  const worstTeam = [...teams].sort((a, b) => {
    if (a.wins !== b.wins) return a.wins - b.wins;
    return a.winRate - b.winRate;
  })[0];

  const balancedMatch = [...pelada.matches]
    .filter(
      (match) =>
        match.teamA.score !== undefined && match.teamB.score !== undefined,
    )
    .sort((a, b) => {
      const diffA = Math.abs(a.teamA.score - a.teamB.score);
      const diffB = Math.abs(b.teamA.score - b.teamB.score);

      return diffA - diffB;
    })[0];

  return {
    createdAt: pelada.createdAt.toString(),
    matchesCount: pelada.matches.length,
    goals: pelada.matches.reduce(
      (total, match) => total + match.teamA.score + match.teamB.score,
      0,
    ),
    champion,
    bestStreak,
    worstTeam,
    balancedMatch,
  };
}
