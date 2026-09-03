import { cn } from "@/app/utils/class-name-merger";
import { BottomSheet } from "@/view/components/bottom-sheet";
import { BottomNav } from "@/view/components/botton-nav";
import { Button } from "@/view/components/button";
import { Screen } from "@/view/components/screen";
import { ArrowRight, ClipboardPaste, Plus, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { EmptyState } from "./empty-state";
import { ImportPreviewBottomSheet } from "./import-preview-bottom-sheet";
import { ImportTextBottomSheet } from "./import-text-bottom-sheet";
import { usePlayersController } from "./use-players-controller";

export function Players() {
  const {
    handleContinue,
    totalPlayers,
    hasDrawnTeams,
    sessionStarted,
    canEditPlayers,
    handleOpenImport,
    handleAddPlayer,
    handleCloseImport,
    handleConfirmImport,
    handleImport,
    importError,
    newImportedPlayers,
    showAddPlayers,
    showImport,
    showImportPreview,
    setShowAddPlayers,
    handleCloseImportPreview,
    importText,
    setImportText,
    isImporting,
    importedPlayers,
    pelada,
    newPlayerName,
    setNewPlayerName,
    removePlayer,
  } = usePlayersController();
  return (
    <Screen>
      <div className="mb-8">
        <h1 className="mb-1 text-3xl font-bold text-white">Jogadores</h1>

        <div className="flex items-center gap-2">
          <p className="text-zinc-500">{totalPlayers} jogadores</p>

          {hasDrawnTeams && (
            <>
              <span className="text-zinc-700">•</span>

              <span className="text-xs font-medium text-emerald-400">
                Times sorteados
              </span>
            </>
          )}
        </div>

        {sessionStarted && (
          <div className="mt-2 mb-5 flex items-center gap-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-3">
            <div className="size-2 shrink-0 rounded-full bg-emerald-400" />

            <p className="text-sm text-zinc-400">Pelada em andamento</p>
          </div>
        )}

        {canEditPlayers && (
          <button
            type="button"
            onClick={handleOpenImport}
            className="mt-2 mb-6 flex w-full items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-left transition-all hover:border-emerald-500/40 hover:bg-emerald-500/10 active:scale-[0.99]"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
              <ClipboardPaste className="size-5 text-emerald-400" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-semibold text-white">
                Importar lista do WhatsApp
              </p>

              <p className="mt-0.5 text-xs text-zinc-500">
                Cole a lista e adicione os jogadores automaticamente.
              </p>
            </div>

            <ArrowRight className="size-5 shrink-0 text-zinc-600" />
          </button>
        )}
      </div>

      <EmptyState
        totalPlayers={totalPlayers}
        onAddPlayers={setShowAddPlayers}
      />

      <div className="pb-30">
        {totalPlayers > 0 && (
          <div className="space-y-2">
            {pelada?.players.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.04,
                }}
                className={cn(
                  "flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-4",
                  sessionStarted && "opacity-90",
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-zinc-800">
                    <span className="font-medium text-zinc-400">
                      {index + 1}
                    </span>
                  </div>

                  <span className="text-lg font-medium text-white">
                    {player.name}
                  </span>
                </div>

                {canEditPlayers && (
                  <button
                    type="button"
                    onClick={() => removePlayer(player.id)}
                    aria-label={`Remover ${player.name}`}
                    className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-red-400"
                  >
                    <Trash2 className="size-5" />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {!hasDrawnTeams && totalPlayers > 0 && totalPlayers < 10 && (
          <p className="mt-4 text-center text-sm text-zinc-500">
            Faltam {10 - totalPlayers} jogadores para realizar o sorteio
          </p>
        )}
      </div>

      {canEditPlayers && (
        <BottomSheet
          open={showAddPlayers}
          onClose={() => setShowAddPlayers(false)}
          title="Adicionar Jogador"
        >
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddPlayer()}
              placeholder="Nome do jogador"
              autoFocus
              className="rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-4 text-lg text-white transition-colors focus:border-emerald-500 focus:outline-none"
            />

            <button
              type="button"
              onClick={handleAddPlayer}
              disabled={!newPlayerName.trim()}
              className="flex h-14 items-center justify-center rounded-2xl bg-emerald-500 font-semibold text-white transition-colors hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
            >
              Adicionar
            </button>
          </div>
        </BottomSheet>
      )}

      <ImportTextBottomSheet
        showImport={showImport}
        onCloseImport={handleCloseImport}
        importText={importText}
        setImportText={setImportText}
        isImporting={isImporting}
        importError={importError}
        onImportText={handleImport}
      />

      <ImportPreviewBottomSheet
        showImportPreview={showImportPreview}
        onCloseImportPreview={handleCloseImportPreview}
        importedPlayers={importedPlayers}
        existingPlayers={pelada?.players ?? []}
        newImportedPlayers={newImportedPlayers}
        onConfirmImport={handleConfirmImport}
      />

      {totalPlayers >= 1 && (
        <div className="fixed right-0 bottom-22 left-0 z-30 p-4">
          <div className="mx-auto max-w-2xl">
            <Button
              onClick={handleContinue}
              disabled={!hasDrawnTeams && totalPlayers < 10}
              className={cn(
                "active:scale-[0.98]",
                hasDrawnTeams || totalPlayers >= 10
                  ? "bg-emerald-500 text-white hover:bg-emerald-600"
                  : "cursor-not-allowed bg-zinc-800 text-zinc-500",
              )}
            >
              {hasDrawnTeams ? "Ver Times" : "Sortear Times"}

              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      )}

      {totalPlayers > 0 && canEditPlayers && (
        <motion.button
          type="button"
          onClick={() => setShowAddPlayers(true)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.92 }}
          transition={{
            type: "spring",
            stiffness: 450,
            damping: 24,
          }}
          aria-label="Adicionar jogador"
          className="fixed right-5 bottom-45 z-40 flex size-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/30"
        >
          <Plus className="size-8" />
        </motion.button>
      )}

      <BottomNav />
    </Screen>
  );
}
