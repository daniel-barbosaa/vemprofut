import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function EmptyState() {
  const navigate = useNavigate();

  return (
    <div className="py-16 text-center">
      <Users className="mx-auto mb-4 size-16 text-zinc-700" />

      <h2 className="mb-2 text-xl font-semibold text-white">
        Nenhum time sorteado
      </h2>

      <p className="mb-6 text-zinc-500">
        Adicione jogadores e sorteie os times
      </p>

      <button
        onClick={() => navigate("/players")}
        className="rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-white transition-all hover:bg-emerald-600 active:scale-95"
      >
        Gerenciar Jogadores
      </button>
    </div>
  );
}
