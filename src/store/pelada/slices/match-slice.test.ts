import {
  makeMatchMock,
  makePeladaMock,
  makeTeamMock,
} from "@tests/factories/make-pelada-mock";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { usePeladaStore } from "../pelada.store";

const mockPelada = makePeladaMock();
const mockMatch = makeMatchMock();
const mockTeam = makeTeamMock();
const date = new Date();

vi.useFakeTimers();
vi.setSystemTime(date);
vi.mock("uuid", () => {
  return {
    v4: vi.fn().mockReturnValue("mocked-id"),
  };
});

const getSut = () => usePeladaStore.getState();

describe("createMatchSlice", () => {
  beforeEach(() => {
    getSut().setPelada({
      ...mockPelada,
      matches: [{ ...mockMatch }],
      currentMatch: { ...mockMatch },
    });
  });

  it("should add goal correctly", () => {
    const goal = {
      id: "mocked-id",
      teamId: "team-a",
      playerId: "player-2",
      createdAt: Number(new Date()),
    };
    getSut().addGoal("team-a", "player-2");

    const pelada = getSut().pelada;

    expect(pelada?.currentMatch?.goals).toContainEqual(goal);
    expect(pelada?.currentMatch?.goals).toHaveLength(1);
  });

  it("should remove goal correctly", () => {
    getSut().addGoal("team-a", "player-2");

    getSut().removeGoal("mocked-id");

    const pelada = getSut().pelada;

    expect(pelada?.currentMatch?.goals).toHaveLength(0);
    expect(pelada?.currentMatch?.goals).not.toContainEqual(
      expect.objectContaining({ id: "mocked-id" }),
    );
  });

  it("should start match correctly", () => {
    getSut().setPelada({
      ...mockPelada,
      matches: [{ ...mockMatch }],
      queue: [
        { ...mockTeam, id: "team-c", name: "Time C" },
        { ...mockTeam, id: "team-d", name: "Time D" },
      ],
    });

    getSut().startMatch();

    const pelada = getSut().pelada;

    expect(pelada?.currentMatch).toMatchObject({
      teamA: { id: "team-c", name: "Time C", score: 0 },
      teamB: { id: "team-d", name: "Time D", score: 0 },
      isActive: true,
    });
  });

  it("should end match correctly", () => {
    getSut().endMatch();

    const { pelada } = getSut();

    expect(pelada?.currentMatch).toMatchObject({
      isActive: false,
    });
    expect(pelada?.matches).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "mocked-id",
          isActive: false,
        }),
      ]),
    );
  });

  it("should pause match correctly ", () => {
    getSut().pauseMatch();

    const { pelada } = getSut();

    expect(pelada?.currentMatch).toMatchObject({
      isPaused: true,
      pausedAt: Date.now(),
    });
  });

  it("should resume match correctly", () => {
    const { pauseMatch, resumeMatch, pelada } = getSut();

    pauseMatch();
    resumeMatch();

    expect(pelada?.currentMatch).toMatchObject({
      isPaused: false,
    });
  });

  it("should intialize overtime correctly", () => {
    const { startOvertime, pelada } = getSut();

    startOvertime();

    expect(pelada?.currentMatch).toMatchObject({
      isOvertime: true,
    });
  });
});
