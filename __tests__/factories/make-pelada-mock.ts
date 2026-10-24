import type { Pelada } from "@/store/pelada/types";

export function makePeladaMock(props?: Partial<Pelada>): Pelada {
  return {
    id: "pelada-1",
    name: "Pelada teste",
    matchDuration: 10,
    goalLimit: 3,
    maxConsecutiveWins: 2,
    overtimeEnabled: false,
    overtimeDuration: 2,
    playersPerTeam: 5,
    createdAt: 1_700_000_000_000,
    players: [],
    sessionPlayers: [],
    matches: [],
    queue: [],
    ...props,
  };
}
