import { useAuth } from "@/app/hooks/use-auth";
import { Navigate, Outlet } from "react-router-dom";

interface AuthGuardProps {
  isPrivate: boolean;
}
export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user && isPrivate) {
    return <Navigate to="/login" />;
  }

  if (user && !isPrivate) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}
