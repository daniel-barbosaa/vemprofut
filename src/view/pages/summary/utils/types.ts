import type { Pelada, Player } from "@/store/pelada/types";

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
    players: Pelada["players"];
    wins: number;
    losses: number;
    draws: number;
    maxStreak: number;
    currentStreak: number;
    totalMatches: number;
    winRate: number;
  }[];
  matchesCount: number;
  goals: number;
  createdAt: string;
  topScorer: Player;
}
