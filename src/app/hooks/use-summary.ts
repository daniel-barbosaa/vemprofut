import { useInfiniteQuery } from "@tanstack/react-query";
import { PAGINATION } from "../constant/pagination";
import { QUERY_CACHE_KEYS } from "../constant/query-cache-keys";
import { summarieService } from "../services/summaries";

export function useSummaries() {
  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [QUERY_CACHE_KEYS.summary],
      initialPageParam: 1,
      queryFn: ({ pageParam }) => summarieService.getAll(pageParam),
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (lastPage.length < PAGINATION.PAGE_SIZE) {
          return null;
        }

        return lastPageParam + 1;
      },
      staleTime: Infinity,
    });
  const summaries = data?.pages.flatMap((page) => page);

  return {
    summaries: summaries ?? [],
    isLoading: isPending,
    nextPage: fetchNextPage,
    hasNextPage,
    isLoadingNextPage: isFetchingNextPage,
  };
}
