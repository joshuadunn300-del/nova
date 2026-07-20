import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { listContracts } from '../lib/api'
import DataTable from '../components/DataTable'
import UpgradeGate from '../components/UpgradeGate'

export default function Contracts() {
  const { entitlements } = useOutletContext()
  const [contracts, setContracts] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    listContracts().then(setContracts).catch((err) => setError(err.message || 'Failed to load contracts.'))
  }, [])

  return (
    <div className="max-w-4xl">
      <h1 className="text-xl font-semibold mb-1">Contracts</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Signed client agreements.</p>

      <UpgradeGate entitlements={entitlements} feature="contracts" label="Contracts">
        {error ? (
          <div className="rounded-md bg-rose-50 dark:bg-rose-900/30 px-3 py-2 text-sm text-rose-700 dark:text-rose-300">
            {error}
          </div>
        ) : contracts === null ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">Loading…</p>
        ) : (
          <DataTable
            emptyMessage="No contracts yet."
            rows={contracts}
            columns={[
              { key: 'client', label: 'Client' },
              { key: 'value', label: 'Value', render: (r) => `$${r.value}` },
              { key: 'status', label: 'Status' },
              { key: 'start_date', label: 'Start date' },
            ]}
          />
        )}
      </UpgradeGate>
    </div>
  )
}
