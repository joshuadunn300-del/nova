import { editableProps } from './editable.js'

export default function Services({ props = {}, path, editable = false }) {
  const { title = 'Services', items = [] } = props

  return (
    <section className="w-full px-4 sm:px-6 py-16 mx-auto max-w-6xl">
      <h2
        className="text-2xl sm:text-3xl font-bold text-center mb-10 break-words"
        style={{ fontFamily: 'var(--heading-font)' }}
        {...editableProps(editable, `${path}.title`)}
      >
        {title}
      </h2>
      {items.length === 0 ? (
        <p className="text-center text-gray-400">No services listed yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="border border-gray-200 p-6 min-w-0"
              style={{ borderRadius: 'var(--card-radius)' }}
            >
              {item?.icon && <div className="text-3xl mb-3">{item.icon}</div>}
              <h3
                className="font-semibold mb-2 break-words"
                style={{ fontFamily: 'var(--heading-font)' }}
                {...editableProps(editable, `${path}.items.${i}.title`)}
              >
                {item?.title || 'Service'}
              </h3>
              <p className="text-sm text-gray-600 break-words" {...editableProps(editable, `${path}.items.${i}.description`)}>
                {item?.description || ''}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
