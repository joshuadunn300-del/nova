import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { listContracts, listProposals } from '../lib/api'
import { canUseFeature } from '../lib/entitlements'
import DataTable from '../components/DataTable'

// Per UI-Reference/contracts.md: "Proposals & Contracts" — no separate /app/proposals route
// (merged here per orchestrator correction). Full Pro wall; gate copy is verbatim from recon.
export default function Contracts() {
  const { entitlements } = useOutletContext()
  const navigate = useNavigate()
  const [contracts, setContracts] = useState(null)
  const [proposals, setProposals] = useState(null)
  const allowed = canUseFeature(entitlements, 'contracts')

  useEffect(() => {
    if (!allowed) return
    listContracts().then(setContracts)
    listProposals().then(setProposals)
  }, [allowed])

  return (
    <div className="max-w-4xl">
      <p className="nova-eyebrow mb-1">OUTREACH</p>
      <h1 className="text-xl font-semibold mb-6">Proposals & Contracts</h1>

      {!allowed ? (
        <div className="nova-card p-10 text-center max-w-lg mx-auto">
          <div className="text-2xl mb-2">🔒</div>
          <p className="text-xs font-semibold text-nova-accent mb-1">PRO FEATURE</p>
          <h2 className="font-medium mb-2">Full Proposals &amp; Contracts</h2>
          <p className="text-sm text-nova-text-muted mb-4">
            Generate polished, client-ready service agreements that lock in recurring retainers, then export them as
            professional PDFs. Unlock the full proposal suite with Pro.
          </p>
          <ul className="text-sm text-left text-nova-text-muted space-y-1.5 mb-5 inline-block">
            <li>✨ Branded contract PDFs</li>
            <li>✨ Recurring retainer terms</li>
            <li>✨ Auto-filled agency details</li>
            <li>✨ Save &amp; reuse contracts</li>
          </ul>
          <div>
            <button type="button" className="nova-btn-primary">
              Upgrade to Pro →
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold">Contracts</h2>
              <button
                type="button"
                onClick={() => navigate('/app/tools/proposal')}
                className="nova-btn-primary"
              >
                New proposal
              </button>
            </div>
            {contracts === null ? (
              <p className="text-sm text-nova-text-muted">Loading…</p>
            ) : (
              // Real Contract entity is client_id/title/terms/value/status/signed_at — no
              // `client` (display name) or `start_date` field exist on the real schema.
              <DataTable
                emptyMessage="No contracts yet."
                rows={contracts}
                columns={[
                  { key: 'title', label: 'Title', render: (r) => r.title || r.client || '—' },
                  { key: 'value', label: 'Value', render: (r) => `$${r.value ?? 0}` },
                  { key: 'status', label: 'Status' },
                  { key: 'signed_at', label: 'Signed', render: (r) => r.signed_at || '—' },
                ]}
              />
            )}
          </div>

          <div>
            <h2 className="text-sm font-semibold mb-3">Proposals</h2>
            {proposals === null ? (
              <p className="text-sm text-nova-text-muted">Loading…</p>
            ) : (
              // Real Proposal entity is client_id/lead_id/title/content/value/status — no
              // `business_name`/`value_estimate`/`sent_date` on the real schema.
              <DataTable
                emptyMessage="No proposals sent yet — generate one above."
                rows={proposals}
                columns={[
                  { key: 'title', label: 'Title', render: (r) => r.title || r.business_name || '—' },
                  { key: 'status', label: 'Status' },
                  { key: 'value', label: 'Estimate', render: (r) => `$${r.value ?? r.value_estimate ?? 0}` },
                  { key: 'created_date', label: 'Created' },
                ]}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
