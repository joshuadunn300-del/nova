import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { listProposals } from '../lib/api'
import DataTable from '../components/DataTable'
import UpgradeGate from '../components/UpgradeGate'

export default function Proposals() {
  const { entitlements } = useOutletContext()
  const [proposals, setProposals] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    listProposals().then(setProposals).catch((err) => setError(err.message || 'Failed to load proposals.'))
  }, [])

  return (
    <div className="max-w-4xl">
      <h1 className="text-xl font-semibold mb-1">Proposals</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Full pitch proposals sent to leads.</p>

      <UpgradeGate entitlements={entitlements} feature="proposals" label="Proposals">
        {error ? (
          <div className="rounded-md bg-rose-50 dark:bg-rose-900/30 px-3 py-2 text-sm text-rose-700 dark:text-rose-300">
            {error}
          </div>
        ) : proposals === null ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">Loading…</p>
        ) : (
          <DataTable
            emptyMessage="No proposals sent yet — generate one from a lead."
            rows={proposals}
            columns={[
              { key: 'business_name', label: 'Business' },
              { key: 'status', label: 'Status' },
              { key: 'value_estimate', label: 'Estimate', render: (r) => `$${r.value_estimate}` },
              { key: 'sent_date', label: 'Sent' },
            ]}
          />
        )}
      </UpgradeGate>
    </div>
  )
}
