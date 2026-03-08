import { Container } from "@/components/ui/container";

function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-2xl bg-white/[0.06] ${className}`} />;
}

export function ConceptPageSkeleton() {
  return (
    <div className="pb-20 pt-14 sm:pb-24 sm:pt-20">
      <Container className="space-y-6 sm:space-y-8">
        <section className="surface px-6 py-8 sm:px-8 sm:py-10">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_20rem]">
            <div className="space-y-4">
              <SkeletonBlock className="h-6 w-40" />
              <SkeletonBlock className="h-14 w-full max-w-2xl" />
              <SkeletonBlock className="h-5 w-full max-w-3xl" />
              <SkeletonBlock className="h-5 w-[82%]" />
            </div>
            <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              <SkeletonBlock className="h-28 w-full" />
              <SkeletonBlock className="h-28 w-full" />
              <SkeletonBlock className="h-28 w-full" />
            </div>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <SkeletonBlock className="h-24 w-full" />
            <SkeletonBlock className="h-24 w-full" />
            <SkeletonBlock className="h-24 w-full" />
            <SkeletonBlock className="h-24 w-full" />
          </div>
        </section>

        <section className="surface px-4 py-4 sm:px-6">
          <div className="space-y-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
              <div className="space-y-3">
                <SkeletonBlock className="h-5 w-28" />
                <SkeletonBlock className="h-4 w-80 max-w-full" />
              </div>
              <SkeletonBlock className="h-16 w-full lg:w-80" />
            </div>
            <div className="flex gap-2 overflow-hidden">
              <SkeletonBlock className="h-24 min-w-44 flex-1" />
              <SkeletonBlock className="h-24 min-w-44 flex-1" />
              <SkeletonBlock className="h-24 min-w-44 flex-1" />
            </div>
            <SkeletonBlock className="h-24 w-full" />
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(20rem,25rem)]">
          <section className="surface h-[30rem] sm:h-[36rem] xl:h-[44rem]">
            <div className="h-full animate-pulse bg-[radial-gradient(circle_at_top,rgba(137,181,255,0.08),rgba(137,181,255,0)_60%)]" />
          </section>
          <section className="surface px-5 py-6 sm:px-6">
            <div className="space-y-4">
              <SkeletonBlock className="h-6 w-32" />
              <SkeletonBlock className="h-10 w-60" />
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-32 w-full" />
              <SkeletonBlock className="h-24 w-full" />
              <SkeletonBlock className="h-24 w-full" />
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
