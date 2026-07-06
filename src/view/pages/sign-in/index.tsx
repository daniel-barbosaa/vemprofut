import GoogleIcon from "@/assets/google.svg";
import { Button } from "@/view/components/button";
import { FileText, Trophy, Users } from "lucide-react";
import { motion } from "motion/react";
import { useSignInController } from "./use-sign-in-controller";

export function SignIn() {
  const { signInWithGoogle } = useSignInController();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-zinc-950 via-zinc-900 to-emerald-950 px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 flex flex-col items-center justify-center">
          <motion.img
            src="/soccer-ball.svg"
            alt="Bola"
            className="mx-auto size-30"
            initial={{
              x: -300,
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
          <h1 className="text-center text-4xl font-bold text-white">
            VemPro<span className="text-emerald-400">Fut</span>
          </h1>
        </div>

        <div className="mb-8 space-y-3">
          <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-300 backdrop-blur-sm">
            <Users className="h-5 w-5 shrink-0 text-emerald-400" />
            <span>Monte times rapidamente</span>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-300 backdrop-blur-sm">
            <FileText className="h-5 w-5 shrink-0 text-blue-400" />
            <span>Gere resumos automáticos e compartilhe com amigos</span>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-300 backdrop-blur-sm">
            <Trophy className="h-5 w-5 shrink-0 text-yellow-400" />
            <span>Salve o histórico das partidas</span>
          </div>
        </div>
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 backdrop-blur-sm">
          <Button
            type="button"
            onClick={signInWithGoogle}
            className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-zinc-700 bg-zinc-950 text-base font-semibold text-white transition-all hover:border-zinc-600 hover:bg-zinc-900"
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
      </motion.div>
    </div>
  );
}
