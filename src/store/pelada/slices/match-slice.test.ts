import {
  makeMatchMock,
  makePeladaMock,
} from "@tests/factories/make-pelada-mock";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { usePeladaStore } from "../pelada.store";

const mockPelada = makePeladaMock();
const mockMatch = makeMatchMock();
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
});
