import GoogleIcon from "@/assets/google.svg";

import { Button } from "@/view/components/button";

import { motion } from "motion/react";

import { useSignInController } from "./use-sign-in-controller";

export function SignIn() {
  const { signInWithGoogle } = useSignInController();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-zinc-950 px-6">
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/6 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="mb-10 flex flex-col items-center">
          <motion.img
            src="/soccer-ball.svg"
            alt="Bola de futebol"
            className="mb-5 size-24"
            initial={{
              x: -280,
              rotate: -1080,
            }}
            animate={{
              x: 0,
              rotate: 0,
            }}
            transition={{
              duration: 1.4,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          <h1 className="text-4xl font-bold tracking-tight text-white">
            VemPro<span className="text-emerald-400">Fut</span>
          </h1>

          <p className="mt-2 text-center text-sm text-zinc-500">
            Sua pelada começa aqui.
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/70 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-white">
              Entrar no VemProFut
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Acesse sua conta para continuar.
            </p>
          </div>

          <Button
            type="button"
            onClick={signInWithGoogle}
            className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-zinc-700 bg-white text-base font-semibold text-zinc-900 transition-transform hover:bg-white active:scale-[0.98]"
          >
            <img
              src={GoogleIcon}
              alt=""
              aria-hidden="true"
              className="size-5 shrink-0"
            />
            Continuar com Google
          </Button>

          <p className="mt-4 text-center text-xs leading-relaxed text-zinc-500">
            Entre em segundos usando sua conta Google.
          </p>
        </div>

        <p className="mt-8 text-center text-xs text-zinc-700">
          Organize. Jogue. Compartilhe.
        </p>
      </motion.div>
    </div>
  );
}
