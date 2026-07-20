import { useState } from 'react'

// Parity target: 09 - Resources/UI-Reference/domains.md. Free feature (not
// gated) — empty state only, since no domain-purchase flow exists yet
// (hard constraint: no public DNS / domain purchases in v1).
// Recolored to T2's dojo/pink theme tokens (frontend/src/index.css `@theme`).
export default function Domains() {
  const [domains] = useState([])

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold font-nova-heading text-nova-text mb-1">Domains</h1>
          <p className="text-sm text-nova-text-muted">
            Connect custom domains to your published client sites.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            className="rounded-lg border border-nova-border px-3 py-2 text-sm font-medium text-nova-text-muted hover:bg-nova-surface-hover"
          >
            ⧉ Purchase Domain
          </button>
          <button
            type="button"
            className="rounded-lg bg-nova-accent px-3 py-2 text-sm font-semibold text-white hover:bg-nova-accent-deep transition-colors"
          >
            Add Domain
          </button>
        </div>
      </div>

      {domains.length === 0 && (
        <div className="max-w-md mx-auto text-center rounded-xl border border-nova-border bg-nova-surface p-10 mt-8">
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-nova-surface-hover text-nova-text-muted">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 1 1 0 10h-2M8 12h8" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold font-nova-heading text-nova-text">No domains connected</h2>
          <p className="mt-2 text-sm text-nova-text-muted">
            Add a custom domain and point it to a published client site. We'll walk you through the DNS records.
          </p>
          <button
            type="button"
            className="mt-6 w-full rounded-lg bg-nova-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-nova-accent-deep transition-colors"
          >
            Add Your First Domain
          </button>
          <button type="button" className="mt-3 text-sm text-nova-accent hover:text-nova-accent-deep">
            ⧉ Don't have a domain? Purchase one →
          </button>
        </div>
      )}
    </div>
  )
}
