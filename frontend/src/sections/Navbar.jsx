import { editableProps } from './editable.js'
import { resolveIcon } from './icons.js'

export default function Navbar({ props = {}, path, editable = false }) {
  // `ctaText` (plain string) is the real field (lib/templates/_base.js); `cta:{label,href}`
  // kept as a back-compat read. `links` may be plain strings (real shape) or
  // {label,href} objects — both rendered the same, only strings aren't inline-editable
  // (no stable path into a bare string array item makes sense to expose as a link URL).
  const { logo = 'Business', links = [], cta, ctaText, phone, logoIcon } = props
  const LogoIcon = resolveIcon(logoIcon)
  const ctaLabel = ctaText || cta?.label
  const ctaHref = cta?.href || '#'

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
              // Real Tenji's navbar logo tile is a DISTINCT, smaller spec from the
              // footer's (28px/8px radius, flat brand color vs. footer's 36px/12px
              // gradient) — confirmed identical across both real template HTML files,
              // so hardcoded here rather than sharing --logo-tile-size/-radius (those
              // match the footer tile only, see Footer.jsx).
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: 'var(--primary)',
            }}
          >
            {LogoIcon && <LogoIcon size={20} color="#000" strokeWidth={2} />}
          </div>
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
            links.map((link, i) => {
              const isString = typeof link === 'string'
              const label = isString ? link : link?.label || 'Link'
              const href = isString ? `#${link.toLowerCase().replace(/\s+/g, '-')}` : link?.href || '#'
              return (
                <li key={i} className="truncate max-w-[8rem]">
                  <a
                    href={href}
                    className="block rounded-full px-3 py-1.5 text-[13px] whitespace-nowrap transition-colors hover:text-white hover:bg-white/10"
                    style={{ color: 'rgba(255,255,255,0.72)' }}
                    {...(isString ? {} : editableProps(editable, `${path}.links.${i}.label`))}
                  >
                    {label}
                  </a>
                </li>
              )
            })}
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
          {ctaLabel && (
            <a
              href={ctaHref}
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
              {...editableProps(editable, `${path}.${ctaText !== undefined ? 'ctaText' : 'cta.label'}`)}
            >
              {ctaLabel}
            </a>
          )}
        </div>
      </nav>
    </header>
  )
}
