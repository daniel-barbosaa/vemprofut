import { useCollapsedHeader } from "@/app/hooks/use-collapsed-header";
import { TopBar } from "@/view/components/top-bar";
import { ActionButton } from "./action-button";
import { Info } from "./info";
import { QueueStatus } from "./queue-status";
import { ResultHeader } from "./result-header";
import { ScoreDisplay } from "./score-display";
import { useMatchResult } from "./use-match-result";

export function MatchResult() {
  const result = useMatchResult();
  if (!result) {
    return null;
  }
  const {
    pelada,
    match,
    winner,
    isDraw,
    loser,
    nextMatch,
    handleStartNextMatch,
  } = result;
  const { collapsed } = useCollapsedHeader();

  return (
    <div className="px-4">
      <TopBar
        title={isDraw ? "Empate!" : "Partida Finalizada!"}
        collapsed={collapsed}
      />
      <ResultHeader
        isDraw={isDraw}
        winner={winner}
        pelada={pelada}
        collapsed={collapsed}
      />
      <ScoreDisplay match={match} winner={winner} />
      <Info
        isDraw={isDraw}
        winner={winner}
        loser={loser}
        match={match}
        pelada={pelada}
        nextMatch={nextMatch}
      />
      <QueueStatus pelada={pelada} nextMatch={nextMatch} winner={winner} />

      <ActionButton
        isDraw={isDraw}
        handleStartNextMatch={handleStartNextMatch}
      />
    </div>
  );
}
