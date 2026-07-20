import { editableProps } from './editable.js'

export default function Services({ props = {}, path, editable = false }) {
  const { title = 'Services', subheading, items = [] } = props

  return (
    <section
      className="w-full mx-auto"
      style={{ paddingBlock: 'var(--section-y)', paddingInline: 'var(--section-x)', maxWidth: 'var(--max-w)' }}
    >
      <div className="text-center mx-auto" style={{ maxWidth: '42rem' }}>
        <h2
          className="font-bold break-words"
          style={{ fontFamily: 'var(--heading-font)', color: 'var(--heading-color)', fontSize: 'clamp(1.75rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
          {...editableProps(editable, `${path}.title`)}
        >
          {title}
        </h2>
        {subheading && (
          <p className="mt-5" style={{ color: 'var(--muted-color)', fontSize: '1.125rem', lineHeight: 1.6 }}>
            {subheading}
          </p>
        )}
      </div>
      {items.length === 0 ? (
        <p className="text-center mt-16" style={{ color: 'var(--muted-color)' }}>No services listed yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6" style={{ marginTop: '64px' }}>
          {items.map((item, i) => (
            <div
              key={i}
              className="min-w-0"
              style={{
                background: 'var(--card-bg)',
                border: 'var(--card-border)',
                boxShadow: 'var(--card-shadow)',
                borderRadius: 'var(--card-radius)',
                padding: 'var(--card-pad)',
              }}
            >
              {item?.icon && (
                <div
                  className="flex items-center justify-center text-2xl mb-6"
                  style={{
                    width: 'var(--icon-tile-size)',
                    height: 'var(--icon-tile-size)',
                    borderRadius: 'var(--icon-tile-radius)',
                    background: 'var(--icon-tile-bg)',
                  }}
                >
                  {item.icon}
                </div>
              )}
              <h3
                className="font-semibold break-words"
                style={{ fontFamily: 'var(--heading-font)', color: 'var(--heading-color)', fontSize: '1.125rem', letterSpacing: '-0.01em' }}
                {...editableProps(editable, `${path}.items.${i}.title`)}
              >
                {item?.title || 'Service'}
              </h3>
              <p
                className="mt-2.5 break-words"
                style={{ color: 'var(--muted-color)', fontSize: '14px', lineHeight: 1.6 }}
                {...editableProps(editable, `${path}.items.${i}.description`)}
              >
                {item?.description || ''}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
