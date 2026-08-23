import { useAuth } from "@/app/hooks/use-auth";
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "./paths";

export const ADMIN_EMAIL = "danimendes9728@gmail.com";

export function AdminGuard() {
  const { user } = useAuth();

  const isAdmin = user?.email === ADMIN_EMAIL;

  if (!isAdmin) {
    return <Navigate to={paths.home} replace />;
  }

  return <Outlet />;
}
