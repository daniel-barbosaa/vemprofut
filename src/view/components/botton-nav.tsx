import { useAuth } from "@/app/hooks/use-auth";
import { supabase } from "@/app/lib/supabase";
import { cn } from "@/app/utils/class-name-merger";
import { usePeladaStore } from "@/store/pelada/pelada.store";
import {
  ClipboardList,
  Download,
  History,
  House,
  ListOrdered,
  LogOut,
  MoreHorizontal,
  Trophy,
  Users,
} from "lucide-react";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { BottomSheet } from "./bottom-sheet";

export function BottomNav() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentMatch = usePeladaStore((state) => state.pelada?.currentMatch);
  const isMatchInProgress = currentMatch?.isActive;
  const [show, setShow] = useState(false);

  if (isMatchInProgress && location.pathname === "/match") {
    return null;
  }

  async function signOut() {
    setShow(false);
    await supabase.auth.signOut();
    setShow(false);
  }

  if (isMatchInProgress) {
    return (
      <div className="fixed right-0 bottom-0 left-0 z-40 border-t border-zinc-800 bg-zinc-900 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <div className="mx-auto max-w-2xl">
          <button
            onClick={() => navigate("/match")}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-3 font-semibold text-zinc-950 transition-colors hover:bg-emerald-400 active:scale-[0.99]"
          >
            <Trophy className="size-5" />
            Voltar para partida
          </button>
        </div>
      </div>
    );
  }

  const navItems = [
    { icon: Trophy, label: "Partida", path: "/match" },
    { icon: Users, label: "Times", path: "/teams" },
    { icon: House, label: "Início", path: "/" },
    { icon: ListOrdered, label: "Jogadores", path: "/players" },
    { icon: MoreHorizontal, label: "Mais" },
  ];

  const sheetItems = [
    { icon: ClipboardList, label: "Resumos", path: "/summaries" },
    { icon: History, label: "Histórico de partidas", path: "/history" },
    {
      icon: Download,
      label: "Instalar aplicativo",
      path: "/install",
    },
  ];

  return (
    <div className="fixed right-0 bottom-0 left-0 z-40 border-t border-zinc-800 bg-zinc-900 pb-5">
      <div className="mx-auto flex max-w-2xl items-center justify-around">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive =
            location.pathname === path || (label === "Mais" && show);
          return (
            <button
              key={label}
              onClick={() => {
                if (!path) {
                  setShow(true);
                  return;
                }
                navigate(path);
              }}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-3 transition-colors",
                isActive
                  ? "text-emerald-400"
                  : "text-zinc-500 hover:text-zinc-300",
              )}
            >
              <Icon className="size-6" />
              <span className="text-[11px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>

      <BottomSheet open={show} onClose={() => setShow(false)} title="">
        <div className="space-y-4">
          <div className="flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-800/50 p-4">
            <img
              src={user?.user_metadata?.avatar_url}
              alt=""
              className="size-14 rounded-full border border-zinc-700"
            />

            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold text-white">
                {user?.user_metadata?.full_name}
              </h3>

              <p className="truncate text-sm text-zinc-500">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-2">
            {sheetItems.map(({ icon: Icon, label, path }) => (
              <button
                onClick={() => {
                  setShow(false);
                  navigate(path);
                }}
                className="flex w-full items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-800/50 p-4 text-left text-zinc-200 transition-colors hover:bg-zinc-800"
              >
                <Icon className="size-5 text-emerald-400" />
                <span className="font-medium">{label}</span>
              </button>
            ))}

            <button
              onClick={signOut}
              className="flex w-full items-center gap-3 rounded-2xl border border-red-900/30 bg-red-950/20 p-4 text-left text-red-400 transition-colors hover:bg-red-950/40"
            >
              <LogOut className="size-5" />
              <span className="font-medium">Sair</span>
            </button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
