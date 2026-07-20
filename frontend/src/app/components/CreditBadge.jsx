import { planOf } from '../lib/entitlements'

export default function CreditBadge({ entitlements }) {
  if (!entitlements) return null
  const plan = planOf(entitlements)
  const pct = plan.monthlyCredits ? Math.max(0, Math.min(100, (entitlements.credits / plan.monthlyCredits) * 100)) : 0
  const low = pct <= 20

  return (
    <div className="flex items-center gap-3">
      <span className="rounded-full bg-indigo-100 dark:bg-indigo-900/40 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:text-indigo-300">
        {plan.label}
      </span>
      <div className="w-32">
        <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-0.5">
          <span>{entitlements.credits.toLocaleString()} credits</span>
          {low && <span className="text-amber-600 dark:text-amber-400 font-medium">Low</span>}
        </div>
        <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className={`h-full rounded-full ${low ? 'bg-amber-500' : 'bg-indigo-500'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  )
}
