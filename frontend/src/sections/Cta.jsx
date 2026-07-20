import { editableProps } from './editable.js'

export default function Cta({ props = {}, path, editable = false }) {
  const { headline = 'Ready to get started?', subheadline = '', button } = props

  return (
    <section
      className="w-full text-center"
      style={{
        backgroundColor: 'var(--primary)',
        color: '#fff',
        paddingBlock: 'var(--section-y)',
        paddingInline: 'var(--section-x)',
      }}
    >
      <div className="mx-auto max-w-2xl">
        <h2
          className="text-2xl sm:text-3xl font-bold break-words"
          style={{ fontFamily: 'var(--heading-font)' }}
          {...editableProps(editable, `${path}.headline`)}
        >
          {headline}
        </h2>
        {subheadline && (
          <p className="mt-3 text-white/80 break-words" {...editableProps(editable, `${path}.subheadline`)}>
            {subheadline}
          </p>
        )}
        {button?.label && (
          <a
            href={button.href || '#'}
            className="mt-6 inline-block bg-white px-6 py-3 font-medium"
            style={{ color: 'var(--primary)', borderRadius: 'var(--btn-radius)' }}
            {...editableProps(editable, `${path}.button.label`)}
          >
            {button.label}
          </a>
        )}
      </div>
    </section>
  )
}
