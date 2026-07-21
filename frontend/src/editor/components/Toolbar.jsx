import { Paintbrush, Settings as SettingsIcon, Inbox } from 'lucide-react';

const TAB_ICON = { design: Paintbrush, settings: SettingsIcon, submissions: Inbox };
const DEVICES = ['desktop', 'tablet', 'mobile'];
const DEVICE_ICON = { desktop: '▭', tablet: '▯', mobile: '▮' }; // flat geometric glyphs, not colored emoji — see BUILD-LOG icon-language note

// Live Tenji's toolbar has no "+ Add section" control (reference/tenji-editor.png) — that
// lives only in the sidebar's "Sections" header (see SectionList.jsx). Kept out of here.
export default function Toolbar({
  siteName, device, setDevice, zoom, setZoom,
  canUndo, canRedo, onUndo, onRedo,
  saveStatus, saveError, onSave, published, publishedUrl, publishError, onPublish, onUnpublish, onRepublish,
  activeTab, setActiveTab,
}) {
  return (
    <div className="editor-toolbar" data-testid="toolbar">
      <div className="toolbar-group toolbar-identity">
        <span className="toolbar-back" title="Back">←</span>
        <span className="toolbar-site-name" data-testid="toolbar-site-name">{siteName || 'Untitled Site'}</span>
        <span className={`status-pill ${published ? 'status-published' : 'status-draft'}`} data-testid="status-pill">
          {published ? 'Published' : 'Draft'}
        </span>
        {published && publishedUrl && (
          <a href={publishedUrl} target="_blank" rel="noreferrer" className="toolbar-live-link" data-testid="published-url">
            View live ↗
          </a>
        )}
        {publishError && (
          <span className="toolbar-saved-text saved-text-error" data-testid="publish-error" title={publishError}>
            Publish failed
          </span>
        )}
        <span className={`toolbar-saved-text${saveError ? ' saved-text-error' : ''}`} data-testid="saved-text" title={saveError || undefined}>
          {saveError ? 'Save failed — kept locally' : saveStatus === 'dirty' ? 'Unsaved changes' : 'All changes saved'}
        </span>
      </div>

      <div className="toolbar-tabs">
        {['design', 'settings', 'submissions'].map((tab) => {
          const Icon = TAB_ICON[tab];
          return (
            <button key={tab} type="button" className={`toolbar-tab${activeTab === tab ? ' toolbar-tab-active' : ''}`} data-testid={`tab-${tab}`} onClick={() => setActiveTab(tab)}>
              <Icon size={14} />
              {tab[0].toUpperCase() + tab.slice(1)}
            </button>
          );
        })}
      </div>

      <div className="toolbar-group">
        {DEVICES.map((d) => (
          <button key={d} type="button" className={device === d ? 'active' : ''} title={d} data-testid={`device-${d}`} onClick={() => setDevice(d)}>
            {DEVICE_ICON[d]}
          </button>
        ))}
      </div>

      <div className="toolbar-group">
        <button type="button" data-testid="zoom-out" onClick={() => setZoom((z) => Math.max(0.25, +(z - 0.1).toFixed(2)))}>−</button>
        <span data-testid="zoom-value">{Math.round(zoom * 100)}%</span>
        <button type="button" data-testid="zoom-in" onClick={() => setZoom((z) => Math.min(2, +(z + 0.1).toFixed(2)))}>+</button>
      </div>

      <div className="toolbar-group">
        <button type="button" title="Undo" data-testid="undo-btn" disabled={!canUndo} onClick={onUndo}>↶</button>
        <button type="button" title="Redo" data-testid="redo-btn" disabled={!canRedo} onClick={onRedo}>↷</button>
      </div>

      <div className="toolbar-group toolbar-actions">
        <button type="button" title="Preview">Preview</button>
        <button type="button" title="Save" data-testid="save-btn" onClick={onSave}>Save</button>
        {published ? (
          <>
            <button type="button" data-testid="unpublish-btn" onClick={onUnpublish}>Unpublish</button>
            <button type="button" className="republish-btn" data-testid="republish-btn" onClick={onRepublish}>🚀 Republish</button>
          </>
        ) : (
          <button type="button" className="republish-btn" data-testid="publish-btn" onClick={onPublish}>🚀 Publish</button>
        )}
      </div>
    </div>
  );
}
