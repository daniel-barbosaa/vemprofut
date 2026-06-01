import { usePeladaStore } from "@/store/pelada/pelada.store";
import { BottomNav } from "@/view/components/button-nav";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { EmptyState } from "./empty-state";
import { FloatingSubstituteButton } from "./floating-substitute-button";
import { ManualSubstitutionDialog } from "./manual-substitution-modal";
import { NextSection } from "./next-section";
import { PlayingSection } from "./playing-sections";
import { RecentSubstitutionsCard } from "./recente-substitutions-card";
import { RestingSection } from "./resting-section";
import { TeamReturnNotice } from "./team-return-notice";
import { WaitingSection } from "./waiting-section";

export function Teams() {
  const navigate = useNavigate();
  const { pelada } = usePeladaStore();
  const [isManualSubstituteDialogOpen, setIsManualSubstituteDialogOpen] =
    useState(false);

  React.useEffect(() => {
    if (!pelada) {
      navigate("/home");
    }
  }, [pelada, navigate]);

  if (!pelada) {
    return null;
  }

  const playingTeams = pelada.queue.slice(0, 2);
  const nextTeam = pelada.queue[2];
  const waitingTeams = pelada.queue.slice(3);
  const restingTeam = pelada.queue.find((t) => t.isResting);

  return (
    <div className="min-h-screen bg-zinc-950 pb-24">
      <header className="mx-auto max-w-2xl p-6">
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold text-white">Times Fixos</h1>
          <p className="text-zinc-500">
            {pelada.queue.length} times formados • Composição permanente
          </p>
        </div>

        <TeamReturnNotice pelada={pelada} />

        <RecentSubstitutionsCard
          substitutions={pelada.recentSubstitutions ?? []}
        />

        {pelada.queue.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="mb-6 space-y-6">
            <PlayingSection teams={playingTeams} />

            <NextSection team={nextTeam} />

            <RestingSection
              team={restingTeam || null}
              maxConsecutiveWins={pelada.maxConsecutiveWins}
            />

            <WaitingSection teams={waitingTeams} />
          </div>
        )}
      </header>

      <FloatingSubstituteButton
        setSubstituteDialogOpen={setIsManualSubstituteDialogOpen}
        pelada={pelada}
      />

      <ManualSubstitutionDialog
        isOpen={isManualSubstituteDialogOpen}
        onClose={() => setIsManualSubstituteDialogOpen(false)}
      />

      <BottomNav />
    </div>
  );
}
