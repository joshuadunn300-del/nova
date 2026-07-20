import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import Home from './Home.jsx'
import FixturePreview from './FixturePreview.jsx'
import Designer from './editor/Designer.jsx'
import { AUTH_ROUTES, APP_ROUTES } from './app/routes.jsx'

// T4's routes.jsx now owns tools/script + tools/proposal directly (with lead-state
// wrappers) — no longer added here, avoids the duplicate-route bug from before.
const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/preview/:slug', element: <FixturePreview /> },
  { path: '/app/Designer', element: <Designer /> },
  ...AUTH_ROUTES,
  APP_ROUTES,
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
