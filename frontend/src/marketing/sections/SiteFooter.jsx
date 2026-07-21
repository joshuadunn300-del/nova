import { Link } from 'react-router-dom'
import { Swords } from 'lucide-react'

// `to` starting with "/#" is an on-page landing anchor (rendered as a plain <a> so the
// browser's native fragment-navigation handles the scroll — a react-router <Link> would
// pushState without scrolling). Everything else is a real route, rendered as <Link>.
const COLUMNS = [
  {
    heading: 'Product',
    links: [
      { text: 'Features', to: '/#features' },
      { text: 'Pricing', to: '/pricing' },
      { text: 'Integrations', to: '/#integrations' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { text: 'Contact', to: '/contact' },
      { text: 'Request Feature', to: '/request-feature' },
      { text: 'Terms of Service', to: '/terms' },
      { text: 'Privacy Policy', to: '/privacy' },
      { text: 'Refund Policy', to: '/refund' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { text: 'How It Works', to: '/#how-it-works' },
      { text: 'FAQ', to: '/#faq' },
    ],
  },
  {
    heading: 'Get Started',
    links: [
      { text: 'Start Today', to: '/signup' },
      { text: 'Sign In', to: '/login' },
    ],
  },
]

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-white/5 bg-[#08080c] text-white">
      <div className="px-8 py-24">
        {/* Live tenji.ai's footer starts directly with the link columns — no second
            heading/CTA here, that messaging belongs to FinalCta above it. A prior
            version duplicated "Scale your agency..." + Get Started in both places;
            removed (2026-07-21) after live comparison. */}
        <div className="grid grid-cols-2 gap-10 border-b border-white/5 pb-16 md:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-5 text-sm font-medium tracking-wide text-white">{col.heading}</h4>
              <ul className="space-y-3">
                {col.links.map((link) =>
                  link.to.startsWith('/#') ? (
                    <li key={link.text}>
                      <a href={link.to} className="text-sm text-white/60 transition-colors duration-300 hover:text-[#f2386f]">
                        {link.text}
                      </a>
                    </li>
                  ) : (
                    <li key={link.text}>
                      <Link to={link.to} className="text-sm text-white/60 transition-colors duration-300 hover:text-[#f2386f]">
                        {link.text}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">
          <div className="flex items-center gap-2.5">
            <Swords className="h-5 w-5 text-[#f2386f]" />
            <span className="font-semibold" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Nova</span>
          </div>
          <p className="text-sm text-white/60">© 2026 Nova. AI lead discovery for local businesses.</p>
        </div>
      </div>
    </footer>
  )
}
