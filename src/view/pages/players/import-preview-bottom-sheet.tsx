import { BottomSheet } from "@/view/components/bottom-sheet";
import { Check } from "lucide-react";

interface ImportedPlayer {
  name: string;
}

interface ImportPreviewBottomSheetProps {
  showImportPreview: boolean;
  onCloseImportPreview(): void;
  importedPlayers: ImportedPlayer[];
  existingPlayers: ImportedPlayer[];
  newImportedPlayers: ImportedPlayer[];
  onConfirmImport(): void;
}

export function ImportPreviewBottomSheet({
  showImportPreview,
  onCloseImportPreview,
  importedPlayers,
  existingPlayers,
  newImportedPlayers,
  onConfirmImport,
}: ImportPreviewBottomSheetProps) {
  return (
    <BottomSheet
      open={showImportPreview}
      onClose={onCloseImportPreview}
      title="Confirmar jogadores"
    >
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-sm text-zinc-400">
            Encontramos{" "}
            <span className="font-medium text-white">
              {importedPlayers.length}
            </span>{" "}
            {importedPlayers.length === 1 ? "jogador" : "jogadores"} na lista.
          </p>
        </div>

        <div className="space-y-2">
          {importedPlayers.map((player, index) => {
            const alreadyExists = existingPlayers.some(
              (existing) =>
                existing.name.trim().toLowerCase() ===
                player.name.trim().toLowerCase(),
            );

            return (
              <div
                key={`${player.name}-${index}`}
                className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-zinc-800">
                  {alreadyExists ? (
                    <Check className="size-5 text-zinc-600" />
                  ) : (
                    <span className="font-medium text-zinc-400">
                      {index + 1}
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-white">
                    {player.name}
                  </p>

                  {alreadyExists && (
                    <p className="mt-0.5 text-xs text-zinc-600">
                      Já está na pelada
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onConfirmImport}
          disabled={newImportedPlayers.length === 0}
          className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-emerald-500 font-semibold text-white transition-colors hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
        >
          <Check className="size-5" />

          {newImportedPlayers.length > 0
            ? `Adicionar ${newImportedPlayers.length} ${
                newImportedPlayers.length === 1 ? "jogador" : "jogadores"
              }`
            : "Nenhum jogador novo"}
        </button>
      </div>
    </BottomSheet>
  );
}
