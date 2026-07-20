// Empty-state copy matches UI-Reference/designer.md verbatim (recon only captured the
// empty state — no populated-list layout was observed in the real app, so a populated
// view isn't invented here; wire to the Lead entity once /__lead + Terminal 1's API are live).
export default function SubmissionsPanel({ submissions = [] }) {
  return (
    <div className="side-panel" data-testid="submissions-panel">
      <h3>Submissions</h3>
      {submissions.length === 0 ? (
        <div className="submissions-empty">
          <span className="submissions-empty-icon">📥</span>
          <p className="submissions-empty-title">No submissions yet</p>
          <p className="panel-note">When visitors submit the quote form on this site, their answers will appear here. Use Preview mode to test it.</p>
        </div>
      ) : (
        <ul>
          {submissions.map((s, i) => (
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
