import { useState } from 'react';

// Native HTML5 drag-and-drop (same pattern as T4's Tracker kanban) — the ↑↓ buttons stay
// as the reliable/keyboard-accessible path, dragging is progressive enhancement matching
// designer.md's "drag handles" wording.
export default function SectionList({ sections, onMove, onReorder, onDuplicate, onDelete, onToggleHidden, onEditBackground }) {
  const [dragIndex, setDragIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);

  return (
    <ul className="section-list" data-testid="section-list">
      {sections.map((s, i) => (
        <li
          key={s.id}
          className={`section-row${s.visible === false ? ' is-hidden' : ''}${overIndex === i ? ' drag-over' : ''}`}
          data-testid={`section-row-${s.id}`}
          draggable
          onDragStart={() => setDragIndex(i)}
          onDragOver={(e) => { e.preventDefault(); setOverIndex(i); }}
          onDragLeave={() => setOverIndex((cur) => (cur === i ? null : cur))}
          onDrop={(e) => {
            e.preventDefault();
            if (dragIndex != null && dragIndex !== i) onReorder(dragIndex, i);
            setDragIndex(null);
            setOverIndex(null);
          }}
          onDragEnd={() => { setDragIndex(null); setOverIndex(null); }}
        >
          <span className="drag-handle" title="Drag to reorder">⠿</span>
          <span className="section-type">{s.type}</span>
          <div className="section-controls">
            <button type="button" title="Move up" disabled={i === 0} onClick={() => onMove(i, -1)}>↑</button>
            <button type="button" title="Move down" disabled={i === sections.length - 1} onClick={() => onMove(i, 1)}>↓</button>
            <button type="button" title="Duplicate" onClick={() => onDuplicate(i)}>⧉</button>
            <button type="button" title={s.visible === false ? 'Show' : 'Hide'} onClick={() => onToggleHidden(i)}>
              {s.visible === false ? '◌' : '◉'}
            </button>
            {s.type === 'hero' && (
              <button type="button" title="Change background image" onClick={() => onEditBackground(i)}>▣</button>
            )}
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
