import { cn } from "@/app/utils/class-name-merger";
import { usePeladaStore } from "@/store/pelada/pelada.store";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { Modal } from "@/view/components/ui/modal";

interface ManualSubstitutionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ManualSubstitutionDialog({
  isOpen,
  onClose,
}: ManualSubstitutionDialogProps) {
  const { pelada, manualSubstitution } = usePeladaStore();

  const [selectedTargetTeam, setSelectedTargetTeam] = useState("");
  const [selectedSourceTeam, setSelectedSourceTeam] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState("");

  const handleSubstitute = () => {
    if (!selectedTargetTeam || !selectedSourceTeam || !selectedPlayer) {
      return;
    }

    const sourceTeam = pelada?.queue.find(
      (team) => team.id === selectedSourceTeam,
    );

    const targetTeam = pelada?.queue.find(
      (team) => team.id === selectedTargetTeam,
    );

    const player = sourceTeam?.players.find(
      (player) => player.id === selectedPlayer,
    );

    manualSubstitution(selectedTargetTeam, selectedSourceTeam, selectedPlayer);

    if (player && targetTeam) {
      toast.success(
        `🎯 Substituição manual realizada!\n${player.name} foi movido para ${targetTeam.name}`,
        {
          duration: 4000,
        },
      );
    }

    setSelectedTargetTeam("");
    setSelectedSourceTeam("");
    setSelectedPlayer("");

    onClose();
  };

  const targetTeam = pelada?.queue.find(
    (team) => team.id === selectedTargetTeam,
  );

  const sourceTeam = pelada?.queue.find(
    (team) => team.id === selectedSourceTeam,
  );

  return (
    <Modal.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <Modal.Content>
        <Modal.Header>Subir Jogador Manualmente</Modal.Header>

        <div className="space-y-6">
          <div>
            <label className="mb-3 block text-sm font-semibold tracking-wider text-zinc-500 uppercase">
              1. Time que precisa de jogador
            </label>

            <div className="space-y-2">
              {pelada?.queue.map((team) => (
                <button
                  key={team.id}
                  onClick={() => {
                    setSelectedTargetTeam(team.id);
                    setSelectedSourceTeam("");
                    setSelectedPlayer("");
                  }}
                  className={cn(
                    "w-full rounded-xl border px-4 py-3 text-left font-semibold transition-all active:scale-[0.98]",
                    selectedTargetTeam === team.id
                      ? "border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                      : "border-zinc-800 bg-zinc-950/40 text-zinc-300 hover:border-emerald-500/40 hover:bg-zinc-800",
                  )}
                >
                  {team.name} ({team.players.length} jogadores)
                </button>
              ))}
            </div>
          </div>

          {selectedTargetTeam && (
            <div>
              <label className="mb-3 block text-sm font-semibold tracking-wider text-zinc-500 uppercase">
                2. Puxar jogador de qual time?
              </label>

              <div className="space-y-2">
                {pelada?.queue
                  .filter(
                    (team) =>
                      team.id !== selectedTargetTeam && team.players.length > 0,
                  )
                  .map((team) => (
                    <button
                      key={team.id}
                      onClick={() => {
                        setSelectedSourceTeam(team.id);
                        setSelectedPlayer("");
                      }}
                      className={cn(
                        "w-full rounded-xl border px-4 py-3 text-left font-semibold transition-all active:scale-[0.98]",
                        selectedSourceTeam === team.id
                          ? "border-blue-500 bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                          : "border-zinc-800 bg-zinc-950/40 text-zinc-300 hover:border-blue-500/40 hover:bg-zinc-800",
                      )}
                    >
                      {team.name} ({team.players.length} jogadores)
                    </button>
                  ))}
              </div>
            </div>
          )}

          {selectedSourceTeam && sourceTeam && (
            <div>
              <label className="mb-3 block text-sm font-semibold tracking-wider text-zinc-500 uppercase">
                3. Selecione o Jogador
              </label>

              <div className="space-y-2">
                {sourceTeam.players.map((player) => (
                  <button
                    key={player.id}
                    onClick={() => setSelectedPlayer(player.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left font-medium transition-all active:scale-[0.98]",
                      selectedPlayer === player.id
                        ? "border-emerald-500 bg-emerald-500/15 text-emerald-300"
                        : "border-zinc-800 bg-zinc-950/40 text-zinc-300 hover:border-emerald-500/40 hover:bg-zinc-800",
                    )}
                  >
                    <UserPlus className="size-4 shrink-0" />
                    {player.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedPlayer && targetTeam && sourceTeam && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
              <div className="mb-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                Preview da Substituição
              </div>

              <div className="flex items-center gap-3">
                <div className="min-w-0 flex-1 rounded-lg border border-blue-700/30 bg-blue-900/20 px-3 py-2">
                  <div className="text-xs text-blue-400">Sai de</div>

                  <div className="truncate font-medium text-white">
                    {sourceTeam.name}
                  </div>
                </div>

                <UserPlus className="size-5 shrink-0 text-zinc-500" />

                <div className="flex-1 rounded-lg border border-emerald-700/30 bg-emerald-900/20 px-3 py-2">
                  <div className="text-xs text-emerald-400">Vai para</div>

                  <div className="truncate font-medium text-white">
                    {targetTeam.name}
                  </div>
                </div>
              </div>

              <div className="mt-3 text-center font-bold text-emerald-400">
                {
                  sourceTeam.players.find(
                    (player) => player.id === selectedPlayer,
                  )?.name
                }
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Modal.Close className="flex-1 rounded-xl bg-zinc-800 py-3 font-semibold text-zinc-300 transition-all hover:bg-zinc-700 hover:text-white active:scale-95">
              Cancelar
            </Modal.Close>

            <button
              onClick={handleSubstitute}
              disabled={
                !selectedTargetTeam || !selectedSourceTeam || !selectedPlayer
              }
              className="flex-1 rounded-xl bg-emerald-500 py-3 font-semibold text-white transition-all hover:bg-emerald-600 active:scale-95 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
            >
              Confirmar
            </button>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}
