import Link from "next/link";

import { Container } from "@/components/ui/container";
import { featuredConceptEntry } from "@/data/concept-gallery";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[rgba(7,11,24,0.82)]">
      <Container className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="font-[family:var(--font-display)] text-xl font-semibold">
            Visualize
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            Visual-first explainers.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-muted)]">
          <Link className="transition hover:text-white" href="/">
            Home
          </Link>
          <Link className="transition hover:text-white" href="/#concept-library">
            Library
          </Link>
          <Link className="transition hover:text-white" href="/about">
            About
          </Link>
          <Link className="transition hover:text-white" href={featuredConceptEntry.href}>
            Featured
          </Link>
        </div>
      </Container>
    </footer>
  );
}
