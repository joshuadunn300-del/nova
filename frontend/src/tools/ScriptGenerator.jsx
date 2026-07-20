import { useState } from 'react';
import ProGate from './ProGate';
import { WEBSITE_WEAKNESSES, generateScript } from './api';

function ScriptGeneratorForm() {
  const [form, setForm] = useState({
    businessName: '',
    niche: '',
    yourName: '',
    tone: 'casual, confident, direct',
    websiteWeakness: WEBSITE_WEAKNESSES[0],
    convictionPoints: '',
  });
  const [state, setState] = useState({ loading: false, error: null, script: null });

  const update = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (state.loading) return; // double-submit guard
    if (!form.businessName.trim()) {
      setState({ loading: false, error: 'Business name is required.', script: null });
      return;
    }
    setState({ loading: true, error: null, script: null });
    try {
      const result = await generateScript(form);
      setState({ loading: false, error: null, script: result.script_text });
    } catch (err) {
      setState({ loading: false, error: err.message, script: null });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Cold Call Script Generator</h2>
      <form onSubmit={submit} className="space-y-4">
        <label className="block">
          <span className="text-sm text-slate-300">Business name *</span>
          <input
            className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white"
            value={form.businessName}
            onChange={update('businessName')}
            required
          />
        </label>
        <label className="block">
          <span className="text-sm text-slate-300">Niche</span>
          <input
            className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white"
            placeholder="e.g. plumber"
            value={form.niche}
            onChange={update('niche')}
          />
        </label>
        <label className="block">
          <span className="text-sm text-slate-300">Your name</span>
          <input
            className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white"
            value={form.yourName}
            onChange={update('yourName')}
          />
        </label>
        <label className="block">
          <span className="text-sm text-slate-300">Tone</span>
          <input
            className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white"
            value={form.tone}
            onChange={update('tone')}
          />
        </label>
        <label className="block">
          <span className="text-sm text-slate-300">Website weakness *</span>
          <select
            className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white"
            value={form.websiteWeakness}
            onChange={update('websiteWeakness')}
          >
            {WEBSITE_WEAKNESSES.map(w => <option key={w} value={w}>{w}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="text-sm text-slate-300">Key conviction points / features to improve</span>
          <textarea
            className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white"
            rows={3}
            value={form.convictionPoints}
            onChange={update('convictionPoints')}
          />
        </label>
        <button
          type="submit"
          disabled={state.loading}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium disabled:opacity-50"
        >
          {state.loading ? 'Generating… (3 credits)' : 'Generate Script (3 credits)'}
        </button>
      </form>

      {state.error && <p className="mt-4 text-sm text-red-500">{state.error}</p>}
      {state.script && (
        <div className="mt-6 p-4 rounded-lg bg-slate-800 border border-slate-700 whitespace-pre-wrap text-slate-100">
          {state.script}
        </div>
      )}
    </div>
  );
}

export default function ScriptGenerator() {
  return (
    <ProGate feature="The Script Generator">
      <ScriptGeneratorForm />
    </ProGate>
  );
}
