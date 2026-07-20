import { useEffect, useState } from 'react'
import { listLeads } from '../lib/api'
import DataTable from '../components/DataTable'
import WebsiteStatusBadge from '../components/StatusBadge'

export default function Leads() {
  const [leads, setLeads] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    listLeads().then(setLeads).catch((err) => setError(err.message || 'Failed to load leads.'))
  }, [])

  return (
    <div className="max-w-5xl">
      <h1 className="text-xl font-semibold mb-1">Leads</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Every business saved from a search.</p>

      {error && (
        <div className="mb-4 rounded-md bg-rose-50 dark:bg-rose-900/30 px-3 py-2 text-sm text-rose-700 dark:text-rose-300">
          {error}
        </div>
      )}

      {leads === null && !error ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">Loading…</p>
      ) : (
        <DataTable
          emptyMessage="No leads yet — run a search from Lead Search."
          rows={leads || []}
          columns={[
            { key: 'business_name', label: 'Business' },
            { key: 'niche', label: 'Niche' },
            { key: 'phone', label: 'Phone' },
            { key: 'website_status', label: 'Website status', render: (r) => <WebsiteStatusBadge status={r.website_status} /> },
            { key: 'rating', label: 'Rating', render: (r) => `${r.rating}★ (${r.review_count})` },
            { key: 'created_date', label: 'Found' },
          ]}
        />
      )}
    </div>
  )
}
