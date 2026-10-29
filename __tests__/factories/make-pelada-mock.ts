import type { Match, Pelada, Team } from "@/store/pelada/types";

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
function makeTeamMock(props?: Partial<Team>): Team {
  return {
    id: "team-a",
    name: "Time A",
    consecutiveWins: 2,
    players: [],
    score: 2,
    ...props,
  };
}

export function makeMatchMock(props?: Partial<Match>): Match {
  return {
    id: "match-1",
    teamA: makeTeamMock({ id: "team-a", name: "Time A" }),
    teamB: makeTeamMock({ id: "team-b", name: "Time B", consecutiveWins: 0 }),
    startTime: 1_700_000_000_000,
    duration: 600,
    goalLimit: 3,
    isActive: false,
    lastGoal: null,
    ...props,
  };
}
