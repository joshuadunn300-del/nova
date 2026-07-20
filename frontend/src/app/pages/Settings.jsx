import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { getSettings, updateSettings } from '../lib/api'
import { PALETTE_PRESETS } from '../lib/mockData'
import { planOf } from '../lib/entitlements'

export default function Settings() {
  const { entitlements } = useOutletContext()
  const [settings, setSettings] = useState(null)
  const [saved, setSaved] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    getSettings().then(setSettings)
  }, [])

  function setField(key, value) {
    setSettings((s) => ({ ...s, [key]: value }))
    setSaved(false)
  }

  async function handleSave(e) {
    e.preventDefault()
    setBusy(true)
    try {
      await updateSettings(settings)
      setSaved(true)
    } finally {
      setBusy(false)
    }
  }

  if (!settings) return <p className="text-sm text-slate-500 dark:text-slate-400">Loading…</p>

  const plan = planOf(entitlements)
  const activeColors = settings.palette_preset === 'custom'
    ? { primary: settings.custom_primary || '#4f46e5', secondary: settings.custom_secondary || '#111827' }
    : PALETTE_PRESETS[settings.palette_preset] || PALETTE_PRESETS.indigo

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-xl font-semibold mb-1">Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">White-label your agency's brand and check plan usage.</p>
      </div>

      <section className="rounded-lg border border-slate-200 dark:border-slate-800 p-5">
        <h2 className="text-sm font-semibold mb-3">Plan & credits</h2>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <dt className="text-slate-500 dark:text-slate-400">Plan</dt>
          <dd className="text-right font-medium">{plan.label}</dd>
          <dt className="text-slate-500 dark:text-slate-400">Credits remaining</dt>
          <dd className="text-right font-medium">{entitlements?.credits?.toLocaleString() ?? '—'} / {plan.monthlyCredits.toLocaleString()}</dd>
          <dt className="text-slate-500 dark:text-slate-400">Resets on</dt>
          <dd className="text-right font-medium">{entitlements?.credits_reset_at || '—'}</dd>
          <dt className="text-slate-500 dark:text-slate-400">Scripts / Proposals</dt>
          <dd className="text-right font-medium">{plan.scripts ? 'Included' : 'Upgrade to Pro'}</dd>
        </dl>
      </section>

      <form onSubmit={handleSave} className="rounded-lg border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <h2 className="text-sm font-semibold">White-label branding</h2>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="brand_name">Agency brand name</label>
          <input
            id="brand_name"
            value={settings.brand_name}
            onChange={(e) => setField('brand_name', e.target.value)}
            className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="brand_description">Agency description</label>
          <textarea
            id="brand_description"
            rows={3}
            value={settings.brand_description}
            onChange={(e) => setField('brand_description', e.target.value)}
            className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) setField('logo_url', URL.createObjectURL(file))
            }}
            className="text-sm"
          />
          {settings.logo_url && (
            <img src={settings.logo_url} alt="Agency logo preview" className="mt-2 h-12 w-12 rounded object-cover" />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Brand colour palette</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {Object.entries(PALETTE_PRESETS).map(([key, colors]) => (
              <button
                type="button"
                key={key}
                onClick={() => setField('palette_preset', key)}
                className={`h-9 w-9 rounded-full border-2 ${settings.palette_preset === key ? 'border-slate-900 dark:border-white' : 'border-transparent'}`}
                style={{ background: `linear-gradient(135deg, ${colors.primary} 50%, ${colors.secondary} 50%)` }}
                aria-label={`${key} preset`}
                title={key}
              />
            ))}
            <button
              type="button"
              onClick={() => setField('palette_preset', 'custom')}
              className={`h-9 px-3 rounded-full border text-xs font-medium ${settings.palette_preset === 'custom' ? 'border-slate-900 dark:border-white' : 'border-slate-300 dark:border-slate-700'}`}
            >
              Custom
            </button>
          </div>
          {settings.palette_preset === 'custom' && (
            <div className="flex gap-4">
              <label className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                Primary
                <input type="color" value={settings.custom_primary || '#4f46e5'} onChange={(e) => setField('custom_primary', e.target.value)} />
              </label>
              <label className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                Secondary
                <input type="color" value={settings.custom_secondary || '#111827'} onChange={(e) => setField('custom_secondary', e.target.value)} />
              </label>
            </div>
          )}
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            Preview:
            <span className="h-4 w-4 rounded-full" style={{ background: activeColors.primary }} />
            <span className="h-4 w-4 rounded-full" style={{ background: activeColors.secondary }} />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={busy}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
          >
            {busy ? 'Saving…' : 'Save changes'}
          </button>
          {saved && <span className="text-sm text-emerald-600 dark:text-emerald-400">Saved.</span>}
        </div>
      </form>
    </div>
  )
}
