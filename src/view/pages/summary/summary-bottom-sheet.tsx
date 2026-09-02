import type { Pelada } from "@/store/pelada/types";

import { toPng } from "html-to-image";

import { Share, X } from "lucide-react";

import { useRef, useState } from "react";

import { BottomSheet } from "@/view/components/bottom-sheet";

import { SummaryCard } from "./summary-card";

import type { SummaryItem } from "./utils/types";

export type SummaryCardData = {
  id: string;
  pelada: Pelada;
  stats: SummaryItem;
};

interface SummaryBottomSheetProps {
  summary: SummaryCardData;
  onClose: () => void;
}

export function SummaryBottomSheet({
  summary,
  onClose,
}: SummaryBottomSheetProps) {
  const summaryRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);

  async function handleShare() {
    if (!summaryRef.current || isSharing) return;

    try {
      setIsSharing(true);

      const dataUrl = await toPng(summaryRef.current, {
        cacheBust: true,
        pixelRatio: 3,
      });

      const response = await fetch(dataUrl);
      const blob = await response.blob();

      const file = new File([blob], "resumo-pelada.png", {
        type: "image/png",
      });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Resumo da Pelada",
          text: "Resumo da nossa pelada ⚽",
        });

        return;
      }

      const link = document.createElement("a");

      link.download = `resumo-pelada-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Erro ao compartilhar resumo:", error);
    } finally {
      setIsSharing(false);
    }
  }

  return (
    <BottomSheet open={true} onClose={onClose} showHeader={false}>
      <div>
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-zinc-700" />

        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="flex size-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-500 transition-all hover:bg-zinc-800 hover:text-white active:scale-95"
          >
            <X className="size-4" />
          </button>

          <button
            type="button"
            onClick={handleShare}
            disabled={isSharing}
            aria-label="Compartilhar resumo"
            className="flex size-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-400 active:scale-95 disabled:opacity-50"
          >
            <Share className="size-4" />
          </button>
        </div>

        <SummaryCard summary={summary} summaryRef={summaryRef} />
      </div>
    </BottomSheet>
  );
}
