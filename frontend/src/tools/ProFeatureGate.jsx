import { Check } from 'lucide-react'

// Matches the real Tenji gate-card pattern (verified in
// 09 - Resources/UI-Reference/{analytics,contracts}.md — both screens use this
// exact eyebrow/heading/body/bullets/CTA structure). Reusable across any
// Pro-walled screen; T4's Contracts merge (see BUILD-LOG) can reuse this too
// instead of a bespoke gate per screen.
// Recolored to T2's dojo/pink theme tokens (frontend/src/index.css `@theme`).
export default function ProFeatureGate({ heading, body, bullets = [], ctaLabel = 'Upgrade to Pro →' }) {
  return (
    <div className="max-w-md mx-auto text-center rounded-xl border border-nova-border bg-nova-surface p-10 mt-12">
      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-nova-accent/10 text-nova-accent">
        {/* lock icon */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
          <rect x="4" y="11" width="16" height="9" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      </div>
      <p className="text-xs font-semibold tracking-wide uppercase text-nova-accent mb-2">
        Pro Feature
      </p>
      <h2 className="text-lg font-semibold font-nova-heading text-nova-text">{heading}</h2>
      <p className="mt-2 text-sm text-nova-text-muted">{body}</p>
      {bullets.length > 0 && (
        <ul className="mt-5 space-y-2 text-left">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-nova-text-muted">
              <Check size={13} className="text-nova-accent mt-0.5 shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        className="mt-6 w-full rounded-lg bg-nova-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-nova-accent-deep transition-colors"
      >
        {ctaLabel}
      </button>
    </div>
  )
}
