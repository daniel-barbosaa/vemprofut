import { cn } from "@/app/utils/class-name-merger";
import type { ComponentProps } from "react";
interface ButtonProps extends ComponentProps<"button"> {
  className: string;
}
export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-5 font-semibold text-white transition-all hover:bg-emerald-600 active:scale-95",
        className,
      )}
    >
      {children}
    </button>
  );
}
