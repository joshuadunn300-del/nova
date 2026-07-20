import { useEffect, useState } from 'react'
import { listLeads } from '../lib/api'

// Real Lead field is `status` (enum new/contacted/demo_sent/closed/lost), not `stage`, and
// 'follow_up' isn't a real status value — the Tracker's columns are new/contacted/demo_sent/
// closed/lost (see Tracker.jsx), so "contacted" is the closest real equivalent of a lead
// that's been reached out to and needs a follow-up. Lead also has no `follow_up_date` field.
const leadName = (l) => l.business_name || l.name || ''

export default function FollowUps() {
  const [leads, setLeads] = useState([])

  useEffect(() => {
    listLeads().then((rows) => setLeads(rows.filter((r) => r.status === 'contacted')))
  }, [])

  return (
    <div className="max-w-3xl">
      <p className="nova-eyebrow mb-1">AGENCY</p>
      <h1 className="text-xl font-semibold mb-1">Follow-ups</h1>
      <p className="text-sm text-nova-text-muted mb-6">
        Never let a warm lead go cold. Leads move here once they've been contacted in the tracker.
      </p>

      {leads.length === 0 ? (
        <div className="nova-card border-dashed p-10 text-center">
          <div className="text-2xl mb-2">🕐</div>
          <p className="text-sm font-medium">No leads to follow up</p>
          <p className="text-sm text-nova-text-muted mt-1">
            Move leads to the "Contacted" column in your Lead Tracker and they'll appear here.
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {leads.map((l) => (
            <li key={l.id} className="rounded-md border border-nova-border px-3 py-2 text-sm">
              {leadName(l) || '(unnamed lead)'}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
