import { useEffect, useState } from 'react'
import { listNotifications, markNotificationRead } from '../lib/api'

export default function Notifications() {
  const [items, setItems] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    listNotifications().then(setItems).catch((err) => setError(err.message || 'Failed to load notifications.'))
  }, [])

  async function markRead(id) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
    try {
      await markNotificationRead(id)
    } catch {
      // best-effort; UI already optimistically updated
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold mb-1">Notifications</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">In-app alerts.</p>

      {error && (
        <div className="mb-4 rounded-md bg-rose-50 dark:bg-rose-900/30 px-3 py-2 text-sm text-rose-700 dark:text-rose-300">
          {error}
        </div>
      )}

      {items === null && !error ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">Loading…</p>
      ) : (items || []).length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center text-sm text-slate-500 dark:text-slate-400">
          You're all caught up.
        </div>
      ) : (
        <ul className="space-y-2">
          {items.map((n) => (
            <li
              key={n.id}
              onClick={() => !n.read && markRead(n.id)}
              className={`rounded-lg border p-3 cursor-pointer ${
                n.read
                  ? 'border-slate-200 dark:border-slate-800 opacity-60'
                  : 'border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20'
              }`}
            >
              <p className="text-sm font-medium">{n.title}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{n.body}</p>
              <p className="text-xs text-slate-400 mt-1">{new Date(n.created_date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
