import AddSectionMenu from './AddSectionMenu.jsx';

const DEVICES = ['desktop', 'tablet', 'mobile'];

export default function Toolbar({
  device, setDevice, zoom, setZoom,
  canUndo, canRedo, onUndo, onRedo,
  saveStatus, onSave, published, onPublish, onUnpublish, onRepublish,
  onAddSection, activeTab, setActiveTab,
}) {
  return (
    <div className="editor-toolbar" data-testid="toolbar">
      <div className="toolbar-group">
        {DEVICES.map((d) => (
          <button key={d} type="button" className={device === d ? 'active' : ''} data-testid={`device-${d}`} onClick={() => setDevice(d)}>
            {d}
          </button>
        ))}
      </div>

      <div className="toolbar-group">
        <button type="button" data-testid="zoom-out" onClick={() => setZoom((z) => Math.max(0.25, +(z - 0.1).toFixed(2)))}>−</button>
        <span data-testid="zoom-value">{Math.round(zoom * 100)}%</span>
        <button type="button" data-testid="zoom-in" onClick={() => setZoom((z) => Math.min(2, +(z + 0.1).toFixed(2)))}>+</button>
      </div>

      <div className="toolbar-group">
        <button type="button" data-testid="undo-btn" disabled={!canUndo} onClick={onUndo}>Undo</button>
        <button type="button" data-testid="redo-btn" disabled={!canRedo} onClick={onRedo}>Redo</button>
      </div>

      <div className="toolbar-group">
        <button type="button" data-testid="save-btn" onClick={onSave}>
          {saveStatus === 'saved' ? 'Saved' : saveStatus === 'dirty' ? 'Save*' : 'Save'}
        </button>
        {!published && <button type="button" data-testid="publish-btn" onClick={onPublish}>Publish</button>}
        {published && <button type="button" data-testid="unpublish-btn" onClick={onUnpublish}>Unpublish</button>}
        {published && <button type="button" data-testid="republish-btn" onClick={onRepublish}>Republish</button>}
      </div>

      <AddSectionMenu onAdd={onAddSection} />

      <div className="toolbar-group tabs">
        {['design', 'settings', 'submissions'].map((tab) => (
          <button key={tab} type="button" className={activeTab === tab ? 'active' : ''} data-testid={`tab-${tab}`} onClick={() => setActiveTab(activeTab === tab ? null : tab)}>
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
