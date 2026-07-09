"use client";

import { motion } from "framer-motion";
import { CalendarCheck, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";
import { CONTACT } from "@/lib/constants";
import { LinkedInIcon } from "../ui/BrandIcons";
import { Section, SectionHeading } from "../ui/Section";
import { Reveal } from "../ui/Reveal";

const METHODS = [
  {
    label: "WhatsApp",
    value: "Chat instantly",
    href: CONTACT.whatsappPrefill,
    icon: MessageCircle,
    accent: "#25D366",
    external: true,
  },
  {
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    icon: Mail,
    accent: "#FFB627",
    external: false,
  },
  {
    label: "Phone",
    value: CONTACT.phone,
    href: CONTACT.phoneTel,
    icon: Phone,
    accent: "#2EC4B6",
    external: false,
  },
  {
    label: "Book a Call",
    value: "Pick a time on Calendly",
    href: CONTACT.calendly, // PLACEHOLDER: real Calendly link
    icon: CalendarCheck,
    accent: "#3DDC97",
    external: true,
  },
] as const;

/** Optional lightweight form — no backend; it composes a mailto: link. */
function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New inquiry from ${name || "your site"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  };

  const field =
    "w-full rounded-xl border border-hairline bg-navy-dark/60 px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-amber/60 focus:outline-none";

  return (
    <form onSubmit={submit} className="rounded-2xl border border-hairline bg-surface/50 p-5">
      <h3 className="font-heading text-base font-semibold text-ink">Send a quick message</h3>
      <p className="mt-1 text-xs text-muted">
        This opens your email app with everything pre-filled — no account needed.
      </p>
      <div className="mt-4 grid gap-3">
        <input
          className={field}
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          aria-label="Your name"
        />
        <input
          className={field}
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Your email"
        />
        <textarea
          className={`${field} min-h-[96px] resize-y`}
          placeholder="What can I help you with?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          aria-label="Your message"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber px-5 py-3 text-sm font-semibold text-navy-dark transition-transform hover:-translate-y-0.5"
        >
          <Send className="h-4 w-4" />
          Compose email
        </button>
      </div>
    </form>
  );
}

export function ContactSection() {
  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Contact"
        title={<>Let&apos;s grow your <span className="text-gradient-amber">socials</span></>}
        subtitle="Ready to turn your channels into a growth engine? Reach out however suits you best."
        center
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="grid gap-3 sm:grid-cols-2">
            {METHODS.map((m) => (
              <Reveal key={m.label}>
                <motion.a
                  href={m.href}
                  target={m.external ? "_blank" : undefined}
                  rel={m.external ? "noopener noreferrer" : undefined}
                  whileHover={{ y: -3 }}
                  className="flex items-center gap-3 rounded-2xl border border-hairline bg-surface/60 p-4 transition-colors hover:border-amber/40"
                >
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                    style={{ background: `${m.accent}22`, color: m.accent }}
                  >
                    <m.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-ink">{m.label}</span>
                    <span className="block truncate text-xs text-muted">{m.value}</span>
                  </span>
                </motion.a>
              </Reveal>
            ))}
          </div>

          {/* LinkedIn secondary link — boxed to match the method cards */}
          <Reveal>
            <motion.a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="mt-3 flex items-center gap-3 rounded-2xl border border-hairline bg-surface/60 p-4 transition-colors hover:border-amber/40"
            >
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                style={{ background: "#0A66C222", color: "#4A9BE8" }}
              >
                <LinkedInIcon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-ink">LinkedIn</span>
                <span className="block truncate text-xs text-muted">Connect professionally</span>
              </span>
            </motion.a>
          </Reveal>

          <p className="mt-4 text-xs text-muted">🌍 Working with brands worldwide</p>
        </div>

        <Reveal>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
