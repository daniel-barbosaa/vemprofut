import { useAuth } from "@/app/hooks/use-auth";
import { create } from "@/app/services/summaries/create";
import { usePeladaStore } from "@/store/pelada/pelada.store";
import toast from "react-hot-toast";

export function useHomeController() {
  const { user } = useAuth();
  const { pelada, resetPelada } = usePeladaStore();

  async function finishPelada() {
    if (!user || !pelada) return;

    const { error } = await create(user.id, pelada);

    if (error) {
      toast.error("Não foi possível salvar a pelada, tente novamente!");
      return;
    }

    resetPelada();

    toast.success("Pelada salva com sucesso");
  }

  return { finishPelada };
}
