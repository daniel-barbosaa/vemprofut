import { usePeladaStore } from "@/store/pelada/pelada.store";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useMatch() {
  const navigate = useNavigate();
  const {
    pelada,
    addGoal,
    removeGoal,
    endMatch,
    pauseMatch,
    resumeMatch,
    startOvertime,
  } = usePeladaStore();
  const match = pelada?.currentMatch;
  const isPaused = match?.isPaused ?? false;
  const isOvertime = match?.isOvertime ?? false;
  const whistle = new Audio("/sounds/whistle-sound-effect.mp3");

  const currentDuration = useMemo(() => {
    if (!match) return 0;

    return isOvertime ? (match.overtimeDuration ?? 0) : match.duration;
  }, [match, isOvertime]);

  function getRemainingTime() {
    if (!match) return 0;

    const now = Date.now();

    const totalPausedTime = match.totalPausedTime ?? 0;

    const startTime = isOvertime
      ? (match.overtimeStartedAt ?? now)
      : match.startTime;

    const elapsed = Math.floor((now - startTime - totalPausedTime) / 1000);

    return Math.max(0, currentDuration - elapsed);
  }

  const [timeRemaining, setTimeRemaining] = useState(getRemainingTime());

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

  const isDraw = useCallback(() => {
    if (!match) return false;

    return match.teamA.score === match.teamB.score;
  }, [match]);

  useEffect(() => {
    setTimeRemaining(getRemainingTime());

    hasFinishedMatchRef.current = false;
  }, [match?.id, match?.isOvertime]);

  useEffect(() => {
    if (!match?.isActive || !pelada) return;

    const reachedGoalLimit =
      match.teamA.score >= match.goalLimit ||
      match.teamB.score >= match.goalLimit;

    if (reachedGoalLimit) {
      whistle.play();
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
    if (!match?.isActive || isPaused) {
      return;
    }

    const interval = setInterval(() => {
      const remaining = getRemainingTime();

      setTimeRemaining(remaining);

      if (remaining === 0) {
        clearInterval(interval);

        const shouldStartOvertime =
          pelada?.overtimeEnabled && !isOvertime && isDraw();

        if (shouldStartOvertime) {
          startOvertime();
          toast("Empate! Acréscimo iniciado.");

          return;
        }

        whistle.play();
        finishMatch("Tempo encerrado!", "⏱️");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    match?.isActive,
    isPaused,
    pelada,
    isOvertime,
    isDraw,
    startOvertime,
    finishMatch,
  ]);

  const minutesRemaining = Math.floor(timeRemaining / 60);

  const secondsRemaining = timeRemaining % 60;

  const matchDurationInMinutes = Math.floor(currentDuration / 60);

  const timeProgress =
    currentDuration > 0
      ? ((currentDuration - timeRemaining) / currentDuration) * 100
      : 0;

  const togglePause = () => {
    if (isPaused) {
      resumeMatch();
      return;
    }

    pauseMatch();
  };

  return {
    addGoal,
    removeGoal,
    pelada,
    match,

    isPaused,
    isOvertime,

    togglePause,

    endMatch,

    timeRemaining,
    minutesRemaining,
    secondsRemaining,

    matchDurationInMinutes,
    timeProgress,
  };
}
