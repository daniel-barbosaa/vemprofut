import type { Match, Player } from "@/store/pelada/types";

export interface SummaryItem {
  champion: {
    id: string;
    name: string;
    wins: number;
    winRate: number;
    players: Player[];
  };
  bestStreak: {
    id: string;
    name: string;
    maxStreak: number;
  };
  worstTeam: {
    id: string;
    name: string;
    wins: number;
    winRate: number;
  };
  matchesCount: number;
  goals: number;
  balancedMatch?: Match;
  createdAt: string;
}
