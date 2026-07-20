import { editableProps } from './editable.js'

export default function Gallery({ props = {}, path, editable = false }) {
  const { title = 'Gallery', images = [] } = props

  return (
    <section
      className="w-full mx-auto"
      style={{ paddingBlock: 'var(--section-y)', paddingInline: 'var(--section-x)', maxWidth: 'var(--max-w)' }}
    >
      <h2
        className="text-2xl sm:text-3xl font-bold text-center mb-10 break-words"
        style={{ fontFamily: 'var(--heading-font)', color: 'var(--heading-color)' }}
        {...editableProps(editable, `${path}.title`)}
      >
        {title}
      </h2>
      {images.length === 0 ? (
        <p className="text-center" style={{ color: 'var(--muted-color)' }}>No images yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <div
              key={i}
              className="aspect-square overflow-hidden"
              style={{ backgroundColor: 'var(--section-bg-alt)', borderRadius: 'var(--card-radius)' }}
            >
              {img?.src && (
                <img
                  src={img.src}
                  alt={img?.alt || ''}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
