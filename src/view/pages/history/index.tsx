import { HistoryEmptyState } from "./history-empty-state";
import { MatchList } from "./match-list";
import { StatisticsOverview } from "./statistics-overview";
import { TeamStatistics } from "./team-statistics";
import { useHistory } from "./use-history";
import { Screen } from "@/view/components/screen";

export function History() {
  const { formatDuration, getEndReasonText, stats, pelada } = useHistory();

  return (
    <Screen>
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold text-white">Histórico</h1>
        <p className="text-zinc-500">
          {pelada.matches.length} partida
          {pelada.matches.length !== 1 ? "s" : ""} realizada
          {pelada.matches.length !== 1 ? "s" : ""}
        </p>
      </div>

      {pelada.matches.length === 0 ? (
        <HistoryEmptyState />
      ) : (
        <>
          <StatisticsOverview pelada={pelada} />
          <TeamStatistics stats={stats} pelada={pelada} />

          <MatchList
            pelada={pelada}
            formatDuration={formatDuration}
            getEndReasonText={getEndReasonText}
          />
        </>
      )}
    </Screen>
  );
}
