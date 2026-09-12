import { useSummaries } from "@/app/hooks/use-summary";
import { buildSummary } from "./utils/build-summary";

export function useSummaryController() {
  const { summaries, isLoading, nextPage, hasNextPage, isLoadingNextPage } =
    useSummaries();

  const summariesBuilt = summaries.map((summary) => ({
    id: summary.id,
    pelada: summary.pelada,
    stats: buildSummary(summary.pelada),
  }));

  return {
    summariesBuilt: summariesBuilt,
    isLoading,
    nextPage,
    hasNextPage,
    isLoadingNextPage,
  };
}
