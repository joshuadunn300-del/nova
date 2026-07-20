import { useState } from 'react';

const TYPES = ['navbar', 'hero', 'services', 'gallery', 'about', 'testimonials', 'faq', 'cta', 'footer'];

export default function AddSectionMenu({ onAdd }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="add-section-menu">
      <button type="button" data-testid="add-section-btn" onClick={() => setOpen((o) => !o)}>+ Add section</button>
      {open && (
        <div className="add-section-dropdown" data-testid="add-section-dropdown">
          {TYPES.map((t) => (
            <button key={t} type="button" onClick={() => { onAdd(t); setOpen(false); }}>{t}</button>
          ))}
        </div>
      )}
    </div>
  );
}
