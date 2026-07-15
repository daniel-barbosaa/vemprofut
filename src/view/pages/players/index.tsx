import { cn } from "@/app/utils/class-name-merger";
import { usePeladaStore } from "@/store/pelada/pelada.store";
import { BottomSheet } from "@/view/components/bottom-sheet";
import { BottomNav } from "@/view/components/botton-nav";
import { Button } from "@/view/components/button";
import { Screen } from "@/view/components/screen";
import { ArrowRight, Plus, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Players() {
  const { addPlayer, pelada, removePlayer } = usePeladaStore();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [newPlayerName, setNewPlayerName] = useState("");

  const totalPlayers = pelada?.players.length || 0;
  const hasDrawnTeams = Boolean(pelada?.queue.length);

  const handleAddPlayer = () => {
    if (!newPlayerName.trim()) return;

    addPlayer(newPlayerName.trim());

    setNewPlayerName("");
    setShow(false);
  };

  const handleContinue = () => {
    if (hasDrawnTeams) {
      navigate("/");
      return;
    }

    navigate("/draw");
  };

  return (
    <Screen>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-1 text-3xl font-bold text-white">Jogadores</h1>

          <p className="text-zinc-500">{totalPlayers} jogadores</p>
        </div>
      </div>

      {totalPlayers === 0 && (
        <button
          onClick={() => setShow(true)}
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
        )}
        {hasDrawnTeams && totalPlayers < 10 && (
          <p className="mb-3 p-2 text-center text-sm text-zinc-500">
            Faltam {10 - totalPlayers} jogadores para o sorteio mínimo
          </p>
        )}
      </div>

      <BottomSheet
        open={show}
        onClose={() => setShow(false)}
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
            onClick={handleAddPlayer}
            className="flex h-14 items-center justify-center rounded-2xl bg-emerald-500 font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            Adicionar
          </button>
        </div>
      </BottomSheet>

      {totalPlayers >= 1 && (
        <div className="fixed right-0 bottom-16 left-0 z-30 p-4">
          <div className="mx-auto max-w-2xl">
            <Button
              onClick={handleContinue}
              disabled={!hasDrawnTeams && totalPlayers < 10}
              className={cn(
                "hover:bg-zinc-800",
                hasDrawnTeams || totalPlayers >= 10
                  ? "bg-emerald-500 text-white hover:bg-emerald-600 active:scale-[0.98]"
                  : "cursor-not-allowed bg-zinc-800 text-zinc-500",
              )}
            >
              {hasDrawnTeams ? "Próxima Partida" : "Sortear Times"}
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      )}

      {totalPlayers > 0 && (
        <motion.button
          onClick={() => setShow(true)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
          transition={{
            type: "spring",
            stiffness: 450,
            damping: 24,
          }}
          className="fixed right-5 bottom-40 z-40 flex size-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/30"
        >
          <Plus className="size-8" />
        </motion.button>
      )}
      <BottomNav />
    </Screen>
  );
}
