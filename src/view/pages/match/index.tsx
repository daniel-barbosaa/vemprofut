import { BottomNav } from "../../components/button-nav";
import { ControlButtons } from "./control-buttons";
import { EmptyMatchState } from "./empty-match-state";
import { QueuePreview } from "./queue-preview";
import { Score } from "./score";
import { TeamReturnedNotice } from "./team-returned-notice";
import { Timer } from "./timer";
import { useMatch } from "./use-match";

export function Match() {
  const {
    pelada,
    match,
    setIsPaused,
    endMatch,
    isPaused,
    addGoal,
    removeGoal,
    timeProgress,
    minutesRemaining,
    secondsRemaining,
    matchDurationInMinutes,
  } = useMatch();

  if (!pelada || !match) {
    return <EmptyMatchState />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 pb-24">
      <div className="mx-auto max-w-2xl p-6">
        <TeamReturnedNotice match={match} />
        <Timer
          timeProgress={timeProgress}
          minutesRemaining={minutesRemaining}
          secondsRemaining={secondsRemaining}
          matchDurationInMinutes={matchDurationInMinutes}
          match={match}
        />
        <Score
          match={match}
          addGoal={addGoal}
          removeGoal={removeGoal}
          isPaused={isPaused}
          pelada={pelada}
        />
        <QueuePreview match={match} pelada={pelada} />
        <ControlButtons
          setIsPaused={setIsPaused}
          match={match}
          isPaused={isPaused}
          endMatch={endMatch}
        />
      </div>

      <BottomNav />
    </div>
  );
}
