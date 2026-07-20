// Shared input styling for tools/ forms — dojo/pink token system from
// Terminal 2's theme-token migration (frontend/src/index.css `@theme`), not
// hand-picked indigo/slate anymore. App chrome is permanently dark (T2's
// `class="dark"` fix), so one token per role replaces the old light/dark pair.
export const LABEL_CLASS = 'text-sm font-medium text-nova-text-muted';
export const FIELD_CLASS =
  'mt-1.5 w-full rounded-lg border border-nova-border bg-nova-bg px-3 py-2 text-sm text-nova-text ' +
  'placeholder:text-nova-text-muted ' +
  'focus:outline-none focus:ring-2 focus:ring-nova-accent focus:border-nova-accent transition-colors';
export const CARD_CLASS =
  'rounded-xl border border-nova-border bg-nova-surface p-6 shadow-sm';
