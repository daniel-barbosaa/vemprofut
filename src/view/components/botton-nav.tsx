import { useAuth } from "@/app/hooks/use-auth";
import { useFeedback } from "@/app/hooks/use-feedback";
import { supabase } from "@/app/lib/supabase";
import { cn } from "@/app/utils/class-name-merger";
import { ADMIN_EMAIL } from "@/router/admin-guard";
import { usePeladaStore } from "@/store/pelada/pelada.store";
import {
  ClipboardList,
  Download,
  History,
  House,
  ListChevronsUpDown,
  ListOrdered,
  LogOut,
  MessageSquareMore,
  MessagesSquare,
  MoreHorizontal,
  Trophy,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { BottomSheet } from "./bottom-sheet";

interface MenuItem {
  icon: typeof Users;
  label: string;
  path: string;
  badge?: number;
}

export function BottomNav() {
  const { user } = useAuth();
  const { data } = useFeedback();
  const { pelada, resetPelada } = usePeladaStore();

  const navigate = useNavigate();
  const location = useLocation();

  const [show, setShow] = useState(false);

  const currentMatch = pelada?.currentMatch;
  const isMatchInProgress = currentMatch?.isActive;
  const isAdmin = user?.email === ADMIN_EMAIL;

  if (isMatchInProgress && location.pathname === "/match") {
    return null;
  }

  async function signOut() {
    setShow(false);
    await supabase.auth.signOut();
    resetPelada();
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
    {
      icon: Users,
      label: "Times",
      path: "/teams",
    },
    {
      icon: ListChevronsUpDown,
      label: "Fila",
      path: "/match/organize",
    },
    {
      icon: House,
      label: "Início",
      path: "/",
    },
    {
      icon: ListOrdered,
      label: "Jogadores",
      path: "/players",
    },
    {
      icon: MoreHorizontal,
      label: "Mais",
    },
  ];

  const peladaItems: MenuItem[] = [
    {
      icon: Users,
      label: "Times",
      path: "/teams",
    },
    {
      icon: History,
      label: "Histórico de partidas",
      path: "/history",
    },
    {
      icon: ClipboardList,
      label: "Resumos",
      path: "/summaries",
    },
  ];

  const appItems: MenuItem[] = [
    {
      icon: Download,
      label: "Instalar aplicativo",
      path: "/install",
    },
    {
      icon: MessageSquareMore,
      label: "Enviar sugestão",
      path: "/suggestions",
    },
  ];

  const adminItems: MenuItem[] = isAdmin
    ? [
        {
          icon: MessagesSquare,
          label: "Feedbacks",
          path: "/feedbacks",
          badge: data?.length,
        },
      ]
    : [];

  const renderMenuItem = ({ icon: Icon, label, path, badge }: MenuItem) => (
    <button
      key={path}
      type="button"
      onClick={() => {
        setShow(false);
        navigate(path);
      }}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-zinc-300 transition-colors hover:bg-zinc-800/70 active:scale-[0.99]"
    >
      <Icon className="size-5 text-zinc-500" />

      <span className="flex-1 text-sm font-medium">{label}</span>

      {badge !== undefined && badge > 0 && (
        <span className="flex min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 py-0.5 text-[11px] font-semibold text-white">
          {badge}
        </span>
      )}
    </button>
  );

  return (
    <div className="fixed right-0 bottom-0 left-0 z-40 border-t border-zinc-800 bg-zinc-900 pb-5">
      <div className="mx-auto flex max-w-2xl items-center justify-around">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive =
            location.pathname === path || (label === "Mais" && show);

          return (
            <button
              key={label}
              type="button"
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
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <img
              src={user?.user_metadata?.avatar_url}
              alt=""
              className="size-11 rounded-full border border-zinc-700"
            />

            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-white">
                {user?.user_metadata?.full_name}
              </h3>

              <p className="truncate text-xs text-zinc-500">{user?.email}</p>
            </div>
          </div>

          <MenuSection title="Pelada">
            {peladaItems.map(renderMenuItem)}
          </MenuSection>

          <MenuSection title="Aplicativo">
            {appItems.map(renderMenuItem)}
          </MenuSection>

          {adminItems.length > 0 && (
            <MenuSection title="Administração">
              {adminItems.map(renderMenuItem)}
            </MenuSection>
          )}

          <div className="border-t border-zinc-800 pt-3">
            <button
              type="button"
              onClick={signOut}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-red-400 transition-colors hover:bg-red-950/20 active:scale-[0.99]"
            >
              <LogOut className="size-5" />
              <span className="text-sm font-medium">Sair</span>
            </button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}

interface MenuSectionProps {
  title: string;
  children: React.ReactNode;
}

function MenuSection({ title, children }: MenuSectionProps) {
  return (
    <section>
      <p className="mb-1 px-3 text-[11px] font-semibold tracking-wider text-zinc-600 uppercase">
        {title}
      </p>

      <div className="space-y-0.5">{children}</div>
    </section>
  );
}
