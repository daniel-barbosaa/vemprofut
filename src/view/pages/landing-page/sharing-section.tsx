import { Share2 } from "lucide-react";
import { motion } from "motion/react";
import { fadeLeft, fadeRight } from "./utils/animation-variables";

export function SharingSection() {
  const sharePlatforms = [
    {
      icon: "🔥",
      label: "Compartilhe",
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
    <section className="`bg-white/1.5 py-24">
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
              um resumo bonito — com detalhes interessantes que marcaram a
              noite.
            </p>

            <p className="mx-auto mt-3 max-w-150 text-base leading-relaxed text-zinc-500">
              Um card pronto para mandar no grupo ou postar no Instagram. Porque
              uma boa pelada merece uma boa resenha.
            </p>

            <div className="mt-7 flex justify-center">
              <button className="inline-flex cursor-pointer items-center gap-2 rounded-xl border-none bg-emerald-500 px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_32px_rgba(16,185,129,0.25)] transition-colors hover:bg-emerald-600">
                <Share2 size={15} />
                Compartilhar meu resumo
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div {...fadeLeft} className="mt-16 flex justify-center">
          <div className="relative w-full max-w-82.5">
            <div className="absolute inset-0 -z-10 scale-90 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#06100c] pb-4 shadow-[0_30px_80px_rgba(0,0,0,0.65)]">
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 size-56 rounded-full bg-emerald-500/10 blur-3xl" />

                <div className="absolute top-1/3 -left-28 size-56 rounded-full bg-emerald-500/5 blur-3xl" />

                <div className="absolute -right-20 -bottom-32 size-52 rounded-full bg-emerald-900/10 blur-3xl" />

                <div className="absolute inset-0 opacity-[0.035]" />
              </div>

              <div className="relative z-10 px-5 pt-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex size-6 items-center justify-center rounded-md bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                        <span className="text-xs">⚽</span>
                      </div>

                      <span className="text-[9px] font-black tracking-[0.18em] text-emerald-400 uppercase">
                        VemProFut
                      </span>
                    </div>

                    <div className="text-[15px] font-black text-white">
                      Quarta dos Amigos
                    </div>

                    <div className="mt-0.5 text-[8px] text-zinc-600">
                      17 ago 2026
                    </div>
                  </div>

                  <span className="rounded-full border border-white/6 bg-white/3 px-2 py-1 text-[7px] font-bold tracking-wider text-zinc-500 uppercase">
                    Resumo
                  </span>
                </div>
              </div>

              <div className="relative z-10 px-5 pt-6 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="h-px w-7 bg-linear-to-r from-transparent to-yellow-500/40" />

                  <span className="text-[8px] font-black tracking-[0.16em] text-yellow-400 uppercase">
                    🏆 Campeão da noite
                  </span>

                  <div className="h-px w-7 bg-linear-to-l from-transparent to-yellow-500/40" />
                </div>

                <div className="mt-2 text-[30px] leading-none font-black tracking-[-1px] text-white">
                  Time A
                </div>

                <div className="mt-3 flex items-center justify-center gap-7">
                  <div>
                    <div className="text-xl font-black text-emerald-400">6</div>

                    <div className="text-[7px] font-bold tracking-wider text-zinc-600 uppercase">
                      Vitórias
                    </div>
                  </div>

                  <div className="h-6 w-px bg-zinc-800" />

                  <div>
                    <div className="text-xl font-black text-emerald-400">
                      75%
                    </div>

                    <div className="text-[7px] font-bold tracking-wider text-zinc-600 uppercase">
                      Aproveitamento
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 px-5 pt-5">
                <div className="rounded-2xl border border-white/6 bg-white/2.5 p-3">
                  <div className="mb-2.5 flex items-center justify-between">
                    <span className="text-[8px] font-black tracking-[0.14em] text-zinc-600 uppercase">
                      Elenco campeão
                    </span>

                    <span className="text-[8px] font-bold text-emerald-400">
                      5 jogadores
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                    {["Lucas", "Pedro", "Rafael", "Bruno", "Caio"].map(
                      (player, index) => (
                        <div
                          key={player}
                          className="flex min-w-0 items-center gap-1.5"
                        >
                          <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-[7px] font-black text-emerald-400">
                            {index + 1}
                          </span>

                          <span className="truncate text-[8px] font-semibold text-zinc-400">
                            {player}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>

              <div className="relative z-10 px-5 pt-2.5">
                <div className="rounded-2xl border border-blue-500/10 bg-blue-500/4.5 p-3">
                  <div className="mb-2.5 flex items-center justify-between">
                    <span className="text-[8px] font-black tracking-[0.14em] text-blue-400 uppercase">
                      ⚔️ Jogo da noite
                    </span>

                    <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[7px] font-bold text-blue-300">
                      Mais equilibrado
                    </span>
                  </div>

                  <div className="grid grid-cols-[1fr_auto_1fr] items-center">
                    <div className="text-center">
                      <div className="truncate text-[8px] font-bold text-white">
                        Time B
                      </div>

                      <div className="mt-0.5 text-xl font-black text-blue-400">
                        2
                      </div>
                    </div>

                    <div className="px-2 text-center">
                      <span className="text-xs font-black text-zinc-700">
                        ×
                      </span>

                      <div className="mt-0.5 text-[7px] font-bold text-zinc-600">
                        08:05
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="truncate text-[8px] font-bold text-white">
                        Time C
                      </div>

                      <div className="mt-0.5 text-xl font-black text-blue-400">
                        2
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 px-5 pt-2.5">
                <div className="rounded-2xl border border-white/6 bg-white/2 p-3">
                  <div className="mb-2.5 text-[8px] font-black tracking-[0.14em] text-zinc-600 uppercase">
                    ✨ Momentos da noite
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-start gap-2.5">
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-sm">
                        🔥
                      </div>

                      <div className="min-w-0">
                        <div className="text-[8px] font-black text-white">
                          Destaque da noite
                        </div>

                        <div className="text-[9px] font-bold text-emerald-400">
                          Time A
                        </div>

                        <p className="mt-0.5 text-[7px] leading-relaxed text-zinc-600">
                          Venceu 3 partidas consecutivas e terminou no topo.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-sm">
                        ⚡
                      </div>

                      <div className="min-w-0">
                        <div className="text-[8px] font-black text-white">
                          Artilharia
                        </div>

                        <div className="text-[9px] font-bold text-emerald-400">
                          Time B
                        </div>

                        <p className="mt-0.5 text-[7px] leading-relaxed text-zinc-600">
                          O ataque mais eficiente, com 9 gols marcados.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {sharePlatforms.map((item) => (
              <motion.div
                key={item.platform}
                initial={{ opacity: 0, x: item.direction }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay, duration: 0.4 }}
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
