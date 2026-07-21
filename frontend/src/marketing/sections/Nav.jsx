import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swords, LayoutGrid } from 'lucide-react'
import { getSession } from '../../app/lib/auth'

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'News', href: '/news' },
  { label: 'Affiliates', href: '/affiliates' },
  { label: 'Contact', href: '/contact' },
]

export default function Nav() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(getSession())
  }, [])

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[min(96vw,72rem)] -translate-x-1/2">
      <nav className="flex items-center justify-between gap-4 rounded-full border border-nova-border bg-[#0a0b10]/90 px-4 py-2.5 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2 pl-1 pr-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-nova-accent/15 text-nova-accent">
            <Swords className="h-4.5 w-4.5" strokeWidth={2.25} />
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight text-nova-text">
            nova<span className="text-nova-accent">.ai</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={
                  link.label === 'Home'
                    ? 'rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium text-nova-text'
                    : 'rounded-full px-3.5 py-1.5 text-sm font-medium text-nova-text-muted transition-colors hover:text-nova-text'
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 pr-0.5">
          {session ? (
            <>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-nova-accent-bright to-nova-accent-deep text-[13px] font-semibold text-white">
                {(session.name || session.email || '?')[0].toUpperCase()}
              </span>
              <Link
                to="/app"
                className="flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium text-nova-text transition-colors hover:bg-white/15"
              >
                <LayoutGrid className="h-4 w-4" />
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden rounded-full px-3.5 py-1.5 text-sm font-medium text-nova-text-muted transition-colors hover:text-nova-text sm:inline-flex"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="whitespace-nowrap rounded-full bg-gradient-to-b from-nova-accent-bright to-nova-accent-deep px-3 py-1.5 text-sm font-semibold text-black shadow-[0_6px_18px_-4px_rgba(242,56,111,0.6)] transition-transform hover:scale-[1.03] sm:px-4"
              >
                <span className="sm:hidden">Sign up</span>
                <span className="hidden sm:inline">Start Free Trial</span>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
