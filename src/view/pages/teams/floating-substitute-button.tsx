import type { Pelada } from "@/store/pelada/types";
import { UserPlus } from "lucide-react";
interface FloatingSubstituteButtonProps {
  setSubstituteDialogOpen(value: boolean): void;
  pelada: Pelada;
}

export function FloatingSubstituteButton({
  setSubstituteDialogOpen,
  pelada,
}: FloatingSubstituteButtonProps) {
  if (pelada.queue.length === 0) {
    return null;
  }

  return (
    <div className="fixed right-6 bottom-30 z-10">
      <button
        onClick={() => setSubstituteDialogOpen(true)}
        className="group relative rounded-full bg-blue-500 p-4 text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-600 active:scale-95"
      >
        <UserPlus className="size-6" />
        <div className="pointer-events-none absolute top-1/2 right-full mr-3 -translate-y-1/2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100">
          <div className="text-sm font-semibold text-white">
            Subir Manualmente
          </div>
        </div>
      </button>
    </div>
  );
}
