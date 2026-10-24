import { makePeladaMock } from "@tests/factories/make-pelada-mock";
import { describe, expect, it } from "vitest";
import { buildSummary } from "./build-summary";

const mockPelada = makePeladaMock();

describe("buildSummary", () => {
  it("should return null case not matches", () => {
    const summary = buildSummary({
      ...mockPelada,
      matches: [],
    });

    expect(summary).toBeNull();
  });

  it("should return summary when matches exist", () => {
    const summary = buildSummary({
      ...mockPelada,
      players: [
        { id: "p1", name: "Carlos", goals: 5, status: "available" },
        { id: "p2", name: "João", goals: 3, status: "available" },
        { id: "p3", name: "Pedro", goals: 1, status: "available" },
        { id: "p4", name: "Lucas", goals: 2, status: "available" },
      ],
      matches: [
        {
          id: "m1",
          teamA: {
            id: "t1",
            name: "Time A",
            players: [],
            score: 3,
            consecutiveWins: 2,
          },
          teamB: {
            id: "t2",
            name: "Time B",
            players: [],
            score: 1,
            consecutiveWins: 0,
          },
          startTime: Number(Date),
          endTime: Number(Date),
          duration: 600,
          goalLimit: 3,
          isActive: false,
          winnerId: "t1",
          endReason: "goal_limit",
          lastGoal: null,
        },
        {
          id: "m2",
          teamA: {
            id: "t3",
            name: "Time C",
            players: [],
            score: 2,
            consecutiveWins: 1,
          },
          teamB: {
            id: "t4",
            name: "Time D",
            players: [],
            score: 2,
            consecutiveWins: 0,
          },
          startTime: Number(Date),
          endTime: Number(Date),
          duration: 600,
          goalLimit: 3,
          isActive: false,
          endReason: "time",
          lastGoal: null,
        },
      ],
    });

    expect(summary).toEqual({
      createdAt: "1700000000000",
      matchesCount: 2,
      goals: 8,
      champion: expect.objectContaining({
        id: "t1",
        name: "Time A",
      }),
      bestStreak: expect.arrayContaining([
        expect.objectContaining({
          id: "t1",
          maxStreak: 1,
        }),
      ]),
      worstTeam: expect.objectContaining({
        id: "t2",
        name: "Time B",
        losses: 1,
      }),
      balancedMatch: expect.objectContaining({
        id: "m2",
        teamA: expect.objectContaining({ score: 2 }),
        teamB: expect.objectContaining({ score: 2 }),
      }),
      topScorer: expect.objectContaining({
        id: "p1",
        name: "Carlos",
        goals: 5,
      }),
    });
  });
});
