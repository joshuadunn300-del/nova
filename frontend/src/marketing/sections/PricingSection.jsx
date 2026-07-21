import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'

// Single source of truth for plan pricing — Billing.jsx should import this
// once it converges (see BUILD-LOG). Annual monthly-equivalent + yearly total
// are copied verbatim from the tenji.ai recon, not recomputed.
export const PRICING_PLANS = {
  trial: {
    id: 'trial',
    name: 'FREE TRIAL',
    badge: null,
    description: 'Full Starter access for 3 days. Card required, cancel anytime.',
    monthly: 0,
    annualMonthly: 0,
    annualCaption: '3-day trial · card required',
    cta: 'Start Free Trial',
    checks: ['500 lead credits/mo', '3 published sites', 'Custom domains', 'Basic proposals', 'Nova branding shown'],
  },
  starter: {
    id: 'starter',
    name: 'STARTER',
    badge: null,
    description: 'For beginners launching their agency and scaling to $5K/month.',
    monthly: 39,
    annualMonthly: 31,
    annualYear: 374,
    cta: 'Get Started',
    checks: ['500 lead credits/mo', '3 published sites', 'Custom domains', 'Basic proposals', 'Remove Nova branding'],
  },
  pro: {
    id: 'pro',
    name: 'PRO',
    badge: 'Most Popular',
    description: 'For agencies scaling past $10K/month. Built for winners.',
    monthly: 79,
    annualMonthly: 63,
    annualYear: 758,
    cta: 'Get Started',
    checks: ['2,500 lead credits/mo', '15 published sites', 'Custom domains', 'Script generator', 'Full proposals', 'Remove Nova branding'],
  },
  agency: {
    id: 'agency',
    name: 'AGENCY',
    badge: 'Best Value',
    description: 'Unlimited scale. Team seats. Per-client analytics. Priority support.',
    monthly: 149,
    annualMonthly: 119,
    annualYear: 1430,
    cta: 'Get Started',
    checks: [
      '15,000 lead credits/mo',
      'Unlimited published sites',
      'Custom domains',
      'Script generator',
      'Full proposals',
      'Remove Nova branding',
      'Team members & sub-accounts',
      'Per-client analytics',
      'Priority support',
    ],
  },
}

const PLAN_ORDER = ['trial', 'starter', 'pro', 'agency']

function PriceCard({ plan, annual }) {
  const highlighted = plan.badge === 'Most Popular'
  const price = annual ? plan.annualMonthly : plan.monthly
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-7 ${
        highlighted
          ? 'border-[#f2386f]/60 bg-[#140d13] shadow-[0_0_50px_-12px_rgba(242,56,111,0.55)]'
          : 'border-white/10 bg-[#0d0d14]'
      }`}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-7 rounded-full bg-[#f2386f] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
          {plan.badge}
        </span>
      )}
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">{plan.name}</p>

      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
          {price === 0 ? 'Free' : `$${price}`}
        </span>
        {price > 0 && <span className="text-sm text-white/50">/mo</span>}
      </div>
      <p className="mt-1 h-4 text-xs text-white/40">
        {plan.id === 'trial'
          ? plan.annualCaption
          : annual
            ? `$${plan.monthly}/mo billed monthly · $${plan.annualYear}/yr · Save 20%`
            : ' '}
      </p>

      <p className="mt-4 text-sm leading-relaxed text-white/60">{plan.description}</p>

      <Link
        to="/signup"
        className={`mt-6 inline-flex items-center justify-center rounded-full py-2.5 text-sm font-semibold transition ${
          highlighted
            ? 'bg-gradient-to-b from-[#f2386f] to-[#db2777] text-white shadow-[0_10px_30px_-8px_rgba(242,56,111,0.6)] hover:brightness-110'
            : 'border border-white/15 text-white hover:bg-white/5'
        }`}
      >
        {plan.cta}
      </Link>

      <ul className="mt-6 space-y-2.5 text-sm text-white/70">
        {plan.checks.map((check) => (
          <li key={check} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#f2386f]" />
            <span>{check}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-white/10 pt-4 text-[11px] leading-relaxed text-white/40">
        <span className="font-semibold uppercase tracking-wide text-white/50">Every plan includes</span> Website
        Generator · Lead Scraper · Template Library · Site Designer · CRM
      </div>
    </div>
  )
}

export default function PricingSection() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="relative scroll-mt-24 bg-[#08080c] px-8 py-28 text-white">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f2386f]">PRICING</p>
        <h2 className="mt-3 text-4xl font-bold sm:text-5xl" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
          Simple pricing that scales with your agency
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/60">Start free, scale when ready. No hidden fees, no surprises.</p>

        <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 p-1">
          <button
            onClick={() => setAnnual(false)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${!annual ? 'bg-white text-black' : 'text-white/60'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition ${annual ? 'bg-white text-black' : 'text-white/60'}`}
          >
            Annual
            <span className="rounded-full bg-[#f2386f]/20 px-2 py-0.5 text-[10px] font-semibold text-[#f2386f]">Save 20%</span>
          </button>
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PLAN_ORDER.map((id) => (
          <PriceCard key={id} plan={PRICING_PLANS[id]} annual={annual} />
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-white/40">
        <Link to="/pricing" className="underline hover:text-white/70">
          Compare all features
        </Link>
      </p>
    </section>
  )
}
