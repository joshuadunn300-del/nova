// Maps the Designer's Design tab controls (DesignPanel.jsx: Quick Palettes, Body/Heading
// Font, Button Style, Corner Radius) to concrete CSS values. Shared shape between
// SiteRenderer (React, live preview/fixtures) and the publish compiler (~/nova/publish,
// plain-string HTML) — same theme.* keys, same value tables, two renderers.
export const DEFAULT_THEME = {
  primary: '#9D174D',
  secondary: '#15171f',
  font: 'Inter',
  headingFont: 'Inter',
  buttonStyle: 'Rounded',
  cornerRadius: 'Soft',
}

export const BUTTON_RADIUS = {
  Rounded: '0.375rem',
  Pill: '9999px',
  Sharp: '0px',
}

export const CARD_RADIUS = {
  Sharp: '0px',
  Soft: '0.75rem',
  Round: '1.5rem',
}

const FONT_FALLBACK = 'ui-sans-serif, system-ui, -apple-system, sans-serif'

/**
 * Resolves a (possibly partial) content_json `theme` object into the CSS
 * custom properties SiteRenderer/sections consume: --primary, --secondary,
 * --heading-font, --btn-radius, --card-radius, plus the resolved body
 * fontFamily string for the wrapper's inline style.
 */
export function resolveThemeVars(theme) {
  const t = { ...DEFAULT_THEME, ...(theme || {}) }
  const headingFont = t.headingFont || t.font

  return {
    theme: t,
    fontFamily: `"${t.font}", ${FONT_FALLBACK}`,
    vars: {
      '--primary': t.primary,
      '--secondary': t.secondary,
      '--heading-font': `"${headingFont}", ${FONT_FALLBACK}`,
      '--btn-radius': BUTTON_RADIUS[t.buttonStyle] || BUTTON_RADIUS.Rounded,
      '--card-radius': CARD_RADIUS[t.cornerRadius] || CARD_RADIUS.Soft,
    },
  }
}
