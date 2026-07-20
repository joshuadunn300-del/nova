import { Link } from 'react-router-dom'

const FIXTURES = ['plumber', 'roofer', 'cleaner']

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b0b12] flex flex-col items-center justify-center gap-8 p-8 text-white">
      <div className="text-center">
        <h1 className="font-nova-heading text-2xl font-semibold tracking-tight">Nova</h1>
        <p className="mt-2 text-sm text-white/50">Section renderer — fixture previews</p>
      </div>
      <ul className="flex gap-4">
        {FIXTURES.map((slug) => (
          <li key={slug}>
            <Link
              to={`/preview/${slug}`}
              className="rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 capitalize text-sm font-medium text-white/90 transition hover:border-white/20 hover:bg-white/10"
            >
              {slug}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
