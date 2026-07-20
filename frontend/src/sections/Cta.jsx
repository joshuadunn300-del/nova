import { editableProps } from './editable.js'

export default function Cta({ props = {}, path, editable = false }) {
  const { headline = 'Ready to get started?', subheadline = '', button } = props

  return (
    <section
      className="w-full px-4 sm:px-6 py-16 text-center"
      style={{ backgroundColor: 'var(--primary)', color: '#fff' }}
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold break-words" {...editableProps(editable, `${path}.headline`)}>
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
            className="mt-6 inline-block rounded-md bg-white px-6 py-3 font-medium"
            style={{ color: 'var(--primary)' }}
            {...editableProps(editable, `${path}.button.label`)}
          >
            {button.label}
          </a>
        )}
      </div>
    </section>
  )
}
