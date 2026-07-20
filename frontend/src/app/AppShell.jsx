import { useEffect, useState } from 'react'
import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { getSession, logout } from './lib/auth'
import { getEntitlements } from './lib/api'
import CreditBadge from './components/CreditBadge'

const NAV = [
  { to: '/app/lead-search', label: 'Lead Search' },
  { to: '/app/leads', label: 'Leads' },
  { to: '/app/clients', label: 'Clients' },
  { to: '/app/tasks', label: 'Tasks' },
  { to: '/app/notifications', label: 'Notifications' },
  { to: '/app/contracts', label: 'Contracts' },
  { to: '/app/proposals', label: 'Proposals' },
  { to: '/app/support', label: 'Support' },
  { to: '/app/settings', label: 'Settings' },
]

export default function AppShell() {
  const session = getSession()
  const navigate = useNavigate()
  const [entitlements, setEntitlements] = useState(null)

  useEffect(() => {
    getEntitlements().then(setEntitlements)
  }, [])

  if (!session) return <Navigate to="/login" replace />

  return (
    <div className="min-h-screen flex bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <aside className="w-60 shrink-0 border-r border-slate-200 dark:border-slate-800 flex flex-col">
        <div className="px-4 py-4 text-lg font-semibold">Nova</div>
        <nav className="flex-1 px-2 space-y-0.5">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-3 py-3 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => {
              logout()
              navigate('/login', { replace: true })
            }}
            className="w-full text-left text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            Sign out ({session.email})
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 flex items-center justify-end px-6 border-b border-slate-200 dark:border-slate-800">
          <CreditBadge entitlements={entitlements} />
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet context={{ entitlements }} />
        </main>
      </div>
    </div>
  )
}
