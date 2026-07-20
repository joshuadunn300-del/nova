import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { startSignup, verifySignupOtp } from '../lib/auth'

export default function Signup() {
  const [agencyName, setAgencyName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [otpRequired, setOtpRequired] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()

  async function handleStart(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      const { otpRequired } = await startSignup({ email, password })
      if (otpRequired) {
        setOtpRequired(true)
      } else {
        await verifySignupOtp({ email, password, agencyName })
        navigate('/app/leads', { replace: true })
      }
    } catch (err) {
      setError(err.message || 'Sign up failed.')
    } finally {
      setBusy(false)
    }
  }

  async function handleVerify(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await verifySignupOtp({ email, password, otpCode, agencyName })
      navigate('/app/leads', { replace: true })
    } catch (err) {
      setError(err.message || 'Verification failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center nova-dojo-bg nova-kanji-watermark px-4 text-nova-text">
      <form onSubmit={otpRequired ? handleVerify : handleStart} className="relative w-full max-w-sm rounded-xl border border-nova-border bg-nova-surface p-8 shadow-sm">
        <h1 className="text-xl font-semibold mb-1">Start your free trial</h1>
        <p className="text-sm text-nova-text-muted mb-6">500 credits, 3-site cap, no card required.</p>

        {error && (
          <div className="mb-4 rounded-md bg-rose-50 dark:bg-rose-900/30 px-3 py-2 text-sm text-rose-700 dark:text-rose-300">
            {error}
          </div>
        )}

        {otpRequired ? (
          <>
            <p className="text-sm text-nova-text-muted mb-4">
              We sent a code to <strong>{email}</strong>. Enter it below to verify your email.
            </p>
            <label className="block text-sm font-medium mb-1" htmlFor="otpCode">Verification code</label>
            <input
              id="otpCode"
              required
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              className="mb-6 w-full nova-input-focus rounded-md border border-nova-border bg-transparent px-3 py-2 text-sm"
            />
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-md bg-nova-accent py-2 text-sm font-medium text-white hover:bg-nova-accent-deep disabled:opacity-50"
            >
              {busy ? 'Verifying…' : 'Verify & continue'}
            </button>
          </>
        ) : (
          <>
            <label className="block text-sm font-medium mb-1" htmlFor="agencyName">Agency name</label>
            <input
              id="agencyName"
              required
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              className="mb-4 w-full nova-input-focus rounded-md border border-nova-border bg-transparent px-3 py-2 text-sm"
            />

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
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-6 w-full nova-input-focus rounded-md border border-nova-border bg-transparent px-3 py-2 text-sm"
            />

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-md bg-nova-accent py-2 text-sm font-medium text-white hover:bg-nova-accent-deep disabled:opacity-50"
            >
              {busy ? 'Creating account…' : 'Create account'}
            </button>
          </>
        )}

        <p className="mt-4 text-center text-sm text-nova-text-muted">
          Already have an account? <Link to="/login" className="text-nova-accent font-medium">Sign in</Link>
        </p>
      </form>
    </div>
  )
}
