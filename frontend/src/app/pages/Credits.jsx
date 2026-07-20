import { useOutletContext } from 'react-router-dom'
import { planOf } from '../lib/entitlements'

const COSTS = [
  { label: 'Lead Search', cost: '10 credits' },
  { label: 'Website Generation', cost: '20 credits' },
  { label: 'Script Generation', cost: '3 credits' },
  { label: 'Proposal Generation', cost: '5 credits' },
  { label: 'AI Rewrite (Designer)', cost: '1 credit' },
  { label: 'Email/DM Sequence', cost: '3 credits' },
]

export default function Credits() {
  const { entitlements } = useOutletContext()
  const plan = planOf(entitlements)
  const used = entitlements ? plan.monthlyCredits - entitlements.credits : 0

  return (
    <div>
      <p className="nova-eyebrow mb-1">ACCOUNT</p>
      <div className="flex items-start justify-between mb-1">
        <h1 className="text-xl font-semibold">Credits</h1>
        <button type="button" className="nova-btn-primary">
          Upgrade Plan
        </button>
      </div>
      <p className="text-sm text-nova-text-muted mb-6">
        Credits power lead searches, website generation, and all AI tools.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        <div className="nova-card p-4">
          <p className="nova-eyebrow mb-1">Credits Remaining</p>
          <p className="text-2xl font-semibold mb-2">{entitlements?.credits.toLocaleString() ?? '—'}</p>
          <p className="text-xs text-nova-text-muted">
            {used} of {plan.monthlyCredits} credits used
          </p>
        </div>
        <div className="nova-card p-4">
          <p className="nova-eyebrow mb-1">Monthly Allowance</p>
          <p className="text-2xl font-semibold mb-2">{plan.monthlyCredits.toLocaleString()}</p>
          <p className="text-xs text-nova-text-muted uppercase">{plan.label} Plan</p>
        </div>
        <div className="nova-card p-4">
          <p className="nova-eyebrow mb-1">Used This Month</p>
          <p className="text-2xl font-semibold">{used}</p>
        </div>
      </div>

      <h2 className="text-sm font-semibold mb-3">Credit Costs</h2>
      <div className="nova-card overflow-hidden mb-8">
        <table className="min-w-full text-sm">
          <tbody className="divide-y divide-nova-border">
            {COSTS.map((c) => (
              <tr key={c.label}>
                <td className="px-4 py-2.5">{c.label}</td>
                <td className="px-4 py-2.5 text-right text-nova-text-muted">{c.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-sm font-semibold mb-3">Transaction History</h2>
      <div className="nova-card border-dashed p-10 text-center">
        <p className="text-sm text-nova-text-muted">
          No transactions yet. Run your first lead search to get started.
        </p>
      </div>
    </div>
  )
}
