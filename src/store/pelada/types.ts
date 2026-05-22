export type PlayerStatus =
  | "playing"
  | "waiting"
  | "resting"
  | "available"
  | "injured"
  | "out"
  | "bench";

export interface Player {
  id: string;
  name: string;
  status: PlayerStatus;
  isGoalkeeper?: boolean;
  originalTeamId?: string; // Time original do jogador (quando afastado)
  removedAt?: number; // Timestamp de quando foi removido
  removalReason?: "injury" | "substitution" | "manual" | "other"; // Motivo da remoção
}

export interface Team {
  id: string;
  name: string;
  players: Player[];
  score: number;
  consecutiveWins: number;
  isResting?: boolean; // Time está descansando após 2 vitórias
  justReturned?: boolean; // Time acabou de retornar do descanso
  matchesToRest?: number; // Número de partidas que o time ainda precisa ficar fora (sempre 1)
}

export interface Substitution {
  outPlayerId: string;
  outPlayerName: string;
  inPlayerId: string;
  inPlayerName: string;
  fromTeamId: string;
  fromTeamName: string;
  toTeamId: string;
  toTeamName: string;
  timestamp: number;
  reason?: "injury" | "absence" | "other";
}

export interface Match {
  id: string;
  teamA: Team;
  teamB: Team;
  startTime: number;
  endTime?: number;
  duration: number;
  actualDuration?: number; // Duração atual
  goalLimit: number;
  winnerId?: string;
  isActive: boolean;
  endReason?: "time" | "goal_limit" | "manual"; // Motivo do encerramento
  substitutions?: Substitution[]; // Substituições realizadas durante a partida
  teamAConsecutiveWins?: number; // Sequência de vitórias do time A no momento
  teamBConsecutiveWins?: number; // Sequência de vitórias do time B no momento
  autoRested?: boolean; // Se algum time foi automaticamente para descanso após essa partida
  restingTeamId?: string; // ID do time que foi para descanso após essa partida
}

export interface Pelada {
  id: string;
  name: string;
  matchDuration: number;
  goalLimit: number;
  maxConsecutiveWins: number;
  createdAt: number;
  players: Player[];
  sessionPlayers: Player[];
  matches: Match[];
  queue: Team[];
  currentMatch?: Match;
  goalkeeper?: Player;
  recentSubstitutions?: Substitution[]; // Substituições recentes para mostrar feedback visual
}

export type CreatePeladaDTO = {
  name: string;
  matchDuration: number;
  goalLimit: number;
  maxConsecutiveWins: number;
};
