'use client';

import { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const partnershipTypes = [
  'Funding',
  'Capacity Building',
  'Technical Support',
  'Research',
  'Advocacy',
  'In-kind donation',
  'Other',
];

/** Partnership inquiry form (client island) - posts to /api/contact. */
export default function PartnerForm() {
  const [form, setForm] = useState({
    orgName: '', contactPerson: '', email: '', phone: '', partnershipType: '', message: '',
  });
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
          type: 'partner',
          name: form.orgName,
          email: form.email,
          phone: form.phone,
          contactPerson: form.contactPerson,
          partnershipType: form.partnershipType,
          message: form.message,
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
        <h3 className="text-lg font-bold text-binti-navy mb-2">Inquiry sent!</h3>
        <p className="text-sm text-binti-navy/60">
          Thank you for your interest in partnering with us. Our team will review and respond soon.
        </p>
        <Button
          onClick={() => { setSubmitted(false); setForm({ orgName: '', contactPerson: '', email: '', phone: '', partnershipType: '', message: '' }); }}
          variant="outline"
          className="mt-4 border-binti-pink text-binti-pink hover:bg-binti-pink/5"
        >
          Send another inquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Partnership inquiry form">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="par-org">Organisation name *</Label>
          <Input
            id="par-org"
            placeholder="Your organisation"
            value={form.orgName}
            onChange={(e) => setForm((p) => ({ ...p, orgName: e.target.value }))}
            required
            className="border-binti-warm-gray focus:border-binti-pink focus:ring-binti-pink/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="par-person">Contact person *</Label>
          <Input
            id="par-person"
            placeholder="Full name"
            value={form.contactPerson}
            onChange={(e) => setForm((p) => ({ ...p, contactPerson: e.target.value }))}
            required
            className="border-binti-warm-gray focus:border-binti-pink focus:ring-binti-pink/20"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="par-email">Email *</Label>
          <Input
            id="par-email"
            type="email"
            placeholder="you@organisation.org"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            required
            className="border-binti-warm-gray focus:border-binti-pink focus:ring-binti-pink/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="par-phone">Phone</Label>
          <Input
            id="par-phone"
            type="tel"
            placeholder="+254 7XX XXX XXX"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            className="border-binti-warm-gray focus:border-binti-pink focus:ring-binti-pink/20"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="par-type">Partnership type</Label>
        <select
          id="par-type"
          value={form.partnershipType}
          onChange={(e) => setForm((p) => ({ ...p, partnershipType: e.target.value }))}
          className="w-full rounded-md border border-binti-warm-gray bg-white px-3 py-2 text-sm focus:border-binti-pink focus:ring-binti-pink/20"
        >
          <option value="">Select a type</option>
          {partnershipTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="par-message">About your proposed partnership *</Label>
        <Textarea
          id="par-message"
          placeholder="Tell us about your organisation and how you'd like to work together"
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          required
          rows={4}
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
        {submitting ? 'Sending...' : 'Send inquiry'}
      </Button>
    </form>
  );
}
