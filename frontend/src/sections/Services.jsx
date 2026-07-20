import { editableProps } from './editable.js'

export default function Services({ props = {}, path, editable = false }) {
  const { title = 'Services', items = [] } = props

  return (
    <section
      className="w-full mx-auto"
      style={{ paddingBlock: 'var(--section-y)', paddingInline: 'var(--section-x)', maxWidth: 'var(--max-w)' }}
    >
      <h2
        className="text-2xl sm:text-3xl font-bold text-center mb-10 break-words"
        style={{ fontFamily: 'var(--heading-font)', color: 'var(--heading-color)' }}
        {...editableProps(editable, `${path}.title`)}
      >
        {title}
      </h2>
      {items.length === 0 ? (
        <p className="text-center" style={{ color: 'var(--muted-color)' }}>No services listed yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              {item?.icon && <div className="text-3xl mb-3">{item.icon}</div>}
              <h3
                className="font-semibold mb-2 break-words"
                style={{ fontFamily: 'var(--heading-font)', color: 'var(--heading-color)' }}
                {...editableProps(editable, `${path}.items.${i}.title`)}
              >
                {item?.title || 'Service'}
              </h3>
              <p
                className="text-sm break-words"
                style={{ color: 'var(--body-color)' }}
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
