import { ArrowUp } from "lucide-react";

export function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950">
      <div className="mx-auto max-w-300 px-4">
        <div className="flex min-h-20 items-center justify-between gap-4">
          <div className="shrink-0">
            <div className="text-lg font-bold tracking-tight text-white">
              Vem<span className="text-emerald-400">ProFut</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden text-[11px] text-zinc-600 sm:block">
              © 2026 VemProFut. Todos os direitos reservados.
            </span>

            <button
              type="button"
              onClick={handleBackToTop}
              aria-label="Voltar ao topo"
              className="group flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-zinc-800/80 bg-zinc-900/60 text-zinc-600 transition-all hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
            >
              <ArrowUp
                size={14}
                className="transition-transform duration-200 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>

        <div className="border-t border-zinc-800/50 py-4 sm:hidden">
          <span className="text-[10px] text-zinc-600">
            © 2026 VemProFut. Todos os direitos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}
