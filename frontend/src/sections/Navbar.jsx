import { editableProps } from './editable.js'

export default function Navbar({ props = {}, path, editable = false }) {
  const { logo = 'Business', links = [], cta } = props

  return (
    <header className="w-full border-b border-black/5 bg-white/90 backdrop-blur sticky top-0 z-20">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <span
          className="font-semibold text-lg shrink-0 truncate max-w-[40%]"
          style={{ color: 'var(--primary)' }}
          {...editableProps(editable, `${path}.logo`)}
        >
          {logo}
        </span>
        <ul
          className="hidden md:flex items-center gap-6 text-sm min-w-0"
          style={{ color: 'var(--body-color)' }}
        >
          {Array.isArray(links) &&
            links.map((link, i) => (
              <li key={i} className="truncate max-w-[10rem]">
                <a
                  href={link?.href || '#'}
                  className="hover:opacity-70"
                  {...editableProps(editable, `${path}.links.${i}.label`)}
                >
                  {link?.label || 'Link'}
                </a>
              </li>
            ))}
        </ul>
        {cta?.label && (
          <a
            href={cta.href || '#'}
            className="shrink-0"
            style={{
              background: 'var(--cta-bg)',
              boxShadow: 'var(--cta-shadow)',
              color: 'var(--cta-color)',
              borderRadius: 'var(--btn-radius)',
              padding: 'var(--cta-pad)',
              fontSize: 'var(--cta-fs)',
              fontWeight: 'var(--cta-fw)',
            }}
            {...editableProps(editable, `${path}.cta.label`)}
          >
            {cta.label}
          </a>
        )}
      </nav>
    </header>
  )
}
