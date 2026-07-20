import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { listSites, duplicateSite, deleteSite } from './api'

// Parity target: 09 - Resources/UI-Reference/client-sites.md.
// Simplification: thumbnails are a themed placeholder block (business name +
// niche), not a live scaled render of the site — wiring a real content_json
// preview here depends on T2's renderer accepting an id/site lookup rather
// than only the 3 fixed fixtures. Noted in BUILD-LOG, not hidden.
// Recolored to T2's dojo/pink theme tokens (frontend/src/index.css `@theme`).

// Real GeneratedSite fields are business_name/industry/status('draft'|'published')/
// subdomain, not this file's original mock shape (title/niche/status:'live'/slug) —
// found live 2026-07-21 (Josh: sites exist and look great but nobody can find them,
// because this card was reading fields that don't exist on the real record, so
// business name showed blank and the live-site link never rendered at all).
const siteName = (s) => s.business_name || s.title || 'Untitled site'
const siteNiche = (s) => s.industry || s.niche || ''
const isPublished = (s) => s.status === 'published' || s.status === 'live'
// Real serve endpoint, confirmed working by T1 (BUILD-LOG 2026-07-21): the Base44 app
// proxies /functions/* on its own public domain, injecting the dispatcher secret
// automatically — no auth needed client-side, just the real public app URL.
const BASE44_APP_URL = 'https://icy-nova-growth-lab.base44.app'
const liveUrl = (s) => (isPublished(s) && s.subdomain ? `${BASE44_APP_URL}/functions/serveSite?subdomain=${s.subdomain}` : null)

function SiteCard({ site, onDuplicate, onDelete }) {
  const live = liveUrl(site)
  const published = isPublished(site)
  return (
    <div className="nova-card overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.06] bg-black/20">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-2 text-xs text-nova-text-muted">draft preview</span>
      </div>
      <div className="relative h-32 bg-gradient-to-br from-nova-accent/20 to-nova-bg flex items-center justify-center">
        <span className={published ? 'absolute top-2 right-2 nova-pill-live' : 'absolute top-2 right-2 nova-pill-draft'}>
          {published ? 'Live' : 'Draft'}
        </span>
        <span className="text-sm font-medium text-nova-text">{siteName(site)}</span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold font-nova-heading text-nova-text">{siteName(site)}</h3>
        <p className="mt-0.5 text-xs text-nova-text-muted">{siteNiche(site)}</p>

        {live ? (
          <a
            href={live}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex items-center justify-center gap-1.5 nova-btn-primary w-full"
          >
            View live ↗
          </a>
        ) : (
          <p className="mt-3 text-center text-xs text-nova-text-muted nova-card border-dashed py-1.5">
            Not published yet
          </p>
        )}

        <div className="mt-2 grid grid-cols-3 gap-2">
          <Link
            to={`/app/designer?id=${site.id}`}
            className="nova-btn-secondary text-center !px-2 !py-1.5 text-xs"
          >
            Open Designer
          </Link>
          <button
            type="button"
            onClick={() => onDuplicate(site.id)}
            className="nova-btn-secondary !px-2 !py-1.5 text-xs"
          >
            Duplicate
          </button>
          <button
            type="button"
            onClick={() => onDelete(site.id)}
            className="nova-btn-secondary !px-2 !py-1.5 text-xs text-rose-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ClientSites() {
  const navigate = useNavigate()
  const [sites, setSites] = useState(null)
  const [error, setError] = useState('')

  const load = () => listSites().then(setSites).catch((err) => setError(err.message || 'Failed to load sites.'))
  useEffect(() => { load() }, [])

  const handleDuplicate = async (id) => {
    if (sites.length >= 3) return // conservative client-side mirror of the 3-site trial cap; server enforces the real gate
    await duplicateSite(id)
    load()
  }
  const handleDelete = async (id) => {
    await deleteSite(id)
    load()
  }

  const liveCount = sites?.filter(isPublished).length ?? 0

  return (
    <div>
      <div className="flex items-start justify-between mb-2">
        <div>
          <h1 className="text-xl font-semibold font-nova-heading text-nova-text mb-1">Client Sites</h1>
          <p className="text-sm text-nova-text-muted">
            All generated and published websites for your leads and clients.
          </p>
        </div>
        <button type="button" onClick={() => navigate('/app/leads')} className="shrink-0 nova-btn-primary">
          Generate New Site
        </button>
      </div>

      {sites && (
        <p className="mb-6 text-sm text-nova-text-muted">
          ● {liveCount} of {sites.length} published
        </p>
      )}

      {error && (
        <div className="rounded-md bg-rose-900/30 px-3 py-2 text-sm text-rose-300">
          {error}
        </div>
      )}
      {!error && sites === null && <p className="text-sm text-nova-text-muted">Loading…</p>}
      {!error && sites && sites.length === 0 && (
        <p className="text-sm text-nova-text-muted">No sites yet — generate your first one.</p>
      )}
      {!error && sites && sites.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sites.map((site) => (
            <SiteCard key={site.id} site={site} onDuplicate={handleDuplicate} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}
