// TEMPORARY, Terminal-4-only test harness — not part of the app, not wired into
// the shared index.html. Deleted once T4's screens are verified in the browser.
// Renders T4's routes standalone via createBrowserRouter so AppShell's auth guard works.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import '../../index.css'
import { AUTH_ROUTES, APP_ROUTES } from '../routes'

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  ...AUTH_ROUTES,
  APP_ROUTES,
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
