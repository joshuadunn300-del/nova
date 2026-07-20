import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { searchLeads } from '../lib/api'
import { hasCredits } from '../lib/entitlements'
import DataTable from '../components/DataTable'
import WebsiteStatusBadge from '../components/StatusBadge'

const NICHES = ['Plumbing', 'Roofing', 'HVAC', 'Electrical', 'Landscaping', 'Scaffolding', 'Pest Control', 'Cleaning', 'Pressure Washing']

export default function LeadSearch() {
  const { entitlements } = useOutletContext()
  const [niche, setNiche] = useState('')
  const [location, setLocation] = useState('')
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [searched, setSearched] = useState(false)

  const affordable = hasCredits(entitlements, 'search')

  async function handleSearch(e) {
    e.preventDefault()
    setError('')
    if (!niche.trim() || !location.trim()) {
      setError('Enter both a niche and a location.')
      return
    }
    setBusy(true)
    try {
      const rows = await searchLeads({ niche: niche.trim(), location: location.trim() })
      setResults(rows)
      setSearched(true)
    } catch (err) {
      setError(err.message || 'Search failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="max-w-5xl">
      <h1 className="text-xl font-semibold mb-1">Lead Search</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
        Find local businesses with weak websites — 10 credits per search.
      </p>

      <form onSubmit={handleSearch} className="flex flex-wrap gap-3 mb-4">
        <input
          list="niche-options"
          placeholder="Niche (e.g. plumber)"
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          className="flex-1 min-w-[180px] rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
        />
        <datalist id="niche-options">
          {NICHES.map((n) => <option key={n} value={n} />)}
        </datalist>
        <input
          placeholder="Location (e.g. Austin, TX)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1 min-w-[180px] rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={busy || !affordable}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
        >
          {busy ? 'Searching…' : 'Search'}
        </button>
      </form>

      {!affordable && (
        <div className="mb-4 rounded-md bg-amber-50 dark:bg-amber-900/30 px-3 py-2 text-sm text-amber-700 dark:text-amber-300">
          Not enough credits for a search (10 required).
        </div>
      )}
      {error && (
        <div className="mb-4 rounded-md bg-rose-50 dark:bg-rose-900/30 px-3 py-2 text-sm text-rose-700 dark:text-rose-300">
          {error}
        </div>
      )}

      {searched && (
        <DataTable
          emptyMessage="No businesses matched that search — try a broader niche or location."
          rows={results || []}
          columns={[
            { key: 'business_name', label: 'Business' },
            { key: 'phone', label: 'Phone' },
            { key: 'website', label: 'Website', render: (r) => r.website || '—' },
            { key: 'website_status', label: 'Website status', render: (r) => <WebsiteStatusBadge status={r.website_status} /> },
            { key: 'rating', label: 'Rating', render: (r) => `${r.rating}★ (${r.review_count})` },
            { key: 'maps_url', label: 'Maps', render: (r) => <a href={r.maps_url} target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400">Open</a> },
          ]}
        />
      )}
    </div>
  )
}
