import { sectionRegistry } from './sectionRegistry.js'

const DEFAULT_THEME = { primary: '#9D174D', secondary: '#15171f', font: 'Inter' }

/**
 * Renders a Tenji-schema content_json object into a full page.
 * Unknown section types are skipped (not crashed on) so future section
 * types don't break older published sites.
 */
export default function SiteRenderer({ content }) {
  if (!content || !Array.isArray(content.sections)) {
    return <div className="p-8 text-center text-gray-400">No content to render.</div>
  }

  const theme = { ...DEFAULT_THEME, ...(content.theme || {}) }

  return (
    <div
      style={{
        '--primary': theme.primary,
        '--secondary': theme.secondary,
        fontFamily: theme.font,
      }}
    >
      {content.sections.map((section) => {
        if (!section || section.visible === false) return null

        const Component = sectionRegistry[section.type]
        if (!Component) {
          if (import.meta.env.DEV) {
            console.warn(`SiteRenderer: unknown section type "${section?.type}", skipped.`)
          }
          return null
        }

        return <Component key={section.id ?? section.type} props={section.props || {}} />
      })}
    </div>
  )
}
