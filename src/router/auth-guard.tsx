import { useAuth } from "@/app/hooks/use-auth";
import { PeladaInitializer } from "@/view/components/pelada-initializer";
import { motion } from "motion/react";
import { Navigate, Outlet } from "react-router-dom";

interface AuthGuardProps {
  isPrivate: boolean;
}
export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          className="relative flex items-end justify-center"
          role="status"
          aria-label="Carregando"
        >
          <motion.img
            src="/soccer-ball.svg"
            alt=""
            aria-hidden
            className="size-14"
            animate={{
              y: [0, -34, 0],
              scaleX: [1.08, 1, 1.08],
              scaleY: [0.92, 1, 0.92],
            }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    );
  }

  if (!user && isPrivate) {
    return <Navigate to="/login" />;
  }

  if (user && !isPrivate) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <PeladaInitializer />
      <Outlet />
    </>
  );
}
