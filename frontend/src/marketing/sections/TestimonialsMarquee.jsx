import { useEffect, useRef, useState } from 'react'
import { Star } from 'lucide-react'

// Names/roles/hooks per landing.md rubric section 10. Quotes swap product name
// to Nova; YouTube-channel references are genericized to "a YouTube video" —
// the mentor's name is never shipped, per rubric instruction.
const TESTIMONIALS = [
  { name: 'Marcus Webb', role: 'Agency Owner', quote: "Found Nova from a YouTube video and closed two $297/mo clients in my first nine days. Didn't think it'd be that fast." },
  { name: 'Priya Natarajan', role: 'Freelance Web Designer', quote: "I used to cold-email blind and hope. Now I only pitch businesses Nova's already flagged as needing a new site." },
  { name: 'Devon Hartley', role: 'Agency Owner', quote: 'Went from zero to eleven active clients in under two months running everything through Nova.' },
  { name: 'Sasha Lindqvist', role: 'Solo Founder', quote: "The site-audit scoring alone is worth it — I know exactly which leads are worth my time before I call." },
  { name: 'Tyrone Beckett', role: 'Agency Owner', quote: 'Saw Nova in a YouTube video, gave it a shot, and hit $6K in my first month.' },
  { name: 'Emilia Vance', role: 'Web Designer', quote: "I've stopped guessing who needs a website. Nova just shows me." },
  { name: 'Rohan Mehta', role: 'Agency Owner', quote: 'I niche into dentists and med spas now — Nova finds the ones with weak sites in seconds.' },
  { name: 'Caleb Brennan', role: 'Solo Agency', quote: 'Nova got my mornings back. Lead-gen used to eat half my day.' },
  { name: 'Yuki Tanaka', role: 'Freelancer', quote: 'Fourteen qualified leads on my very first search. I was not expecting that.' },
  { name: 'Nadia Okonkwo', role: 'Agency Owner', quote: 'Hit my first $8K month once I stopped chasing cold leads and let Nova rank the warm ones.' },
  { name: 'Grant Whitfield', role: 'Agency Owner', quote: "The weak-website filter does the hardest part of prospecting for you. It's the whole game." },
  { name: 'Bianca Rossi', role: 'Freelance Web Designer', quote: 'Closed a client over coffee with a live preview pulled up on my phone. Felt unfair how easy that was.' },
  { name: 'Andre Solomon', role: 'Agency Owner', quote: "Found this in a YouTube video and it's the first tab I open every morning now." },
  { name: 'Hannah Delgado', role: 'Solo Founder', quote: 'No ads, no funnels, just outreach — and I still cleared $4K last month.' },
  { name: 'Liam Castellano', role: 'Web Designer', quote: 'The scoring accuracy genuinely surprised me. The businesses it flags actually need the help.' },
  { name: 'Fatima Al-Rashid', role: 'Agency Owner', quote: "I'm done begging for referrals. Nova keeps my pipeline full on its own." },
  { name: 'Cody Ferrell', role: 'Solo Agency', quote: 'Running this solo out of HVAC leads and already at $7K/month.' },
  { name: 'Mei Lin Zhou', role: 'Freelancer', quote: 'Pick a niche, pick a city, go. That is genuinely the whole workflow now.' },
  { name: 'Jaxon Pierce', role: 'Agency Owner', quote: 'Saw a walkthrough on YouTube, signed up that night, had five clients within three weeks.' },
  { name: 'Olivia Sterling', role: 'Agency Owner', quote: 'What I like most is that it is repeatable — same process, new city, same results.' },
]

function initials(name) {
  return name.split(' ').map((part) => part[0]).join('')
}

function TestimonialCard({ name, role, quote }) {
  return (
    <div className="mx-3 flex w-[340px] shrink-0 flex-col gap-4 rounded-2xl border border-white/10 bg-[#0d0d14] p-6">
      <p className="text-sm leading-relaxed text-white/70">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f2386f]/15 text-xs font-semibold text-[#f2386f]">
          {initials(name)}
        </div>
        <div>
          <p className="text-sm font-medium text-white">{name}</p>
          <p className="text-xs text-white/45">{role} · Nova Client</p>
        </div>
      </div>
    </div>
  )
}

function MarqueeRow({ items, reverse, playing }) {
  const loop = [...items, ...items]
  return (
    <div className="flex overflow-hidden">
      <div
        className="flex w-max py-2"
        style={{
          animation: `nova-marquee 45s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
          animationPlayState: playing ? 'running' : 'paused',
        }}
      >
        {loop.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} {...t} />
        ))}
      </div>
    </div>
  )
}

export default function TestimonialsMarquee() {
  const rowA = TESTIMONIALS.slice(0, 10)
  const rowB = TESTIMONIALS.slice(10)
  const sectionRef = useRef(null)
  // ponytail: pauses both rows the instant the section leaves the viewport (scroll perf,
  // per T6 LANDING POLISH ask) rather than a per-card observer — one observer, one section.
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="testimonials" ref={sectionRef} className="bg-[#08080c] py-28 text-white">
      <style>{`
        @keyframes nova-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-8 text-center">
        <div className="flex items-center justify-center gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-[#facc15] text-[#facc15]" />
          ))}
          <span className="ml-1.5 text-sm font-semibold text-white/70">4.9</span>
          <span className="mx-2 text-white/25">·</span>
          <span className="text-sm text-white/50">200+ Agency Owners Scaled</span>
        </div>
        <h2 className="mt-4 text-4xl font-bold sm:text-5xl" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
          Don't take it from us, hear from our agency owners
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/60">Agency owners using Nova to find and close local clients.</p>
      </div>

      <div className="mt-14 space-y-6">
        <MarqueeRow items={rowA} playing={inView} />
        <MarqueeRow items={rowB} reverse playing={inView} />
      </div>
    </section>
  )
}
