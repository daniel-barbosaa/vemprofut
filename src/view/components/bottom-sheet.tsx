import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

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
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.08 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60"
          />

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{
              duration: 0.18,
              ease: "easeOut",
            }}
            className="fixed right-0 bottom-0 left-0 z-50 rounded-t-3xl border-t border-zinc-800 bg-zinc-900"
          >
            <div className="mx-auto max-w-2xl p-6">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">{title}</h3>

                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-800"
                >
                  <X className="size-5" />
                </button>
              </div>

              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
