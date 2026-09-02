import { Gamepad2, Share2 } from "lucide-react";
import { motion } from "motion/react";

import { fadeLeft, fadeRight } from "./utils/animation-variables";

export function SharingSection() {
  const sharePlatforms = [
    {
      icon: "📱",
      label: "Compartilhe com a galera",
      platform: "WhatsApp",
      position: "-top-4 -right-6",
      delay: 0.5,
      direction: 12,
    },
    {
      icon: "📸",
      label: "Pronto para postar",
      platform: "Instagram",
      position: "-bottom-4 -left-6",
      delay: 0.7,
      direction: -12,
    },
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-300 px-6">
        <div className="mx-auto max-w-175 text-center">
          <motion.div {...fadeRight}>
            <span className="text-[11px] font-bold tracking-[0.16em] text-emerald-400 uppercase">
              Compartilhamento
            </span>

            <h2 className="mt-3.5 text-[38px] leading-[1.1] font-extrabold tracking-[-1px] text-white sm:text-5xl">
              A pelada acaba.
              <br />
              <span className="text-emerald-400">A resenha continua.</span>
            </h2>

            <p className="mx-auto mt-4 max-w-150 text-base leading-relaxed text-zinc-500">
              No fim da pelada, o VemProFut transforma tudo o que aconteceu em
              um resumo bonito — com os detalhes e momentos que marcaram a
              noite.
            </p>

            <p className="mx-auto mt-3 max-w-150 text-base leading-relaxed text-zinc-500">
              Um card pronto para compartilhar com a galera ou postar nas redes
              sociais. Porque uma boa pelada merece uma boa resenha.
            </p>

            <div className="mt-7 flex justify-center">
              <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border-none bg-emerald-500 px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_32px_rgba(16,185,129,0.25)] transition-colors hover:bg-emerald-600"
              >
                <Share2 size={15} />
                Compartilhar meu resumo
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div {...fadeLeft} className="mt-16 flex justify-center">
          <div className="relative w-full max-w-82.5">
            <div className="absolute inset-0 -z-10 scale-90 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[28px] border border-emerald-500/10 bg-zinc-950 shadow-2xl">
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 size-64 rounded-full bg-emerald-500/10 blur-3xl" />

                <div className="absolute -bottom-32 -left-24 size-72 rounded-full bg-emerald-700/10 blur-3xl" />

                <div className="absolute top-1/3 left-1/2 size-48 -translate-x-1/2 rounded-full bg-emerald-400/5 blur-3xl" />
              </div>

              <div className="relative flex flex-col pb-4">
                <div className="shrink-0 px-5 pt-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-black tracking-[0.2em] text-emerald-400 uppercase">
                        VemProFut
                      </div>

                      <div className="mt-1 text-[8px] font-medium tracking-[0.12em] text-zinc-600 uppercase">
                        Resumo da pelada
                      </div>
                    </div>

                    <div className="flex size-9 items-center justify-center rounded-xl border border-emerald-500/10 bg-emerald-500/5">
                      <span className="text-sm">⚽</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h2 className="truncate text-[20px] font-black tracking-tight text-white">
                      Quarta dos Amigos
                    </h2>

                    <p className="mt-1 text-[9px] font-medium text-zinc-600">
                      17 de agosto de 2026
                    </p>
                  </div>
                </div>

                <div className="relative z-10 shrink-0 px-5 pt-4">
                  <div className="rounded-2xl border border-yellow-500/10 bg-yellow-500/5 p-3.5">
                    <div className="mb-2.5 flex items-center justify-between">
                      <div className="flex min-w-0 items-center gap-2">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-yellow-500/10">
                          <span className="text-sm">🏆</span>
                        </div>

                        <div className="min-w-0">
                          <div className="text-[8px] font-black tracking-[0.14em] text-yellow-400 uppercase">
                            Campeão
                          </div>

                          <div className="mt-0.5 max-w-48 truncate text-[14px] font-black text-white">
                            Time A
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <div className="text-[15px] font-black text-yellow-400">
                          6
                        </div>

                        <div className="text-[7px] font-bold tracking-wider text-zinc-600 uppercase">
                          vitórias
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-yellow-500/10" />

                    <div className="mt-2.5 flex items-center justify-between">
                      <span className="text-[8px] font-medium text-zinc-500">
                        Aproveitamento
                      </span>

                      <span className="text-[9px] font-black text-yellow-300">
                        75%
                      </span>
                    </div>

                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {["Lucas", "Pedro", "Rafael", "Bruno", "Caio"].map(
                        (player) => (
                          <span
                            key={player}
                            className="rounded-full bg-yellow-500/5 px-2 py-1 text-[7px] font-semibold text-yellow-200/70"
                          >
                            {player}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div className="relative z-10 shrink-0 px-5 pt-2.5">
                  <div className="relative overflow-hidden rounded-2xl border border-yellow-500/20 bg-linear-to-br from-yellow-500/10 via-amber-500/5 to-transparent p-3.5">
                    <div className="pointer-events-none absolute -top-8 -right-8 size-24 rounded-full bg-yellow-400/10 blur-2xl" />

                    <div className="relative">
                      <div className="mb-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex size-7 items-center justify-center rounded-lg bg-yellow-400/10">
                            <span className="text-xs">⚽</span>
                          </div>

                          <span className="text-[8px] font-black tracking-[0.16em] text-yellow-400 uppercase">
                            Artilheiro
                          </span>
                        </div>

                        <span className="text-[7px] font-bold tracking-wider text-yellow-500/60 uppercase">
                          Destaque da pelada
                        </span>
                      </div>

                      <div className="flex items-end justify-between gap-3">
                        <div className="min-w-0">
                          <div className="truncate text-[17px] font-black tracking-tight text-white">
                            Rafael
                          </div>

                          <p className="mt-0.5 text-[7px] text-zinc-500">
                            Maior goleador
                          </p>
                        </div>

                        <div className="shrink-0 text-right">
                          <div className="text-[24px] leading-none font-black text-yellow-400">
                            9
                          </div>

                          <div className="mt-1 text-[7px] font-black tracking-wider text-yellow-500/60 uppercase">
                            gols
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="relative z-10 shrink-0 px-5 pt-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-3">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-[7px] font-black tracking-[0.12em] text-emerald-400 uppercase">
                          Partidas
                        </span>

                        <Gamepad2 className="size-4 text-emerald-400/70" />
                      </div>

                      <div className="text-[18px] font-black text-white">8</div>

                      <div className="text-[7px] text-zinc-600">realizadas</div>
                    </div>

                    <div className="rounded-2xl border border-blue-500/10 bg-blue-500/5 p-3">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-[7px] font-black tracking-[0.12em] text-blue-400 uppercase">
                          Gols
                        </span>

                        <span className="text-xs opacity-70">🥅</span>
                      </div>

                      <div className="text-[18px] font-black text-white">
                        32
                      </div>

                      <div className="text-[7px] text-zinc-600">marcados</div>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="relative z-10 shrink-0 px-5 pt-2.5">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-xs text-yellow-400">★</span>

                    <span className="text-[8px] font-black tracking-[0.14em] text-zinc-500 uppercase">
                      Momentos da pelada
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2">
                      <div className="min-w-0">
                        <div className="text-[7px] font-bold tracking-wider text-zinc-600 uppercase">
                          Maior sequência
                        </div>

                        <div className="mt-0.5 truncate text-[9px] font-bold text-white">
                          Time A
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <div className="text-[12px] font-black text-emerald-400">
                          3x
                        </div>

                        <div className="text-[6px] text-zinc-600">seguidas</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2">
                      <div className="min-w-0">
                        <div className="text-[7px] font-bold tracking-wider text-zinc-600 uppercase">
                          Mais vitórias
                        </div>

                        <div className="mt-0.5 truncate text-[9px] font-bold text-white">
                          Time A
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <div className="text-[12px] font-black text-yellow-400">
                          6
                        </div>

                        <div className="text-[6px] text-zinc-600">vitórias</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating sharing cards */}
            {sharePlatforms.map((item) => (
              <motion.div
                key={item.platform}
                initial={{
                  opacity: 0,
                  x: item.direction,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: item.delay,
                  duration: 0.4,
                }}
                className={`absolute ${item.position} rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 shadow-[0_12px_30px_rgba(0,0,0,0.5)]`}
              >
                <div className="text-[8px] text-zinc-600">{item.label}</div>

                <div className="mt-0.5 text-[10px] font-bold text-white">
                  {item.platform} {item.icon}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
