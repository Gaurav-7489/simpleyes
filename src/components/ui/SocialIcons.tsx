/** Simple monochrome marks for social profiles (drawn here; no third-party logo files). */
type IconProps = { className?: string };

export function InstagramIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className} fill="currentColor">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4a21 21 0 0 0-2.4-.1c-2.4 0-4 1.4-4 4.1v2.1H7.7v3h2.6V21h3.2z" />
    </svg>
  );
}

export function LinkedInIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className} fill="currentColor">
      <path d="M6.9 8.8H3.8V20h3.1V8.8zM5.4 3.8a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zM20.2 13.6c0-3-1.6-4.5-3.8-4.5-1.8 0-2.6 1-3 1.7V8.8h-3.1V20h3.1v-6c0-1.4.6-2.4 1.9-2.4 1.2 0 1.8.9 1.8 2.4v6h3.1v-6.4z" />
    </svg>
  );
}
