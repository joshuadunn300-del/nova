import { Link } from 'react-router-dom'

const FIXTURES = ['plumber', 'roofer', 'cleaner']

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-2xl font-bold">Nova — Section Renderer</h1>
      <p className="text-gray-500">Fixture previews:</p>
      <ul className="flex gap-4">
        {FIXTURES.map((slug) => (
          <li key={slug}>
            <Link
              to={`/preview/${slug}`}
              className="rounded-md border border-gray-300 px-4 py-2 capitalize hover:bg-gray-50"
            >
              {slug}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
