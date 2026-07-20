export default function Hero({ props = {} }) {
  const {
    headline = 'Your headline here',
    subheadline = '',
    image,
    cta,
    form,
  } = props

  return (
    <section
      className="relative w-full px-4 sm:px-6 py-20 md:py-28 text-center overflow-hidden"
      style={{ backgroundColor: 'var(--secondary)', color: '#fff' }}
    >
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${image})` }}
          aria-hidden="true"
        />
      )}
      <div className="relative mx-auto max-w-3xl">
        <h1 className="text-3xl sm:text-5xl font-bold leading-tight break-words">{headline}</h1>
        {subheadline && (
          <p className="mt-4 text-base sm:text-lg text-white/80 break-words">{subheadline}</p>
        )}

        {cta?.label && !form?.enabled && (
          <a
            href={cta.href || '#'}
            className="mt-8 inline-block rounded-md px-6 py-3 font-medium text-white"
            style={{ backgroundColor: 'var(--primary)' }}
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
                className="min-w-0 flex-1 rounded-md px-4 py-3 text-gray-900"
              />
            ))}
            <button
              type="submit"
              className="rounded-md px-6 py-3 font-medium text-white shrink-0"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              {form.submitLabel || 'Get a Quote'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
