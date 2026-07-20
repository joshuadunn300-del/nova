// Plan limits + feature gating per Tenji-Full-Breakdown.md pricing table.
// getEntitlements (Terminal 1) is the source of truth once live; this mirrors its shape
// so UI gating logic is identical whether data comes from the real function or the mock.

export const PLANS = {
  trial: { label: 'Free Trial', monthlyCredits: 500, siteCap: 3, scripts: false, proposals: false, contracts: false, fullAnalytics: false, team: false, prioritySupport: false },
  starter: { label: 'Starter', monthlyCredits: 500, siteCap: null, scripts: false, proposals: false, contracts: false, fullAnalytics: false, team: false, prioritySupport: false },
  pro: { label: 'Pro', monthlyCredits: 2500, siteCap: null, scripts: true, proposals: true, contracts: true, fullAnalytics: true, team: false, prioritySupport: false },
  agency: { label: 'Agency', monthlyCredits: 15000, siteCap: null, scripts: true, proposals: true, contracts: true, fullAnalytics: true, team: true, prioritySupport: true },
}

export const CREDIT_COSTS = { search: 10, generateSite: 20, script: 3, publish: 0 }

export function planOf(entitlements) {
  return PLANS[entitlements?.plan] || PLANS.trial
}

export function canUseFeature(entitlements, feature) {
  return !!planOf(entitlements)[feature]
}

export function hasCredits(entitlements, action) {
  const cost = CREDIT_COSTS[action] ?? 0
  return (entitlements?.credits ?? 0) >= cost
}
