import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";

import { cx } from "@/lib/utils";

type LinkButtonProps = LinkProps & {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md";
  variant?: "primary" | "secondary";
};

export function LinkButton({
  children,
  className,
  size = "md",
  variant = "primary",
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cx(
        "inline-flex items-center justify-center rounded-full border px-5 font-medium transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
        size === "sm" ? "h-10 text-sm" : "h-12 text-sm sm:text-base",
        variant === "primary"
          ? "border-[rgba(149,187,255,0.4)] bg-[linear-gradient(135deg,rgba(137,181,255,0.26),rgba(70,222,199,0.18))] text-white shadow-[0_18px_40px_rgba(11,18,42,0.38)] hover:-translate-y-0.5 hover:border-[rgba(149,187,255,0.6)] hover:bg-[linear-gradient(135deg,rgba(137,181,255,0.34),rgba(70,222,199,0.24))]"
          : "border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
