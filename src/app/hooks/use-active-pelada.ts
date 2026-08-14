import { useQuery } from "@tanstack/react-query";
import { QUERY_CACHE_KEYS } from "../constant/query-cache-keys";
import { peladaServices } from "../services/pelada";
import { useAuth } from "./use-auth";

export function useActivePelada() {
  const { user } = useAuth();
  const { data, isFetching } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.pelada, user?.id],
    queryFn: () => peladaServices.findActiveByOwnerId(user!.id),
    enabled: !!user,
    staleTime: Infinity,
  });

  return { data, isLoading: isFetching };
}
