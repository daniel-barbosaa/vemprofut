import {
  Bug,
  CheckCircle2,
  CircleEllipsis,
  Lightbulb,
  Palette,
  Rocket,
  Send,
  Zap,
  type LucideIcon,
} from "lucide-react";

import type { FeedbackCategoryType } from "@/app/types/feedback";
import { cn } from "@/app/utils/class-name-merger";
import { Button } from "@/view/components/button";
import { Screen } from "@/view/components/screen";
import { useSuggestionsController } from "./use-suggestion-controller";

const CATEGORIES_ITEMS = [
  {
    id: "bug",
    label: "Bug",
    icon: Bug,
  },
  {
    id: "improvement",
    label: "Melhoria",
    icon: Lightbulb,
  },
  {
    id: "feature",
    label: "Nova funcionalidade",
    icon: Rocket,
  },
  {
    id: "performance",
    label: "Desempenho",
    icon: Zap,
  },
  {
    id: "ui",
    label: "Interface",
    icon: Palette,
  },
  {
    id: "other",
    label: "Outro",
    icon: CircleEllipsis,
  },
] satisfies {
  id: FeedbackCategoryType;
  label: string;
  icon: LucideIcon;
}[];

export function Suggestions() {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    sent,
    setSent,
    isSubmitting,
    errors,
  } = useSuggestionsController();

  const selectedCategory = watch("category");
  const message = watch("message");

  if (sent) {
    return (
      <Screen>
        <div className="mx-auto flex max-w-lg flex-col items-center py-12 text-center">
          <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-emerald-500/10">
            <CheckCircle2 className="size-14 text-emerald-400" />
          </div>

          <h1 className="text-3xl font-bold text-white">
            Obrigado pelo feedback!
          </h1>

          <p className="mt-4 text-zinc-400">
            Sua sugestão foi enviada com sucesso e poderá fazer parte das
            próximas versões do VemProFut.
          </p>

          <Button
            className="mt-10"
            onClick={() => {
              setSent(false);
            }}
          >
            Enviar outra sugestão
          </Button>
        </div>
      </Screen>
    );
  }

  return (
    <Screen>
      <div className="mx-auto max-w-lg py-4">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white">Sugestões</h1>

          <p className="mt-3 text-zinc-400">
            Encontrou algum problema ou tem uma ideia? Sua opinião ajuda a
            evoluir o VemProFut.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-white">Assunto</h2>

            <div className="flex flex-wrap gap-3">
              {CATEGORIES_ITEMS.map(({ id, label, icon: Icon }) => {
                const selected = selectedCategory === id;
                return (
                  <button
                    type="button"
                    key={id}
                    onClick={() =>
                      setValue("category", id, {
                        shouldValidate: true,
                      })
                    }
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-4 py-3 transition-all",
                      selected
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700",
                    )}
                  >
                    <Icon className="size-4" />
                    {label}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="mb-3">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Mensagem</h2>

              <span className="text-sm text-zinc-500">
                {message.length}/1000
              </span>
            </div>

            <textarea
              rows={7}
              {...register("message")}
              placeholder="Conte o máximo de detalhes possível..."
              className={cn(
                "w-full resize-none rounded-3xl border bg-zinc-900 p-5 text-white transition outline-none",
                errors.message
                  ? "border-red-500"
                  : "border-zinc-800 focus:border-emerald-500",
              )}
            />
            {errors.message && (
              <p className="text-xs text-red-400">{errors.message.message}</p>
            )}
          </section>

          <p className="mb-8 text-sm text-zinc-500">
            Todas as sugestões são analisadas e podem fazer parte das próximas
            versões do aplicativo.
          </p>

          <Button
            disabled={isSubmitting}
            isLoading={isSubmitting}
            className={cn(
              isSubmitting &&
                "cursor-not-allowed bg-zinc-800 text-zinc-500 hover:bg-zinc-800",
            )}
            type="submit"
          >
            <Send className="size-5" />
            Enviar sugestão
          </Button>
        </form>
      </div>
    </Screen>
  );
}
