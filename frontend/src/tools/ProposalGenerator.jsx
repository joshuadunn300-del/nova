import { useState } from 'react';
import ProGate from './ProGate';
import { saveProposal } from './api';

const DEFAULT_TIERS = [
  { name: 'Starter Site', price: '', description: '' },
  { name: 'Growth Package', price: '', description: '' },
];

function ProposalGeneratorForm() {
  const [form, setForm] = useState({
    clientName: '',
    projectSummary: '',
    scope: '',
    terms: 'Net 15. 50% deposit to begin, balance due on delivery.',
    tiers: DEFAULT_TIERS,
  });
  const [state, setState] = useState({ saving: false, error: null, saved: false });

  const update = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const updateTier = (index, key) => (e) => {
    setForm(f => {
      const tiers = f.tiers.map((t, i) => i === index ? { ...t, [key]: e.target.value } : t);
      return { ...f, tiers };
    });
  };

  const addTier = () => setForm(f => ({ ...f, tiers: [...f.tiers, { name: '', price: '', description: '' }] }));
  const removeTier = (index) => setForm(f => ({ ...f, tiers: f.tiers.filter((_, i) => i !== index) }));

  const submit = async (e) => {
    e.preventDefault();
    if (state.saving) return; // double-submit guard
    if (!form.clientName.trim()) {
      setState({ saving: false, error: 'Client name is required.', saved: false });
      return;
    }
    const validTiers = form.tiers.filter(t => t.name.trim());
    if (validTiers.length === 0) {
      setState({ saving: false, error: 'Add at least one pricing tier.', saved: false });
      return;
    }
    setState({ saving: true, error: null, saved: false });
    try {
      await saveProposal({ ...form, tiers: validTiers, status: 'draft' });
      setState({ saving: false, error: null, saved: true });
    } catch (err) {
      setState({ saving: false, error: err.message, saved: false });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Proposal Generator</h2>
      <form onSubmit={submit} className="space-y-4">
        <label className="block">
          <span className="text-sm text-slate-300">Client name *</span>
          <input
            className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white"
            value={form.clientName}
            onChange={update('clientName')}
            required
          />
        </label>
        <label className="block">
          <span className="text-sm text-slate-300">Project summary</span>
          <textarea
            className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white"
            rows={3}
            value={form.projectSummary}
            onChange={update('projectSummary')}
          />
        </label>
        <label className="block">
          <span className="text-sm text-slate-300">Scope of work</span>
          <textarea
            className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white"
            rows={3}
            value={form.scope}
            onChange={update('scope')}
          />
        </label>

        <div>
          <span className="text-sm text-slate-300">Pricing tiers</span>
          <div className="mt-2 space-y-3">
            {form.tiers.map((tier, i) => (
              <div key={i} className="flex gap-2 items-start p-3 rounded-lg bg-slate-800 border border-slate-700">
                <div className="flex-1 space-y-2">
                  <input
                    className="w-full rounded bg-slate-900 border border-slate-700 px-2 py-1 text-white text-sm"
                    placeholder="Tier name"
                    value={tier.name}
                    onChange={updateTier(i, 'name')}
                  />
                  <input
                    className="w-full rounded bg-slate-900 border border-slate-700 px-2 py-1 text-white text-sm"
                    placeholder="Price"
                    value={tier.price}
                    onChange={updateTier(i, 'price')}
                  />
                  <input
                    className="w-full rounded bg-slate-900 border border-slate-700 px-2 py-1 text-white text-sm"
                    placeholder="Description"
                    value={tier.description}
                    onChange={updateTier(i, 'description')}
                  />
                </div>
                <button type="button" onClick={() => removeTier(i)} className="text-slate-400 hover:text-red-400 text-sm">
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addTier} className="mt-2 text-sm text-indigo-400">
            + Add tier
          </button>
        </div>

        <label className="block">
          <span className="text-sm text-slate-300">Terms</span>
          <textarea
            className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white"
            rows={2}
            value={form.terms}
            onChange={update('terms')}
          />
        </label>

        <button
          type="submit"
          disabled={state.saving}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium disabled:opacity-50"
        >
          {state.saving ? 'Saving…' : 'Save Proposal'}
        </button>
      </form>

      {state.error && <p className="mt-4 text-sm text-red-500">{state.error}</p>}
      {state.saved && <p className="mt-4 text-sm text-green-400">Proposal saved as draft.</p>}
    </div>
  );
}

export default function ProposalGenerator() {
  return (
    <ProGate feature="The Proposal Generator">
      <ProposalGeneratorForm />
    </ProGate>
  );
}
