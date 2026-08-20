import { usePeladaStore } from "@/store/pelada/pelada.store";
import type { Match, Pelada, Team } from "@/store/pelada/types";
import type { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function buildDefaultNextQueue(
  pelada: Pelada | null,
  lastMatch?: Match,
): Team[] {
  if (!pelada) {
    return [];
  }

  if (!lastMatch || !pelada.currentMatch) {
    return pelada.queue;
  }

  let updatedQueue: Team[] = pelada.queue.map((team) => ({
    ...team,
    justReturned: false,
  }));

  if (!lastMatch.winnerId) {
    const teamA = updatedQueue[0];
    const teamB = updatedQueue[1];

    updatedQueue.splice(0, 2);

    const restingTeamIndex = updatedQueue.findIndex(
      (team) => team.isResting && team.matchesToRest === 1,
    );

    if (restingTeamIndex !== -1) {
      const restingTeam = updatedQueue[restingTeamIndex];

      updatedQueue.splice(restingTeamIndex, 1);

      const nextMatch = [
        {
          ...restingTeam,
          isResting: false,
          matchesToRest: 0,
          consecutiveWins: 0,
          justReturned: true,
        },
        updatedQueue[0],
      ].filter((team): team is Team => Boolean(team));

      if (nextMatch.length === 2) {
        updatedQueue.shift();
      }

      if (teamA) {
        updatedQueue.push({
          ...teamA,
          consecutiveWins: 0,
          isResting: false,
          matchesToRest: 0,
        });
      }

      if (teamB) {
        updatedQueue.push({
          ...teamB,
          consecutiveWins: 0,
          isResting: false,
          matchesToRest: 0,
        });
      }

      updatedQueue = [...nextMatch, ...updatedQueue];
    } else {
      if (teamA) {
        updatedQueue.push({
          ...teamA,
          consecutiveWins: 0,
          isResting: false,
          matchesToRest: 0,
        });
      }

      if (teamB) {
        updatedQueue.push({
          ...teamB,
          consecutiveWins: 0,
          isResting: false,
          matchesToRest: 0,
        });
      }
    }
  } else {
    const winnerIndex = updatedQueue.findIndex(
      (team) => team.id === lastMatch.winnerId,
    );

    const loserIndex = winnerIndex === 0 ? 1 : 0;

    if (winnerIndex !== -1) {
      const winner = {
        ...updatedQueue[winnerIndex],
        consecutiveWins: updatedQueue[winnerIndex].consecutiveWins + 1,
      };

      const loser = updatedQueue[loserIndex];

      if (winner.consecutiveWins >= pelada.maxConsecutiveWins) {
        updatedQueue.splice(0, 2);

        if (loser) {
          updatedQueue.push({
            ...loser,
            consecutiveWins: 0,
            isResting: false,
            matchesToRest: 0,
          });
        }

        updatedQueue.push({
          ...winner,
          consecutiveWins: 0,
          isResting: true,
          matchesToRest: 1,
          justReturned: false,
        });
      } else {
        updatedQueue.splice(loserIndex, 1);

        if (loser) {
          updatedQueue.push({
            ...loser,
            consecutiveWins: 0,
            isResting: false,
            matchesToRest: 0,
          });
        }

        updatedQueue = updatedQueue.map((team) => {
          if (team.isResting && team.matchesToRest && team.matchesToRest > 0) {
            return {
              ...team,
              matchesToRest: team.matchesToRest - 1,
            };
          }

          return team;
        });

        const restingTeamIndex = updatedQueue.findIndex(
          (team) => team.isResting && team.matchesToRest === 0,
        );

        if (restingTeamIndex !== -1) {
          const restingTeam = updatedQueue[restingTeamIndex];

          updatedQueue.splice(restingTeamIndex, 1);
          updatedQueue.splice(1, 0, {
            ...restingTeam,
            isResting: false,
            matchesToRest: 0,
            justReturned: true,
          });
        }

        updatedQueue[0] = winner;
      }
    }
  }

  return updatedQueue;
}

export function useOrganize() {
  const navigate = useNavigate();

  const { pelada, startNextMatch, startMatch } = usePeladaStore();
  const playerPerTeam = pelada?.playersPerTeam;

  const lastMatch = pelada?.currentMatch ?? pelada?.matches.at(-1);

  const defaultNextQueue = useMemo(
    () => buildDefaultNextQueue(pelada, lastMatch),
    [pelada, lastMatch],
  );
  const [teams, setTeams] = useState<Team[]>(defaultNextQueue);

  useEffect(() => {
    setTeams(defaultNextQueue);
  }, [defaultNextQueue]);

  if (!pelada || !lastMatch) {
    return {
      buildDefaultNextQueue,
      isDraw: false,
      lastMatch: null,
      handleDragEnd: () => {},
      handleStartMatch: () => {},
      teams: [],
    };
  }

  const isDraw = lastMatch.teamA.score === lastMatch.teamB.score;

  const hasRestingTeamInMatch = teams
    .slice(0, 2)
    .some((team) => team.isResting);
  const canStartMatch = teams.length >= 2 && !hasRestingTeamInMatch;

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = teams.findIndex((team) => team.id === active.id);

    const newIndex = teams.findIndex((team) => team.id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    setTeams((current) => {
      const nextTeams = arrayMove(current, oldIndex, newIndex);
      const restingTeamInNextMatch = nextTeams
        .slice(0, 2)
        .some((team) => team.isResting);

      return restingTeamInNextMatch ? current : nextTeams;
    });
  }

  const handleStartNextMatch = () => {
    startNextMatch();
    startMatch();
    navigate("/match");
  };

  return {
    buildDefaultNextQueue,
    isDraw,
    handleDragEnd,
    handleStartNextMatch,
    lastMatch,
    teams,
    canStartMatch,
    playerPerTeam,
  };
}
