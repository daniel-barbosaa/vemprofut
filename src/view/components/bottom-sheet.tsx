import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

interface BottomSheetProps {
  open: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
  showHeader?: boolean;
}

export function BottomSheet({
  open,
  title,
  children,
  onClose,
  showHeader = true,
}: BottomSheetProps) {
  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-[2px]"
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 300,
            }}
            className="fixed inset-x-0 bottom-0 z-50 max-h-[95vh] overflow-y-auto rounded-t-[28px] border-t border-white/10 bg-zinc-950 px-4 pt-3 pb-6"
          >
            <div className="mx-auto w-full max-w-xl">
              {showHeader && (
                <div className="mb-5 flex items-center justify-between">
                  {title && (
                    <h3 className="text-xl font-semibold text-white">
                      {title}
                    </h3>
                  )}

                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Fechar"
                    className="rounded-full p-2 text-zinc-400 hover:bg-zinc-800"
                  >
                    <X className="size-5" />
                  </button>
                </div>
              )}

              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
