import React, { useState } from 'react';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong.');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Failed to send. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-autumn-50 border border-autumn-200 rounded-xl p-6 text-center">
        <p className="font-serif text-lg font-semibold text-earth-800 mb-1">Message Sent</p>
        <p className="text-earth-600 text-sm">Thank you for reaching out. We'll get back to you soon.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-autumn-700 text-sm font-medium hover:text-autumn-800 underline underline-offset-2 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-lg border border-earth-200 bg-white text-earth-800 text-sm placeholder:text-earth-400 focus:outline-none focus:ring-2 focus:ring-autumn-300 focus:border-autumn-400 transition-colors"
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-lg border border-earth-200 bg-white text-earth-800 text-sm placeholder:text-earth-400 focus:outline-none focus:ring-2 focus:ring-autumn-300 focus:border-autumn-400 transition-colors"
        />
      </div>
      <div>
        <textarea
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-earth-200 bg-white text-earth-800 text-sm placeholder:text-earth-400 focus:outline-none focus:ring-2 focus:ring-autumn-300 focus:border-autumn-400 transition-colors resize-none"
        />
      </div>
      {status === 'error' && (
        <p className="text-red-600 text-xs">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full py-2 px-4 rounded-lg bg-autumn-600 text-white text-sm font-medium hover:bg-autumn-700 focus:outline-none focus:ring-2 focus:ring-autumn-300 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};
