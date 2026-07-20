import { editableProps } from './editable.js'

export default function Faq({ props = {}, path, editable = false }) {
  const { title = 'Frequently Asked Questions', items = [] } = props

  return (
    <section
      className="w-full mx-auto max-w-3xl"
      style={{ paddingBlock: 'var(--section-y)', paddingInline: 'var(--section-x)' }}
    >
      <h2
        className="text-2xl sm:text-3xl font-bold text-center mb-10 break-words"
        style={{ fontFamily: 'var(--heading-font)', color: 'var(--heading-color)' }}
        {...editableProps(editable, `${path}.title`)}
      >
        {title}
      </h2>
      {items.length === 0 ? (
        <p className="text-center" style={{ color: 'var(--muted-color)' }}>No questions yet.</p>
      ) : (
        <div className="divide-y" style={{ borderColor: 'var(--input-border-color)' }}>
          {items.map((item, i) => (
            <details key={i} className="py-4 group">
              <summary
                className="cursor-pointer font-medium break-words list-none flex justify-between gap-4"
                style={{ color: 'var(--heading-color)' }}
              >
                <span {...editableProps(editable, `${path}.items.${i}.question`)}>{item?.question || 'Question'}</span>
                <span className="group-open:rotate-45 transition-transform shrink-0" style={{ color: 'var(--muted-color)' }}>+</span>
              </summary>
              <p
                className="mt-2 break-words"
                style={{ color: 'var(--body-color)' }}
                {...editableProps(editable, `${path}.items.${i}.answer`)}
              >
                {item?.answer || ''}
              </p>
            </details>
          ))}
        </div>
      )}
    </section>
  )
}
