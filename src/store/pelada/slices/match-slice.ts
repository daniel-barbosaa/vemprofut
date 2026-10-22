import type { StateCreator } from "zustand";
import type { PeladaState } from "../pelada-state";
import type { Match } from "../types";

export interface MatchSlice {
  startMatch(): void;
  addGoal(teamId: string, playerId?: string): void;
  removeGoal(teamId: string, playerId?: string): void;
  endMatch(): void;
  pauseMatch(): void;
  resumeMatch(): void;
  startOvertime: () => void;
}

export const createMatchSlice: StateCreator<PeladaState, [], [], MatchSlice> = (
  set,
  get,
) => ({
  startMatch: () => {
    const { pelada } = get();

    if (!pelada || pelada.queue.length < 2) return;

    const teamA = pelada.queue[0];
    const teamB = pelada.queue[1];

    const match: Match = {
      id: Date.now().toString(),
      teamA: { ...teamA, score: 0 },
      teamB: { ...teamB, score: 0 },
      startTime: Date.now(),
      duration: pelada.matchDuration * 60,
      goalLimit: pelada.goalLimit,
      isActive: true,
      isPaused: false,
      pausedAt: undefined,
      totalPausedTime: 0,
      lastGoal: null,
    };

    set({
      pelada: {
        ...pelada,
        currentMatch: match,
        sessionStarted: true,
        queueManuallyOrganized: false,
      },
    });
  },
  addGoal: (teamId: string, playerId?: string) => {
    set((state) => {
      const pelada = state.pelada;

      if (!pelada || !pelada.currentMatch) {
        return state;
      }

      const match = pelada.currentMatch;

      const updatedMatch = {
        ...match,
        lastGoal: {
          teamId,
          playerId: playerId ?? null,
        },
      };

      if (match.teamA.id === teamId) {
        updatedMatch.teamA = {
          ...match.teamA,
          score: match.teamA.score + 1,
        };
      } else if (match.teamB.id === teamId) {
        updatedMatch.teamB = {
          ...match.teamB,
          score: match.teamB.score + 1,
        };
      }

      const updatedPlayers = playerId
        ? pelada.players.map((player) =>
            player.id === playerId
              ? { ...player, goals: player.goals + 1 }
              : player,
          )
        : pelada.players;

      return {
        pelada: {
          ...pelada,
          currentMatch: updatedMatch,
          players: updatedPlayers,
        },
      };
    });
  },
  removeGoal: (teamId: string, playerId?: string) => {
    set((state) => {
      const pelada = state.pelada;

      if (!pelada || !pelada.currentMatch) {
        return state;
      }

      const match = pelada.currentMatch;

      const updatedMatch = {
        ...match,
        lastGoal: null,
      };

      if (match.teamA.id === teamId && match.teamA.score > 0) {
        updatedMatch.teamA = {
          ...match.teamA,
          score: match.teamA.score - 1,
        };
      } else if (match.teamB.id === teamId && match.teamB.score > 0) {
        updatedMatch.teamB = {
          ...match.teamB,
          score: match.teamB.score - 1,
        };
      }

      const updatedPlayers = playerId
        ? pelada.players.map((player) =>
            player.id === playerId
              ? {
                  ...player,
                  goals: Math.max(0, player.goals - 1),
                }
              : player,
          )
        : pelada.players;

      return {
        pelada: {
          ...pelada,
          currentMatch: updatedMatch,
          players: updatedPlayers,
        },
      };
    });
  },
  endMatch: () => {
    set((state) => {
      const pelada = state.pelada;

      if (!pelada || !pelada.currentMatch) {
        return state;
      }

      const match = { ...pelada.currentMatch };

      match.isActive = false;
      match.endTime = Date.now();

      match.actualDuration = Math.floor(
        (match.endTime - match.startTime) / 1000,
      );

      if (match.teamA.score > match.teamB.score) {
        match.winnerId = match.teamA.id;
      } else if (match.teamB.score > match.teamA.score) {
        match.winnerId = match.teamB.id;
      }

      if (
        match.teamA.score >= pelada.goalLimit ||
        match.teamB.score >= pelada.goalLimit
      ) {
        match.endReason = "goal_limit";
      } else if (match.actualDuration >= match.duration) {
        match.endReason = "time";
      } else {
        match.endReason = "manual";
      }

      match.teamAConsecutiveWins = match.teamA.consecutiveWins;

      match.teamBConsecutiveWins = match.teamB.consecutiveWins;

      return {
        pelada: {
          ...pelada,
          currentMatch: match,
          matches: [...pelada.matches, match],
        },
      };
    });
  },
  pauseMatch: () => {
    set((state) => {
      if (!state.pelada?.currentMatch) return state;

      state.pelada.currentMatch.isPaused = true;
      state.pelada.currentMatch.pausedAt = Date.now();

      return state;
    });
  },
  resumeMatch: () =>
    set((state) => {
      const match = state.pelada?.currentMatch;

      if (!match?.pausedAt) return state;

      const pausedDuration = Date.now() - match.pausedAt;

      match.totalPausedTime = (match.totalPausedTime ?? 0) + pausedDuration;

      match.pausedAt = undefined;
      match.isPaused = false;

      return { ...state };
    }),
  startOvertime: () =>
    set((state) => {
      const match = state.pelada?.currentMatch;

      if (!match || !state.pelada) return state;

      match.isOvertime = true;
      match.overtimeStartedAt = Date.now();
      match.overtimeDuration = state.pelada.overtimeDuration * 60;

      return { ...state };
    }),
});
