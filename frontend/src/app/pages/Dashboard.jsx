import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { getSession } from '../lib/auth'
import { listLeads, listClients, listTasks } from '../lib/api'
import { listSites } from '../../tools/api'
import { planOf } from '../lib/entitlements'

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

const QUICK_ACTIONS = [
  { to: '/app/leads', label: 'Find Leads', cost: '10 credits', icon: '🔍' },
  { to: '/app/templates', label: 'Generate Site', cost: '20 credits', icon: '✨' },
  { to: '/app/scripts', label: 'Cold Call Script', cost: '3 credits', icon: '📞' },
  { to: '/app/contracts', label: 'New Proposal', cost: '5 credits', icon: '📄' },
  { to: '/app/clients', label: 'Add Client', cost: 'Free', icon: '💼' },
  { to: '/app/tasks', label: 'Add Task', cost: 'Free', icon: '☑️' },
]

export default function Dashboard() {
  const session = getSession()
  const navigate = useNavigate()
  const { entitlements } = useOutletContext()
  const [leads, setLeads] = useState([])
  const [clients, setClients] = useState([])
  const [tasks, setTasks] = useState([])
  const [sites, setSites] = useState([])

  useEffect(() => {
    listLeads().then(setLeads).catch(() => {})
    listClients().then(setClients).catch(() => {})
    listTasks().then(setTasks).catch(() => {})
    listSites().then(setSites).catch(() => {})
  }, [])

  const leadName = (l) => l.business_name || l.name || ''
  const byStage = (stage) => leads.filter((l) => l && l.stage === stage).length
  const activeClients = clients.filter((c) => c.status === 'active')
  const mrr = activeClients.reduce((sum, c) => sum + (c.mrr || 0), 0)
  const openTasks = tasks.filter((t) => t.status !== 'done').length
  const plan = planOf(entitlements)

  const STATS = [
    { label: 'Recurring Revenue', value: `$${mrr}/mo`, highlight: true, icon: '💰' },
    { label: 'Credits Left', value: entitlements ? `${entitlements.credits.toLocaleString()} / ${plan.monthlyCredits.toLocaleString()}` : '—', icon: '⚡' },
    { label: 'Total Leads', value: leads.length, icon: '🔍' },
    { label: 'Interested', value: byStage('interested'), icon: '👀' },
    { label: 'Closed', value: byStage('closed'), icon: '✅' },
    { label: 'Active Clients', value: activeClients.length, icon: '💼' },
    { label: 'Open Tasks', value: openTasks, icon: '☑️' },
  ]

  return (
    <div>
      <div className="relative overflow-hidden nova-card nova-dojo-bg nova-kanji-watermark p-8 md:p-10 mb-6">
        {/* Samurai illustration placeholder — real Tenji shows a dark line-art
            samurai figure bottom-right of the hero card (dashboard.md). No brand
            illustration asset exists yet, so this is a silhouette placeholder in
            the same position/tone rather than leaving the space empty or faking
            a photo; swap the <svg> for the real asset when one lands. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 200 240"
          className="pointer-events-none absolute bottom-0 right-4 hidden md:block h-full w-auto opacity-[0.08]"
          style={{ maxHeight: '220px' }}
        >
          <path
            fill="currentColor"
            className="text-nova-accent"
            d="M100 8c-10 0-18 10-18 24 0 9 4 16 10 20-14 4-24 14-28 30l-8 60c-2 14 6 26 18 30l4 40c0 6 5 10 11 10h22c6 0 11-4 11-10l4-40c12-4 20-16 18-30l-8-60c-4-16-14-26-28-30 6-4 10-11 10-20 0-14-8-24-18-24z"
          />
          <path
            fill="none"
            stroke="currentColor"
            className="text-nova-accent"
            strokeWidth="3"
            d="M60 96 L20 130 M140 96 L180 130"
          />
        </svg>
        <div className="relative">
          <span className="nova-badge-pill mb-3">天 · Nova</span>
          <h1 className="text-2xl font-semibold mb-1">
            {greeting()}, <span className="text-nova-accent">{session?.name || 'there'}</span>.
          </h1>
          <p className="text-sm text-nova-text-muted mb-5">Here's what's moving in your agency today.</p>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => navigate('/app/leads')} className="nova-btn-primary">
              🔍 Find Leads
            </button>
            <button type="button" onClick={() => navigate('/app/sites')} className="nova-btn-secondary">
              View Client Sites
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
        {STATS.map((s) => (
          <div key={s.label} className={`nova-stat-card ${s.highlight ? 'nova-card-active' : ''}`}>
            <div className="nova-icon-tile mb-3 text-base">{s.icon}</div>
            <p className="nova-eyebrow mb-1">{s.label}</p>
            <p className="text-xl font-semibold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">Recent Client Sites</h2>
          <button type="button" onClick={() => navigate('/app/sites')} className="text-sm font-medium text-nova-accent">
            View all
          </button>
        </div>
        {sites.length === 0 ? (
          <div className="nova-card border-dashed p-8 text-center text-sm text-nova-text-muted">
            No sites generated yet — create one from Templates or a real Lead Search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sites.slice(0, 3).map((s) => (
              <div key={s.id} className="nova-card p-4">
                <p className="font-medium mb-2">{s.business_name || s.name || 'Untitled site'}</p>
                <span className={s.status === 'published' ? 'nova-pill-live' : 'nova-pill-draft'}>
                  {s.status === 'published' ? 'Live' : 'Draft'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-sm font-semibold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {QUICK_ACTIONS.map((a) => (
            <button key={a.to} type="button" onClick={() => navigate(a.to)} className="text-left nova-card p-4 hover:border-nova-accent/30 transition-colors">
              <div className="nova-icon-tile mb-2 text-base">{a.icon}</div>
              <p className="font-medium mb-1">{a.label}</p>
              <p className="text-xs text-nova-text-muted">{a.cost}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
