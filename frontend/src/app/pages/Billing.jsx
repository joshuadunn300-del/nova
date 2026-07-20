import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { planOf } from '../lib/entitlements'

const PLANS = [
  { key: 'trial', label: 'FREE TRIAL', price: 'Free', credits: '500 lead credits/mo', icon: '⚡' },
  { key: 'starter', label: 'STARTER', price: '$31/mo', credits: '500 lead credits/mo', icon: '🌐' },
  { key: 'pro', label: 'PRO', price: '$63/mo', credits: '2,500 lead credits/mo', icon: '🛡' },
  { key: 'agency', label: 'AGENCY', price: '$119/mo', credits: '15,000 lead credits/mo', icon: '👥' },
]

const LOCKED_FEATURES = ['Custom Domains', 'Script Generator', 'Full Proposals', 'Per-Client Analytics', 'Team Members', 'Priority Support']

export default function Billing() {
  const { entitlements } = useOutletContext()
  const plan = planOf(entitlements)
  const [annual, setAnnual] = useState(false)

  return (
    <div>
      <p className="nova-eyebrow mb-1">ACCOUNT</p>
      <h1 className="text-xl font-semibold mb-1">Billing</h1>
      <p className="text-sm text-nova-text-muted mb-6">You're on the {plan.label} plan. Upgrade anytime.</p>

      <div className="nova-card p-5 mb-8">
        <p className="nova-eyebrow mb-1">CURRENT PLAN</p>
        <p className="text-lg font-semibold mb-2">{plan.label}</p>
        <p className="text-sm text-nova-text-muted mb-4">
          {entitlements?.credits ?? 0} Credits left · {plan.monthlyCredits} Monthly limit · {entitlements?.credits ?? 0} of{' '}
          {plan.monthlyCredits} remaining
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {LOCKED_FEATURES.map((f) => (
            <div key={f} className="text-sm text-nova-text-muted flex items-center gap-1.5">
              🔒 {f}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <button
          type="button"
          onClick={() => setAnnual(false)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium ${!annual ? 'bg-nova-accent text-white' : 'border border-nova-border'}`}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => setAnnual(true)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium ${annual ? 'bg-nova-accent text-white' : 'border border-nova-border'}`}
        >
          Annual <span className="text-xs opacity-80">Save 20%</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
        {PLANS.map((p) => {
          const isCurrent = p.key === entitlements?.plan
          const priceLabel =
            annual && p.price !== 'Free' ? `$${Math.round(parseInt(p.price.slice(1)) * 0.8)}/mo` : p.price
          return (
            <div key={p.key} className="nova-card p-4">
              <div className="text-lg mb-1">{p.icon}</div>
              <p className="nova-eyebrow mb-1">{p.label}</p>
              <p className="text-xl font-semibold mb-1">{priceLabel}</p>
              <p className="text-xs text-nova-text-muted mb-4">{p.credits}</p>
              <button
                type="button"
                disabled={isCurrent}
                className="w-full nova-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCurrent ? 'Active Plan' : `Switch to ${p.label.charAt(0) + p.label.slice(1).toLowerCase()}`}
              </button>
            </div>
          )
        })}
      </div>

      <h2 className="text-sm font-semibold mb-3">Billing History</h2>
      <div className="nova-card border-dashed p-10 text-center mb-8">
        <p className="text-sm text-nova-text-muted">
          No billing history yet. Your invoices will appear here once payments are connected.
        </p>
      </div>

      <button type="button" className="w-full rounded-md border border-rose-300 dark:border-rose-800 px-4 py-2 text-sm font-medium text-rose-600 dark:text-rose-400">
        ⤴ Cancel Plan
      </button>
    </div>
  )
}
