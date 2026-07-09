import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** darker alternating background */
  alt?: boolean;
};

export function Section({ id, children, className = "", alt = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 px-5 py-20 sm:px-8 md:py-28 ${
        alt ? "bg-navy-dark" : "bg-navy"
      } ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={`mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/60 px-3 py-1 text-xs font-medium uppercase tracking-widest text-teal">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}
