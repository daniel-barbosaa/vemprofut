import { usePeladaStore } from "@/store/pelada/pelada.store";
import { useCallback } from "react";
import { useUpdatePelada } from "./use-update-pelada";

export function usePersistPelada() {
  const { mutateAsync: updatePelada } = useUpdatePelada();

  const persistPelada = useCallback(async () => {
    const pelada = usePeladaStore.getState().pelada;

    if (!pelada) return;

    await updatePelada({
      pelada,
    });
  }, [updatePelada]);

  return { persistPelada };
}
