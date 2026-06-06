import { cn } from "@/app/utils/class-name-merger";
import { Loader2 } from "lucide-react";
import type { ComponentProps } from "react";
interface ButtonProps extends ComponentProps<"button"> {
  className: string;
  isLoading?: boolean;
}
export function Button({
  className,
  children,
  isLoading,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-5 font-semibold text-white transition-all hover:bg-emerald-600 active:scale-95",
        className,
      )}
    >
      {isLoading ? (
        <Loader2 className="size-5 animate-spin text-emerald-400" />
      ) : (
        <>{children}</>
      )}
    </button>
  );
}
