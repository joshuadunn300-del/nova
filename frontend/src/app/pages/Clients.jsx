import { useEffect, useState } from 'react'
import { listClients } from '../lib/api'
import DataTable from '../components/DataTable'

const STATUS_STYLE = {
  active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  onboarding: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  churned: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
}

export default function Clients() {
  const [clients, setClients] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    listClients().then(setClients).catch((err) => setError(err.message || 'Failed to load clients.'))
  }, [])

  return (
    <div className="max-w-5xl">
      <h1 className="text-xl font-semibold mb-1">Clients</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Businesses you're actively managing.</p>

      {error && (
        <div className="mb-4 rounded-md bg-rose-50 dark:bg-rose-900/30 px-3 py-2 text-sm text-rose-700 dark:text-rose-300">
          {error}
        </div>
      )}

      {clients === null && !error ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">Loading…</p>
      ) : (
        <DataTable
          emptyMessage="No clients yet — convert a lead once they sign."
          rows={clients || []}
          columns={[
            { key: 'business_name', label: 'Business' },
            { key: 'contact_name', label: 'Contact' },
            { key: 'email', label: 'Email' },
            {
              key: 'status',
              label: 'Status',
              render: (r) => (
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLE[r.status] || STATUS_STYLE.churned}`}>
                  {r.status}
                </span>
              ),
            },
            { key: 'mrr', label: 'MRR', render: (r) => `$${r.mrr}/mo` },
          ]}
        />
      )}
    </div>
  )
}
