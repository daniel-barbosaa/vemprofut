import { useCollapsedHeader } from "@/app/hooks/use-collapsed-header";
import { cn } from "@/app/utils/class-name-merger";
import { Button } from "@/view/components/button";
import { TopBar } from "@/view/components/top-bar";
import { ArrowRight, CircleAlert } from "lucide-react";
import { useCreatePeladaController } from "./use-create-pelada-controller";

export function CreatePelada() {
  const { handleSubmit, register, errors, watch, setValue } =
    useCreatePeladaController();
  const { collapsed } = useCollapsedHeader();

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col p-6">
        <TopBar collapsed={collapsed} title="Nova Pelada" />

        <div className="mb-6">
          <h1
            className={cn(
              "text-2xl font-bold text-white transition-all duration-300",
              collapsed ? "-translate-y-4 opacity-0" : "opacity-100",
            )}
          >
            Nova Pelada
          </h1>
          <p className="text-zinc-500">Configure as regras da partida</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
          <div className="flex-1 space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Nome da Pelada
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="Ex: Pelada da Sexta"
                className={cn(
                  "w-full rounded-xl border bg-zinc-900 px-4 py-4 text-lg text-white transition-colors focus:outline-none",
                  errors.name
                    ? "border-red-500/60 focus:border-red-500"
                    : "border-zinc-800 focus:border-emerald-500",
                )}
              />

              {errors.name?.message && (
                <p className="mt-2 flex items-center gap-1 text-sm text-red-400">
                  <CircleAlert className="size-4" />
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-300">
                  Duração da Partida
                </label>
                <span className="text-2xl font-bold text-emerald-400">
                  {watch("matchDuration")} min
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="15"
                {...register("matchDuration", { valueAsNumber: true })}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-emerald-500"
              />
              <div className="mt-2 flex justify-between text-xs text-zinc-600">
                <span>5 min</span>
                <span>15 min</span>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-300">
                  Limite de Gols
                </label>
                <span className="text-2xl font-bold text-emerald-400">
                  {watch("goalLimit")} gols
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                {...register("goalLimit", { valueAsNumber: true })}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-emerald-500"
              />
              <div className="mt-2 flex justify-between text-xs text-zinc-600">
                <span>1 gol</span>
                <span>5 gols</span>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-300">
                  Vitórias Seguidas (Descanso)
                </label>
                <span className="text-2xl font-bold text-emerald-400">
                  {watch("maxConsecutiveWins")}x
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                {...register("maxConsecutiveWins", { valueAsNumber: true })}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-emerald-500"
              />
              <div className="mt-2 flex justify-between text-xs text-zinc-600">
                <span>1 vitória</span>
                <span>5 vitórias</span>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-zinc-300">
                      Acréscimo em Empates
                    </label>

                    <button
                      type="button"
                      title="Se a partida terminar empatada, será adicionado um tempo extra antes do encerramento."
                      className="text-zinc-500 hover:text-zinc-300"
                    >
                      <CircleAlert className="size-4" />
                    </button>
                  </div>

                  <p className="mt-1 text-xs text-zinc-500">
                    Adiciona tempo extra quando houver empate.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setValue("overtimeEnabled", !watch("overtimeEnabled"))
                  }
                  className={cn(
                    "relative h-7 w-12 rounded-full transition-colors",
                    watch("overtimeEnabled") ? "bg-emerald-500" : "bg-zinc-700",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1 left-1 h-5 w-5 rounded-full bg-white transition-transform",
                      watch("overtimeEnabled") && "translate-x-5",
                    )}
                  />
                </button>
              </div>

              {watch("overtimeEnabled") && (
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-sm font-medium text-zinc-300">
                      Tempo de Acréscimo
                    </label>

                    <span className="text-2xl font-bold text-emerald-400">
                      {watch("overtimeDuration")} min
                    </span>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="10"
                    {...register("overtimeDuration", {
                      valueAsNumber: true,
                    })}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-emerald-500"
                  />

                  <div className="mt-2 flex justify-between text-xs text-zinc-600">
                    <span>1 min</span>
                    <span>10 min</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Button type="submit" className="mt-8">
            Continuar
            <ArrowRight className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
