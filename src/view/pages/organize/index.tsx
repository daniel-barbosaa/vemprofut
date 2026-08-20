import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTeamCard } from "./sortable-team-card";

import { useCollapsedHeader } from "@/app/hooks/use-collapsed-header";
import { cn } from "@/app/utils/class-name-merger";
import { Button } from "@/view/components/button";
import { TopBar } from "@/view/components/top-bar";
import { useDroppable } from "@dnd-kit/core";
import { Play } from "lucide-react";
import { useOrganize } from "./use-organize";

interface Props {
  id: string;
  children: React.ReactNode;
}

export function DroppableContainer({ id, children }: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`space-y-3 rounded-2xl p-2 transition-all ${
        isOver ? "bg-zinc-800/40" : ""
      }`}
    >
      {children}
    </div>
  );
}

export function OrganizeNextMatch() {
  const {
    handleDragEnd,
    lastMatch,
    isDraw,
    teams,
    handleStartNextMatch,
    canStartMatch,
    playerPerTeam,
  } = useOrganize();

  const { collapsed } = useCollapsedHeader();
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <>
        <TopBar
          title="Organizar Próxima Rodada"
          collapsed={collapsed}
          showMenu
        />

        <div className="p-6">
          <div className="mb-8">
            <h1
              className={cn(
                "text-2xl font-bold text-white transition-all duration-300",
                collapsed ? "-translate-y-4 opacity-0" : "opacity-100",
              )}
            >
              Organizar Próxima Rodada
            </h1>

            <p className="mt-2 text-zinc-500">
              Arraste os times para definir a ordem da fila.
            </p>
          </div>

          <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <div className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
              Última Partida
            </div>

            <div className="mt-2 text-lg font-bold text-white">
              {lastMatch?.teamA.name} {lastMatch?.teamA.score} x{" "}
              {lastMatch?.teamB.score} {lastMatch?.teamB.name}
            </div>

            <div
              className={`mt-2 text-sm ${
                isDraw ? "text-amber-400" : "text-emerald-400"
              }`}
            >
              {isDraw ? "Partida terminou empatada" : "Partida encerrada"}
            </div>
          </div>

          {isDraw && (
            <div className="mb-4 rounded-xl border border-blue-900/40 bg-blue-950/20 p-4">
              <div className="text-xs font-semibold tracking-wide text-blue-400 uppercase">
                Partida Empatada
              </div>

              <div className="mt-2 text-sm text-zinc-300">
                Organize manualmente a ordem da fila.
              </div>
            </div>
          )}

          <div className="mb-6 rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-4">
            <div className="text-xs font-semibold tracking-wide text-emerald-400 uppercase">
              Próxima Partida
            </div>

            <div className="mt-2 text-xl font-bold text-white">
              {teams[0]?.name} x {teams[1]?.name}
            </div>

            <div className="mt-2 text-sm text-zinc-400">
              Os dois primeiros times entrarão em campo.
            </div>
          </div>

          <SortableContext
            items={teams.map((team) => team.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {teams.map((team, index) => (
                <SortableTeamCard
                  key={team.id}
                  team={team}
                  position={index + 1}
                  highlight={index < 2}
                  blockedFromMatch={Boolean(team.isResting)}
                  playerPerTeam={playerPerTeam ?? 0}
                />
              ))}
            </div>
          </SortableContext>
        </div>
        <div className="fixed right-0 bottom-0 left-0 border-t border-zinc-800 bg-zinc-950/95 p-4 backdrop-blur">
          <div className="mx-auto max-w-2xl">
            <Button
              onClick={handleStartNextMatch}
              disabled={!canStartMatch}
              className="rounded-xl bg-emerald-600 py-4 hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
            >
              <Play className="size-5" />
              Iniciar Próxima Rodada
            </Button>
          </div>
        </div>
      </>
    </DndContext>
  );
}
