import { BottomSheet } from "@/view/components/bottom-sheet";
import { Screen } from "@/view/components/screen";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import type { Feedback } from "@/app/types/feedback";
import { cn } from "@/app/utils/class-name-merger";
import { Spinner } from "@/view/components/ui/spinner";
import {
  Bug,
  Calendar,
  CircleEllipsis,
  Lightbulb,
  Mail,
  Palette,
  Rocket,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useFeedbackController } from "./use-feedback-controller";

const categoryMap = {
  bug: {
    label: "Bug",
    icon: Bug,
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  improvement: {
    label: "Melhoria",
    icon: Lightbulb,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  feature: {
    label: "Nova funcionalidade",
    icon: Rocket,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  performance: {
    label: "Performance",
    icon: Zap,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  ui: {
    label: "Interface",
    icon: Palette,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  other: {
    label: "Outro",
    icon: CircleEllipsis,
    color: "text-zinc-400",
    bg: "bg-zinc-500/10",
  },
} as const;

export function Feedbacks() {
  const [feedbackSelected, setSelected] = useState<Feedback | null>(null);
  const { data, isLoading } = useFeedbackController();

  function formatDate(creationDateOfFeedback: Date) {
    return formatDistanceToNow(new Date(creationDateOfFeedback), {
      addSuffix: true,
      locale: ptBR,
    });
  }

  if (isLoading) {
    return (
      <Screen className="flex min-h-screen items-center justify-center">
        <Spinner />
      </Screen>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Screen>
        <div className="flex h-[60vh] items-center justify-center">
          <p className="text-zinc-500">Ainda não há feedbacks.</p>
        </div>
      </Screen>
    );
  }
  return (
    <Screen>
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white">Feedbacks</h1>

          <p className="mt-1 text-zinc-500">
            {data?.length} feedbacks recebidos
          </p>
        </header>

        <div className="space-y-3">
          {data?.map((feedback) => {
            const category =
              categoryMap[feedback.category as keyof typeof categoryMap];

            const Icon = category.icon;

            return (
              <button
                key={feedback.id}
                onClick={() => setSelected(feedback)}
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-left transition-all hover:border-zinc-700 hover:bg-zinc-800"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={cn(
                      "flex items-center gap-2 rounded-full px-3 py-1 text-sm",
                      category.bg,
                    )}
                  >
                    <Icon className={cn("size-4", category.color)} />

                    <span className={category.color}>{category.label}</span>
                  </div>

                  <span className="text-xs text-zinc-500">
                    {formatDate(feedback.created_at)}
                  </span>
                </div>

                <p className="mt-4 line-clamp-2 text-zinc-200">
                  {feedback.message}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="font-medium text-white capitalize">
                    {feedback.name}
                  </span>

                  <span className="text-sm text-zinc-500">
                    {feedback.email}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <BottomSheet
          open={!!feedbackSelected}
          onClose={() => setSelected(null)}
          title="Feedback"
        >
          {feedbackSelected && (
            <div className="space-y-6">
              {(() => {
                const category =
                  categoryMap[
                    feedbackSelected.category as keyof typeof categoryMap
                  ];

                const Icon = category.icon;

                return (
                  <div
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-3 py-2",
                      category.bg,
                    )}
                  >
                    <Icon className={`size-5 ${category.color}`} />

                    <span className={cn("font-medium", category.color)}>
                      {category.label}
                    </span>
                  </div>
                );
              })()}

              <div className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
                <div className="flex items-center gap-3">
                  <Mail className="size-5 text-zinc-500" />

                  <div>
                    <p className="font-semibold text-white">
                      {feedbackSelected.name}
                    </p>

                    <p className="text-sm text-zinc-500">
                      {feedbackSelected.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="size-5 text-zinc-500" />

                  <span className="text-zinc-400">
                    {formatDate(feedbackSelected.created_at)}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-white">Mensagem</h3>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
                  <p className="leading-7 whitespace-pre-wrap text-zinc-300">
                    {feedbackSelected.message}
                  </p>
                </div>
              </div>
            </div>
          )}
        </BottomSheet>
      </div>
    </Screen>
  );
}
