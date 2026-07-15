import { cn } from "@/app/utils/class-name-merger";
import type { ReactNode } from "react";

interface ScreenProps {
  children: ReactNode;
  className?: string;
}

export function Screen({ children, className }: ScreenProps) {
  return (
    <div
      className={cn(
        "px-4 pt-[calc(env(safe-area-inset-top)+0.5rem)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
