import { buildSummary } from "@/view/pages/summary/utils/build-summary";
import { useQuery } from "@tanstack/react-query";
import { summarieService } from "../services/summaries";

export function useSummaries() {
  const { data, isFetching } = useQuery({
    queryKey: ["summaries"],
    queryFn: summarieService.getAll,
    select: (summaries) =>
      summaries.map((summary) => ({
        id: summary.id,
        pelada: summary.pelada,
        stats: buildSummary(summary.pelada),
      })),
    staleTime: Infinity,
  });

  return {
    summaries: data ?? [],
    isLoading: isFetching,
  };
}
