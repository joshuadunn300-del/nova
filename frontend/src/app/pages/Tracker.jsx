import { useEffect, useState } from 'react'
import { listLeads, updateLead } from '../lib/api'
import { isHottest, leadScore, sortByScoreDesc } from '../lib/leadScore'

// Real Base44 Lead entity field is `name`; mock data used `business_name` — guard both.
const leadName = (l) => l.business_name || l.name || ''

// Per UI-Reference/tracker.md: 5-column kanban, drag-and-drop, colored top border per column.
// Real Lead field is `status` (enum new/contacted/demo_sent/closed/lost), not `stage` — and
// Lead has no `mrr` field at all (that's a Client concept). Columns now match the real
// pipeline exactly so filtering/counting/moving actually reflects real records.
const COLUMNS = [
  { key: 'new', label: 'NEW', border: 'border-t-nova-border' },
  { key: 'contacted', label: 'CONTACTED', border: 'border-t-blue-500' },
  { key: 'demo_sent', label: 'DEMO SENT', border: 'border-t-pink-500' },
  { key: 'closed', label: 'CLOSED', border: 'border-t-emerald-500' },
  { key: 'lost', label: 'LOST', border: 'border-t-slate-500' },
]

export default function Tracker() {
  const [leads, setLeads] = useState([])
  const [search, setSearch] = useState('')
  const [dragId, setDragId] = useState(null)

  useEffect(() => {
    listLeads().then((rows) => setLeads(rows.map((r) => ({ ...r, status: r.status || 'new' }))))
  }, [])

  const filtered = (leads || []).filter((l) => l && (leadName(l) || '').toLowerCase().includes((search || '').toLowerCase()))
  // Lead has no revenue field — "closed" count is the only real signal available here.
  const closedCount = (leads || []).filter((l) => l && l.status === 'closed').length

  function moveLead(id, status) {
    const prevStatus = leads.find((l) => l.id === id)?.status
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)))
    // Optimistic drag; revert only if the backend write actually fails.
    updateLead(id, { status }).catch(() => {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: prevStatus } : l)))
    })
  }

  return (
    <div>
      <p className="nova-eyebrow mb-1">PIPELINE</p>
      <div className="flex items-start justify-between mb-1">
        <h1 className="text-xl font-semibold">Lead Tracker</h1>
        <div className="flex items-center gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="nova-input-focus rounded-md border border-nova-border bg-transparent px-3 py-1.5 text-sm"
          />
          <button type="button" className="nova-btn-primary">
            ＋ Add Lead
          </button>
        </div>
      </div>
      <p className="text-sm text-nova-text-muted mb-6">
        {closedCount} closed · {leads.length} leads in pipeline
      </p>

      <div className="grid grid-cols-5 gap-3">
        {COLUMNS.map((col) => {
          const rows = sortByScoreDesc(filtered.filter((l) => l.status === col.key))
          return (
            <div
              key={col.key}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => dragId && moveLead(dragId, col.key)}
              className={`rounded-nova border-t-4 ${col.border} border-x border-b border-nova-border bg-nova-surface min-h-[220px]`}
            >
              <div className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-nova-text-muted">
                <span>{col.label}</span>
                <span className="rounded-full bg-nova-surface-hover px-1.5">{rows.length}</span>
              </div>
              <div className="px-2 pb-2 space-y-2">
                {rows.length === 0 ? (
                  <div className="text-center text-xs text-nova-text-muted py-6">$<br />Drop a lead here</div>
                ) : (
                  rows.map((lead) => (
                    <div
                      key={lead.id}
                      draggable
                      onDragStart={() => setDragId(lead.id)}
                      className={isHottest(lead) ? 'rounded-md border border-nova-accent/40 bg-nova-accent/10 px-2 py-2 text-xs cursor-grab' : 'rounded-md border border-nova-border bg-nova-bg px-2 py-2 text-xs cursor-grab'}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span>{leadName(lead) || '(unnamed lead)'}</span>
                        <span className={isHottest(lead) ? 'shrink-0 font-semibold text-nova-accent' : 'shrink-0 font-semibold text-nova-text-muted'}>
                          {isHottest(lead) && '🔥'} {leadScore(lead)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
