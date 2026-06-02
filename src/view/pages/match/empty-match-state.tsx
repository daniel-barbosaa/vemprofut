import { usePeladaStore } from "@/store/pelada/pelada.store";
import { BottomNav } from "@/view/components/button-nav";
import { Play, Trophy, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function EmptyMatchState() {
  const navigate = useNavigate();
  const { pelada, startMatch } = usePeladaStore();
  const hasTeams = Boolean(pelada?.queue.length);
  const hasNextMatch = Boolean(pelada && pelada.queue.length >= 2);

  const handlePrimaryAction = () => {
    if (hasNextMatch) {
      startMatch();
      return;
    }

    if (pelada) {
      navigate("/draw");
      return;
    }

    navigate("/home");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 pb-24">
      <div className="px-6 text-center">
        {hasTeams ? (
          <Trophy className="mx-auto mb-4 size-16 text-zinc-700" />
        ) : (
          <Users className="mx-auto mb-4 size-16 text-zinc-700" />
        )}

        <h2 className="mb-2 text-2xl font-bold text-white">
          {hasTeams ? "Nenhuma partida em andamento" : "Pelada não formada"}
        </h2>

        <p className="mb-6 text-zinc-500">
          {hasTeams
            ? "A próxima partida já pode começar"
            : "Forme os times para iniciar a pelada"}
        </p>

        <button
          onClick={handlePrimaryAction}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-white transition-all hover:bg-emerald-600 active:scale-95"
        >
          {hasTeams ? (
            <>
              <Play className="size-5" />
              Iniciar Próxima Partida
            </>
          ) : (
            <>
              <Users className="size-5" />
              Sortear Times
            </>
          )}
        </button>
      </div>
      <BottomNav />
    </div>
  );
}
