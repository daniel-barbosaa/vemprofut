import { BottomSheet } from "@/view/components/bottom-sheet";
import { Spinner } from "@/view/components/ui/spinner";
import { ArrowRight } from "lucide-react";

interface ImportTextBottomSheetProps {
  showImport: boolean;
  onCloseImport(): void;
  importText: string;
  setImportText(value: string): void;
  isImporting: boolean;
  importError: string | null;
  onImportText(): void;
}

export function ImportTextBottomSheet({
  showImport,
  onCloseImport,
  importText,
  setImportText,
  isImporting,
  importError,
  onImportText,
}: ImportTextBottomSheetProps) {
  return (
    <BottomSheet
      open={showImport}
      onClose={onCloseImport}
      title="Importar lista"
    >
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm text-zinc-400">
            Cole aqui a lista de jogadores do WhatsApp.
          </p>

          <p className="mt-1 text-xs text-zinc-600">
            O VemProFut vai identificar os nomes automaticamente.
          </p>
        </div>

        <textarea
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
          disabled={isImporting}
          placeholder={`Exemplo:
1. Daniel
2. João
3. Lucas
4. Marcos
5. Gabriel`}
          className="min-h-52 resize-none rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-4 text-base text-white placeholder:text-zinc-600 focus:border-emerald-500 focus:outline-none disabled:opacity-50"
        />

        {importError && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-3">
            <p className="text-sm leading-relaxed text-red-400">
              {importError}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={onImportText}
          disabled={!importText.trim() || isImporting}
          className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-emerald-500 font-semibold text-white transition-colors hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
        >
          {isImporting ? (
            <>
              <Spinner className="size-5" />
              Processando lista...
            </>
          ) : (
            <>
              Processar lista
              <ArrowRight className="size-5" />
            </>
          )}
        </button>

        {isImporting && (
          <p className="text-center text-xs text-zinc-600">
            Isso pode levar alguns segundos.
          </p>
        )}
      </div>
    </BottomSheet>
  );
}
