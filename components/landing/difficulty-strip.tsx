"use client";

import { motion } from "motion/react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { difficultyLevels } from "@/lib/concept-schema";

const levelDescriptions = {
  Child: "Analogy-first and intuitive.",
  Teenager: "Structured without overwhelming jargon.",
  "College Student": "Conceptually solid with core technical terms.",
  "Graduate Student": "More formal and system-level.",
  Expert: "Concise, precise, and nuance-aware.",
} as const;

export function DifficultyStrip() {
  return (
    <section className="py-14 sm:py-20">
      <Container className="space-y-8">
        <SectionHeading
          eyebrow="Five Levels"
          title="Keep the same map. Change the depth."
          description="The conceptual structure stays stable while the language, detail, and precision adapt to the reader."
        />
        <div className="grid gap-3 md:grid-cols-5">
          {difficultyLevels.map((level, index) => (
            <motion.div
              key={level}
              className="surface-muted flex min-h-36 flex-col justify-between p-5"
              initial={{ opacity: 0, y: 16 }}
              transition={{
                delay: 0.05 + index * 0.05,
                duration: 0.45,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="text-sm uppercase tracking-[0.16em] text-[var(--color-accent)]">
                Level {index + 1}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">{level}</h3>
                <p className="text-sm leading-6 text-[var(--color-muted)]">
                  {levelDescriptions[level]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
