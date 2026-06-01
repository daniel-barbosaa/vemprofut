import { usePeladaStore } from "@/store/pelada/pelada.store";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useMatch() {
  const navigate = useNavigate();
  const { pelada, addGoal, removeGoal, endMatch } = usePeladaStore();
  const [isPaused, setIsPaused] = useState(false);
  const match = pelada?.currentMatch;
  const matchDurationInSeconds = match?.duration ?? 0;
  const [timeRemaining, setTimeRemaining] = useState(matchDurationInSeconds);
  const hasFinishedMatchRef = useRef(false);

  const finishMatch = useCallback(
    (message: string, icon: string) => {
      if (hasFinishedMatchRef.current) return;

      hasFinishedMatchRef.current = true;

      toast(message, { icon });

      endMatch();

      navigate("/match/result");
    },
    [endMatch, navigate],
  );

  useEffect(() => {
    setTimeRemaining(matchDurationInSeconds);
    setIsPaused(false);
    hasFinishedMatchRef.current = false;
  }, [match?.id, matchDurationInSeconds]);

  useEffect(() => {
    if (!match?.isActive || !pelada) return;

    const reachedGoalLimit =
      match.teamA.score >= match.goalLimit ||
      match.teamB.score >= match.goalLimit;

    if (reachedGoalLimit) {
      finishMatch("Limite de gols atingido!", "⚽");
    }
  }, [
    match?.isActive,
    match?.teamA.score,
    match?.teamB.score,
    match?.goalLimit,
    pelada,
    finishMatch,
  ]);

  useEffect(() => {
    if (!match?.isActive || isPaused || matchDurationInSeconds <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((currentTimeRemaining) => {
        const nextTimeRemaining = Math.max(0, currentTimeRemaining - 1);

        if (nextTimeRemaining === 0) {
          clearInterval(interval);

          finishMatch("Tempo Encerrado!", "⏱️");
        }

        return nextTimeRemaining;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [match?.isActive, isPaused, finishMatch, matchDurationInSeconds]);

  const minutesRemaining = Math.floor(timeRemaining / 60);

  const secondsRemaining = timeRemaining % 60;

  const matchDurationInMinutes = Math.floor(matchDurationInSeconds / 60);

  const timeProgress =
    matchDurationInSeconds > 0
      ? ((matchDurationInSeconds - timeRemaining) / matchDurationInSeconds) *
        100
      : 0;

  return {
    addGoal,
    pelada,
    timeRemaining,
    removeGoal,
    match,
    matchDurationInSeconds,
    setIsPaused,
    endMatch,
    isPaused,
    minutesRemaining,
    matchDurationInMinutes,
    secondsRemaining,
    timeProgress,
  };
}
