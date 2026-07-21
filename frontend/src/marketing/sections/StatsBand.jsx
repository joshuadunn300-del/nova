import { useEffect, useRef, useState } from 'react'

// Placeholder targets — Josh picks final numbers (see BUILD-LOG).
const STATS = [
  { label: 'Leads Generated', target: 12000, prefix: '', suffix: '+', format: (n) => n.toLocaleString() },
  { label: 'Client Revenue Generated', target: 1.2, prefix: '$', suffix: 'M+', format: (n) => n.toFixed(1) },
  { label: 'Websites Analyzed', target: 40000, prefix: '', suffix: '', format: (n) => n.toLocaleString() },
  { label: 'Deals Closed', target: 800, prefix: '', suffix: '+', format: (n) => n.toLocaleString() },
]

const DURATION_MS = 1600

function useCountUp(target, active) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / DURATION_MS, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(target * eased)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target])

  return value
}

function StatTile({ stat, active }) {
  const value = useCountUp(stat.target, active)
  return (
    <div className="text-center">
      <p className="text-4xl font-bold text-white sm:text-5xl" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
        {stat.prefix}
        {stat.format(value)}
        {stat.suffix}
      </p>
      <p className="mt-2 text-sm text-white/50">{stat.label}</p>
    </div>
  )
}

export default function StatsBand() {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="stats" ref={ref} className="border-y border-white/10 bg-[#0a0a10] px-8 py-20 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 sm:grid-cols-4">
        {STATS.map((stat) => (
          <StatTile key={stat.label} stat={stat} active={active} />
        ))}
      </div>
    </section>
  )
}
