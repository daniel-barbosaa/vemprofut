import { v4 as uuid } from "uuid";
import { type StateCreator } from "zustand";
import type { PeladaState } from "../pelada-state";
import type { Player } from "../types";

export interface PlayersSlice {
  addPlayer(name: string): void;
  removePlayer(playerId: string): void;
}

export const createPlayersSlice: StateCreator<
  PeladaState,
  [],
  [],
  PlayersSlice
> = (set, get) => ({
  addPlayer: (name: string) => {
    const { pelada } = get();
    if (!pelada || pelada.sessionStarted) {
      return;
    }

    const newPlayer: Player = {
      id: uuid(),
      name,
      status: pelada.sessionStarted ? "pending" : "available",
      goals: 0,
    };

    set({
      pelada: {
        ...pelada,
        players: [...pelada.players, newPlayer],
      },
    });
  },
  removePlayer: (playerId: string) => {
    const { pelada } = get();
    if (!pelada || pelada.sessionStarted) {
      return;
    }

    set({
      pelada: {
        ...pelada,
        players: pelada.players.filter((p) => p.id !== playerId),
      },
    });
  },
});
