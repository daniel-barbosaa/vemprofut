import { History, ListOrdered, Trophy, Users } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Trophy, label: "Partida", path: "/match" },
    { icon: Users, label: "Times", path: "/teams" },
    { icon: ListOrdered, label: "Jogadores", path: "/players" },
    { icon: History, label: "Histórico", path: "/history" },
  ];

  return (
    <div className="pb-safe fixed right-0 bottom-0 left-0 border-t border-zinc-800 bg-zinc-900">
      <div className="mx-auto flex max-w-2xl items-center justify-around">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-1 flex-col items-center gap-1 py-3 transition-colors ${
                isActive
                  ? "text-emerald-400"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
