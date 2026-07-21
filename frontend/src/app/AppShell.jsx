import { useEffect, useState } from 'react'
import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom'
import {
  Sparkles, LayoutGrid, Search, Kanban, CalendarClock, LayoutTemplate, Globe, Link2,
  ChartColumn, Paintbrush, MessageSquare, FileText, Users, UserRound, SquareCheck,
  TrendingUp, UsersRound, Coins, CreditCard, Settings, GraduationCap, LifeBuoy,
  Lock, Bell, MessageCircle, ArrowRight,
} from 'lucide-react'
import { getSession, logout } from './lib/auth'
import { getEntitlements, listNotifications } from './lib/api'
import { canUseFeature } from './lib/entitlements'
import CreditBadge from './components/CreditBadge'

// Exact sidebar spec from Josh's production Tenji bundle (2026-07-20) — group order,
// routes, and lock/badge placement are verbatim, not a recon approximation. Icons added
// 2026-07-21 from a zoomed crop of a live Tenji screenshot (reference/tenji-Dashboard.png
// sidebar) — the decompiled reference/tenji-frontend-components.js has no sidebar
// component to grep (Dashboard/LeadSearch/Tracker/etc only), so these are matched by eye
// against the real icon shapes, not guessed cold.
const NAV_GROUPS = [
  { label: 'COMMAND', items: [{ to: '/app', label: 'Dashboard', Icon: LayoutGrid }] },
  {
    label: 'LEADS',
    items: [
      { to: '/app/leads', label: 'Lead Search', Icon: Search },
      { to: '/app/tracker', label: 'Tracker', Icon: Kanban },
      { to: '/app/followups', label: 'Follow-Ups', Icon: CalendarClock },
    ],
  },
  {
    label: 'STUDIO',
    items: [
      { to: '/app/templates', label: 'Public Templates', Icon: LayoutTemplate },
      { to: '/app/sites', label: 'Client Sites', Icon: Globe },
      { to: '/app/domains', label: 'Domains', Icon: Link2 },
      { to: '/app/analytics', label: 'Analytics', Icon: ChartColumn, gate: 'fullAnalytics', gatePlan: 'Pro' },
      { to: '/app/designer', label: 'Site Creator', Icon: Paintbrush, badge: 'LIVE EDITOR' },
    ],
  },
  {
    label: 'OUTREACH',
    items: [
      { to: '/app/scripts', label: 'Scripts', Icon: MessageSquare, gate: 'scripts', gatePlan: 'Pro' },
      { to: '/app/contracts', label: 'Contracts', Icon: FileText },
    ],
  },
  {
    label: 'AGENCY',
    items: [
      { to: '/app/crm', label: 'CRM', Icon: Users },
      { to: '/app/clients', label: 'Clients', Icon: UserRound },
      { to: '/app/tasks', label: 'Tasks', Icon: SquareCheck },
      { to: '/app/revenue', label: 'Revenue', Icon: TrendingUp },
      { to: '/app/team', label: 'Team Members', Icon: UsersRound, gate: 'team', gatePlan: 'Agency' },
    ],
  },
  {
    label: 'ACCOUNT',
    items: [
      { to: '/app/credits', label: 'Credits', Icon: Coins },
      { to: '/app/billing', label: 'Billing', Icon: CreditCard },
      { to: '/app/settings', label: 'Settings', Icon: Settings },
    ],
  },
  {
    label: 'LEARN',
    items: [
      { to: '/app/tutorials', label: 'Tutorials', Icon: GraduationCap },
      { to: '/app/support', label: 'Support', Icon: LifeBuoy, unreadBadge: true },
    ],
  },
]

