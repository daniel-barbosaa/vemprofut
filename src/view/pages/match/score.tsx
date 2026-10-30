import { cn } from "@/app/utils/class-name-merger";
import type { Match, Pelada, Team } from "@/store/pelada/types";
import { BottomSheet } from "@/view/components/bottom-sheet";
import { motion } from "motion/react";
import { useState } from "react";

interface TeamScoreCardProps {
  team: Team;
  direction: "left" | "right";
  isPaused: boolean;
  isActive: boolean;
  maxConsecutiveWins: number;
  addGoal(teamId: string): void;
  onRemoveGoal(): void;
}

function TeamScoreCard({
  team,
  direction,
  isPaused,
  isActive,
  maxConsecutiveWins,
  addGoal,
  onRemoveGoal,
}: TeamScoreCardProps) {
  const hasConsecutiveWins = team.consecutiveWins > 0;
  const reachedRestLimit = team.consecutiveWins >= maxConsecutiveWins;

  return (
    <motion.div
      initial={{
        x: direction === "left" ? -50 : 50,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      className="min-w-0 text-center"
    >
      <div className="flex h-67.5 min-w-0 flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-3">
        <div className="mb-2 flex h-5 min-w-0 items-center justify-center gap-1.5">
          <span
            title={team.name}
            className="min-w-0 truncate text-sm font-semibold text-zinc-400"
          >
            {team.name}
          </span>

          <span
            className={cn(
              "shrink-0 text-xs font-bold text-amber-400 transition-opacity",
              hasConsecutiveWins && !reachedRestLimit
                ? "opacity-100"
                : "opacity-0",
            )}
          >
            🔥 {team.consecutiveWins}
          </span>
        </div>

        <div className="mb-2 h-10 min-w-0 overflow-hidden text-center">
          <div className="flex h-full flex-wrap content-start justify-center gap-x-2 gap-y-0.5 overflow-hidden text-xs leading-5 text-zinc-500">
            {team.players.map((player) => {
              const firstName = player.name.trim().split(/\s+/)[0];

              const displayName = `${firstName.slice(0, 4)}.`;

              return (
                <span key={player.id} title={player.name} className="shrink-0">
                  {displayName}
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center">
          <span className="text-5xl font-bold text-white tabular-nums sm:text-6xl">
            {team.score}
          </span>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => addGoal(team.id)}
            disabled={!isActive || isPaused}
            className="w-full rounded-xl bg-emerald-500 py-3 text-sm font-bold text-white transition-all hover:bg-emerald-600 active:scale-95 disabled:bg-zinc-800 disabled:text-zinc-600"
          >
            + GOL
          </button>

          <button
            onClick={onRemoveGoal}
            disabled={!isActive || isPaused || team.score === 0}
            className="w-full rounded-lg bg-zinc-800 py-2 text-xs font-semibold text-zinc-300 transition-all hover:bg-zinc-700 active:scale-95 disabled:bg-zinc-900 disabled:text-zinc-700"
          >
            ANULAR
          </button>
        </div>
      </div>
    </motion.div>
  );
}

interface ScoreProps {
  match: Match;
  pelada: Pelada;
  isPaused: boolean;
  addGoal(teamId: string, playerId?: string): void;
  removeGoal(teamId: string, playerId?: string | null): void;
}

export function Score({
  match,
  pelada,
  isPaused,
  addGoal,
  removeGoal,
}: ScoreProps) {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const isGoalSheetOpen = selectedTeam !== null;

  function handleAddGoal(team: Team) {
    if (!match.isActive || isPaused) return;

    setSelectedTeam(team);
  }

  function handlePlayerSelect(playerId: string) {
    if (!selectedTeam) return;

    addGoal(selectedTeam.id, playerId);
    setSelectedTeam(null);
  }

  function handleSkipPlayer() {
    if (!selectedTeam) return;

    addGoal(selectedTeam.id);

    setSelectedTeam(null);
  }

  return (
    <div className="mb-6 grid grid-cols-3 items-center gap-4">
      <TeamScoreCard
        team={match.teamA}
        direction="left"
        isPaused={isPaused}
        isActive={match.isActive}
        maxConsecutiveWins={pelada.maxConsecutiveWins}
        addGoal={() => {
          handleAddGoal(match.teamA);
        }}
        onRemoveGoal={() => {
          const lastGoal = [...match.goals].find(
            (goal) => goal.teamId === match.teamA.id,
          );

          if (lastGoal) removeGoal(lastGoal.id);
        }}
      />

      <div className="text-center">
        <div className="text-3xl font-bold text-zinc-700">VS</div>
      </div>

      <TeamScoreCard
        team={match.teamB}
        direction="right"
        isPaused={isPaused}
        isActive={match.isActive}
        maxConsecutiveWins={pelada.maxConsecutiveWins}
        addGoal={() => {
          handleAddGoal(match.teamB);
        }}
        onRemoveGoal={() => {
          const lastGoal = [...match.goals].find(
            (goal) => goal.teamId === match.teamB.id,
          );

          if (lastGoal) removeGoal(lastGoal.id);
        }}
      />

      <BottomSheet
        open={isGoalSheetOpen}
        title={`Gol — ${selectedTeam?.name ?? ""}`}
        onClose={() => setSelectedTeam(null)}
      >
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-white">Quem marcou o gol?</p>

            <p className="mt-1 text-xs text-zinc-500">
              Selecione o jogador que marcou.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {selectedTeam?.players.map((player) => (
              <button
                key={player.id}
                type="button"
                onClick={() => handlePlayerSelect(player.id)}
                className="rounded-xl border border-zinc-800 bg-zinc-800/50 px-4 py-3 text-left font-medium text-white transition-all hover:border-emerald-700/50 hover:bg-zinc-800 active:scale-95"
              >
                {player.name}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleSkipPlayer}
            className="w-full rounded-xl py-3 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
          >
            Não identificar jogador
          </button>
        </div>
      </BottomSheet>
    </div>
  );
}
