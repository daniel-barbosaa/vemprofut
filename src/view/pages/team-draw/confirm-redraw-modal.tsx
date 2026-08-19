import { Modal } from "@/view/components/ui/modal";

interface ConfirmRedrawModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function ConfirmRedrawModal({
  open,
  onOpenChange,
  onConfirm,
}: ConfirmRedrawModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Modal.Root open={open} onOpenChange={onOpenChange}>
      <Modal.Content>
        <Modal.Header>Sortear novamente?</Modal.Header>

        <div className="space-y-5">
          <p className="text-center text-sm leading-relaxed text-zinc-400">
            Os times atuais serão substituídos por um novo sorteio.
          </p>

          <div className="flex justify-end gap-5">
            <Modal.Close asChild>
              <button
                type="button"
                className="px-2 py-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-300"
              >
                Cancelar
              </button>
            </Modal.Close>

            <button
              type="button"
              onClick={handleConfirm}
              className="px-2 py-2 text-sm font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
            >
              Sortear
            </button>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}
