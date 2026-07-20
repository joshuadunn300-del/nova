import { editableProps } from './editable.js'

export default function Hero({ props = {}, path, editable = false }) {
  const {
    headline = 'Your headline here',
    subheadline = '',
    image,
    cta,
    form,
  } = props

  return (
    <section
      className="relative w-full py-20 md:py-28 text-center overflow-hidden group"
      style={{ backgroundColor: 'var(--secondary)', color: '#fff', paddingInline: 'var(--section-x)' }}
      data-bg-path={editable ? `${path}.image` : undefined}
    >
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${image})` }}
          aria-hidden="true"
        />
      )}
      {editable && (
        <button
          type="button"
          data-hero-bg-trigger
          className="absolute top-3 right-3 z-10 rounded-md border border-white/40 bg-black/55 px-2.5 py-1.5 text-xs opacity-0 transition-opacity group-hover:opacity-100"
        >
          Click to change background
        </button>
      )}
      <div className="relative mx-auto max-w-3xl">
        <h1
          className="text-3xl sm:text-5xl font-bold leading-tight break-words"
          style={{ fontFamily: 'var(--heading-font)' }}
          {...editableProps(editable, `${path}.headline`)}
        >
          {headline}
        </h1>
        {subheadline && (
          <p
            className="mt-4 text-base sm:text-lg text-white/80 break-words"
            {...editableProps(editable, `${path}.subheadline`)}
          >
            {subheadline}
          </p>
        )}

        {cta?.label && !form?.enabled && (
          <a
            href={cta.href || '#'}
            className="mt-8 inline-block"
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

        {form?.enabled && (
          <form
            className="mt-8 mx-auto max-w-md flex flex-col sm:flex-row gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            {(form.fields?.length ? form.fields : ['name', 'phone']).map((field, i) => (
              <input
                key={i}
                name={field}
                placeholder={field}
                className="min-w-0 flex-1"
                style={{
                  background: 'var(--input-bg)',
                  border: 'var(--input-border)',
                  borderRadius: 'var(--input-radius)',
                  padding: 'var(--input-pad)',
                  boxShadow: 'var(--input-shadow)',
                  color: 'var(--heading-color)',
                }}
              />
            ))}
            <button
              type="submit"
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
              {...editableProps(editable, `${path}.form.submitLabel`)}
            >
              {form.submitLabel || 'Get a Quote'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
