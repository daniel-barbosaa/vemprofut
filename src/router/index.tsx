import { MatchInProgressGuard } from "@/router/match-in-progress-guard";
import { AppLayout } from "@/view/layout/app-layout";
import { CreatePelada } from "@/view/pages/create-pelada";
import { History } from "@/view/pages/history";
import { Home } from "@/view/pages/home/home";
import { Match } from "@/view/pages/match";
import { MatchResult } from "@/view/pages/match-result";
import { OrganizeNextMatch } from "@/view/pages/organize";
import { Players } from "@/view/pages/players";
import { SignIn } from "@/view/pages/sign-in";
import { Summaries } from "@/view/pages/summary";
import { SessionSummary } from "@/view/pages/summary/session";
import { TeamDraw } from "@/view/pages/team-draw";
import { Teams } from "@/view/pages/teams";
import { Welcome } from "@/view/pages/welcome";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthGuard } from "./auth-guard";
import { paths } from "./paths";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate />}>
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

          <Route element={<Summaries />} path={paths.summary} />
          <Route element={<SessionSummary />} path={`${paths.summary}/:id`} />

          <Route element={<OrganizeNextMatch />} path={paths.organize} />
        </Route>

        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<SignIn />} path={paths.signIn} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
