import { cn } from "@/app/utils/class-name-merger";
import type { Team } from "@/store/pelada/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Coffee, GripVertical } from "lucide-react";

interface SortableTeamCardProps {
  team: Team;
  position: number;
  highlight?: boolean;
  blockedFromMatch?: boolean;
  playerPerTeam: number;
}

export function SortableTeamCard({
  team,
  position,
  highlight,
  blockedFromMatch,
  playerPerTeam,
}: SortableTeamCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: team.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "touch-none rounded-2xl border p-4 transition-all",
        blockedFromMatch
          ? "border-amber-700/40 bg-amber-950/20"
          : highlight
            ? "border-emerald-700/40 bg-emerald-950/20"
            : "border-zinc-800 bg-zinc-900",
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-500">{position}°</span>
            <div className="font-bold text-white">{team.name}</div>
          </div>

          <div className="mt-1 text-sm text-zinc-500">
            {team.players.map((player) => player.name).join(", ")}
          </div>

          {team.players.length < playerPerTeam && (
            <div className="mt-2 text-xs font-medium text-amber-400">
              Time incompleto
            </div>
          )}

          {blockedFromMatch && (
            <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-amber-300">
              <Coffee className="size-3.5" />
              Em descanso
            </div>
          )}
        </div>

        <GripVertical className="size-5 shrink-0 text-zinc-600" />
      </div>
    </div>
  );
}
