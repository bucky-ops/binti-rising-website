'use client';

import { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const topics = [
  'General question',
  'Join a program',
  'Volunteering',
  'Partnership',
  'Donation',
  'Media / press',
  'My data / story removal',
];

/** General contact form (client island) - posts to /api/contact. */
export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'general',
          name: form.name,
          email: form.email,
          message: `[Topic: ${form.topic || 'General'}] ${form.message}`,
        }),
      });
      if (!res.ok) throw new Error('failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please email info@bintirising.org directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle2 className="w-7 h-7 text-green-600" aria-hidden />
        </div>
        <h3 className="text-lg font-bold text-binti-navy mb-2">Message sent!</h3>
        <p className="text-sm text-binti-navy/60">
          Thank you for reaching out. We will get back to you soon.
        </p>
        <Button
          onClick={() => { setSubmitted(false); setForm({ name: '', email: '', topic: '', message: '' }); }}
          variant="outline"
          className="mt-4 border-binti-pink text-binti-pink hover:bg-binti-pink/5"
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Contact form">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ct-name">Full name *</Label>
          <Input
            id="ct-name"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            required
            className="border-binti-warm-gray focus:border-binti-pink focus:ring-binti-pink/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ct-email">Email *</Label>
          <Input
            id="ct-email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            required
            className="border-binti-warm-gray focus:border-binti-pink focus:ring-binti-pink/20"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="ct-topic">What is this about?</Label>
        <select
          id="ct-topic"
          value={form.topic}
          onChange={(e) => setForm((p) => ({ ...p, topic: e.target.value }))}
          className="w-full rounded-md border border-binti-warm-gray bg-white px-3 py-2 text-sm focus:border-binti-pink focus:ring-binti-pink/20"
        >
          {topics.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="ct-message">Your message *</Label>
        <Textarea
          id="ct-message"
          placeholder="How can we help?"
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          required
          rows={5}
          className="border-binti-warm-gray focus:border-binti-pink focus:ring-binti-pink/20"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600" role="alert">{error}</p>
      )}

      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-binti-pink hover:bg-binti-pink/90 text-white rounded-full shadow-lg shadow-binti-pink/25"
      >
        {submitting ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden />
        ) : (
          <Send className="w-4 h-4 mr-2" aria-hidden />
        )}
        {submitting ? 'Sending...' : 'Send message'}
      </Button>
      <p className="text-xs text-binti-navy/50 leading-relaxed">
        By sending this message you agree that we may contact you about your
        inquiry. We never share your details with third parties.
      </p>
    </form>
  );
}
