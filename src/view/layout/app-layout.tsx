import { usePeladaStore } from "@/store/pelada/pelada.store";
import { Outlet } from "react-router-dom";
import { BottomNav } from "../components/botton-nav";

type AppLayoutProps = {
  showBottomNav?: boolean;
};
export function AppLayout({ showBottomNav = true }: AppLayoutProps) {
  const { pelada } = usePeladaStore();

  const shouldShowBottomNav = showBottomNav && Boolean(pelada);

  return (
    <div className="min-h-screen bg-zinc-950 pb-24">
      <main className="mx-auto max-w-2xl">
        <Outlet />
      </main>

      {shouldShowBottomNav && <BottomNav />}
    </div>
  );
}
