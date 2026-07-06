import { v4 as uuid } from "uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  CreatePeladaDTO,
  Match,
  Pelada,
  Player,
  PlayerStatus,
  Substitution,
  Team,
} from "./types";

type Store = {
  pelada: Pelada | null;
  resetPelada: () => void;
  startMatch(): void;
  createPelada(data: CreatePeladaDTO): void;
  addPlayer(name: string): void;
  removePlayer(playerId: string): void;
  drawTeams(): void;
  addGoal(teamId: string): void;
  removeGoal(teamId: string): void;
  endMatch(): void;
  startNextMatch(queueOverride?: Team[]): void;
  manualSubstitution(
    targetTeamId: string,
    sourceTeamId: string,
    playerId: string,
  ): void;
  pauseMatch(): void;
  resumeMatch(): void;
  startOvertime: () => void;
};

export const usePeladaStore = create<Store>()(
  persist(
    (set, get) => ({
      pelada: null,
      resetPelada: () => {
        set({ pelada: null });
      },
      startMatch: () => {
        const { pelada } = get();

        if (!pelada || pelada.queue.length < 2) return;

        const teamA = pelada.queue[0];
        const teamB = pelada.queue[1];

        const match: Match = {
          id: Date.now().toString(),
          teamA: { ...teamA, score: 0 },
          teamB: { ...teamB, score: 0 },
          startTime: Date.now(),
          duration: pelada.matchDuration * 60,
          goalLimit: pelada.goalLimit,
          isActive: true,
          isPaused: false,
          pausedAt: undefined,
          totalPausedTime: 0,
        };

        set({
          pelada: {
            ...pelada,
            currentMatch: match,
          },
        });
      },
      pauseMatch: () => {
        set((state) => {
          if (!state.pelada?.currentMatch) return state;

          state.pelada.currentMatch.isPaused = true;
          state.pelada.currentMatch.pausedAt = Date.now();

          return state;
        });
      },
      resumeMatch: () =>
        set((state) => {
          const match = state.pelada?.currentMatch;

          if (!match?.pausedAt) return state;

          const pausedDuration = Date.now() - match.pausedAt;

          match.totalPausedTime = (match.totalPausedTime ?? 0) + pausedDuration;

          match.pausedAt = undefined;
          match.isPaused = false;

          return { ...state };
        }),
      startOvertime: () =>
        set((state) => {
          const match = state.pelada?.currentMatch;

          if (!match || !state.pelada) return state;

          match.isOvertime = true;
          match.overtimeStartedAt = Date.now();
          match.overtimeDuration = state.pelada.overtimeDuration * 60;

          return { ...state };
        }),
      createPelada: ({
        name,
        matchDuration,
        goalLimit,
        maxConsecutiveWins,
        overtimeEnabled,
        overtimeDuration,
      }: CreatePeladaDTO) => {
        const newPelada: Pelada = {
          id: uuid(),
          name,
          matchDuration,
          goalLimit,
          maxConsecutiveWins,
          overtimeEnabled,
          overtimeDuration,
          createdAt: Date.now(),
          players: [],
          sessionPlayers: [],
          matches: [],
          queue: [],
        };
        set({ pelada: newPelada });
      },
      addPlayer: (name: string) => {
        const { pelada } = get();
        if (!pelada) return;

        const newPlayer: Player = {
          id: uuid(),
          name,
          status: pelada.sessionStarted ? "pending" : "available",
        };

        set({
          pelada: {
            ...pelada,
            players: [...pelada.players, newPlayer],
          },
        });
      },
      removePlayer: (playerId: string) => {
        const { pelada } = get();
        if (!pelada) return;

        set({
          pelada: {
            ...pelada,
            players: pelada.players.filter((p) => p.id !== playerId),
          },
        });
      },
      drawTeams: () => {
        const pelada = get().pelada;

        if (!pelada) return;

        // embaralhar jogadores
        const shuffled = [...pelada.players].sort(() => Math.random() - 0.5);

        const teams: Team[] = [];

        const teamNames = ["Time A", "Time B", "Time C", "Time D"];

        for (let i = 0; i < 4; i++) {
          const teamPlayers = shuffled.slice(i * 5, i * 5 + 5);

          if (teamPlayers.length === 5) {
            teams.push({
              id: `team-${String.fromCharCode(65 + i)}-${Date.now()}`,

              name: teamNames[i],

              players: teamPlayers.map((player) => ({
                ...player,
                status: "waiting" as PlayerStatus,
              })),

              score: 0,
              consecutiveWins: 0,
            });
          }
        }

        // primeiros dois times começam jogando
        if (teams.length >= 2) {
          teams[0].players.forEach((player) => {
            player.status = "playing";
          });

          teams[1].players.forEach((player) => {
            player.status = "playing";
          });
        }

        set({
          pelada: {
            ...pelada,
            queue: teams,
          },
        });
      },
      addGoal: (teamId: string) => {
        set((state) => {
          const pelada = state.pelada;

          if (!pelada || !pelada.currentMatch) {
            return state;
          }

          const match = pelada.currentMatch;

          const updatedMatch = { ...match };

          if (match.teamA.id === teamId) {
            updatedMatch.teamA = {
              ...match.teamA,
              score: match.teamA.score + 1,
            };
          } else if (match.teamB.id === teamId) {
            updatedMatch.teamB = {
              ...match.teamB,
              score: match.teamB.score + 1,
            };
          }

          return {
            pelada: {
              ...pelada,
              currentMatch: updatedMatch,
            },
          };
        });
      },
      removeGoal: (teamId: string) => {
        set((state) => {
          const pelada = state.pelada;

          if (!pelada || !pelada.currentMatch) {
            return state;
          }

          const match = pelada.currentMatch;

          const updatedMatch = { ...match };

          if (match.teamA.id === teamId && match.teamA.score > 0) {
            updatedMatch.teamA = {
              ...match.teamA,
              score: match.teamA.score - 1,
            };
          } else if (match.teamB.id === teamId && match.teamB.score > 0) {
            updatedMatch.teamB = {
              ...match.teamB,
              score: match.teamB.score - 1,
            };
          }

          return {
            pelada: {
              ...pelada,
              currentMatch: updatedMatch,
            },
          };
        });
      },
      endMatch: () => {
        set((state) => {
          const pelada = state.pelada;

          if (!pelada || !pelada.currentMatch) {
            return state;
          }

          const match = { ...pelada.currentMatch };

          match.isActive = false;
          match.endTime = Date.now();

          match.actualDuration = Math.floor(
            (match.endTime - match.startTime) / 1000,
          );

          if (match.teamA.score > match.teamB.score) {
            match.winnerId = match.teamA.id;
          } else if (match.teamB.score > match.teamA.score) {
            match.winnerId = match.teamB.id;
          }

          if (
            match.teamA.score >= pelada.goalLimit ||
            match.teamB.score >= pelada.goalLimit
          ) {
            match.endReason = "goal_limit";
          } else if (match.actualDuration >= match.duration) {
            match.endReason = "time";
          } else {
            match.endReason = "manual";
          }

          match.teamAConsecutiveWins = match.teamA.consecutiveWins;

          match.teamBConsecutiveWins = match.teamB.consecutiveWins;

          return {
            pelada: {
              ...pelada,
              currentMatch: match,
              matches: [...pelada.matches, match],
            },
          };
        });
      },
      startNextMatch: (queueOverride) => {
        set((state) => {
          const pelada = state.pelada;

          if (!pelada || !pelada.currentMatch) {
            return state;
          }

          const lastMatch = pelada.currentMatch;

          let updatedQueue = [...pelada.queue];

          let autoRested = false;

          let restingTeamId: string | undefined;

          updatedQueue = updatedQueue.map((team) => ({
            ...team,
            justReturned: false,
          }));

          // 1. VERIFICAR EMPATE
          if (!lastMatch.winnerId) {
            // EMPATE - AMBOS OS TIMES SAEM
            const teamA = updatedQueue[0];

            const teamB = updatedQueue[1];

            // Remove ambos os times das posições 0 e 1
            updatedQueue.splice(0, 2);

            // Verifica se há time descansando que completou o descanso (matchesToRest = 1)
            const restingTeamIndex = updatedQueue.findIndex(
              (t) => t.isResting && t.matchesToRest === 1,
            );

            if (restingTeamIndex !== -1) {
              // Time descansando retorna COM PRIORIDADE
              const restingTeam = {
                ...updatedQueue[restingTeamIndex],
              };

              updatedQueue.splice(restingTeamIndex, 1);

              // Decrementar matchesToRest (1 -> 0) e retornar
              const nextMatch = [
                {
                  ...restingTeam,
                  isResting: false,
                  matchesToRest: 0,
                  consecutiveWins: 0,
                  justReturned: true,
                },
                updatedQueue.length > 0
                  ? {
                      ...updatedQueue[0],
                    }
                  : null,
              ].filter((team): team is Team => Boolean(team));

              // Remove o segundo time da fila se foi usado
              if (nextMatch.length === 2) {
                updatedQueue.shift();
              }

              // Adiciona times que empataram ao final
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

              // Insere próximo confronto (time retornando + próximo da fila)
              updatedQueue = [...nextMatch, ...updatedQueue];
            } else {
              // Próximo confronto: dois primeiros da fila
              // Adiciona times que empataram ao final

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
            // 2. HÁ UM VENCEDOR - VERIFICAR LIMITE DE VITÓRIAS

            const winnerIndex = updatedQueue.findIndex(
              (t) => t.id === lastMatch.winnerId,
            );

            const loserIndex = winnerIndex === 0 ? 1 : 0;

            if (winnerIndex !== -1) {
              const winner = {
                ...updatedQueue[winnerIndex],
              };

              const loser = {
                ...updatedQueue[loserIndex],
              };

              winner.consecutiveWins += 1;

              // REGRA MAIS IMPORTANTE DO SISTEMA

              if (winner.consecutiveWins >= pelada.maxConsecutiveWins) {
                // VENCEDOR ATINGIU O LIMITE - DEVE SAIR IMEDIATAMENTE
                autoRested = true;

                restingTeamId = winner.id;

                // Remove AMBOS os times (posições 0 e 1)
                updatedQueue.splice(0, 2);

                // Perdedor vai para o final da fila (reseta vitórias)
                updatedQueue.push({
                  ...loser,
                  consecutiveWins: 0,
                  isResting: false,
                  matchesToRest: 0,
                });

                // Vencedor vai para FILA DE DESCANSO (final da fila)
                updatedQueue.push({
                  ...winner,
                  consecutiveWins: 0,
                  isResting: true,
                  matchesToRest: 1,
                  justReturned: false,
                });

                // PRÓXIMO JOGO: dois primeiros da fila (SEM o vencedor)
              } else {
                // VITÓRIA NORMAL - VENCEDOR CONTINUA

                // Remove apenas o perdedor da posição
                updatedQueue.splice(loserIndex, 1);

                // Perdedor vai para o final da fila
                updatedQueue.push({
                  ...loser,
                  consecutiveWins: 0,
                  isResting: false,
                  matchesToRest: 0,
                });

                // CONTADOR DE DESCANSO

                updatedQueue = updatedQueue.map((team) => {
                  if (
                    team.isResting &&
                    team.matchesToRest !== undefined &&
                    team.matchesToRest > 0
                  ) {
                    const newMatchesToRest = team.matchesToRest - 1;

                    return {
                      ...team,
                      matchesToRest: newMatchesToRest,
                    };
                  }

                  return team;
                });

                // RETORNO DO DESCANSO
                const restingTeamIndex = updatedQueue.findIndex(
                  (t) => t.isResting && t.matchesToRest === 0,
                );

                if (restingTeamIndex !== -1) {
                  // Time descansando completou o período de descanso
                  const restingTeam = {
                    ...updatedQueue[restingTeamIndex],
                  };

                  // Remove o time da posição atual
                  updatedQueue.splice(restingTeamIndex, 1);

                  // Insere o time na posição 1 (enfrenta o vencedor)
                  updatedQueue.splice(1, 0, {
                    ...restingTeam,
                    isResting: false,
                    matchesToRest: 0,
                    justReturned: true,
                  });
                }

                // Atualiza o vencedor na posição 0
                updatedQueue[0] = winner;
              }
            }
          }

          // 6. ATUALIZAR UI - STATUS DOS JOGADORES

          updatedQueue.forEach((team, index) => {
            team.players.forEach((player) => {
              if (index < 2) {
                player.status = "playing";
              } else if (team.isResting) {
                player.status = "resting";
              } else {
                player.status = "waiting";
              }
            });
          });

          // 7. ATUALIZAR HISTÓRICO
          const updatedLastMatch = {
            ...lastMatch,
            autoRested,
            restingTeamId,
          };

          const updatedMatches = [...pelada.matches];

          const lastMatchIndex = updatedMatches.findIndex(
            (m) => m.id === lastMatch.id,
          );

          if (lastMatchIndex !== -1) {
            updatedMatches[lastMatchIndex] = updatedLastMatch;
          } else {
            updatedMatches.push(updatedLastMatch);
          }

          const finalQueue: Team[] = (queueOverride ?? updatedQueue).map(
            (team, index) => {
              const status: PlayerStatus =
                index < 2 ? "playing" : team.isResting ? "resting" : "waiting";

              return {
                ...team,
                players: team.players.map((player) => ({
                  ...player,
                  status,
                })),
              };
            },
          );

          return {
            ...state,
            pelada: {
              ...pelada,
              queue: finalQueue,
              currentMatch: undefined,
              matches: updatedMatches,
            },
          };
        });
      },
      manualSubstitution: (
        targetTeamId: string,
        sourceTeamId: string,
        playerId: string,
      ) => {
        set((state) => {
          const pelada = state.pelada;

          if (!pelada) {
            return state;
          }

          const targetTeamIndex = pelada.queue.findIndex(
            (team) => team.id === targetTeamId,
          );

          const sourceTeamIndex = pelada.queue.findIndex(
            (team) => team.id === sourceTeamId,
          );

          if (targetTeamIndex === -1 || sourceTeamIndex === -1) {
            return state;
          }

          const updatedQueue = [...pelada.queue];

          const targetTeam = {
            ...updatedQueue[targetTeamIndex],
          };

          const sourceTeam = {
            ...updatedQueue[sourceTeamIndex],
          };

          const playerIndex = sourceTeam.players.findIndex(
            (player) => player.id === playerId,
          );

          if (playerIndex === -1) {
            return state;
          }

          const player = {
            ...sourceTeam.players[playerIndex],
          };

          const substitution: Substitution = {
            outPlayerId: "",
            outPlayerName: "",
            inPlayerId: player.id,
            inPlayerName: player.name,
            fromTeamId: sourceTeam.id,
            fromTeamName: sourceTeam.name,
            toTeamId: targetTeam.id,
            toTeamName: targetTeam.name,
            timestamp: Date.now(),
            reason: "other",
          };

          sourceTeam.players = sourceTeam.players.filter(
            (player) => player.id !== playerId,
          );

          player.status = targetTeamIndex < 2 ? "playing" : "waiting";

          targetTeam.players.push(player);

          updatedQueue[targetTeamIndex] = targetTeam;
          updatedQueue[sourceTeamIndex] = sourceTeam;

          let updatedMatch = pelada.currentMatch;

          if (updatedMatch) {
            updatedMatch = {
              ...updatedMatch,
              substitutions: [
                ...(updatedMatch.substitutions ?? []),
                substitution,
              ],
            };

            if (updatedMatch.teamA.id === targetTeamId) {
              updatedMatch = {
                ...updatedMatch,
                teamA: targetTeam,
              };
            } else if (updatedMatch.teamB.id === targetTeamId) {
              updatedMatch = {
                ...updatedMatch,
                teamB: targetTeam,
              };
            }
          }

          return {
            pelada: {
              ...pelada,
              queue: updatedQueue,
              currentMatch: updatedMatch,
              recentSubstitutions: [
                substitution,
                ...(pelada.recentSubstitutions ?? []),
              ].slice(0, 5),
            },
          };
        });
      },
    }),
    { name: "pelada-storage" },
  ),
);
