export default function SettingsPanel({ seo, domain, onEditMeta }) {
  return (
    <div className="side-panel" data-testid="settings-panel">
      <h3>Settings</h3>
      <label>
        SEO title
        <input type="text" value={seo?.title || ''} onChange={(e) => onEditMeta('seo.title', e.target.value)} />
      </label>
      <label>
        SEO description
        <textarea value={seo?.description || ''} onChange={(e) => onEditMeta('seo.description', e.target.value)} />
      </label>
      <label>
        Domain
        <input type="text" placeholder="preview URL until a domain is connected" value={domain || ''} onChange={(e) => onEditMeta('domain', e.target.value)} />
      </label>
    </div>
  );
}
