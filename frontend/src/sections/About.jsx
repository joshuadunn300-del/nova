import { editableProps } from './editable.js'

export default function About({ props = {}, path, editable = false }) {
  const { title = 'About Us', body = '', image } = props

  return (
    <section
      className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      style={{ paddingBlock: 'var(--section-y)', paddingInline: 'var(--section-x)', maxWidth: 'var(--max-w)' }}
    >
      {image && (
        <img
          src={image}
          alt=""
          className="w-full h-64 md:h-80 object-cover order-1 md:order-none"
          style={{ borderRadius: 'var(--card-radius)' }}
        />
      )}
      <div className="min-w-0">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4 break-words"
          style={{ fontFamily: 'var(--heading-font)', color: 'var(--heading-color)' }}
          {...editableProps(editable, `${path}.title`)}
        >
          {title}
        </h2>
        <p
          className="whitespace-pre-line break-words"
          style={{ color: 'var(--body-color)' }}
          {...editableProps(editable, `${path}.body`)}
        >
          {body}
        </p>
      </div>
    </section>
  )
}
