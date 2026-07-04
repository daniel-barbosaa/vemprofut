import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

interface BottomSheetProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export function BottomSheet({
  open,
  title,
  children,
  onClose,
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
            className="fixed inset-0 z-40 bg-black/60"
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              duration: 0.25,
              ease: [0.25, 0.8, 0.25, 1],
            }}
            className="fixed right-0 bottom-0 left-0 z-50 rounded-t-3xl border-t border-zinc-800 bg-zinc-900"
          >
            <div className="mx-auto max-w-2xl p-6">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">{title}</h3>

                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-zinc-400 hover:bg-zinc-800"
                >
                  <X className="size-5" />
                </button>
              </div>

              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
