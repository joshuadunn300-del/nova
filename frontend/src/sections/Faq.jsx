export default function Faq({ props = {} }) {
  const { title = 'Frequently Asked Questions', items = [] } = props

  return (
    <section className="w-full px-4 sm:px-6 py-16 mx-auto max-w-3xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 break-words">{title}</h2>
      {items.length === 0 ? (
        <p className="text-center text-gray-400">No questions yet.</p>
      ) : (
        <div className="divide-y divide-gray-200">
          {items.map((item, i) => (
            <details key={i} className="py-4 group">
              <summary className="cursor-pointer font-medium text-gray-900 break-words list-none flex justify-between gap-4">
                {item?.question || 'Question'}
                <span className="text-gray-400 group-open:rotate-45 transition-transform shrink-0">+</span>
              </summary>
              <p className="mt-2 text-gray-600 break-words">{item?.answer || ''}</p>
            </details>
          ))}
        </div>
      )}
    </section>
  )
}
