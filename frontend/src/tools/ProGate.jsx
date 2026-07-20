import { useEffect, useState } from 'react';
import { getEntitlements } from './api';

// Scripts + Proposals are Pro/Agency-only per the spec's pricing table
// (Free trial + Starter explicitly exclude them). Wraps a tool and shows an
// upsell instead of the tool when the plan doesn't qualify.
const GATED_PLANS = ['pro', 'agency'];

export default function ProGate({ feature, children }) {
  const [state, setState] = useState({ loading: true, error: null, entitlements: null });

  useEffect(() => {
    let cancelled = false;
    getEntitlements()
      .then(entitlements => { if (!cancelled) setState({ loading: false, error: null, entitlements }); })
      .catch(error => { if (!cancelled) setState({ loading: false, error, entitlements: null }); });
    return () => { cancelled = true; };
  }, []);

  if (state.loading) {
    return <div className="p-6 text-sm text-slate-400">Checking your plan…</div>;
  }

  if (state.error) {
    return (
      <div className="p-6 text-sm text-red-500">
        Couldn't verify your plan. Try again in a moment.
      </div>
    );
  }

  const plan = (state.entitlements?.plan || '').toLowerCase();
  const allowed = GATED_PLANS.includes(plan);

  if (!allowed) {
    return (
      <div className="p-8 rounded-xl border border-slate-700 bg-slate-900 text-center">
        <h3 className="text-lg font-semibold text-white">{feature} is a Pro feature</h3>
        <p className="mt-2 text-sm text-slate-400">
          Upgrade to Pro or Agency to unlock {feature.toLowerCase()}.
        </p>
        <a href="/app/Billing" className="inline-block mt-4 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium">
          Upgrade plan
        </a>
      </div>
    );
  }

  return children;
}
