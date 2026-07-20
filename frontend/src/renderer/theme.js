import { generatedSite } from '../lib/designTokens.js'

// Maps the Designer's Design tab controls (DesignPanel.jsx: Quick Palettes, Body/Heading
// Font, Button Style, Corner Radius) to concrete CSS values, and drives every other
// generated-site visual (colors, spacing rhythm, card/button recipes) off
// `lib/designTokens.js`'s `generatedSite` token set — extracted from Tenji's real
// generated-site HTML, not guessed (see lib/tenji-tokens.md for provenance). The only
// per-site variable is `theme.primary` ("BRAND" in the token docs); everything else here
// is fixed across every generated site, same as real Tenji.
//
// Everything resolves to CSS custom properties on SiteRenderer's wrapper div (same
// pattern as the existing --primary/--secondary/--heading-font), so section components
// just reference var(--card-bg) etc. in their inline styles — no prop drilling needed.
export const DEFAULT_THEME = {
  primary: '#9D174D',
  secondary: '#15171f',
  font: 'Inter',
  headingFont: 'Inter',
  buttonStyle: 'Pill', // real Tenji's CTA recipe is always pill; Rounded/Sharp are Nova customization options layered on top
  cornerRadius: 'Soft',
}

export const BUTTON_RADIUS = {
  Rounded: '0.375rem',
  Pill: generatedSite.ctaButton.radius, // 9999px
  Sharp: '0px',
}

export const CARD_RADIUS = {
  Sharp: '0px',
  Soft: generatedSite.card.radius, // 20px — the real "reusable gradient card" recipe
  Round: generatedSite.radius.cardLg, // 24px
}

const FONT_FALLBACK = 'ui-sans-serif, system-ui, -apple-system, sans-serif'

function hexToRgbTriplet(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || '')
  if (!m) return '157, 23, 77' // falls back to a neutral rose if theme.primary isn't a valid 6-digit hex
  return [m[1], m[2], m[3]].map((h) => parseInt(h, 16)).join(', ')
}

function substituteBrand(value, brandRgb) {
  return value.replace(/rgba\(BRAND,\s*([\d.]+)\)/g, `rgba(${brandRgb}, $1)`)
}

/**
 * Resolves a (possibly partial) content_json `theme` object into the CSS custom
 * properties SiteRenderer/sections consume — colors, spacing rhythm, and the real
 * card/CTA/input recipes with the lead's brand color (`theme.primary`) substituted
 * into every gradient/shadow layer that carries it.
 */
export function resolveThemeVars(theme) {
  const t = { ...DEFAULT_THEME, ...(theme || {}) }
  const headingFont = t.headingFont || t.font
  const brandRgb = hexToRgbTriplet(t.primary)

  const vars = {
    '--primary': t.primary,
    '--secondary': t.secondary,
    '--heading-font': `"${headingFont}", ${FONT_FALLBACK}`,
    '--btn-radius': BUTTON_RADIUS[t.buttonStyle] || BUTTON_RADIUS.Pill,
    '--card-radius': CARD_RADIUS[t.cornerRadius] || CARD_RADIUS.Soft,

    '--heading-color': generatedSite.colors.heading,
    '--body-color': generatedSite.colors.body,
    '--muted-color': generatedSite.colors.muted,
    '--page-bg': generatedSite.colors.pageBg,
    '--surface': generatedSite.colors.surface,
    '--section-bg-alt': generatedSite.colors.sectionBgAlt,
    '--input-border-color': generatedSite.colors.inputBorder,
    '--star-color': generatedSite.colors.star,

    '--section-y': generatedSite.spacing.sectionY,
    '--section-x': generatedSite.spacing.sectionX,
    '--max-w': generatedSite.spacing.maxWidth,

    '--card-bg': generatedSite.card.background,
    '--card-border': generatedSite.card.border,
    '--card-shadow': substituteBrand(generatedSite.card.shadow, brandRgb),
    '--card-pad': generatedSite.card.padding,

    '--cta-pad': generatedSite.ctaButton.padding,
    '--cta-fs': generatedSite.ctaButton.fontSize,
    '--cta-fw': generatedSite.ctaButton.fontWeight,
    '--cta-color': generatedSite.ctaButton.color,
    '--cta-bg': substituteBrand(generatedSite.ctaButton.background, brandRgb),
    '--cta-shadow': substituteBrand(generatedSite.ctaButton.shadow, brandRgb),

    '--input-bg': generatedSite.input.background,
    '--input-border': generatedSite.input.border,
    '--input-radius': generatedSite.input.radius,
    '--input-pad': generatedSite.input.padding,
    '--input-shadow': generatedSite.input.shadow,

    // Hero photo scrim — real Tenji dark-overlays the hero background photo for text
    // legibility (tenji-tokens.md "Dark hero overlay"), not a flat opacity fade.
    '--hero-overlay': `linear-gradient(105deg, ${generatedSite.colors.darkOverlay} 0%, rgba(8, 9, 14, 0.28) 100%)`,
  }

  return {
    theme: t,
    fontFamily: `"${t.font}", ${FONT_FALLBACK}`,
    vars,
  }
}
