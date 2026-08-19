import { useCollapsedHeader } from "@/app/hooks/use-collapsed-header";
import { cn } from "@/app/utils/class-name-merger";
import { usePeladaStore } from "@/store/pelada/pelada.store";
import { TopBar } from "@/view/components/top-bar";
import { Info, Shuffle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ConfirmRedrawModal } from "./confirm-redraw-modal";
import { PlayingTeamsSection } from "./playing-teams-section";
import { ReturnedTeamBanner } from "./returned-team-banner";
import { StartMatchButton } from "./start-match-button";
import { WaitingTeamsSection } from "./waiting-teams-section";

export function TeamDraw() {
  const navigate = useNavigate();
  const { pelada, drawTeams, startMatch } = usePeladaStore();
  const [isRedrawModalOpen, setIsRedrawModalOpen] = useState(false);
  const { collapsed } = useCollapsedHeader();

  useEffect(() => {
    if (!pelada) {
      navigate("/");
      return;
    }
    if (pelada.queue.length === 0) {
      drawTeams();
    }
  }, [pelada, navigate, drawTeams]);

  if (!pelada) {
    return null;
  }

  const handleStartMatch = () => {
    startMatch();
    navigate("/match");
  };

  return (
    <>
      <TopBar
        title="Sorteio"
        collapsed={collapsed}
        backTo={"/players"}
        showMenu
      />
      <div className="px-6">
        <div className="mb-6">
          <h1
            className={cn(
              "text-2xl font-bold text-white transition-all duration-300",
              collapsed ? "-translate-y-4 opacity-0" : "opacity-100",
            )}
          >
            Sorteio
          </h1>

          <p className="text-zinc-500">{pelada.queue.length} times formados</p>

          {pelada.sessionStarted && (
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-500/5 px-3 py-2.5">
              <div className="size-1.5 shrink-0 rounded-full bg-emerald-400" />

              <p className="text-xs text-zinc-500">
                Pelada em andamento. Os times não podem ser alterados.
              </p>
            </div>
          )}

          {!pelada.sessionStarted && (
            <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/70 p-3.5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                  <Info className="size-4 text-emerald-400" />
                </div>

                <div>
                  <p className="text-sm font-medium text-zinc-200">
                    Times fixos durante a pelada
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                    Os jogadores só mudam de time através das substituições.
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t border-zinc-800 pt-3">
                <button
                  type="button"
                  onClick={() => setIsRedrawModalOpen(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-600 hover:bg-zinc-800 active:scale-[0.98]"
                >
                  <Shuffle className="size-4 text-emerald-400" />
                  Sortear novamente
                </button>
              </div>
            </div>
          )}
        </div>

        <ReturnedTeamBanner pelada={pelada} />

        <PlayingTeamsSection pelada={pelada} />

        <WaitingTeamsSection pelada={pelada} />

        <div className="fixed right-0 bottom-6 left-0 px-6 pb-15">
          <div className="mx-auto max-w-2xl">
            <StartMatchButton pelada={pelada} onStart={handleStartMatch} />
          </div>
        </div>

        <ConfirmRedrawModal
          open={isRedrawModalOpen}
          onOpenChange={setIsRedrawModalOpen}
          onConfirm={drawTeams}
        />
      </div>
    </>
  );
}
