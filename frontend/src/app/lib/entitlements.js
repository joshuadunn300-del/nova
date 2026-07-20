// Plan pricing-tier metadata (label/credit allowance/site cap) is static per
// Tenji-Full-Breakdown.md — safe to hardcode. Feature GATES are dynamic authorization
// data and must come from the real getEntitlements() response's `features` object when
// live (bug found + fixed 2026-07-20 during live integration testing: this file used to
// hardcode scripts/proposals/etc per plan, silently ignoring the real backend's
// `features` — so a real trial user with `features.scripts: true` still saw Scripts
// locked in the UI because the local PLANS.trial.scripts was hardcoded false).
export const PLANS = {
  trial: { label: 'Free Trial', monthlyCredits: 500, siteCap: 3 },
  starter: { label: 'Starter', monthlyCredits: 500, siteCap: null },
  pro: { label: 'Pro', monthlyCredits: 2500, siteCap: null },
  agency: { label: 'Agency', monthlyCredits: 15000, siteCap: null },
}

// Mock-mode fallback only — used when entitlements.features isn't present (i.e. the
// in-memory mock, which doesn't model per-feature gating this granularly).
const MOCK_FEATURES_BY_PLAN = {
  trial: { scripts: false, proposals: false, contracts: false, fullAnalytics: false, team: false, prioritySupport: false },
  starter: { scripts: false, proposals: false, contracts: false, fullAnalytics: false, team: false, prioritySupport: false },
  pro: { scripts: true, proposals: true, contracts: true, fullAnalytics: true, team: false, prioritySupport: false },
  agency: { scripts: true, proposals: true, contracts: true, fullAnalytics: true, team: true, prioritySupport: true },
}

// Local gate name -> real backend `features` key. Contracts has no dedicated backend
// flag — Contracts+Proposals are one merged Pro wall per UI-Reference/contracts.md, so
// it reuses the `proposals` flag.
const FEATURE_KEY_MAP = {
  scripts: 'scripts',
  proposals: 'proposals',
  contracts: 'proposals',
  fullAnalytics: 'full_analytics',
  team: 'team_members',
  prioritySupport: 'priority_support',
}

export const CREDIT_COSTS = { search: 10, generateSite: 20, script: 3, publish: 0 }

export function planOf(entitlements) {
  return PLANS[entitlements?.plan] || PLANS.trial
}

export function canUseFeature(entitlements, feature) {
  if (entitlements?.features) {
    return !!entitlements.features[FEATURE_KEY_MAP[feature] || feature]
  }
  const mock = MOCK_FEATURES_BY_PLAN[entitlements?.plan] || MOCK_FEATURES_BY_PLAN.trial
  return !!mock[feature]
}

export function hasCredits(entitlements, action) {
  const cost = CREDIT_COSTS[action] ?? 0
  return (entitlements?.credits ?? 0) >= cost
}
