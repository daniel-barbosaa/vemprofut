import { cn } from "@/app/utils/class-name-merger";
import { usePeladaStore } from "@/store/pelada/pelada.store";
import { History, ListOrdered, Trophy, Users } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentMatch = usePeladaStore((state) => state.pelada?.currentMatch);
  const isMatchInProgress = currentMatch?.isActive;

  if (isMatchInProgress && location.pathname === "/match") {
    return null;
  }

  if (isMatchInProgress) {
    return (
      <div className="fixed right-0 bottom-0 left-0 z-40 border-t border-zinc-800 bg-zinc-900 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <div className="mx-auto max-w-2xl">
          <button
            onClick={() => navigate("/match")}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-3 font-semibold text-zinc-950 transition-colors hover:bg-emerald-400 active:scale-[0.99]"
          >
            <Trophy className="h-5 w-5" />
            Voltar para partida
          </button>
        </div>
      </div>
    );
  }

  const navItems = [
    { icon: Trophy, label: "Partida", path: "/match" },
    { icon: Users, label: "Times", path: "/teams" },
    { icon: ListOrdered, label: "Jogadores", path: "/players" },
    { icon: History, label: "Histórico", path: "/history" },
  ];

  return (
    <div className="fixed right-0 bottom-0 left-0 z-40 border-t border-zinc-800 bg-zinc-900 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-2xl items-center justify-around">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-3 transition-colors",
                isActive
                  ? "text-emerald-400"
                  : "text-zinc-500 hover:text-zinc-300",
              )}
            >
              <Icon className="size-6" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
