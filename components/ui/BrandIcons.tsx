// Inline brand glyphs — lucide-react removed brand icons for trademark reasons,
// so we ship our own minimal SVGs. Same API as lucide (className, size).

type IconProps = { className?: string };

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05C21.4 8.65 22 11.1 22 14.3V21h-4v-5.9c0-1.4-.03-3.2-1.95-3.2-1.96 0-2.26 1.53-2.26 3.1V21h-4V9Z" />
    </svg>
  );
}

export function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.5 3c.3 2.1 1.6 3.7 3.7 4v2.6c-1.3 0-2.5-.4-3.7-1.1v5.9c0 3.3-2.5 5.8-5.7 5.8A5.6 5.6 0 0 1 5 14.6c0-3.1 2.7-5.6 5.9-5.5v2.7c-.3-.1-.6-.1-.9-.1-1.6 0-2.8 1.3-2.7 2.9a2.8 2.8 0 0 0 5.5-.6V3h3.7Z" />
    </svg>
  );
}
