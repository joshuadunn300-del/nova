import { editableProps } from './editable.js'

export default function About({ props = {}, path, editable = false }) {
  const { title = 'About Us', body = '', image } = props

  return (
    <section
      className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      style={{ paddingBlock: 'var(--section-y)', paddingInline: 'var(--section-x)', maxWidth: 'var(--max-w)' }}
    >
      {(image || editable) && (
        <div
          className="relative w-full h-64 md:h-80 order-1 md:order-none group"
          data-image-path={editable ? `${path}.image` : undefined}
        >
          {image && (
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover"
              style={{ borderRadius: 'var(--card-radius)' }}
            />
          )}
          {editable && (
            <button
              type="button"
              data-image-trigger
              className="absolute top-3 right-3 z-10 rounded-md border border-white/40 bg-black/55 px-2.5 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              Click to change image
            </button>
          )}
        </div>
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
