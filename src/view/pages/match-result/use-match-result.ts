import { usePeladaStore } from "@/store/pelada/pelada.store";
import type { Team } from "@/store/pelada/types";
import confetti from "canvas-confetti";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useMatchResult() {
  const navigate = useNavigate();
  const { pelada, startNextMatch, startMatch } = usePeladaStore();

  const match =
    pelada?.currentMatch || pelada?.matches[pelada.matches.length - 1];
  const isDraw = match ? match.teamA.score === match.teamB.score : false;
  const winner =
    match && !isDraw
      ? match.winnerId === match.teamA.id
        ? match.teamA
        : match.teamB
      : null;
  const loser =
    match && !isDraw
      ? match.winnerId === match.teamA.id
        ? match.teamB
        : match.teamA
      : null;

  const calculateNextMatch = (): { team1: Team | null; team2: Team | null } => {
    if (!pelada || !match) return { team1: null, team2: null };

    const simulatedQueue = [...pelada.queue];

    if (isDraw) {
      simulatedQueue.splice(0, 2);

      const restingTeamIndex = simulatedQueue.findIndex(
        (t) => t.isResting && t.matchesToRest === 1,
      );

      if (restingTeamIndex !== -1) {
        const restingTeam = simulatedQueue[restingTeamIndex];
        simulatedQueue.splice(restingTeamIndex, 1);
        return {
          team1: restingTeam,
          team2: simulatedQueue[0] || null,
        };
      }

      return {
        team1: simulatedQueue[0] || null,
        team2: simulatedQueue[1] || null,
      };
    }

    if (winner) {
      const winnerInQueue = simulatedQueue.find((t) => t.id === winner.id);
      const consecutiveWins = (winnerInQueue?.consecutiveWins || 0) + 1;

      if (consecutiveWins >= pelada.maxConsecutiveWins) {
        simulatedQueue.splice(0, 2);

        return {
          team1: simulatedQueue[0] || null,
          team2: simulatedQueue[1] || null,
        };
      }

      const restingTeamIndex = simulatedQueue.findIndex(
        (t) => t.isResting && t.matchesToRest === 1,
      );

      if (restingTeamIndex !== -1) {
        return {
          team1: winner,
          team2: simulatedQueue[restingTeamIndex],
        };
      }

      return {
        team1: winner,
        team2: simulatedQueue[2] || null,
      };
    }

    return { team1: null, team2: null };
  };

  const nextMatch = calculateNextMatch();

  useEffect(() => {
    if (!pelada || !match) {
      navigate("/");
      return;
    }
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, [pelada, match, navigate, winner, isDraw, nextMatch]);

  if (!pelada || !match) {
    navigate("/");
    return null;
  }

  const handleStartNextMatch = () => {
    startNextMatch();
    startMatch();
    navigate("/match");
  };

  return {
    pelada,
    isDraw,
    winner,
    match,
    loser,
    nextMatch,
    handleStartNextMatch,
  };
}
