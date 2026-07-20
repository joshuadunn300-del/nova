import { editableProps } from './editable.js'

export default function Faq({ props = {}, path, editable = false }) {
  const { title = 'Frequently Asked Questions', items = [] } = props

  return (
    <section
      className="w-full mx-auto"
      style={{ paddingBlock: 'var(--section-y)', paddingInline: 'var(--section-x)', maxWidth: '48rem' }}
    >
      <h2
        className="text-center font-bold break-words"
        style={{ fontFamily: 'var(--heading-font)', color: 'var(--heading-color)', fontSize: 'clamp(1.75rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
        {...editableProps(editable, `${path}.title`)}
      >
        {title}
      </h2>
      {items.length === 0 ? (
        <p className="text-center mt-12" style={{ color: 'var(--muted-color)' }}>No questions yet.</p>
      ) : (
        <div className="flex flex-col gap-4" style={{ marginTop: '48px' }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                background: 'var(--card-bg)',
                border: 'var(--card-border)',
                boxShadow: 'var(--card-shadow)',
                borderRadius: '20px',
                padding: '24px 28px',
              }}
            >
              <p
                className="font-semibold break-words"
                style={{ color: 'var(--heading-color)', fontSize: '1.0625rem' }}
                {...editableProps(editable, `${path}.items.${i}.question`)}
              >
                {item?.question || 'Question'}
              </p>
              <p
                className="mt-2.5 break-words"
                style={{ color: 'var(--muted-color)', fontSize: '14px', lineHeight: 1.6 }}
                {...editableProps(editable, `${path}.items.${i}.answer`)}
              >
                {item?.answer || ''}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
