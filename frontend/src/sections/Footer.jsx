export default function Footer({ props = {} }) {
  const { logo = 'Business', text = '', links = [], social = [] } = props

  return (
    <footer className="w-full px-4 sm:px-6 py-10" style={{ backgroundColor: 'var(--secondary)', color: '#fff' }}>
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="min-w-0 text-center sm:text-left">
          <p className="font-semibold truncate">{logo}</p>
          {text && <p className="text-sm text-white/60 mt-1 break-words">{text}</p>}
        </div>
        <ul className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
          {links.map((link, i) => (
            <li key={i} className="truncate max-w-[8rem]">
              <a href={link?.href || '#'} className="hover:text-white">
                {link?.label || 'Link'}
              </a>
            </li>
          ))}
        </ul>
        {social.length > 0 && (
          <ul className="flex items-center gap-3 text-sm text-white/70">
            {social.map((s, i) => (
              <li key={i}>
                <a href={s?.href || '#'} className="hover:text-white">
                  {s?.platform || 'Social'}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  )
}
