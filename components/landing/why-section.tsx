"use client";

import { motion } from "motion/react";

import { Container } from "@/components/ui/container";
import { Pill } from "@/components/ui/pill";
import { SectionHeading } from "@/components/ui/section-heading";

const reasons = [
  {
    title: "Built for visual learners",
    description:
      "The MVP treats the concept map as the product, not as an illustration attached to a long article.",
  },
  {
    title: "Stable conceptual structure",
    description:
      "Users move across the same system at every difficulty level, which reinforces orientation instead of resetting it.",
  },
  {
    title: "Calm premium interface",
    description:
      "Dark-mode-first surfaces, layered cards, and restrained motion keep the experience polished without becoming noisy.",
  },
];

export function WhySection() {
  return (
    <section className="py-14 sm:py-20">
      <Container className="space-y-8">
        <SectionHeading
          eyebrow="Why This Exists"
          title="Complex ideas become easier when structure is visible."
          description="This project is a focused experiment: teach one difficult subject clearly enough that people remember both the insight and the interface."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              className="surface px-6 py-6"
              initial={{ opacity: 0, y: 18 }}
              transition={{
                delay: 0.05 + index * 0.06,
                duration: 0.45,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Pill>{`0${index + 1}`}</Pill>
              <h3 className="mt-5 text-2xl font-semibold text-white">
                {reason.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
