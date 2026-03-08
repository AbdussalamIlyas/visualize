import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@xyflow/react/dist/style.css";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Visualize",
    template: "%s | Visualize",
  },
  description:
    "A visual-first learning experience for understanding complex ideas through explainer pages, starting with how a jet engine works.",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className="dark" lang="en">
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
        <a
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
          href="#main-content"
        >
          Skip to main content
        </a>
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 overflow-hidden"
        >
          <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(111,170,255,0.24),_rgba(111,170,255,0)_68%)] blur-3xl" />
          <div className="absolute right-[-8rem] top-[24%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(81,224,203,0.18),_rgba(81,224,203,0)_72%)] blur-3xl" />
          <div className="absolute bottom-[-10rem] left-[-6rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(247,173,108,0.16),_rgba(247,173,108,0)_70%)] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(6,10,22,0.2),rgba(6,10,22,0.92))]" />
        </div>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1" id="main-content">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
