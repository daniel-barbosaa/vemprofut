import { CreatePelada } from "@/view/pages/create-pelada";
import { Home } from "@/view/pages/home";
import { Match } from "@/view/pages/match";
import { MatchResult } from "@/view/pages/match-result";
import { Players } from "@/view/pages/players";
import { TeamDraw } from "@/view/pages/team-draw";
import { Teams } from "@/view/pages/teams";
import { Welcome } from "@/view/pages/welcome";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Welcome,
  },
  {
    path: "/home",
    Component: Home,
  },
  {
    path: "/create",
    Component: CreatePelada,
  },
  {
    path: "/players",
    Component: Players,
  },
  {
    path: "/draw",
    Component: TeamDraw,
  },
  {
    path: "/match",
    Component: Match,
  },
  {
    path: "/match/result",
    Component: MatchResult,
  },
  {
    path: "/teams",
    Component: Teams,
  },
]);
