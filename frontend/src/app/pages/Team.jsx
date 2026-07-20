import { useOutletContext } from 'react-router-dom'
import { canUseFeature } from '../lib/entitlements'

export default function Team() {
  const { entitlements } = useOutletContext()
  const allowed = canUseFeature(entitlements, 'team')

  return (
    <div>
      <p className="nova-eyebrow mb-1">AGENCY</p>
      <h1 className="text-xl font-semibold mb-1">Team Members</h1>
      <p className="text-sm text-nova-text-muted mb-6">Invite and manage your team.</p>

      {allowed ? (
        <p className="text-sm text-nova-text-muted">Team management UI goes here (Agency plan confirmed).</p>
      ) : (
        <div className="nova-card p-10 text-center max-w-lg mx-auto">
          <div className="text-2xl mb-2">🔒</div>
          <p className="text-xs font-semibold text-nova-accent mb-1">AGENCY EXCLUSIVE</p>
          <h2 className="font-medium mb-2">Team Members</h2>
          <p className="text-sm text-nova-text-muted mb-4">
            Invite up to 5 team members to share your agency workspace and credit pool.
          </p>
          <button type="button" className="nova-btn-primary">
            Upgrade to Agency →
          </button>
        </div>
      )}
    </div>
  )
}
