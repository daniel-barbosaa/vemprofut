import { useQuery } from "@tanstack/react-query";
import { QUERY_CACHE_KEYS } from "../constant/query-cache-keys";
import { peladaServices } from "../services/pelada";
import { useAuth } from "./use-auth";

export function useActivePelada() {
  const { user } = useAuth();
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.pelada, user?.id],
    queryFn: () => peladaServices.findActiveByOwnerId(user!.id),
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
    enabled: !!user,
    staleTime: 0,
  });

  return { data, isLoading: isFetching, isSuccess };
}
