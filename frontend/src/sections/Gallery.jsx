import { editableProps } from './editable.js'

export default function Gallery({ props = {}, path, editable = false }) {
  const { title = 'Gallery', images = [] } = props

  return (
    <section className="w-full px-4 sm:px-6 py-16 mx-auto max-w-6xl">
      <h2
        className="text-2xl sm:text-3xl font-bold text-center mb-10 break-words"
        style={{ fontFamily: 'var(--heading-font)' }}
        {...editableProps(editable, `${path}.title`)}
      >
        {title}
      </h2>
      {images.length === 0 ? (
        <p className="text-center text-gray-400">No images yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <div
              key={i}
              className="aspect-square overflow-hidden bg-gray-100"
              style={{ borderRadius: 'var(--card-radius)' }}
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
