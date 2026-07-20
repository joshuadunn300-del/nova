import { useEffect, useMemo, useRef } from 'react';
import { renderDocument } from '../sections/tempRenderer.js';

const DEVICE_WIDTH = { desktop: '100%', tablet: '768px', mobile: '390px' };

export default function PreviewFrame({ doc, renderVersion, device, zoom, onEdit, onBgClick }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    function handleMessage(e) {
      const msg = e.data;
      if (!msg || msg.source !== 'nova-editor-preview') return;
      if (msg.type === 'edit') onEdit(msg.path, msg.value);
      if (msg.type === 'bg-click') onBgClick(msg.path);
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onEdit, onBgClick]);

  // Recomputed only when renderVersion bumps (structural/theme/undo/redo) — see useEditorState.js.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const html = useMemo(() => renderDocument(doc), [renderVersion]);

  return (
    <div className="preview-viewport" data-testid="preview-viewport">
      <div
        className="preview-scale"
        style={{
          width: DEVICE_WIDTH[device] || DEVICE_WIDTH.desktop,
          transform: `scale(${zoom})`,
          transformOrigin: 'top center',
          margin: '0 auto',
          transition: 'width 0.15s ease',
        }}
      >
        <iframe
          ref={iframeRef}
          title="site-preview"
          data-testid="site-iframe"
          srcDoc={html}
          style={{ width: '100%', height: '2200px', border: '1px solid #2a2a33', background: '#fff' }}
        />
      </div>
    </div>
  );
}
