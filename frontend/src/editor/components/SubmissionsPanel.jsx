// TEMP: mock data. Swap for a real Lead-entity query filtered by this site's slug once
// Terminal 1's Base44 API + Terminal 5's /__lead capture endpoint are live (INTEGRATION REQUEST).
const MOCK_SUBMISSIONS = [
  { name: 'Dana R.', phone: '(555) 019-2231', message: 'Need a quote for a burst pipe.', at: '2026-07-18' },
  { name: 'Marcus T.', phone: '(555) 044-8871', message: 'Interested in a water heater install.', at: '2026-07-19' },
];

export default function SubmissionsPanel() {
  return (
    <div className="side-panel" data-testid="submissions-panel">
      <h3>Submissions</h3>
      <p className="panel-note">Mock data — wired to the Lead entity once /__lead is live.</p>
      {MOCK_SUBMISSIONS.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <ul>
          {MOCK_SUBMISSIONS.map((s, i) => (
            <li key={i}>
              <strong>{s.name}</strong> — {s.phone}<br />
              <span>{s.message}</span><br />
              <small>{s.at}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
