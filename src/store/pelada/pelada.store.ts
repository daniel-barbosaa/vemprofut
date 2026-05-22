import { v4 as uuid } from "uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CreatePeladaDTO, Match, Pelada } from "./types";

type Store = {
  pelada: Pelada | null;
  resetPelada: () => void;
  startMatch(): void;
  createPelada(data: CreatePeladaDTO): void;
};
export const usePeladaStore = create<Store>()(
  persist(
    (set, get) => ({
      pelada: null,
      resetPelada: () => {
        set({ pelada: null });
      },
      startMatch: () => {
        const { pelada } = get();

        if (!pelada || pelada.queue.length > 2) return;

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
        };

        set({
          pelada: {
            ...pelada,
            currentMatch: match,
          },
        });
      },
      createPelada: ({
        name,
        matchDuration,
        goalLimit,
        maxConsecutiveWins,
      }: CreatePeladaDTO) => {
        const newPelada: Pelada = {
          id: uuid(),
          name,
          matchDuration,
          goalLimit,
          maxConsecutiveWins,
          createdAt: Date.now(),
          players: [],
          sessionPlayers: [],
          matches: [],
          queue: [],
        };
        set({ pelada: newPelada });
      },
    }),
    { name: "pelada-storage" },
  ),
);
