import { cn } from "@/app/utils/class-name-merger";
import { Button } from "@/view/components/button";
import { ArrowLeft, ArrowRight, CircleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCreatePeladaController } from "./use-create-pelada-controller";

export function CreatePelada() {
  const navigate = useNavigate();
  const { handleSubmit, register, errors, watch } = useCreatePeladaController();

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col p-6">
        <div className="mb-8">
          <button
            onClick={() => navigate("/home")}
            className="mb-4 inline-flex items-center gap-2 text-zinc-400 hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Voltar
          </button>
          <h1 className="mb-2 text-3xl font-bold text-white">Nova Pelada</h1>
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
                {...register("matchDuration")}
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
                {...register("goalLimit")}
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
                {...register("maxConsecutiveWins")}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-emerald-500"
              />
              <div className="mt-2 flex justify-between text-xs text-zinc-600">
                <span>1 vitória</span>
                <span>5 vitórias</span>
              </div>
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
