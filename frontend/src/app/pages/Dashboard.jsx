import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { getSession } from '../lib/auth'
import { listLeads, listClients, listTasks } from '../lib/api'
import { listSites } from '../../tools/api'
import { planOf } from '../lib/entitlements'
import samurai from '../../assets/samurai.png'

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

// Petal positions/timing from the real decompiled Dashboard (reference/tenji-frontend-components.js).
const PETALS = [
  { l: '62%', s: 7, d: 11, delay: 0 },
  { l: '74%', s: 5, d: 14, delay: 2.5 },
  { l: '84%', s: 8, d: 12, delay: 1.2 },
  { l: '92%', s: 5, d: 15, delay: 4 },
  { l: '68%', s: 6, d: 13, delay: 5.5 },
]

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
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero — from the real decompiled Dashboard component (reference/tenji-frontend-components.js).
          framer-motion entrance/shimmer animations aren't ported (library isn't installed here),
          everything else — glass-panel, grid-drift, falling petals, kanji watermark, badge pill,
          the real samurai illustration with its exact blend/filter/mask recipe — is. */}
      <div className="relative overflow-hidden rounded-3xl glass-panel border border-primary/20 p-8 md:p-12">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -inset-[60px] opacity-[0.04] animate-grid-drift-slow will-change-transform"
            style={{
              backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          {PETALS.map((p, i) => (
            <span
              key={i}
              className="absolute rounded-[50%_0_50%_0] bg-[radial-gradient(ellipse_at_30%_30%,hsl(335_85%_60%),transparent)]"
              style={{
                left: p.l,
                top: '-14px',
                width: p.s,
                height: p.s,
                opacity: 0.5,
                animation: `dash-petal ${p.d}s linear ${p.delay}s infinite`,
                willChange: 'transform, opacity',
              }}
            />
          ))}
        </div>

        {/* Real Tenji samurai illustration — exact blend/filter/mask from the decompiled JSX. */}
        <img
          src={samurai}
          alt=""
          aria-hidden="true"
          className="absolute right-0 bottom-0 w-[280px] md:w-[360px] h-auto pointer-events-none select-none mix-blend-screen"
          style={{
            filter: 'saturate(0.55) brightness(0.85)',
            maskImage: 'radial-gradient(ellipse 62% 68% at 45% 48%, black 38%, transparent 74%)',
            WebkitMaskImage: 'radial-gradient(ellipse 62% 68% at 45% 48%, black 38%, transparent 74%)',
          }}
        />

        <span className="absolute top-6 right-8 font-display text-7xl text-primary/10 select-none hidden md:block z-[2]">
          天
        </span>

        <div className="relative">
          <span className="relative z-10 inline-block mb-4 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-xs text-accent font-medium">
            天 · Nova
          </span>
          <h1 className="relative z-10 font-display text-3xl md:text-5xl font-semibold tracking-tight">
            {greeting()}, <span className="animated-gradient-text">{session?.name || 'there'}</span>.
          </h1>
          <p className="relative z-10 mt-3 text-muted-foreground max-w-xl">
            Your agency command center is ready. Search a niche, generate a mockup, write the pitch, and track the deal.
          </p>
          <div className="relative z-10 mt-7 flex flex-wrap gap-3">
            <button type="button" onClick={() => navigate('/app/leads')} className="nova-btn-primary nova-btn-sheen h-12 px-6">
              🔍 Find New Clients →
            </button>
            <button type="button" onClick={() => navigate('/app/sites')} className="inline-flex items-center justify-center px-6 py-3 rounded-xl glass-panel font-medium hover:border-primary/40 transition-colors h-12">
              Create Client Site
            </button>
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-accent mb-3">Performance</p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {STATS.map((s) => (
            <div key={s.label} className={`nova-stat-card ${s.highlight ? 'nova-card-active' : ''}`}>
              <div className="nova-icon-tile mb-3 text-base">{s.icon}</div>
              <p className="nova-eyebrow mb-1">{s.label}</p>
              <p className="text-xl font-semibold">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
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

      <div className="pt-4">
        <p className="text-xs uppercase tracking-[0.2em] text-accent mb-4">Tools</p>
        <h2 className="font-display text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
