import { useActivePelada } from "@/app/hooks/use-active-pelada";
import { usePeladaStore } from "@/store/pelada/pelada.store";
import { useEffect } from "react";

export function PeladaInitializer() {
  const { data: peladaFromServer } = useActivePelada();
  const { pelada, setPelada } = usePeladaStore();

  useEffect(() => {
    if (!pelada && peladaFromServer) {
      setPelada(peladaFromServer);
    }
  }, [pelada, peladaFromServer, setPelada]);

  return null;
}
