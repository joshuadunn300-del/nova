// TEMPORARY auth adapter — Base44 handles real auth (per spec). Until Terminal 1 wires
// window.base44.auth, we fake a session in localStorage so the rest of the app (nav guards,
// "logged in as") can be built and tested end-to-end.
const KEY = 'nova_mock_session'

export function getSession() {
  if (typeof window === 'undefined') return null
  try {
    return JSON.parse(localStorage.getItem(KEY) || 'null')
  } catch {
    return null
  }
}

export async function login({ email, password }) {
  if (typeof window !== 'undefined' && window.base44?.auth) {
    return window.base44.auth.login({ email, password })
  }
  if (!email || !password) throw new Error('Email and password are required.')
  const session = { email, name: email.split('@')[0] }
  localStorage.setItem(KEY, JSON.stringify(session))
  return session
}

export async function signup({ email, password, agencyName }) {
  if (typeof window !== 'undefined' && window.base44?.auth) {
    return window.base44.auth.signup({ email, password, agencyName })
  }
  if (!email || !password) throw new Error('Email and password are required.')
  const session = { email, name: agencyName || email.split('@')[0] }
  localStorage.setItem(KEY, JSON.stringify(session))
  return session
}

export function logout() {
  if (typeof window !== 'undefined') localStorage.removeItem(KEY)
}
