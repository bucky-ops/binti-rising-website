'use client';

import { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const nairobiSubCounties = [
  'Westlands', 'Dagoretti North', 'Dagoretti South', 'Langata', 'Kibra',
  'Roysambu', 'Kasarani', 'Ruaraka', 'Embakasi Central', 'Embakasi North',
  'Embakasi South', 'Embakasi West', 'Embakasi East', 'Makadara', 'Kamukunji',
  'Starehe', 'Mathare',
];

const skillOptions = [
  'Facilitation', 'Mentoring', 'Counseling', 'Data Collection',
  'Communications', 'IT & Design', 'Finance', 'Legal',
  'Photography/Video', 'Event Planning', 'First Aid', 'Other',
];

/**
 * Volunteer application form (client island) - posts to /api/contact.
 * Mirrors the homepage Get Involved volunteer form exactly (same endpoint,
 * same fields) so submissions are handled identically.
 */
export default function VolunteerForm() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', county: '', skills: [] as string[], availability: '', message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const addSkill = (skill: string) => {
    if (!form.skills.includes(skill) && form.skills.length < 5) {
      setForm((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
    }
  };

  const removeSkill = (skill: string) => {
    setForm((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));
  };

  const suggestions = skillOptions.filter(
    (s) => !form.skills.includes(s) && (form.skills.length < 5)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'volunteer',
          name: form.name,
          email: form.email,
          phone: form.phone,
          county: form.county,
          skills: form.skills.join(', '),
          availability: form.availability,
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
        <h3 className="text-lg font-bold text-binti-navy mb-2">Application submitted!</h3>
        <p className="text-sm text-binti-navy/60">
          Thank you for volunteering. We&apos;ll review your application and reach out within 48 hours.
        </p>
        <Button
          onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', county: '', skills: [], availability: '', message: '' }); }}
          variant="outline"
          className="mt-4 border-binti-pink text-binti-pink hover:bg-binti-pink/5"
        >
          Submit another application
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Volunteer application form">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vol-name">Full Name *</Label>
          <Input
            id="vol-name"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            required
            className="border-binti-warm-gray focus:border-binti-pink focus:ring-binti-pink/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vol-email">Email *</Label>
          <Input
            id="vol-email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            required
            className="border-binti-warm-gray focus:border-binti-pink focus:ring-binti-pink/20"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vol-phone">Phone number</Label>
          <Input
            id="vol-phone"
            type="tel"
            placeholder="+254 7XX XXX XXX"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            className="border-binti-warm-gray focus:border-binti-pink focus:ring-binti-pink/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vol-county">Nairobi sub-county</Label>
          <select
            id="vol-county"
            value={form.county}
            onChange={(e) => setForm((p) => ({ ...p, county: e.target.value }))}
            className="w-full rounded-md border border-binti-warm-gray bg-white px-3 py-2 text-sm focus:border-binti-pink focus:ring-binti-pink/20"
          >
            <option value="">Select your area</option>
            {nairobiSubCounties.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Skills you can offer (up to 5)</Label>
        <div className="flex flex-wrap gap-2">
          {form.skills.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1 rounded-full bg-binti-pink/10 text-binti-pink text-xs font-medium px-3 py-1"
            >
              {s}
              <button type="button" onClick={() => removeSkill(s)} aria-label={`Remove ${s}`} className="hover:text-binti-navy">
                &times;
              </button>
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => addSkill(s)}
              className="text-xs rounded-full border border-binti-warm-gray px-2.5 py-1 text-binti-navy/60 hover:border-binti-pink hover:text-binti-pink transition-colors"
            >
              + {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="vol-availability">Availability</Label>
        <Input
          id="vol-availability"
          placeholder="e.g. Saturday mornings, 2 weekdays after 5pm"
          value={form.availability}
          onChange={(e) => setForm((p) => ({ ...p, availability: e.target.value }))}
          className="border-binti-warm-gray focus:border-binti-pink focus:ring-binti-pink/20"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="vol-message">Why do you want to volunteer? *</Label>
        <Textarea
          id="vol-message"
          placeholder="Tell us a little about yourself and how you'd like to help"
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
        {submitting ? 'Submitting...' : 'Submit application'}
      </Button>
    </form>
  );
}
