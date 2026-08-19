import type { Pelada } from "@/store/pelada/types";
import { Screen } from "@/view/components/screen";
import { toPng } from "html-to-image";
import { Download, Share2, Star } from "lucide-react";
import { motion } from "motion/react";
import { useRef, type RefObject } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";
import type { SummaryItem } from "./utils/types";

interface SummaryActionsProps {
  summaryRef: RefObject<HTMLDivElement | null>;
}

function SummaryActions({ summaryRef }: SummaryActionsProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  async function generateImage() {
    if (!summaryRef.current) return;

    return await toPng(summaryRef.current, {
      cacheBust: true,
      pixelRatio: 3,
    });
  }

  function downloadImage(dataUrl: string) {
    const link = document.createElement("a");
    link.download = `pelada-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  }

  async function handleSave() {
    const dataUrl = await generateImage();
    if (!dataUrl) return;

    downloadImage(dataUrl);
  }

  async function handleShare() {
    const dataUrl = await generateImage();
    if (!dataUrl) return;

    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], "resumo-pelada.png", {
      type: "image/png",
    });

    try {
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Resumo da Pelada",
          text: "Resumo do jogo",
        });
        return;
      }
    } catch (e) {
      console.log("Share failed:", e);
    }

    // Fallback de segurança, caso a opçao acima falhar.
    downloadImage(dataUrl);
  }

  return (
    <div className="mt-6 space-y-3">
      <button
        onClick={handleShare}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-sm font-bold text-white transition-all hover:bg-emerald-600 active:scale-95"
      >
        <Share2 className="size-4" />
        Compartilhar
      </button>

      <button
        onClick={handleSave}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white transition-all hover:bg-blue-700 active:scale-95"
      >
        <Download className="size-4" />
        Salvar imagem
      </button>

      <button
        onClick={() => navigate(id ? "/summaries" : "/")}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-3 text-sm font-semibold text-zinc-400 transition-all hover:bg-zinc-700 active:scale-95"
      >
        Voltar
      </button>
    </div>
  );
}

type SummaryCard = {
  id: string;
  pelada: Pelada;
  stats: SummaryItem;
};

export function SessionSummary() {
  const { state } = useLocation();
  const summaryRef = useRef<HTMLDivElement>(null);

  const summary = state?.summary as SummaryCard | undefined;

  if (!summary) {
    return <Navigate to="/summaries" />;
  }

  const sessionDate = new Date(summary.pelada.createdAt).toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    },
  );

  const bestStreakTeams = summary.stats.bestStreak
    .map((team) => team.name)
    .join(" e ");

  const highlights = [
    {
      icon: "🔥",
      title: "Maior sequência",
      player: bestStreakTeams,
      description: `Alcançaram ${summary.stats.bestStreak[0].maxStreak} vitórias consecutivas.`,
    },
    {
      icon: "⚡",
      title: "Mais vitórias",
      player: summary.stats.champion.name,
      description: `Terminou a noite com ${summary.stats.champion.wins} vitórias.`,
    },
  ];

  return (
    <Screen>
      <motion.div
        ref={summaryRef}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        id="pelada-summary-card"
        className="relative mx-auto flex aspect-9/16 w-full max-w-105 flex-col overflow-hidden rounded-[28px] border border-white/8 bg-[#06100c] text-white shadow-[0_30px_100px_rgba(0,0,0,0.65)]"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 size-80 rounded-full bg-emerald-500/10 blur-[90px]" />
          <div className="absolute top-1/2 -left-40 size-80 rounded-full bg-emerald-500/5 blur-[100px]" />
          <div className="absolute right-0 -bottom-40 size-72 rounded-full bg-emerald-900/10 blur-[100px]" />
        </div>

        <div className="relative z-10 px-6 pt-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
                  <span className="text-sm">⚽</span>
                </div>

                <span className="text-[9px] font-black tracking-[0.18em] text-emerald-400 uppercase">
                  VemProFut
                </span>
              </div>

              <h1 className="max-w-62.5 truncate text-[17px] font-black tracking-[-0.4px] text-white">
                {summary.pelada.name}
              </h1>

              <p className="mt-0.5 text-[9px] font-medium text-zinc-600">
                {sessionDate}
              </p>
            </div>

            <div className="flex items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.035] p-2">
              <span className="block pt-0.5 text-[7px] font-black tracking-[0.14em] text-zinc-500 uppercase">
                Resumo
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-10 px-6 pt-7 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-linear-to-r from-transparent to-yellow-500/40" />

            <span className="text-[8px] font-black tracking-[0.18em] text-yellow-400 uppercase">
              🏆 Campeão da noite
            </span>

            <div className="h-px w-8 bg-linear-to-l from-transparent to-yellow-500/40" />
          </div>

          <h2 className="mt-2 text-[32px] leading-none font-black tracking-[-1.5px] text-white">
            {summary.stats.champion.name}
          </h2>

          <div className="mt-4 flex items-center justify-center gap-7">
            <div>
              <div className="text-[23px] font-black text-emerald-400">
                {summary.stats.champion.wins}
              </div>

              <div className="text-[7px] font-bold tracking-[0.12em] text-zinc-600 uppercase">
                Vitórias
              </div>
            </div>

            <div className="h-7 w-px bg-zinc-800" />

            <div>
              <div className="text-[23px] font-black text-emerald-400">
                {summary.stats.champion.winRate}%
              </div>

              <div className="text-[7px] font-bold tracking-[0.12em] text-zinc-600 uppercase">
                Aproveitamento
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 px-6 pt-5">
          <div className="rounded-2xl border border-white/6 bg-white/2.5 p-3">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-[8px] font-black tracking-[0.14em] text-zinc-600 uppercase">
                Elenco campeão
              </span>

              <span className="text-[8px] font-bold text-emerald-400">
                {summary.stats.champion.players.length} jogadores
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {summary.stats.champion.players
                .slice(0, 6)
                .map((player, index) => (
                  <div
                    key={player.id}
                    className="flex min-w-0 items-center gap-1.5"
                  >
                    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-[7px] font-black text-emerald-400">
                      {index + 1}
                    </span>

                    <span className="truncate text-[8px] font-semibold text-zinc-400">
                      {player.name}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {summary.stats.balancedMatch && (
          <div className="relative z-10 px-6 pt-2.5">
            <div className="rounded-2xl border border-blue-500/10 bg-blue-500/4.5 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[8px] font-black tracking-[0.14em] text-blue-400 uppercase">
                  ⚔️ Jogo da noite
                </span>

                <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[7px] font-bold text-blue-300">
                  Mais equilibrado
                </span>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-center">
                <div className="text-center">
                  <div className="truncate text-[9px] font-bold text-white">
                    {summary.stats.balancedMatch.teamA.name}
                  </div>

                  <div className="mt-0.5 text-[23px] font-black text-blue-400">
                    {summary.stats.balancedMatch.teamA.score}
                  </div>
                </div>

                <span className="px-3 text-xs font-black text-zinc-700">×</span>

                <div className="text-center">
                  <div className="truncate text-[9px] font-bold text-white">
                    {summary.stats.balancedMatch.teamB.name}
                  </div>

                  <div className="mt-0.5 text-[23px] font-black text-blue-400">
                    {summary.stats.balancedMatch.teamB.score}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="relative z-10 flex-1 overflow-hidden px-6 pt-2.5">
          <div className="rounded-2xl border border-white/6 bg-white/2 p-3">
            <div className="mb-2.5 flex items-center gap-2 text-[8px] font-black tracking-[0.14em] text-zinc-600 uppercase">
              <Star className="size-3" />
              Momentos da noite
            </div>

            <div className="space-y-2">
              {highlights.map((highlight) => (
                <div
                  key={`${highlight.icon}-${highlight.player}`}
                  className="flex items-start gap-2.5"
                >
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/4 text-sm">
                    {highlight.icon}
                  </div>

                  <div className="min-w-0">
                    <div className="text-[8px] font-black text-white">
                      {highlight.title}
                    </div>

                    <div className="text-[9px] font-bold text-emerald-400">
                      {highlight.player}
                    </div>

                    <p className="mt-0.5 text-[7px] leading-relaxed text-zinc-600">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <SummaryActions summaryRef={summaryRef} />
    </Screen>
  );
}
