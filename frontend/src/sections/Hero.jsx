import { editableProps } from './editable.js'

function Star() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--star-color)" stroke="var(--star-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export default function Hero({ props = {}, path, editable = false }) {
  const {
    eyebrow,
    headline = 'Your headline here',
    subheadline = '',
    bgImage,
    // `image` is a legacy/back-compat field name — real generation (templateFiller,
    // AI path) writes `bgImage`, but keep reading `image` too so any content_json
    // that predates this fix still shows its photo instead of reverting to black.
    image,
    ratingText,
    trustBadges = [],
    cta,
    form,
  } = props
  const heroImage = bgImage || image
  const fields = form?.fields?.length ? form.fields : ['name', 'phone']

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: 'var(--secondary)', color: '#fff', minHeight: '660px', display: 'flex', alignItems: 'center' }}
      data-bg-path={editable ? `${path}.bgImage` : undefined}
    >
      {heroImage && (
        <>
          <div
            className="absolute inset-0 pointer-events-none bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--hero-overlay)' }} aria-hidden="true" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--hero-radial)' }} aria-hidden="true" />
        </>
      )}
      {editable && (
        <button
          type="button"
          data-hero-bg-trigger
          className="absolute top-3 right-3 z-10 rounded-md border border-white/40 bg-black/55 px-2.5 py-1.5 text-xs opacity-0 transition-opacity hover:opacity-100"
        >
          Click to change background
        </button>
      )}

      <div
        className="relative z-10 mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-center"
        style={{ maxWidth: 'var(--max-w)', padding: '112px 32px 64px', gap: '48px' }}
      >
        <div>
          {eyebrow && (
            <p
              className="mb-3 uppercase"
              style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', color: 'var(--eyebrow-color)' }}
            >
              {eyebrow}
            </p>
          )}
          <h1
            className="font-bold leading-[1.1] break-words"
            style={{ fontFamily: 'var(--heading-font)', fontSize: 'clamp(2.25rem, 5vw, 3.4rem)', letterSpacing: '-0.02em' }}
            {...editableProps(editable, `${path}.headline`)}
          >
            {headline}
          </h1>
          {subheadline && (
            <p
              className="mt-5 break-words"
              style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '28rem' }}
              {...editableProps(editable, `${path}.subheadline`)}
            >
              {subheadline}
            </p>
          )}

          {cta?.label && !form?.enabled && (
            <a
              href={cta.href || '#'}
              className="mt-7 inline-flex items-center justify-center whitespace-nowrap"
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

          {ratingText && (
            <div className="mt-7 flex items-center gap-2.5 flex-wrap">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} />)}
              </div>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>{ratingText}</span>
            </div>
          )}

          {trustBadges.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2.5">
              {trustBadges.map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-white"
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    background: 'var(--glass-bg)',
                    border: 'var(--glass-border)',
                    borderRadius: 'var(--glass-radius)',
                    padding: 'var(--glass-pad)',
                  }}
                >
                  {badge}
                </div>
              ))}
            </div>
          )}
        </div>

        {form?.enabled && (
          <div className="flex justify-end">
            <form
              className="w-full"
              style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '24px',
                maxWidth: '24rem',
                boxShadow: '0 30px 70px -20px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.04)',
              }}
              onSubmit={(e) => e.preventDefault()}
            >
              <h3
                className="text-center font-bold mb-4"
                style={{ color: 'var(--heading-color)', fontFamily: 'var(--heading-font)', fontSize: '1.125rem' }}
              >
                {form.title || 'Request a Quote'}
              </h3>
              <div className="flex flex-col gap-3">
                {fields.map((field, i) => (
                  <input
                    key={i}
                    name={field}
                    placeholder={field}
                    className="w-full"
                    style={{
                      background: 'var(--input-bg)',
                      border: 'var(--input-border)',
                      borderRadius: 'var(--input-radius)',
                      padding: 'var(--input-pad)',
                      boxShadow: 'var(--input-shadow)',
                      color: 'var(--heading-color)',
                      fontSize: '14px',
                    }}
                  />
                ))}
              </div>
              <button
                type="submit"
                className="w-full mt-4"
                style={{
                  background: 'var(--cta-bg)',
                  boxShadow: 'var(--cta-shadow)',
                  color: 'var(--cta-color)',
                  borderRadius: 'var(--input-radius)',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: 'var(--cta-fw)',
                }}
                {...editableProps(editable, `${path}.form.submitLabel`)}
              >
                {form.submitLabel || 'Get a Quote'}
              </button>
              <div className="mt-3 flex items-center justify-center gap-1.5" style={{ fontSize: '11px', color: '#9ca3af' }}>
                {form.microcopy || 'No obligation · Fast response'}
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
