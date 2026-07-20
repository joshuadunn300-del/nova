import { useEffect, useState } from 'react'
import { listTasks, updateTask } from '../lib/api'
import DataTable from '../components/DataTable'

export default function Tasks() {
  const [tasks, setTasks] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    listTasks().then(setTasks).catch((err) => setError(err.message || 'Failed to load tasks.'))
  }, [])

  async function toggleDone(task) {
    const nextStatus = task.status === 'done' ? 'open' : 'done'
    setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, status: nextStatus } : t)))
    try {
      await updateTask(task.id, { status: nextStatus })
    } catch {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, status: task.status } : t)))
    }
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-xl font-semibold mb-1">Tasks</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Follow-ups and reminders.</p>

      {error && (
        <div className="mb-4 rounded-md bg-rose-50 dark:bg-rose-900/30 px-3 py-2 text-sm text-rose-700 dark:text-rose-300">
          {error}
        </div>
      )}

      {tasks === null && !error ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">Loading…</p>
      ) : (
        <DataTable
          emptyMessage="No tasks yet."
          rows={tasks || []}
          columns={[
            {
              key: 'status',
              label: 'Done',
              render: (r) => (
                <input
                  type="checkbox"
                  checked={r.status === 'done'}
                  onChange={() => toggleDone(r)}
                  className="h-4 w-4"
                />
              ),
            },
            {
              key: 'title',
              label: 'Task',
              render: (r) => <span className={r.status === 'done' ? 'line-through text-slate-400' : ''}>{r.title}</span>,
            },
            { key: 'related_to', label: 'Related to' },
            { key: 'priority', label: 'Priority' },
            { key: 'due_date', label: 'Due' },
          ]}
        />
      )}
    </div>
  )
}
