import { Container } from "@/components/ui/container";

function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-2xl bg-white/[0.06] ${className}`} />;
}

export function ConceptPageSkeleton() {
  return (
    <div className="pb-16 pt-10 sm:pb-24 sm:pt-14">
      <Container className="space-y-6">
        <section className="surface px-5 py-6 sm:px-8 sm:py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
            <div className="space-y-4">
              <SkeletonBlock className="h-6 w-36" />
              <SkeletonBlock className="h-14 w-full max-w-2xl" />
              <SkeletonBlock className="h-6 w-full max-w-2xl" />
              <SkeletonBlock className="h-5 w-full max-w-3xl" />
            </div>
            <SkeletonBlock className="h-24 w-full lg:w-80" />
          </div>
          <div className="mt-5 flex gap-2">
            <SkeletonBlock className="h-8 w-24" />
            <SkeletonBlock className="h-8 w-32" />
            <SkeletonBlock className="h-8 w-28" />
          </div>
        </section>

        <section className="surface px-4 py-4 sm:px-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
              <div className="space-y-3">
                <SkeletonBlock className="h-5 w-28" />
                <SkeletonBlock className="h-4 w-full max-w-xl" />
              </div>
              <SkeletonBlock className="h-16 w-full lg:w-80" />
            </div>
            <div className="grid gap-3 lg:grid-cols-2">
              <SkeletonBlock className="h-32 w-full" />
              <SkeletonBlock className="h-32 w-full" />
            </div>
          </div>
        </section>
      </Container>

      <div className="relative left-1/2 mt-6 w-screen -translate-x-1/2 px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[92rem]">
          <section className="surface p-4 sm:p-6 lg:p-7">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(22rem,28rem)]">
              <div className="space-y-4">
                <SkeletonBlock className="h-20 w-full" />
                <div className="flex gap-2 overflow-hidden">
                  <SkeletonBlock className="h-24 min-w-48 flex-1" />
                  <SkeletonBlock className="h-24 min-w-48 flex-1" />
                  <SkeletonBlock className="h-24 min-w-48 flex-1" />
                </div>
                <section className="h-[28rem] animate-pulse rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(137,181,255,0.08),rgba(137,181,255,0)_60%)] sm:h-[34rem]" />
              </div>
              <section className="surface-muted px-5 py-6 sm:px-6">
                <div className="space-y-4">
                  <SkeletonBlock className="h-6 w-32" />
                  <SkeletonBlock className="h-10 w-full" />
                  <SkeletonBlock className="h-5 w-[85%]" />
                  <SkeletonBlock className="h-24 w-full" />
                  <SkeletonBlock className="h-24 w-full" />
                  <SkeletonBlock className="h-32 w-full" />
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
