import { canUseFeature } from '../lib/entitlements'

// Wraps Pro+ gated screens/sections. Matches Tenji: scripts/proposals/full analytics
// require Pro or Agency; gating is UI-only here — server-side enforcement is Terminal 1's job.
export default function UpgradeGate({ entitlements, feature, label, children }) {
  if (canUseFeature(entitlements, feature)) return children

  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-10 text-center">
      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
        {label || 'This feature'} is available on Pro and Agency plans.
      </p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Upgrade your plan to unlock it.
      </p>
      <button
        type="button"
        className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
      >
        Upgrade plan
      </button>
    </div>
  )
}
