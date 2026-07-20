import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../lib/auth'

export default function Signup() {
  const [agencyName, setAgencyName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await signup({ email, password, agencyName })
      navigate('/app/lead-search', { replace: true })
    } catch (err) {
      setError(err.message || 'Sign up failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm">
        <h1 className="text-xl font-semibold mb-1">Start your free trial</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">500 credits, 3-site cap, no card required.</p>

        {error && (
          <div className="mb-4 rounded-md bg-rose-50 dark:bg-rose-900/30 px-3 py-2 text-sm text-rose-700 dark:text-rose-300">
            {error}
          </div>
        )}

        <label className="block text-sm font-medium mb-1" htmlFor="agencyName">Agency name</label>
        <input
          id="agencyName"
          required
          value={agencyName}
          onChange={(e) => setAgencyName(e.target.value)}
          className="mb-4 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
        />

        <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
        />

        <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
        />

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-md bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
        >
          {busy ? 'Creating account…' : 'Create account'}
        </button>

        <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account? <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-medium">Sign in</Link>
        </p>
      </form>
    </div>
  )
}
