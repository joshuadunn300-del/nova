export default function SectionList({ sections, onMove, onDuplicate, onDelete, onToggleHidden }) {
  return (
    <ul className="section-list" data-testid="section-list">
      {sections.map((s, i) => (
        <li key={s.id} className={`section-row${s.visible === false ? ' is-hidden' : ''}`} data-testid={`section-row-${s.id}`}>
          <span className="section-type">{s.type}</span>
          <div className="section-controls">
            <button type="button" title="Move up" disabled={i === 0} onClick={() => onMove(i, -1)}>↑</button>
            <button type="button" title="Move down" disabled={i === sections.length - 1} onClick={() => onMove(i, 1)}>↓</button>
            <button type="button" title="Duplicate" onClick={() => onDuplicate(i)}>⧉</button>
            <button type="button" title={s.visible === false ? 'Show' : 'Hide'} onClick={() => onToggleHidden(i)}>
              {s.visible === false ? '🚫' : '👁'}
            </button>
            <button
              type="button"
              title="Delete"
              onClick={() => {
                if (sections.length <= 1) return; // guard: never delete the last remaining section
                onDelete(i);
              }}
              disabled={sections.length <= 1}
            >
              ✕
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
