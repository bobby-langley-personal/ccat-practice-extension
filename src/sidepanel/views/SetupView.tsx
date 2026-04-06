import { useState } from 'react';
import { Key } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

export default function SetupView({ onComplete }: Props) {
  const [apiKey, setApiKey] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!apiKey.trim()) { setError('Please enter an API key.'); return; }
    setSaving(true);
    await chrome.storage.local.set({ ccat_anthropic_key: apiKey.trim() });
    setSaving(false);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <Key className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold">CCAT Practice</h1>
          <p className="text-gray-400 mt-1 text-sm">Enter your Anthropic API key to get AI-powered explanations</p>
        </div>

        <div className="space-y-3">
          <input
            type="password"
            placeholder="sk-ant-..."
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSave()}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg py-3 text-sm font-semibold transition-colors"
          >
            {saving ? 'Saving…' : 'Save & Start'}
          </button>
        </div>

        <p className="text-center text-xs text-gray-500">
          Get a key at{' '}
          <a
            href="https://console.anthropic.com"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 underline"
          >
            console.anthropic.com
          </a>
        </p>
      </div>
    </div>
  );
}
