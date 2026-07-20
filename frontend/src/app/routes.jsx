// Route config for Terminal 4's screens. Terminal 2 (skeleton owner) imports APP_ROUTES
// into the root router — see the INTEGRATION REQUEST in BUILD-LOG.md for the exact wiring.
// Route paths match UI-Reference/_INDEX.md's verified route map (corrected 2026-07-20):
// /app/proposals does not exist (merged into /app/contracts), /app/leads is Lead Search
// (not a leads-list — that's /app/crm). T5's sites/domains/analytics routes preserved below.
import { useLocation } from 'react-router-dom'
import AppShell from './AppShell'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import LeadSearch from './pages/LeadSearch'
import Tracker from './pages/Tracker'
import FollowUps from './pages/FollowUps'
import Templates from './pages/Templates'
import Crm from './pages/Crm'
import Clients from './pages/Clients'
import Tasks from './pages/Tasks'
import Revenue from './pages/Revenue'
import Team from './pages/Team'
import Credits from './pages/Credits'
import Billing from './pages/Billing'
import Discovery from './pages/Discovery'
import Notifications from './pages/Notifications'
import Contracts from './pages/Contracts'
import SupportTickets from './pages/SupportTickets'
import Settings from './pages/Settings'
import Tutorials from './pages/Tutorials'
import ScriptGenerator from '../tools/ScriptGenerator'
import ProposalGenerator from '../tools/ProposalGenerator'
import ClientSites from '../tools/ClientSites'
import Domains from '../tools/Domains'
import Analytics from '../tools/Analytics'

// Reads the `lead` prefill passed via navigate(path, { state: { lead } }) from
// Crm.jsx / Contracts.jsx, since route elements can't receive props directly.
function ScriptGeneratorRoute() {
  const { state } = useLocation()
  return <ScriptGenerator lead={state?.lead} />
}

function ProposalGeneratorRoute() {
  const { state } = useLocation()
  return <ProposalGenerator lead={state?.lead} />
}

export const AUTH_ROUTES = [
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
]

export const APP_ROUTES = {
  path: '/app',
  element: <AppShell />,
  children: [
    { index: true, element: <Dashboard /> },
    { path: 'leads', element: <LeadSearch /> },
    { path: 'tracker', element: <Tracker /> },
    { path: 'followups', element: <FollowUps /> },
    { path: 'templates', element: <Templates /> },
    { path: 'discovery', element: <Discovery /> },
    { path: 'sites', element: <ClientSites /> },
    { path: 'domains', element: <Domains /> },
    { path: 'analytics', element: <Analytics /> },
    { path: 'crm', element: <Crm /> },
    { path: 'clients', element: <Clients /> },
    { path: 'tasks', element: <Tasks /> },
    { path: 'revenue', element: <Revenue /> },
    { path: 'team', element: <Team /> },
    { path: 'notifications', element: <Notifications /> },
    { path: 'contracts', element: <Contracts /> },
    { path: 'credits', element: <Credits /> },
    { path: 'billing', element: <Billing /> },
    { path: 'support', element: <SupportTickets /> },
    { path: 'settings', element: <Settings /> },
    { path: 'tutorials', element: <Tutorials /> },
    { path: 'scripts', element: <ScriptGeneratorRoute /> },
    { path: 'tools/script', element: <ScriptGeneratorRoute /> },
    { path: 'tools/proposal', element: <ProposalGeneratorRoute /> },
  ],
}
