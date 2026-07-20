import { editableProps } from './editable.js'

export default function Navbar({ props = {}, path, editable = false }) {
  const { logo = 'Business', links = [], cta, phone } = props

  return (
    <header className="absolute top-0 left-0 right-0 z-20 py-5 px-6">
      <nav
        className="mx-auto flex items-center gap-6 rounded-full"
        style={{
          maxWidth: '56rem',
          padding: '10px 12px 10px 20px',
          background: 'rgba(9, 10, 15, 0.78)',
          backdropFilter: 'blur(20px) saturate(150%)',
          WebkitBackdropFilter: 'blur(20px) saturate(150%)',
          border: '1px solid rgba(255, 255, 255, 0.10)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.14), 0 20px 50px -24px rgba(0,0,0,0.7)',
        }}
      >
        <div className="flex items-center gap-2 shrink-0">
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: 'var(--logo-tile-size)',
              height: 'var(--logo-tile-size)',
              borderRadius: 'var(--logo-tile-radius)',
              background: 'var(--primary)',
            }}
          />
          <span
            className="font-semibold text-[15px] shrink-0 truncate max-w-[10rem]"
            style={{ color: '#fff', letterSpacing: '-0.01em' }}
            {...editableProps(editable, `${path}.logo`)}
          >
            {logo}
          </span>
        </div>

        <ul className="hidden md:flex items-center gap-1.5 mx-auto min-w-0">
          {Array.isArray(links) &&
            links.map((link, i) => (
              <li key={i} className="truncate max-w-[8rem]">
                <a
                  href={link?.href || '#'}
                  className="block rounded-full px-3 py-1.5 text-[13px] whitespace-nowrap transition-colors hover:text-white hover:bg-white/10"
                  style={{ color: 'rgba(255,255,255,0.72)' }}
                  {...editableProps(editable, `${path}.links.${i}.label`)}
                >
                  {link?.label || 'Link'}
                </a>
              </li>
            ))}
        </ul>

        <div className="flex items-center gap-3 shrink-0">
          {phone && (
            <div
              className="hidden sm:flex items-center gap-1.5 text-[13px] font-medium whitespace-nowrap text-white"
              style={{
                background: 'var(--glass-bg)',
                border: 'var(--glass-border)',
                borderRadius: 'var(--glass-radius)',
                padding: '6px 12px',
              }}
            >
              {phone}
            </div>
          )}
          {cta?.label && (
            <a
              href={cta.href || '#'}
              className="shrink-0 whitespace-nowrap"
              style={{
                background: 'var(--cta-bg)',
                boxShadow: 'var(--cta-shadow)',
                color: 'var(--cta-color)',
                borderRadius: 'var(--btn-radius)',
                padding: '6px 16px',
                fontSize: '13px',
                fontWeight: 'var(--cta-fw)',
              }}
              {...editableProps(editable, `${path}.cta.label`)}
            >
              {cta.label}
            </a>
          )}
        </div>
      </nav>
    </header>
  )
}
