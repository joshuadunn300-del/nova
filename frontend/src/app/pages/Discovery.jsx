import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { DISCOVERY_NICHES } from '../lib/discoveryCatalog'

const DIFFICULTY_STYLE = {
  Easy: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Hard: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
}

export default function Discovery() {
  const navigate = useNavigate()

  return (
    <div>
      <p className="nova-eyebrow mb-1">STUDIO</p>
      <h1 className="font-display text-2xl md:text-3xl font-semibold tracking-tight mb-1">Choose a niche. Nova builds the angle.</h1>
      <p className="text-sm text-nova-text-muted mb-4">
        Every local business niche with its average client value, difficulty, and best offer angle.
      </p>

      <div className="rounded-nova border border-nova-accent/40 bg-nova-accent/10 px-4 py-3 mb-6">
        <p className="text-sm font-medium">Coming Soon..</p>
        <p className="text-sm text-nova-text-muted">
          Niche Discovery is getting a major upgrade — live market data, opportunity scores, and AI-picked angles.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DISCOVERY_NICHES.map((n) => (
          <div key={n.niche} className="nova-card p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{n.niche}</h3>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${DIFFICULTY_STYLE[n.difficulty]}`}>{n.difficulty}</span>
            </div>
            <p className="text-sm text-nova-text-muted mb-2">{n.angle}</p>
            <p className="text-sm font-medium mb-3">${n.avgValue}/mo avg</p>
            <button
              type="button"
              onClick={() => navigate('/app/leads', { state: { niche: n.niche } })}
              className="inline-flex items-center gap-1 text-sm font-medium text-nova-accent"
            >
              Find Leads <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
