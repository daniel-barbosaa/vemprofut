import { Outlet } from "react-router-dom";
import { BottomNav } from "../components/button-nav";

type AppLayoutProps = {
  showBottomNav?: boolean;
};

export function AppLayout({ showBottomNav = true }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-950 pb-24">
      <main className="mx-auto max-w-2xl p-6">
        <Outlet />
      </main>

      {showBottomNav && <BottomNav />}
    </div>
  );
}
