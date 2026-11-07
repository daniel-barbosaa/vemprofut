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

describe("createMatchSlice", () => {
  beforeEach(() => {
    usePeladaStore.getState().setPelada({
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
    usePeladaStore.getState().addGoal("team-a", "player-2");

    const pelada = usePeladaStore.getState().pelada;

    expect(pelada?.currentMatch?.goals).toContainEqual(goal);
    expect(pelada?.currentMatch?.goals).toHaveLength(1);
  });
});
