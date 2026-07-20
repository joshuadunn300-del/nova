import { Link } from 'react-router-dom'
import { planOf } from '../lib/entitlements'

export default function CreditBadge({ entitlements }) {
  if (!entitlements) return null
  const plan = planOf(entitlements)
  const credits = entitlements.credits ?? 0
  const total = plan.monthlyCredits ?? 500
  const pct = total ? Math.max(0, Math.min(100, Math.round((credits / total) * 100))) : 0
  // e.g. 'trial' -> 'FREE_TRIAL', 'starter' -> 'STARTER', 'pro' -> 'PRO'
  const planKey = (entitlements?.plan ?? 'trial')
  const planTag = planKey === 'trial' ? 'FREE_TRIAL' : planKey.toUpperCase()
  const low = pct <= 20

  return (
    <Link
      to="/app/credits"
      className={low ? 'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors hover:bg-white/10 text-amber-400' : 'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors hover:bg-white/10 text-nova-accent'}
    >
      <span className="font-semibold">{pct}%</span>
      <span className="opacity-70">{planTag}</span>
      <span>{credits.toLocaleString()}/{total.toLocaleString()} credits left</span>
      <span>→</span>
    </Link>
  )
}
