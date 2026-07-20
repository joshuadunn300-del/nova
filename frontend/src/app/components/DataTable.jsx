// Generic list table reused by Leads/Clients/Tasks/Contracts/Proposals/SupportTickets —
// avoids six near-identical bespoke tables (ponytail rung 6: one component, column configs vary).
export default function DataTable({ columns, rows, keyField = 'id', emptyMessage = 'Nothing here yet.' }) {
  if (!rows || rows.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center text-sm text-slate-500 dark:text-slate-400">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-sm">
        <thead className="bg-slate-50 dark:bg-slate-900/60">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="px-4 py-2.5 text-left font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {rows.map((row) => (
            <tr key={row[keyField]} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
              {columns.map((c) => (
                <td
                  key={c.key}
                  className="px-4 py-2.5 align-middle whitespace-nowrap max-w-xs truncate"
                  title={typeof row[c.key] === 'string' ? row[c.key] : undefined}
                >
                  {c.render ? c.render(row) : (row[c.key] ?? '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
