import { cn } from "@/app/utils/class-name-merger";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { X } from "lucide-react";
import React, { type ReactNode } from "react";

function ModalRoot(
  props: Readonly<React.ComponentProps<typeof DialogPrimitive.Root>>,
) {
  return <DialogPrimitive.Root {...props} />;
}

interface ModalContentProps {
  children: ReactNode;
}

function ModalContent({ children }: ModalContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className={cn(
          "fixed inset-0 z-50 bg-black/80 backdrop-blur-xs",
          "data-[state=open]:animate-overlay-show",
        )}
      />
      <DialogPrimitive.Content
        className={cn(
          "fixed top-1/2 left-1/2 z-51 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-white shadow-2xl shadow-black/40 outline-none",
        )}
      >
        <div className="space-y-6">{children}</div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
interface ModalHeaderProps {
  children: ReactNode;
  rightAction?: ReactNode;
}

function ModalHeader({ children, rightAction }: ModalHeaderProps) {
  return (
    <header className="flex min-h-12 items-center justify-between gap-3 text-white">
      <ModalClose className="flex size-10 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-all hover:bg-zinc-700 hover:text-white active:scale-95">
        <X className="size-5" />
      </ModalClose>
      <DialogPrimitive.DialogTitle className="min-w-0 flex-1 text-center">
        <span className="block truncate text-lg font-bold tracking-tight">
          {children}
        </span>
      </DialogPrimitive.DialogTitle>
      <div className="flex size-10 shrink-0 items-center justify-center">
        {rightAction}
      </div>
    </header>
  );
}

function ModalTrigger(props: DialogPrimitive.DialogTriggerProps) {
  return (
    <DialogPrimitive.Trigger {...props}>
      {props.children}
    </DialogPrimitive.Trigger>
  );
}

function ModalClose({ ...props }: DialogPrimitive.DialogCloseProps) {
  return (
    <DialogPrimitive.Close {...props}>{props.children}</DialogPrimitive.Close>
  );
}

export const Modal = {
  Root: ModalRoot,
  Header: ModalHeader,
  Content: ModalContent,
  Trigger: ModalTrigger,
  Close: ModalClose,
};
