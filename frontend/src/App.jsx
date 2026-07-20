import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import Home from './Home.jsx'
import FixturePreview from './FixturePreview.jsx'
import Designer from './editor/Designer.jsx'
import ScriptGenerator from './tools/ScriptGenerator.jsx'
import ProposalGenerator from './tools/ProposalGenerator.jsx'
import { AUTH_ROUTES, APP_ROUTES } from './app/routes.jsx'

const APP_ROUTES_WITH_TOOLS = {
  ...APP_ROUTES,
  children: [
    ...APP_ROUTES.children,
    { path: 'tools/script', element: <ScriptGenerator /> },
    { path: 'tools/proposal', element: <ProposalGenerator /> },
  ],
}

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/preview/:slug', element: <FixturePreview /> },
  { path: '/app/Designer', element: <Designer /> },
  ...AUTH_ROUTES,
  APP_ROUTES_WITH_TOOLS,
  {
    path: '*',
    element: (
      <div className="min-h-screen bg-[#0b0b12] flex items-center justify-center text-white/60">
        <p>
          Not found. <Link className="underline hover:text-white" to="/">Go home</Link>
        </p>
      </div>
    ),
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
