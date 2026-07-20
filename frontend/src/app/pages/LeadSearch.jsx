import { useState } from 'react'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import { generateSite, searchLeads } from '../lib/api'
import { hasCredits } from '../lib/entitlements'
import { isHottest, leadScore, sortByScoreDesc } from '../lib/leadScore'
import DataTable from '../components/DataTable'
import WebsiteStatusBadge from '../components/StatusBadge'

const NICHES = ['Plumbing', 'Roofing', 'HVAC', 'Electrical', 'Landscaping', 'Scaffolding', 'Pest Control', 'Cleaning', 'Pressure Washing']

// Real Base44 Lead entity fields are `name`/`google_rating`/`google_maps_url`, not
// `business_name`/`rating`/`maps_url` (my mock's naming) — found live 2026-07-21 when a
// real Google Places search rendered "—" for every business name and "undefined★" for
// every rating. Guard both shapes rather than picking one, so mock mode keeps working.
const leadName = (l) => l.business_name || l.name || ''
const leadRating = (l) => l.rating ?? l.google_rating
const leadMapsUrl = (l) => l.maps_url || l.google_maps_url || '#'

export default function LeadSearch() {
  const { entitlements, refreshEntitlements } = useOutletContext()
  const { state } = useLocation()
  const navigate = useNavigate()
  const [niche, setNiche] = useState(state?.niche || '')
  const [location, setLocation] = useState('')
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [searched, setSearched] = useState(false)
  const [generatingId, setGeneratingId] = useState(null)

  const affordable = hasCredits(entitlements, 'search')
  const canGenerate = hasCredits(entitlements, 'generateSite')

  async function handleGenerate(lead) {
    const key = lead.place_id || leadMapsUrl(lead)
    setGeneratingId(key)
    setError('')
    try {
      const site = await generateSite({ business_name: leadName(lead), industry: niche, location, phone: lead.phone })
      refreshEntitlements()
      navigate(`/app/designer?id=${site.id}`)
    } catch (err) {
      setError(err.message || 'Site generation failed.')
    } finally {
      setGeneratingId(null)
    }
  }

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
      refreshEntitlements()
    } catch (err) {
      setError(err.message || 'Search failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="max-w-5xl">
      <div className="relative overflow-hidden nova-card nova-kanji-watermark p-8 md:p-10 mb-6">
        <div className="relative">
          <span className="nova-badge-pill mb-3">天 · AI Lead Discovery</span>
          <h1 className="text-xl font-semibold mb-1">Find your next client.</h1>
          <p className="text-sm text-nova-text-muted mb-6">
            Search local businesses by niche and location — 10 credits per search.
          </p>

          <form onSubmit={handleSearch} className="flex flex-wrap gap-3">
            <input
              list="niche-options"
              placeholder="Niche (e.g. plumber)"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="flex-1 min-w-[180px] nova-input-focus rounded-md border border-nova-border bg-transparent px-3 py-2 text-sm"
            />
            <datalist id="niche-options">
              {NICHES.map((n) => <option key={n} value={n} />)}
            </datalist>
            <input
              placeholder="Location (e.g. Austin, TX)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 min-w-[180px] nova-input-focus rounded-md border border-nova-border bg-transparent px-3 py-2 text-sm"
            />
            <button type="submit" disabled={busy || !affordable} className="nova-btn-primary">
              {busy ? 'Searching…' : 'Search'}
            </button>
          </form>
        </div>
      </div>

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
          rows={sortByScoreDesc(results || [])}
          columns={[
            {
              key: 'score',
              label: 'Score',
              render: (r) => (
                <span className={isHottest(r) ? 'inline-flex items-center gap-1 rounded-full bg-nova-accent/15 px-2 py-0.5 font-semibold text-nova-accent' : 'font-semibold'}>
                  {isHottest(r) && '🔥'} {leadScore(r)}
                </span>
              ),
            },
            { key: 'business_name', label: 'Business', render: (r) => leadName(r) || '—' },
            { key: 'phone', label: 'Phone' },
            { key: 'website', label: 'Website', render: (r) => r.website || '—' },
            { key: 'website_status', label: 'Website status', render: (r) => <WebsiteStatusBadge status={r.website_status} /> },
            { key: 'rating', label: 'Rating', render: (r) => `${leadRating(r) ?? '—'}★ (${r.review_count ?? 0})` },
            { key: 'maps_url', label: 'Maps', render: (r) => <a href={leadMapsUrl(r)} target="_blank" rel="noreferrer" className="text-nova-accent">Open</a> },
            {
              key: 'generate',
              label: '',
              render: (r) => {
                const key = r.place_id || leadMapsUrl(r)
                return (
                  <button
                    type="button"
                    disabled={!canGenerate || generatingId === key}
                    onClick={() => handleGenerate(r)}
                    className="text-nova-accent font-medium disabled:opacity-50"
                  >
                    {generatingId === key ? 'Generating…' : 'Generate Site'}
                  </button>
                )
              },
            },
          ]}
        />
      )}
    </div>
  )
}
