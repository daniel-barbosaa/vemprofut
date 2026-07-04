import { cn } from "@/app/utils/class-name-merger";
import { paths } from "@/router/paths";
import { ArrowLeft, EllipsisVertical, History, Home } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BottomSheet } from "./bottom-sheet";
import { Button } from "./button";

interface TopBarProps {
  title?: string;
  collapsed?: boolean;
}

export function TopBar({ title, collapsed }: TopBarProps) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const sheetItems = [
    { icon: Home, label: "Início", path: "/" },
    { icon: History, label: "Histórico de partidas", path: "/history" },
  ];

  const isMatchResultScreen = useLocation().pathname === paths.matchResult;
  const isCreatePeladaScreen = useLocation().pathname === paths.create;

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between bg-zinc-950/80 backdrop-blur">
      <div className="flex items-center gap-3 py-4">
        {!isMatchResultScreen && (
          <Button
            onClick={() => navigate(-1)}
            aria-label="Voltar"
            className="size-10 rounded-full border border-zinc-800 bg-zinc-950 hover:border-zinc-700 hover:bg-zinc-900 active:scale-95"
          >
            <ArrowLeft className="size-5" />
          </Button>
        )}

        <h1
          className={cn(
            "font-medium text-white transition-all duration-300",
            collapsed ? "text-lg" : "scale-95 text-xl opacity-0",
            isMatchResultScreen && "text-center",
          )}
        >
          {title}
        </h1>
      </div>

      {!isCreatePeladaScreen && (
        <>
          <button
            onClick={() => setShow(true)}
            className={cn(
              "rounded-full p-2 transition-colors hover:bg-zinc-800",
            )}
          >
            <EllipsisVertical className="size-5 text-white" />
          </button>

          <BottomSheet open={show} onClose={() => setShow(false)} title="">
            <div className="space-y-2">
              {sheetItems.map(({ icon: Icon, label, path }) => (
                <button
                  key={path}
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
            </div>
          </BottomSheet>
        </>
      )}
    </div>
  );
}
