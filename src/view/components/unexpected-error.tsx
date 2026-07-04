type ErrorScreenProps = {
  onReload?: () => void;
  onHome?: () => void;
};

export function ErrorScreen({
  onReload = () => window.location.reload(),
  onHome = () => (window.location.href = "/"),
}: ErrorScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-center text-white">
      <h1 className="mt-6 text-lg font-semibold text-white">
        Não foi possível carregar
      </h1>

      <p className="mt-2 max-w-sm text-sm text-zinc-500">
        Algo de errado aconteceu. Estamos resolvendo!
      </p>

      <div className="mt-6 flex w-full max-w-xs flex-col gap-3">
        <button
          onClick={onReload}
          className="rounded-xl bg-emerald-500 py-3 font-semibold text-white hover:bg-emerald-600 active:scale-95"
        >
          Tentar novamente
        </button>

        <button
          onClick={onHome}
          className="rounded-xl bg-zinc-900 py-3 font-medium text-zinc-300 hover:bg-zinc-800 active:scale-95"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
