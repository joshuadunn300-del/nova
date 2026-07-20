import { useEffect, useState } from 'react'
import { listClients } from '../lib/api'

export default function Revenue() {
  const [clients, setClients] = useState([])

  useEffect(() => {
    listClients().then(setClients)
  }, [])

  // Real Client field is `monthly_value`, not `mrr`.
  const active = clients.filter((c) => c.status === 'active')
  const totalMrr = active.reduce((sum, c) => sum + (c.monthly_value ?? c.mrr ?? 0), 0)
  const avgValue = active.length ? Math.round(totalMrr / active.length) : 0

  const STATS = [
    { label: 'TOTAL MRR', value: `$${totalMrr}`, icon: '$', highlight: true },
    { label: 'SETUP FEES', value: '$0', icon: '📈' },
    { label: 'CLOSED CLIENTS', value: active.length },
    { label: 'AVG CLIENT VALUE', value: `$${avgValue}` },
    { label: 'CONVERSION', value: '0%' },
    { label: 'PIPELINE VALUE', value: '$0' },
  ]

  return (
    <div>
      <p className="nova-eyebrow mb-1">AGENCY</p>
      <h1 className="text-xl font-semibold mb-1">Revenue Tracker</h1>
      <p className="text-sm text-nova-text-muted mb-6">Your agency's money at a glance.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {STATS.map((s) => (
          <div
            key={s.label}
            className={`rounded-nova border p-4 ${
              s.highlight
                ? 'border-nova-accent/40 bg-nova-accent/10'
                : 'border-nova-border'
            }`}
          >
            <p className="nova-eyebrow mb-1">{s.label}</p>
            <p className="text-2xl font-semibold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="nova-card p-4">
          <p className="text-sm font-medium mb-3">MRR Over Time</p>
          <div className="flex items-end justify-between h-32 text-xs text-nova-text-muted">
            {['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((m) => (
              <div key={m} className="flex flex-col items-center gap-1">
                <div className="w-6 bg-nova-surface-hover rounded-t" style={{ height: '4px' }} />
                <span>{m}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="nova-card p-4">
          <p className="text-sm font-medium mb-2">
            Clients on Retainer <span className="rounded-full bg-nova-surface-hover px-2 py-0.5 text-xs">{active.length}</span>
          </p>
          {active.length === 0 && <p className="text-sm text-nova-text-muted">No active clients yet.</p>}
        </div>
      </div>
    </div>
  )
}
