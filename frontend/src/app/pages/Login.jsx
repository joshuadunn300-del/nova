import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../lib/auth'

export default function Login() {
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
      await login({ email, password })
      navigate('/app/leads', { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center nova-dojo-bg nova-kanji-watermark px-4 text-nova-text">
      <form onSubmit={handleSubmit} className="relative w-full max-w-sm rounded-xl border border-nova-border bg-nova-surface p-8 shadow-sm">
        <h1 className="text-xl font-semibold mb-1">Sign in to Nova</h1>
        <p className="text-sm text-nova-text-muted mb-6">Find leads. Pitch demos. Close clients.</p>

        {error && (
          <div className="mb-4 rounded-md bg-rose-50 dark:bg-rose-900/30 px-3 py-2 text-sm text-rose-700 dark:text-rose-300">
            {error}
          </div>
        )}

        <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full nova-input-focus rounded-md border border-nova-border bg-transparent px-3 py-2 text-sm"
        />

        <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full nova-input-focus rounded-md border border-nova-border bg-transparent px-3 py-2 text-sm"
        />

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-md bg-nova-accent py-2 text-sm font-medium text-white hover:bg-nova-accent-deep disabled:opacity-50"
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>

        <p className="mt-4 text-center text-sm text-nova-text-muted">
          No account? <Link to="/signup" className="text-nova-accent font-medium">Start free trial</Link>
        </p>
      </form>
    </div>
  )
}
