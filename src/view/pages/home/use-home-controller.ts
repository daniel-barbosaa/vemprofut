import { useAuth } from "@/app/hooks/use-auth";
import { useUpdatePelada } from "@/app/hooks/use-update-pelada";
import { create } from "@/app/services/summaries/create";
import { usePeladaStore } from "@/store/pelada/pelada.store";
import toast from "react-hot-toast";

export function useHomeController() {
  const { user } = useAuth();
  const { pelada, resetPelada } = usePeladaStore();
  const { mutateAsync: updatePelada } = useUpdatePelada();

  async function finishPelada() {
    if (!user || !pelada) return;

    try {
      if (pelada.matches.length > 0) {
        const { error } = await create(user.id, pelada);

        if (error) {
          toast.error("Não foi possível salvar a pelada, tente novamente!");
          return;
        }
      }

      await updatePelada({
        pelada,
        options: { status: "finished" },
      });

      resetPelada();

      toast.success("Pelada finalizada");
    } catch {
      toast.error("Não foi possível finalizar a pelada, tente novamente!");
    }
  }

  return { finishPelada };
}
