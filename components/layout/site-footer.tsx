import Link from "next/link";

import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[rgba(7,11,24,0.82)]">
      <Container className="flex flex-col gap-6 py-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl space-y-2">
          <p className="font-[family:var(--font-display)] text-xl font-semibold">
            Visualize
          </p>
          <p className="text-sm leading-6 text-[var(--color-muted)]">
            A focused MVP for teaching one complex idea well through a stable
            concept map, layered explanations, and a premium dark-mode learning
            interface.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-muted)]">
          <Link className="transition hover:text-white" href="/">
            Home
          </Link>
          <Link className="transition hover:text-white" href="/about">
            About
          </Link>
          <Link
            className="transition hover:text-white"
            href="/concept/how-ai-works"
          >
            How AI Works
          </Link>
        </div>
      </Container>
    </footer>
  );
}
