import { usePeladaStore } from "@/store/pelada/pelada.store";
import { Navigate, Outlet } from "react-router-dom";

export function MatchInProgressGuard() {
  const currentMatch = usePeladaStore((state) => state.pelada?.currentMatch);

  if (currentMatch?.isActive) {
    return <Navigate to="/match" replace />;
  }

  return <Outlet />;
}
