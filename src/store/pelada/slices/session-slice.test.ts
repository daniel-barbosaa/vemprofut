import { makePeladaMock } from "@tests/factories/make-pelada-mock";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { usePeladaStore } from "../pelada.store";

const getSut = () => usePeladaStore.getState();
const mockPelada = makePeladaMock();

vi.mock("uuid", () => {
  return {
    v4: vi.fn().mockReturnValue("mocked-id"),
  };
});

describe("createSessionSlice", () => {
  beforeEach(() => {
    getSut().clearPelada();
  });

  it("should create pelada correctly", () => {
    const createPeladaData = {
      name: "Pelada do dia",
      matchDuration: 7,
      goalLimit: 2,
      maxConsecutiveWins: 2,
      overtimeEnabled: true,
      overtimeDuration: 2,
      playersPerTeam: 5,
    };

    const createPelada = getSut().createPelada(createPeladaData);

    const pelada = getSut().pelada;

    expect(pelada).toMatchObject({
      id: "mocked-id",
      name: "Pelada do dia",
      matchDuration: 7,
      goalLimit: 2,
      maxConsecutiveWins: 2,
      overtimeEnabled: true,
      overtimeDuration: 2,
      playersPerTeam: 5,
      createdAt: expect.any(Number),
      players: [],
      sessionPlayers: [],
      matches: [],
      queue: [],
      sessionStarted: false,
    });
    expect(createPelada).toBe(pelada);
  });

  it("should clear pelada correctly and return null", () => {
    getSut().setPelada(mockPelada);

    getSut().clearPelada();

    const pelada = getSut().pelada;

    expect(pelada).toBeNull();
  });

  it("should set pelada correctly", () => {
    getSut().setPelada(mockPelada);

    const pelada = getSut().pelada;

    expect(pelada).toMatchObject({
      id: "pelada-1",
      name: "Pelada teste",
      matchDuration: 10,
      goalLimit: 3,
      maxConsecutiveWins: 2,
      overtimeEnabled: true,
      overtimeDuration: 2,
      sessionStarted: false,
      playersPerTeam: 5,
      createdAt: expect.any(Number),
      players: [],
      sessionPlayers: [],
      matches: [],
      queue: [],
    });
  });
});
