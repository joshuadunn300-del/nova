import { editableProps } from './editable.js'

export default function Testimonials({ props = {}, path, editable = false }) {
  const { title = 'What Our Customers Say', items = [] } = props

  return (
    <section
      className="w-full"
      style={{ backgroundColor: 'var(--section-bg-alt)', paddingBlock: 'var(--section-y)', paddingInline: 'var(--section-x)' }}
    >
      <div className="mx-auto" style={{ maxWidth: 'var(--max-w)' }}>
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-10 break-words"
          style={{ fontFamily: 'var(--heading-font)', color: 'var(--heading-color)' }}
          {...editableProps(editable, `${path}.title`)}
        >
          {title}
        </h2>
        {items.length === 0 ? (
          <p className="text-center" style={{ color: 'var(--muted-color)' }}>No testimonials yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <blockquote
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
                <p className="italic break-words" style={{ color: 'var(--body-color)' }}>
                  "<span {...editableProps(editable, `${path}.items.${i}.quote`)}>{item?.quote || ''}</span>"
                </p>
                <footer
                  className="mt-4 text-sm font-medium break-words"
                  style={{ color: 'var(--heading-color)' }}
                >
                  <span {...editableProps(editable, `${path}.items.${i}.author`)}>{item?.author || 'Customer'}</span>
                  {item?.role && (
                    <span className="font-normal" style={{ color: 'var(--muted-color)' }}>
                      {' '}
                      — <span {...editableProps(editable, `${path}.items.${i}.role`)}>{item.role}</span>
                    </span>
                  )}
                </footer>
              </blockquote>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
