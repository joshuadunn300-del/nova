import { useEffect, useState } from 'react'
import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { getSession, logout } from './lib/auth'
import { getEntitlements, listNotifications } from './lib/api'
import { canUseFeature } from './lib/entitlements'
import CreditBadge from './components/CreditBadge'

// Exact sidebar spec from Josh's production Tenji bundle (2026-07-20) — group order,
// routes, and lock/badge placement are verbatim, not a recon approximation.
const NAV_GROUPS = [
  { label: 'COMMAND', items: [{ to: '/app', label: 'Dashboard' }] },
  {
    label: 'LEADS',
    items: [
      { to: '/app/leads', label: 'Lead Search' },
      { to: '/app/tracker', label: 'Tracker' },
      { to: '/app/followups', label: 'Follow-Ups' },
    ],
  },
  {
    label: 'STUDIO',
    items: [
      { to: '/app/templates', label: 'Public Templates' },
      { to: '/app/sites', label: 'Client Sites' },
      { to: '/app/domains', label: 'Domains' },
      { to: '/app/analytics', label: 'Analytics', gate: 'fullAnalytics', gatePlan: 'Pro' },
      { to: '/app/designer', label: 'Site Creator', badge: 'LIVE EDITOR' },
    ],
  },
  {
    label: 'OUTREACH',
    items: [
      { to: '/app/scripts', label: 'Scripts', gate: 'scripts', gatePlan: 'Pro' },
      { to: '/app/contracts', label: 'Contracts' },
    ],
  },
  {
    label: 'AGENCY',
    items: [
      { to: '/app/crm', label: 'CRM' },
      { to: '/app/clients', label: 'Clients' },
      { to: '/app/tasks', label: 'Tasks' },
      { to: '/app/revenue', label: 'Revenue' },
      { to: '/app/team', label: 'Team Members', gate: 'team', gatePlan: 'Agency' },
    ],
  },
  {
    label: 'ACCOUNT',
    items: [
      { to: '/app/credits', label: 'Credits' },
      { to: '/app/billing', label: 'Billing' },
      { to: '/app/settings', label: 'Settings' },
    ],
  },
  {
    label: 'LEARN',
    items: [
      { to: '/app/tutorials', label: 'Tutorials' },
      { to: '/app/support', label: 'Support', unreadBadge: true },
    ],
  },
]

export default function AppShell() {
  const session = getSession()
  const navigate = useNavigate()
  const [entitlements, setEntitlements] = useState(null)
  const [entitlementsError, setEntitlementsError] = useState('')
  const [unreadSupport, setUnreadSupport] = useState(0)
  const [upgradeModal, setUpgradeModal] = useState(null) // { feature, plan } | null

  const refreshEntitlements = () =>
    getEntitlements()
      .then((data) => {
        setEntitlementsError('')
        setEntitlements(data)
      })
      .catch((err) => {
        // A failed getEntitlements() (401/403/network) must never be silently
        // swallowed — null entitlements reads as "0 credits" everywhere else in
        // the app (hasCredits/canUseFeature), which shows a misleading "not
        // enough credits" message instead of the real auth/platform error.
        setEntitlementsError(err?.message || 'Could not load your plan/credits.')
      })

  useEffect(() => {
    refreshEntitlements()
    listNotifications()
      .then((rows) => setUnreadSupport(rows.filter((n) => !n.read).length))
      .catch(() => {})
  }, [])

  if (!session) return <Navigate to="/login" replace />

  return (
    <div className="min-h-screen flex bg-nova-bg text-nova-text">
      <aside className="w-60 shrink-0 border-r border-nova-border flex flex-col">
        <div className="px-4 py-4 text-lg font-semibold">Nova</div>
        <nav className="flex-1 px-2 space-y-4 overflow-y-auto">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <div className="px-3 pb-1 text-[11px] font-semibold tracking-wider text-nova-text-muted">
                {group.label}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const locked = item.gate && !canUseFeature(entitlements, item.gate)
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === '/app'}
                      onClick={(e) => {
                        if (locked) {
                          e.preventDefault()
                          setUpgradeModal({ feature: item.label, plan: item.gatePlan })
                        }
                      }}
                      className={({ isActive }) =>
                        `nova-nav-pill justify-between text-sm font-medium ${isActive ? 'nova-nav-pill-active' : ''}`
                      }
                    >
                      <span className="flex items-center gap-2">
                        {item.label}
                        {item.badge && (
                          <span className="rounded-full bg-nova-accent px-1.5 py-0.5 text-[10px] font-semibold text-white">
                            {item.badge}
                          </span>
                        )}
                      </span>
                      {locked ? (
                        <span aria-label="Locked" title={`Requires ${item.gatePlan}`}>🔒</span>
                      ) : (
                        item.unreadBadge &&
                        unreadSupport > 0 && (
                          <span className="rounded-full bg-nova-accent px-1.5 text-[10px] font-semibold text-white">
                            {unreadSupport}
                          </span>
                        )
                      )}
                    </NavLink>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="px-3 py-3 border-t border-nova-border space-y-2">
          {entitlements && (
            <div className="flex items-center gap-2 px-1">
              <div className="nova-credit-ring" style={{ '--pct': Math.max(0, Math.min(100, Math.round((entitlements.credits / (entitlements.monthlyCredits || 500)) * 100))) }}>
                <div className="nova-credit-ring-inner">
                  {Math.max(0, Math.min(100, Math.round((entitlements.credits / (entitlements.monthlyCredits || 500)) * 100)))}%
                </div>
              </div>
              <div className="text-xs text-nova-text-muted">
                <div className="uppercase font-semibold">{entitlements.plan}</div>
                <div>{entitlements.credits.toLocaleString()} credits left</div>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              logout()
              navigate('/login', { replace: true })
            }}
            className="w-full text-left text-sm text-nova-text-muted hover:text-nova-text"
          >
            Sign out ({session.email})
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 flex items-center justify-between px-6 border-b border-nova-border">
          <span className="text-sm font-medium">Welcome back, {session.name}</span>
          <div className="flex items-center gap-4">
            <CreditBadge entitlements={entitlements} />
            <NavLink to="/app/notifications" aria-label="Notifications" className="text-lg">
              🔔
            </NavLink>
            <div className="h-8 w-8 rounded-full bg-nova-accent text-white flex items-center justify-center text-sm font-semibold">
              {session.name?.[0]?.toUpperCase() || 'U'}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {entitlementsError && (
            <div className="mb-4 rounded-md bg-rose-50 dark:bg-rose-900/30 px-3 py-2 text-sm text-rose-700 dark:text-rose-300">
              Couldn't load your plan/credits: {entitlementsError}
            </div>
          )}
          <Outlet context={{ entitlements, refreshEntitlements }} />
        </main>
      </div>

      {upgradeModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setUpgradeModal(null)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="rounded-nova border border-nova-border bg-nova-surface p-6 max-w-sm text-center"
          >
            <div className="text-2xl mb-2">🔒</div>
            <p className="font-medium mb-1">
              {upgradeModal.feature} is {/^[aeiou]/i.test(upgradeModal.plan) ? 'an' : 'a'} {upgradeModal.plan} feature
            </p>
            <p className="text-sm text-nova-text-muted mb-4">Upgrade your plan to unlock it.</p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setUpgradeModal(null)
                  navigate('/app/billing')
                }}
                className="rounded-md bg-nova-accent px-4 py-2 text-sm font-medium text-white hover:bg-nova-accent-deep"
              >
                Upgrade to {upgradeModal.plan}
              </button>
              <button type="button" onClick={() => setUpgradeModal(null)} className="text-sm text-nova-text-muted">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
