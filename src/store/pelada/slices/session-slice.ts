import { v4 as uuid } from "uuid";
import type { StateCreator } from "zustand";
import type { CreatePeladaDTO, Pelada } from "../types";

export interface SessionSlice {
  pelada: Pelada | null;
  setPelada(pelada: Pelada): void;
  createPelada(data: CreatePeladaDTO): Pelada;
  clearPelada(): void;
}

export const createSessionSlice: StateCreator<SessionSlice> = (set) => ({
  pelada: null,
  setPelada: (pelada) => {
    set({ pelada });
  },
  createPelada: ({
    name,
    matchDuration,
    goalLimit,
    maxConsecutiveWins,
    overtimeEnabled,
    overtimeDuration,
    playersPerTeam,
  }: CreatePeladaDTO) => {
    const newPelada: Pelada = {
      id: uuid(),
      name,
      matchDuration,
      goalLimit,
      maxConsecutiveWins,
      overtimeEnabled,
      overtimeDuration,
      playersPerTeam,
      createdAt: Date.now(),
      players: [],
      sessionPlayers: [],
      matches: [],
      queue: [],
      sessionStarted: false,
    };
    set({ pelada: newPelada });
    return newPelada;
  },
  clearPelada: () => {
    set({ pelada: null });
  },
});
