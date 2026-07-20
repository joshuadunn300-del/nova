import { editableProps } from './editable.js'

export default function About({ props = {}, path, editable = false }) {
  const { title = 'About Us', body = '', image } = props

  return (
    <section className="w-full px-4 sm:px-6 py-16 mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
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
          style={{ fontFamily: 'var(--heading-font)' }}
          {...editableProps(editable, `${path}.title`)}
        >
          {title}
        </h2>
        <p className="text-gray-600 whitespace-pre-line break-words" {...editableProps(editable, `${path}.body`)}>
          {body}
        </p>
      </div>
    </section>
  )
}
