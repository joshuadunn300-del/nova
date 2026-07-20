import ProFeatureGate from './ProFeatureGate'

// Parity target: 09 - Resources/UI-Reference/analytics.md (Pro wall, no data
// behind it on trial — verbatim copy below).
export default function Analytics() {
  return (
    <div>
      <h1 className="text-xl font-semibold font-nova-heading text-nova-text mb-1">Analytics</h1>
      <p className="text-sm text-nova-text-muted mb-6">
        Track performance across every published client site.
      </p>
      <ProFeatureGate
        heading="Full Analytics"
        body="Track traffic, conversions, and performance across every published client site. Unlock the full analytics suite with Pro."
        bullets={[
          'Traffic & conversion trends',
          'Per-site performance ranking',
          'Lead capture analytics',
          'Traffic source breakdown',
        ]}
      />
    </div>
  )
}
