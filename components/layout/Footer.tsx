import { Mail } from "lucide-react";
import { CONTACT, NAV_LINKS, PROFILE } from "@/lib/constants";
import { InstagramIcon, LinkedInIcon, TikTokIcon } from "../ui/BrandIcons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-hairline bg-navy-dark px-5 py-12 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <div className="font-heading text-lg font-bold tracking-wide text-ink">
            {PROFILE.name.toUpperCase()}
          </div>
          <p className="mt-2 text-sm text-muted">{PROFILE.tagline}</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-3">
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="rounded-lg border border-hairline p-2.5 text-muted transition-colors hover:border-amber/60 hover:text-amber"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-lg border border-hairline p-2.5 text-muted transition-colors hover:border-amber/60 hover:text-amber"
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>
          <a
            href={CONTACT.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="rounded-lg border border-hairline p-2.5 text-muted transition-colors hover:border-amber/60 hover:text-amber"
          >
            <TikTokIcon className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            aria-label="Email"
            className="rounded-lg border border-hairline p-2.5 text-muted transition-colors hover:border-amber/60 hover:text-amber"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-6xl border-t border-hairline pt-6 text-center text-xs text-muted">
        © {year} {PROFILE.name}. All rights reserved. · By <a href="https://www.raoufbachiri.com">Raouf Bachiri</a> .
      </div>
    </footer>
  );
}
