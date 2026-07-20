import { editableProps } from './editable.js'

export default function Testimonials({ props = {}, path, editable = false }) {
  const { title = 'What Our Customers Say', items = [] } = props

  return (
    <section
      className="w-full px-4 sm:px-6 py-16"
      style={{ backgroundColor: 'color-mix(in srgb, var(--secondary) 6%, white)' }}
    >
      <div className="mx-auto max-w-6xl">
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-10 break-words"
          style={{ fontFamily: 'var(--heading-font)' }}
          {...editableProps(editable, `${path}.title`)}
        >
          {title}
        </h2>
        {items.length === 0 ? (
          <p className="text-center text-gray-400">No testimonials yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <blockquote
                key={i}
                className="bg-white p-6 shadow-sm min-w-0"
                style={{ borderRadius: 'var(--card-radius)' }}
              >
                <p className="text-gray-700 italic break-words">
                  "<span {...editableProps(editable, `${path}.items.${i}.quote`)}>{item?.quote || ''}</span>"
                </p>
                <footer className="mt-4 text-sm font-medium text-gray-900 break-words">
                  <span {...editableProps(editable, `${path}.items.${i}.author`)}>{item?.author || 'Customer'}</span>
                  {item?.role && (
                    <span className="text-gray-500 font-normal">
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
