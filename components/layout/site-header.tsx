"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import {
  conceptGalleryEntries,
  featuredConceptEntry,
} from "@/data/concept-gallery";
import { cx } from "@/lib/utils";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/#concept-library", label: "Library" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(7,11,24,0.7)] backdrop-blur-xl">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-4">
        <Link className="group inline-flex items-center gap-3" href="/">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold tracking-[0.2em] text-[var(--color-accent)] transition-transform duration-300 group-hover:scale-105">
            VX
          </span>
          <div className="font-[family:var(--font-display)] text-lg font-semibold">
            Visualize
          </div>
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <nav aria-label="Primary" className="flex flex-wrap items-center gap-2">
            {navigation.map((item) => {
              const isHashLink = item.href.includes("#");
              const isActive =
                !isHashLink &&
                (item.href === "/"
                  ? pathname === item.href
                  : pathname.startsWith(item.href));

              return (
                <Link
                  aria-current={isActive ? "page" : undefined}
                  key={item.href}
                  className={cx(
                    "rounded-full px-4 py-2 text-sm transition-colors duration-200",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-[var(--color-muted)] hover:bg-white/5 hover:text-white",
                  )}
                  href={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="hidden rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs uppercase tracking-[0.16em] text-[var(--color-muted)] lg:block">
            {`${conceptGalleryEntries.length} concepts`}
          </div>
          <LinkButton href={featuredConceptEntry.href} size="sm">
            Open featured
          </LinkButton>
        </div>
      </Container>
    </header>
  );
}
