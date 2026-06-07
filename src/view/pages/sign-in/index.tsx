import { cn } from "@/app/utils/class-name-merger";
import GoogleIcon from "@/assets/google.svg";
import { Button } from "@/view/components/button";
import { CircleAlert } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { useSignInController } from "./use-sign-in-controller";

export function SignIn() {
  const { signInWithGoogle, handleSubmit, register, errors } =
    useSignInController();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-5">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white">
            Pelada<span className="text-emerald-400">Pro</span>
          </h1>

          <p className="mt-3 text-zinc-500">
            Organize suas peladas e acompanhe estatísticas
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
            ⚽ Peladas
          </span>

          <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
            📊 Estatísticas
          </span>

          <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
            🏆 Rankings
          </span>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <Button
            type="button"
            className="flex h-12 w-full items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 font-medium text-zinc-100 transition-all hover:border-zinc-700 hover:bg-zinc-800"
            onClick={signInWithGoogle}
          >
            <img
              src={GoogleIcon}
              alt=""
              aria-hidden="true"
              className="size-5 shrink-0"
            />
            Continuar com Google
          </Button>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-zinc-800" />
            <span className="text-sm text-zinc-500">ou</span>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Email
              </label>

              <input
                type="email"
                placeholder="Digite seu email"
                className={cn(
                  "h-12 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 text-white transition-all outline-none placeholder:text-zinc-600 focus:border-emerald-500",
                  errors.email
                    ? "border-red-500/60 focus:border-red-500"
                    : "border-zinc-800 focus:border-emerald-500",
                )}
                {...register("email")}
              />
              {errors.email?.message && (
                <p className="mt-2 flex items-center gap-1 text-xs text-red-400">
                  <CircleAlert className="size-4" />
                  {errors.email?.message}
                </p>
              )}
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-300">
                  Senha
                </label>

                <button
                  type="button"
                  className="text-sm text-emerald-400 hover:text-emerald-300"
                >
                  Esqueceu?
                </button>
              </div>

              <input
                type="password"
                placeholder="Digite sua senha"
                className={cn(
                  "h-12 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 text-white transition-all outline-none placeholder:text-zinc-600 focus:border-emerald-500",
                  errors.password
                    ? "border-red-500/60 focus:border-red-500"
                    : "border-zinc-800 focus:border-emerald-500",
                )}
                {...register("password")}
              />
              {errors.password?.message && (
                <p className="mt-2 flex items-center gap-1 text-xs text-red-400">
                  <CircleAlert className="size-4" />
                  {errors.password?.message}
                </p>
              )}
            </div>

            <Button type="submit" className="h-12 rounded-xl">
              Entrar
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Não possui conta?{" "}
          <Link
            to="/register"
            className="font-semibold text-emerald-400 hover:text-emerald-300"
          >
            Criar conta
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
