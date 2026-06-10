import { getAll, type Summary } from "@/app/services/summaries/get-all";
import { useEffect, useState } from "react";
import { buildSummary } from "./utils/build-summary";

export function useSummary() {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSummaries() {
      try {
        const { data, error } = await getAll();

        if (error) {
          throw error;
        }

        setSummaries(data ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadSummaries();
  }, []);

  const summariesBuilt = summaries.map((summary) => ({
    id: summary.id,
    pelada: summary.pelada,
    stats: buildSummary(summary.pelada),
  }));

  return {
    summariesBuilt,
    isLoading,
  };
}
