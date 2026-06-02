import { cn } from "@/app/utils/class-name-merger";
import { usePeladaStore } from "@/store/pelada/pelada.store";
import { Button } from "@/view/components/button";
import { BottomNav } from "@/view/components/button-nav";
import { ArrowRight, Plus, Trash2, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Players() {
  const { addPlayer, pelada, removePlayer } = usePeladaStore();
  const navigate = useNavigate();

  const [showAddPlayer, setShowAddPlayer] = useState(false);

  const [newPlayerName, setNewPlayerName] = useState("");

  const totalPlayers = pelada?.players.length || 0;
  const hasDrawnTeams = Boolean(pelada?.queue.length);

  const handleAddPlayer = () => {
    if (!newPlayerName.trim()) return;

    addPlayer(newPlayerName.trim());

    setNewPlayerName("");
    setShowAddPlayer(false);
  };

  const handleContinue = () => {
    if (hasDrawnTeams) {
      navigate("/home");
      return;
    }

    navigate("/draw");
  };

  return (
    <div className="min-h-screen bg-zinc-950 pb-36">
      <div className="mx-auto max-w-2xl p-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-1 text-3xl font-bold text-white">Jogadores</h1>

            <p className="text-zinc-500">{totalPlayers} jogadores</p>
          </div>

          {totalPlayers > 0 && (
            <button
              onClick={() => setShowAddPlayer(true)}
              className="flex size-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/20 transition-all will-change-transform hover:scale-105 hover:bg-emerald-500/20 active:scale-95"
            >
              <Plus className="size-5" />
            </button>
          )}
        </div>

        {totalPlayers === 0 && (
          <button
            onClick={() => setShowAddPlayer(true)}
            className="flex w-full flex-col items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-900/50 p-10 text-center transition-all hover:border-emerald-500/40 hover:bg-zinc-900"
          >
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-zinc-800">
              <Plus className="size-8 text-zinc-400" />
            </div>

            <h2 className="mb-2 text-xl font-semibold text-white">
              Adicionar jogadores
            </h2>

            <p className="max-w-xs text-sm text-zinc-500">
              Comece adicionando os jogadores da pelada para realizar o sorteio
              dos times.
            </p>
          </button>
        )}

        {totalPlayers > 0 && (
          <div>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <User className="size-5 text-zinc-400" />

              {`Jogadores de Linha ${totalPlayers}`}
            </h2>

            <div className="space-y-2">
              {pelada?.players.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.04,
                  }}
                  className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
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

                  <button
                    onClick={() => removePlayer(player.id)}
                    className="rounded-lg p-2 text-red-400 transition-colors hover:bg-zinc-800 hover:text-red-300"
                  >
                    <Trash2 className="size-5" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showAddPlayer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowAddPlayer(false);
                setNewPlayerName("");
              }}
              className="fixed inset-0 z-40 bg-black/60"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "spring",
                damping: 24,
              }}
              className="fixed right-0 bottom-0 left-0 z-50 rounded-t-3xl border-t border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="mx-auto max-w-2xl">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">
                    Adicionar Jogador
                  </h3>

                  <button
                    onClick={() => {
                      setShowAddPlayer(false);
                      setNewPlayerName("");
                    }}
                    className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-800"
                  >
                    <X className="size-5" />
                  </button>
                </div>

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
                    onClick={handleAddPlayer}
                    className="flex h-14 items-center justify-center rounded-2xl bg-emerald-500 font-semibold text-white transition-colors hover:bg-emerald-600"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {!hasDrawnTeams && totalPlayers < 10 && (
        <p className="mb-3 text-center text-sm text-zinc-500">
          Faltam {10 - totalPlayers} jogadores para o sorteio mínimo
        </p>
      )}
      {totalPlayers >= 1 && (
        <div className="fixed right-0 bottom-18 left-0 z-30 p-4">
          <div className="mx-auto max-w-2xl">
            <Button
              onClick={handleContinue}
              disabled={!hasDrawnTeams && totalPlayers < 10}
              className={cn(
                "hover:bg-zinc-800",
                hasDrawnTeams || totalPlayers >= 10
                  ? `bg-emerald-500 text-white hover:bg-emerald-600 active:scale-[0.98]`
                  : `cursor-not-allowed bg-zinc-800 text-zinc-500`,
              )}
            >
              {hasDrawnTeams ? "Próxima Partida" : "Sortear Times"}
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
