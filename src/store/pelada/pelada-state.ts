import type { MatchSlice } from "./slices/match-slice";
import type { PlayersSlice } from "./slices/players-slice";
import type { SessionSlice } from "./slices/session-slice";
import type { TeamsSlice } from "./slices/teams-slice";

export type PeladaState = SessionSlice & PlayersSlice & TeamsSlice & MatchSlice;
