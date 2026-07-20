// Route config for Terminal 4's screens. Terminal 2 (skeleton owner) imports APP_ROUTES
// into the root router — see the INTEGRATION REQUEST in BUILD-LOG.md for the exact wiring.
import AppShell from './AppShell'
import Login from './pages/Login'
import Signup from './pages/Signup'
import LeadSearch from './pages/LeadSearch'
import Leads from './pages/Leads'
import Clients from './pages/Clients'
import Tasks from './pages/Tasks'
import Notifications from './pages/Notifications'
import Contracts from './pages/Contracts'
import Proposals from './pages/Proposals'
import SupportTickets from './pages/SupportTickets'
import Settings from './pages/Settings'

export const AUTH_ROUTES = [
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
]

export const APP_ROUTES = {
  path: '/app',
  element: <AppShell />,
  children: [
    { index: true, element: <LeadSearch /> },
    { path: 'lead-search', element: <LeadSearch /> },
    { path: 'leads', element: <Leads /> },
    { path: 'clients', element: <Clients /> },
    { path: 'tasks', element: <Tasks /> },
    { path: 'notifications', element: <Notifications /> },
    { path: 'contracts', element: <Contracts /> },
    { path: 'proposals', element: <Proposals /> },
    { path: 'support', element: <SupportTickets /> },
    { path: 'settings', element: <Settings /> },
  ],
}
