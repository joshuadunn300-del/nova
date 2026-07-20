// Thin adapter over Terminal 1's Base44 backend functions.
// TODO(integration): replace fetch stubs with the real Base44 SDK client once
// Terminal 1 logs the functions live (see BUILD-LOG "Terminal 1"). Do not put
// API keys here — Base44 handles auth via the logged-in session.

const WEBSITE_WEAKNESSES = [
  'No website',
  'Slow website',
  'Outdated design',
  "Doesn't load on mobile",
  'Hard to find/no SEO',
  'Looks unprofessional',
];

async function generateScript({ businessName, niche, yourName, tone, websiteWeakness, convictionPoints }) {
  if (!businessName || !businessName.trim()) throw new Error('businessName is required');
  if (!websiteWeakness || !WEBSITE_WEAKNESSES.includes(websiteWeakness)) {
    throw new Error('websiteWeakness must be one of the preset options');
  }
  const res = await fetch('/api/functions/generateScript', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ businessName, niche, yourName, tone, websiteWeakness, convictionPoints }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`generateScript failed (${res.status}): ${body || 'unknown error'}`);
  }
  return res.json(); // { script_text, credits_remaining }
}

async function getEntitlements() {
  const res = await fetch('/api/functions/getEntitlements');
  if (!res.ok) throw new Error(`getEntitlements failed (${res.status})`);
  return res.json(); // { plan, credits, features: { scripts, proposals, fullAnalytics } }
}

async function saveProposal(proposal) {
  const res = await fetch('/api/entities/Proposal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(proposal),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`saveProposal failed (${res.status}): ${body || 'unknown error'}`);
  }
  return res.json();
}

export { WEBSITE_WEAKNESSES, generateScript, getEntitlements, saveProposal };
