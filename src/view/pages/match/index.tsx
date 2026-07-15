import { Screen } from "@/view/components/screen";
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
    endMatch,
    isPaused,
    addGoal,
    removeGoal,
    timeProgress,
    minutesRemaining,
    secondsRemaining,
    matchDurationInMinutes,
    isOvertime,
    togglePause,
  } = useMatch();

  if (!pelada || !match) {
    return <EmptyMatchState />;
  }

  return (
    <Screen>
      <TeamReturnedNotice match={match} />
      <Timer
        timeProgress={timeProgress}
        minutesRemaining={minutesRemaining}
        secondsRemaining={secondsRemaining}
        matchDurationInMinutes={matchDurationInMinutes}
        match={match}
        isOvertime={isOvertime}
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
        setIsPaused={togglePause}
        match={match}
        isPaused={isPaused}
        endMatch={endMatch}
      />
    </Screen>
  );
}
