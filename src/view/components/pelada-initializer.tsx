import { useActivePelada } from "@/app/hooks/use-active-pelada";
import { usePeladaStore } from "@/store/pelada/pelada.store";
import { useEffect } from "react";

export function PeladaInitializer() {
  const { data: peladaFromServer } = useActivePelada();

  const { pelada, setPelada, clearPelada } = usePeladaStore();

  useEffect(() => {
    if (peladaFromServer === null) {
      clearPelada();
      return;
    }

    if (!pelada && peladaFromServer) {
      setPelada(peladaFromServer);
    }
  }, [pelada, peladaFromServer, setPelada, clearPelada]);

  return null;
}
