import { cx } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={cx("space-y-4", align === "center" && "mx-auto max-w-3xl text-center")}>
      {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      <div className="space-y-3">
        <h2 className="font-[family:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-2xl text-base leading-7 text-[var(--color-muted)] sm:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}
