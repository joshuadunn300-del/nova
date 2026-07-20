import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TEMPLATES as FALLBACK_TEMPLATES } from '../lib/templateCatalog'
import { createSiteFromTemplate, listSiteTemplates } from '../lib/api'

const ACCENTS = {
  TRADES: 'bg-amber-500', 'HOME SERVICES': 'bg-sky-500', OUTDOOR: 'bg-emerald-500',
  AUTOMOTIVE: 'bg-slate-500', HEALTH: 'bg-rose-500', 'HEALTH & FITNESS': 'bg-lime-500',
  BEAUTY: 'bg-fuchsia-500', HOSPITALITY: 'bg-orange-500', CUSTOM: 'bg-nova-accent',
}

// Real seeded SiteTemplate rows only have `niche` (a slug, e.g. "carpet-cleaning") +
// `content_json` — no display name/category/desc fields. Derive a label from the slug
// and pull a description straight out of the real hero copy, so the card shows real
// seeded content rather than invented text.
const label = (t) => (t.category ? t.niche : t.niche.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()))
const desc = (t) => {
  if (t.desc) return t.desc
  const hero = t.content_json?.sections?.find((s) => s.type === 'hero')?.props
  return hero?.subtext || hero?.headline || `Premium ${label(t).toLowerCase()} website, ready to customise in seconds.`
}

export default function Templates() {
  const navigate = useNavigate()
  const [templates, setTemplates] = useState(FALLBACK_TEMPLATES)
  const [search, setSearch] = useState('')
  const [activeNiche, setActiveNiche] = useState(null)
  const [form, setForm] = useState({ business_name: '', phone: '', location: '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    listSiteTemplates().then((rows) => {
      if (rows && rows.length) setTemplates(rows)
    })
  }, [])

  const filtered = templates.filter((t) => label(t).toLowerCase().includes(search.toLowerCase()))

  async function handleUseTemplate(e) {
    e.preventDefault()
    if (!form.business_name.trim()) return
    setBusy(true)
    setError('')
    try {
      const site = await createSiteFromTemplate({ niche: activeNiche, ...form })
      navigate(`/app/designer?id=${site.id}`)
    } catch (err) {
      setError(err.message || 'Failed to create site from template.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <p className="nova-eyebrow mb-1">STUDIO</p>
      <div className="flex items-start justify-between mb-1">
        <h1 className="text-xl font-semibold">Templates</h1>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search templates..."
          className="nova-input-focus rounded-md border border-nova-border bg-transparent px-3 py-1.5 text-sm"
        />
      </div>
      <p className="text-sm text-nova-text-muted mb-6">
        Conversion-focused website templates for every local business niche. Pick one and import a lead to auto-fill it.
      </p>

      {activeNiche && (
        <form onSubmit={handleUseTemplate} className="mb-6 nova-card p-4">
          <p className="text-sm font-medium mb-3">
            New {activeNiche.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())} site — free, no credits used
          </p>
          {error && (
            <div className="mb-3 rounded-md bg-rose-50 dark:bg-rose-900/30 px-3 py-2 text-sm text-rose-700 dark:text-rose-300">
              {error}
            </div>
          )}
          <div className="flex flex-wrap gap-3 mb-3">
            <input
              placeholder="Business name"
              value={form.business_name}
              onChange={(e) => setForm((f) => ({ ...f, business_name: e.target.value }))}
              className="flex-1 min-w-[160px] nova-input-focus rounded-md border border-nova-border bg-transparent px-3 py-2 text-sm"
            />
            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="flex-1 min-w-[160px] nova-input-focus rounded-md border border-nova-border bg-transparent px-3 py-2 text-sm"
            />
            <input
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              className="flex-1 min-w-[160px] nova-input-focus rounded-md border border-nova-border bg-transparent px-3 py-2 text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <button type="submit" disabled={busy} className="nova-btn-primary disabled:opacity-50">
              {busy ? 'Creating…' : 'Create site'}
            </button>
            <button type="button" onClick={() => setActiveNiche(null)} className="text-sm text-nova-text-muted">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="nova-card overflow-hidden">
          <div className={`h-1.5 ${ACCENTS.CUSTOM}`} />
          <div className="p-4">
            <div className="text-lg mb-1">✨</div>
            <p className="text-xs font-semibold text-nova-accent mb-1">CUSTOM</p>
            <h3 className="font-medium mb-1">Create Your Own</h3>
            <p className="text-sm text-nova-text-muted mb-3">
              Start from a fully editable blank template, perfect for any niche we don't list yet. Customize every section.
            </p>
            <button type="button" onClick={() => setActiveNiche('custom')} className="text-sm font-medium text-nova-accent">
              Use Template ↗
            </button>
          </div>
        </div>

        {filtered.map((t) => (
          <div key={t.id || t.niche} className="nova-card overflow-hidden">
            <div className={`h-1.5 ${ACCENTS[t.category] || 'bg-nova-accent'}`} />
            <div className="p-4">
              {t.category && <p className="text-xs font-semibold text-nova-text-muted mb-1">{t.category}</p>}
              <h3 className="font-medium mb-1">{label(t)}</h3>
              <p className="text-sm text-nova-text-muted mb-3 line-clamp-2">{desc(t)}</p>
              <button type="button" onClick={() => setActiveNiche(t.niche)} className="text-sm font-medium text-nova-accent">
                Use Template ↗
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
