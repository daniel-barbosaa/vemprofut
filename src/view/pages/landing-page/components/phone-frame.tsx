import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-120 w-58.25 shrink-0 flex-col overflow-hidden rounded-[40px] border-[1.5px] border-zinc-800 bg-zinc-950 shadow-[0_0_0_6px_rgba(255,255,255,0.03),0_48px_96px_rgba(0,0,0,0.85),0_0_50px_rgba(16,185,129,0.06)] sm:h-140 sm:w-68">
      <div className="relative flex h-10 shrink-0 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-5">
        <span className="text-xs font-semibold text-white/55">9:41</span>

        <div className="absolute top-2 left-1/2 h-5.5 w-21.5 -translate-x-1/2 rounded-full bg-black" />

        <div className="relative h-2.5 w-4.5 rounded-xs border-[1.5px] border-zinc-800">
          <div className="absolute inset-0.5 rounded-[1px] bg-emerald-500" />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
