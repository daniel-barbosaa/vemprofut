import { MatchInProgressGuard } from "@/router/match-in-progress-guard";
import { AppLayout } from "@/view/layout/app-layout";
import { CreatePelada } from "@/view/pages/create-pelada";
import { History } from "@/view/pages/history";
import { Home } from "@/view/pages/home";
import { Match } from "@/view/pages/match";
import { MatchResult } from "@/view/pages/match-result";
import { Players } from "@/view/pages/players";
import { TeamDraw } from "@/view/pages/team-draw";
import { Teams } from "@/view/pages/teams";
import { Welcome } from "@/view/pages/welcome";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { paths } from "./paths";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Welcome />} path={paths.welcome} />

        <Route element={<AppLayout showBottomNav={false} />}>
          <Route element={<Home />} path={paths.home} />
        </Route>

        <Route element={<AppLayout />}>
          <Route element={<Teams />} path={paths.teams} />
          <Route element={<History />} path={paths.history} />
        </Route>

        <Route element={<MatchInProgressGuard />}>
          <Route element={<CreatePelada />} path={paths.create} />
          <Route element={<Players />} path={paths.players} />
          <Route element={<TeamDraw />} path={paths.draw} />
        </Route>

        <Route element={<Match />} path={paths.match} />
        <Route element={<MatchResult />} path={paths.matchResult} />
      </Routes>
    </BrowserRouter>
  );
}
