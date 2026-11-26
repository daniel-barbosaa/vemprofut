import { makePeladaMock } from "@tests/factories/make-pelada-mock";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { usePeladaStore } from "../pelada.store";

const mockPelada = makePeladaMock();

const getSut = () => usePeladaStore.getState();

vi.mock("uuid", () => {
  return {
    v4: vi.fn().mockReturnValue("mocked-id"),
  };
});

describe("createPlayersSlice", () => {
  beforeEach(() => {
    getSut().setPelada({
      ...mockPelada,
      players: [
        { id: "1", name: "João", goals: 0 },
        { id: "2", name: "Marcos", goals: 0 },
        { id: "3", name: "Rafael", goals: 0 },
      ],
    });
  });
  it("should add player correctly", () => {
    getSut().addPlayer("John Doe");

    const pelada = getSut().pelada;

    expect(pelada?.players).toContainEqual({
      id: "mocked-id",
      name: "John Doe",
      goals: 0,
    });
    expect(pelada?.players).length(4);
  });

  it("should remove player correctly", () => {
    getSut().addPlayer("John Doe");
    getSut().removePlayer("mocked-id");

    const pelada = getSut().pelada;

    expect(pelada?.players).not.toContainEqual(
      expect.objectContaining({
        id: "mocked-id",
        name: "John Doe",
      }),
    );
    expect(pelada?.players).toEqual(
      expect.arrayContaining([
        { id: "1", name: "João", goals: 0 },
        { id: "2", name: "Marcos", goals: 0 },
        { id: "3", name: "Rafael", goals: 0 },
      ]),
    );
  });

  it("should not add player after start session", () => {
    getSut().setPelada({
      ...getSut().pelada!,
      sessionStarted: true,
    });
    const playersBefore = getSut().pelada?.players;

    getSut().addPlayer("John Doe");

    expect(getSut().pelada?.players).toEqual(playersBefore);
  });

  it("should not remove player after start session", () => {
    getSut().setPelada({
      ...getSut().pelada!,
      sessionStarted: true,
    });
    const playersBefore = getSut().pelada?.players;

    getSut().removePlayer("1");

    expect(getSut().pelada?.players).toEqual(playersBefore);
  });
});
