import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createMatchSlice } from "./slices/match-slice";
import { createPlayersSlice } from "./slices/players-slice";
import { createSessionSlice } from "./slices/session-slice";
import { createTeamsSlice } from "./slices/teams-slice";

import { type PeladaState } from "./pelada-state";

export const usePeladaStore = create<PeladaState>()(
  persist(
    (...args) => ({
      ...createSessionSlice(...args),
      ...createPlayersSlice(...args),
      ...createTeamsSlice(...args),
      ...createMatchSlice(...args),
    }),
    { name: "pelada-storage" },
  ),
);
