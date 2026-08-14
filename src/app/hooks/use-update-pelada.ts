import type { Pelada } from "@/store/pelada/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_CACHE_KEYS } from "../constant/query-cache-keys";
import { peladaServices } from "../services/pelada";
import type { UpdatePeladaOptions } from "../services/pelada/update";
import { useAuth } from "./use-auth";

type UpdatePeladaVariables = {
  pelada: Pelada;
  options?: UpdatePeladaOptions;
};

export function useUpdatePelada() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ pelada, options }: UpdatePeladaVariables) => {
      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      return peladaServices.update(user.id, pelada, options);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_CACHE_KEYS.pelada],
      });
    },
  });
}
