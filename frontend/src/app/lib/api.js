// TEMPORARY adapter: calls Terminal 1's Base44 functions when available (window.base44),
// else falls back to in-memory mock data. Replace the `live` branch check once T1 logs
// its functions as deployed — this file is the ONLY place that needs to change.
import * as mock from './mockData'
import { CREDIT_COSTS } from './entitlements'

const live = () => typeof window !== 'undefined' && !!window.base44

const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms))

// in-memory mutable copies so list screens can toggle/create without a backend
const state = {
  leads: [...mock.mockLeads],
  clients: [...mock.mockClients],
  tasks: [...mock.mockTasks],
  notifications: [...mock.mockNotifications],
  contracts: [...mock.mockContracts],
  proposals: [...mock.mockProposals],
  tickets: [...mock.mockSupportTickets],
  settings: { ...mock.mockSettings },
  entitlements: { ...mock.mockEntitlements },
}

export async function getEntitlements() {
  if (live()) return window.base44.functions.getEntitlements()
  await delay(150)
  return { ...state.entitlements }
}

export async function searchLeads({ niche, location }) {
  if (live()) return window.base44.functions.searchLeads({ niche, location })
  await delay(600)
  if (state.entitlements.credits < CREDIT_COSTS.search) {
    throw new Error('Not enough credits to run a search.')
  }
  state.entitlements.credits -= CREDIT_COSTS.search
  if (!niche || !location) return []
  // deterministic mock results seeded by input so repeated searches feel real
  const results = state.leads.filter((l) =>
    l.niche.toLowerCase().includes(niche.toLowerCase().slice(0, 4)) || true
  )
  return results
}

export async function listLeads() {
  if (live()) return window.base44.entities.Lead.list()
  await delay(200)
  return [...state.leads]
}

export async function listClients() {
  if (live()) return window.base44.entities.Client.list()
  await delay(200)
  return [...state.clients]
}

export async function listTasks() {
  if (live()) return window.base44.entities.Task.list()
  await delay(200)
  return [...state.tasks]
}

export async function updateTask(id, patch) {
  if (live()) return window.base44.entities.Task.update(id, patch)
  await delay(150)
  const t = state.tasks.find((x) => x.id === id)
  if (t) Object.assign(t, patch)
  return t
}

export async function listNotifications() {
  if (live()) return window.base44.entities.Notification.list()
  await delay(200)
  return [...state.notifications]
}

export async function markNotificationRead(id) {
  if (live()) return window.base44.entities.Notification.update(id, { read: true })
  await delay(100)
  const n = state.notifications.find((x) => x.id === id)
  if (n) n.read = true
  return n
}

export async function listContracts() {
  if (live()) return window.base44.entities.Contract.list()
  await delay(200)
  return [...state.contracts]
}

export async function listProposals() {
  if (live()) return window.base44.entities.Proposal.list()
  await delay(200)
  return [...state.proposals]
}

export async function listSupportTickets() {
  if (live()) return window.base44.entities.SupportTicket.list()
  await delay(200)
  return [...state.tickets]
}

export async function createSupportTicket({ subject, priority = 'normal' }) {
  if (live()) return window.base44.entities.SupportTicket.create({ subject, priority, status: 'open' })
  await delay(150)
  const ticket = { id: mock.nextId(), subject, priority, status: 'open', created_date: new Date().toISOString().slice(0, 10) }
  state.tickets.unshift(ticket)
  return ticket
}

export async function getSettings() {
  if (live()) return window.base44.entities.User.me()
  await delay(150)
  return { ...state.settings }
}

export async function updateSettings(patch) {
  if (live()) return window.base44.entities.User.updateMyUserData(patch)
  await delay(200)
  Object.assign(state.settings, patch)
  return { ...state.settings }
}
