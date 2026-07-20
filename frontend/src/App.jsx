import { Routes, Route, Link } from 'react-router-dom'
import Home from './Home.jsx'
import FixturePreview from './FixturePreview.jsx'
import Placeholder from './Placeholder.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/preview/:slug" element={<FixturePreview />} />
      <Route path="/app/Designer" element={<Placeholder label="Live Editor (Terminal 3)" />} />
      <Route path="/app/*" element={<Placeholder label="Dashboard & CRM (Terminal 4)" />} />
      <Route
        path="*"
        element={
          <div className="p-8">
            <p>Not found. <Link className="text-blue-600 underline" to="/">Go home</Link></p>
          </div>
        }
      />
    </Routes>
  )
}

export default App
