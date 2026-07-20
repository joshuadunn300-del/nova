import { useCallback, useState } from 'react';
import { useEditorState } from './state/useEditorState.js';
import PreviewFrame from './components/PreviewFrame.jsx';
import Toolbar from './components/Toolbar.jsx';
import SectionList from './components/SectionList.jsx';
import DesignPanel from './components/DesignPanel.jsx';
import SettingsPanel from './components/SettingsPanel.jsx';
import SubmissionsPanel from './components/SubmissionsPanel.jsx';
import sampleDoc from './fixtures/sample.content.json';
import './editor.css';

const BG_PRESETS = ['#15171f', '#9D174D', '#0f766e', '#1d4ed8', '#7c2d12', '#111827'];

// URL: /app/Designer?siteId={id}. siteId read from the query string so it works whether
// this is mounted under react-router (integration) or the standalone dev harness.
function getSiteId() {
  if (typeof window === 'undefined') return 'local-preview';
  return new URLSearchParams(window.location.search).get('siteId') || 'local-preview';
}

export default function Designer({ initialDoc = sampleDoc }) {
  const siteId = getSiteId();
  const editor = useEditorState(siteId, initialDoc);
  const [device, setDevice] = useState('desktop');
  const [zoom, setZoom] = useState(1);
  const [activeTab, setActiveTab] = useState(null);
  const [bgPickerPath, setBgPickerPath] = useState(null);

  const onBgClick = useCallback((path) => setBgPickerPath(path), []);
  const pickBg = useCallback((color) => {
    if (bgPickerPath) editor.editText(bgPickerPath, color);
    setBgPickerPath(null);
  }, [bgPickerPath, editor]);

  if (!editor.doc.sections || editor.doc.sections.length === 0) {
    return (
      <div className="designer-empty" data-testid="designer-empty">
        <p>This site has no sections.</p>
        <button type="button" onClick={() => editor.add('hero')}>Add a hero section to get started</button>
      </div>
    );
  }

  return (
    <div className="designer-root" data-testid="designer-root">
      <Toolbar
        device={device} setDevice={setDevice}
        zoom={zoom} setZoom={setZoom}
        canUndo={editor.canUndo} canRedo={editor.canRedo}
        onUndo={editor.undo} onRedo={editor.redo}
        saveStatus={editor.saveStatus} onSave={editor.save}
        published={editor.published} onPublish={editor.publish} onUnpublish={editor.unpublish} onRepublish={editor.republish}
        onAddSection={(type) => editor.add(type)}
        activeTab={activeTab} setActiveTab={setActiveTab}
      />

      <div className="designer-body">
        <aside className="designer-sidebar">
          <SectionList
            sections={editor.doc.sections}
            onMove={editor.move}
            onDuplicate={editor.duplicate}
            onDelete={editor.remove}
            onToggleHidden={editor.toggleHidden}
          />
        </aside>

        <main className="designer-canvas">
          <PreviewFrame
            doc={editor.doc}
            renderVersion={editor.renderVersion}
            device={device}
            zoom={zoom}
            onEdit={editor.editText}
            onBgClick={onBgClick}
          />
        </main>

        {activeTab === 'design' && (
          <DesignPanel theme={editor.doc.theme || {}} onChange={editor.editTheme} />
        )}
        {activeTab === 'settings' && (
          <SettingsPanel seo={editor.doc.seo} domain={editor.doc.domain} onEditMeta={editor.editMeta} />
        )}
        {activeTab === 'submissions' && <SubmissionsPanel />}
      </div>

      {bgPickerPath && (
        <div className="bg-picker-overlay" data-testid="bg-picker" onClick={() => setBgPickerPath(null)}>
          <div className="bg-picker" onClick={(e) => e.stopPropagation()}>
            <h4>Background color</h4>
            <div className="swatches">
              {BG_PRESETS.map((c) => (
                <button key={c} type="button" style={{ background: c }} onClick={() => pickBg(c)} />
              ))}
            </div>
            <input type="color" onChange={(e) => pickBg(e.target.value)} />
          </div>
        </div>
      )}
    </div>
  );
}
