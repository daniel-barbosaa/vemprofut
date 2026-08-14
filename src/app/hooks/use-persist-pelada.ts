import { usePeladaStore } from "@/store/pelada/pelada.store";
import { useUpdatePelada } from "./use-update-pelada";

export function usePersistPelada() {
  const { mutateAsync: updatePelada } = useUpdatePelada();

  async function persistPelada() {
    const pelada = usePeladaStore.getState().pelada;

    if (!pelada) return;

    await updatePelada({
      pelada,
    });
  }

  return { persistPelada };
}