// Real Tenji greets by first name only ("Welcome back, Josh") even when the account's
// full name is "Josh Dunn" — verified live against tenji.ai/app/crm.
const firstName = (name) => (name || '').split(' ')[0] || name

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

  // Loading state (UI-PARITY-ORDERS §Terminal 2.3) — never flash the app while
  // entitlements are still resolving; a null vs. loaded-but-empty entitlements
  // object are different states (entitlementsError set = a real fetch failure,
  // not "still loading").
  if (!entitlements && !entitlementsError) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center gap-4">
        <div className="nova-icon-tile animate-spin" style={{ width: '3.5rem', height: '3.5rem', animationDuration: '1.1s' }}>
          <Sparkles size={22} />
        </div>
        <p className="text-sm text-nova-text-muted tracking-wide">Entering Nova...</p>
      </div>
    )
  }

  const creditsPct = entitlements ? Math.max(0, Math.min(100, Math.round((entitlements.credits / (entitlements.monthlyCredits || 500)) * 100))) : 0
  const planCode = (entitlements?.plan || 'trial').toUpperCase().replace(/\s+/g, '_')

  return (
    <div className="min-h-screen flex bg-nova-bg text-nova-text">
      <aside className="w-64 shrink-0 border-r border-nova-border flex flex-col">
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center gap-2.5 px-1">
            <div className="nova-icon-tile shrink-0" style={{ width: '2.25rem', height: '2.25rem' }}>
              <Sparkles size={18} />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">nova</span>
          </div>
        </div>
        <div className="border-b border-nova-border" />
        <nav className="flex-1 px-2.5 py-4 space-y-5 overflow-y-auto">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <div className="px-3 pb-1.5 text-[11px] font-semibold tracking-wider text-nova-text-muted">
                {group.label}
              </div>
              <div className="space-y-1">
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
                        `nova-nav-pill justify-between text-sm font-medium ${isActive ? 'nova-nav-pill-active' : ''} ${locked ? 'opacity-45' : ''}`
                      }
                    >
                      <span className="flex items-center gap-3">
                        <item.Icon size={17} className="shrink-0" strokeWidth={1.75} />
                        {item.label}
                        {item.badge && (
                          <span className="nova-badge-pill-outline">{item.badge}</span>
                        )}
                      </span>
                      {locked ? (
                        <Lock size={13} className="shrink-0 text-nova-accent" aria-label="Locked" />
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
            <div className="flex items-center gap-2.5 px-1">
              <div className="nova-credit-ring shrink-0" style={{ '--pct': creditsPct }}>
                <div className="nova-credit-ring-inner">{creditsPct}%</div>
              </div>
              <div className="text-xs text-nova-text-muted leading-tight">
                <div className="font-semibold text-nova-accent tracking-wide">{planCode}</div>
                <div>
                  <span className="text-nova-text font-medium">{entitlements.credits.toLocaleString()}</span>
                  {' / '}
                  {(entitlements.monthlyCredits ?? 500).toLocaleString()} credits left →
                </div>
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
          <span className="text-sm font-medium">Welcome back, {firstName(session.name)}</span>
          <div className="flex items-center gap-4">
            <CreditBadge entitlements={entitlements} />
            <NavLink to="/app/notifications" aria-label="Notifications" className="relative text-nova-text-muted hover:text-nova-text">
              <Bell size={19} strokeWidth={1.75} />
              {unreadSupport > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-nova-accent" />
              )}
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

      {/* Floating support bubble — every /app screen (UI-PARITY-ORDERS §Terminal 2.4). */}
      <button
        type="button"
        onClick={() => navigate('/app/support')}
        aria-label="Support"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full nova-btn-primary nova-glow-soft flex items-center justify-center"
      >
        <MessageCircle size={22} />
      </button>

      {upgradeModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setUpgradeModal(null)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="rounded-nova border border-nova-border bg-nova-surface p-6 max-w-sm text-center"
          >
            <div className="nova-icon-tile mx-auto mb-3">
              <Lock size={18} />
            </div>
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
                className="nova-btn-primary px-4 py-2 inline-flex items-center gap-1.5"
              >
                Upgrade to {upgradeModal.plan} <ArrowRight size={14} />
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
