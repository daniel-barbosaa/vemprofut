import {
  makeMatchMock,
  makePeladaMock,
} from "@tests/factories/make-pelada-mock";
import { describe, expect, it } from "vitest";
import { buildSummary } from "./build-summary";

const mockPelada = makePeladaMock();

describe("buildSummary", () => {
  it("should return null case not matches", () => {
    const summary = buildSummary(mockPelada);

    expect(summary).toBeNull();
  });
  it("should return summary when matches exist", () => {
    const mockSummaryBuild = buildSummary({
      ...mockPelada,
      players: [
        { id: "p1", name: "Carlos", goals: 5 },
        { id: "p2", name: "João", goals: 3 },
        { id: "p3", name: "Pedro", goals: 1 },
        { id: "p4", name: "Lucas", goals: 2 },
      ],
      matches: [
        makeMatchMock({
          id: "match-1",
          winnerId: "team-a",
        }),
        makeMatchMock({
          id: "match-1",
          winnerId: "team-a",
        }),
      ],
    });

    expect(mockSummaryBuild).toEqual({
      createdAt: "1700000000000",
      matchesCount: 2,
      goals: 8,
      champion: expect.objectContaining({
        id: "team-a",
        name: "Time A",
      }),
      bestStreak: expect.arrayContaining([
        expect.objectContaining({
          id: "team-a",
          maxStreak: 2,
        }),
      ]),
      topScorer: expect.objectContaining({
        id: "p1",
        name: "Carlos",
        goals: 5,
      }),
    });
  });
  it("should return champion team correctly", () => {
    const mockSummaryBuild = buildSummary({
      ...mockPelada,
      matches: [
        makeMatchMock({
          id: "match-1",
          winnerId: "team-a",
        }),
        makeMatchMock({
          id: "match-1",
          winnerId: "team-a",
        }),
      ],
    });

    expect(mockSummaryBuild?.champion.name).toEqual("Time A");
  });
  it("should return team best sequence correctly", () => {
    const mockSummaryBuild = buildSummary({
      ...mockPelada,
      matches: [
        makeMatchMock({
          id: "match-1",
          winnerId: "team-a",
        }),
        makeMatchMock({
          id: "match-1",
          winnerId: "team-a",
        }),
      ],
    });

    expect(mockSummaryBuild?.bestStreak).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "team-a",
          maxStreak: 2,
          currentStreak: 2,
        }),
      ]),
    );
  });
  it("should return top scorer correctly", () => {
    const mockSummaryBuild = buildSummary({
      ...mockPelada,
      matches: [
        makeMatchMock({
          id: "match-1",
          winnerId: "team-a",
        }),
      ],
      players: [
        { id: "p1", name: "Carlos", goals: 2 },
        { id: "p2", name: "João", goals: 3 },
        { id: "p3", name: "Pedro", goals: 1 },
        { id: "p4", name: "Lucas", goals: 2 },
        { id: "p5", name: "Daniel", goals: 6 },
      ],
    });

    expect(mockSummaryBuild?.topScorer).toEqual(
      expect.objectContaining({
        id: "p5",
        name: "Daniel",
        goals: 6,
      }),
    );
  });
  it("should return total matches correctly", () => {
    const mockSummaryBuild = buildSummary({
      ...mockPelada,
      matches: [
        makeMatchMock({
          id: "match-1",
          winnerId: "team-a",
        }),
        makeMatchMock({
          id: "match-1",
          winnerId: "team-a",
        }),
        makeMatchMock({
          id: "match-1",
          winnerId: "team-b",
        }),
      ],
    });

    expect(mockSummaryBuild?.matchesCount).toEqual(3);
  });
});
