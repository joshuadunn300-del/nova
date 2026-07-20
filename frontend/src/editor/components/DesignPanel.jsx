const FONTS = ['Inter', 'Poppins', 'Roboto', 'Montserrat', 'Playfair Display'];

export default function DesignPanel({ theme, onChange }) {
  return (
    <div className="side-panel" data-testid="design-panel">
      <h3>Design</h3>
      <label>
        Primary color
        <input type="color" value={theme.primary || '#9D174D'} onChange={(e) => onChange('primary', e.target.value)} />
      </label>
      <label>
        Secondary color
        <input type="color" value={theme.secondary || '#15171f'} onChange={(e) => onChange('secondary', e.target.value)} />
      </label>
      <label>
        Font
        <select value={theme.font || 'Inter'} onChange={(e) => onChange('font', e.target.value)}>
          {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
      </label>
    </div>
  );
}
