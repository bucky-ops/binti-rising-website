'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Heart, HandHeart, Users, Share2, Send, MapPin, Phone, Mail,
  Instagram, Facebook, Twitter, Banknote, Smartphone, Building2,
  CheckCircle2, Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const nairobiSubCounties = [
  'Westlands', 'Dagoretti North', 'Dagoretti South', 'Langata', 'Kibra',
  'Roysambu', 'Kasarani', 'Ruaraka', 'Embakasi Central', 'Embakasi North',
  'Embakasi South', 'Embakasi West', 'Embakasi East', 'Makadara', 'Kamukunji',
  'Starehe', 'Mathare',
];

const partnershipTypes = [
  'Capacity Building',
  'Funding',
  'Technical Support',
  'Research',
  'Advocacy',
];

const skillOptions = [
  'Facilitation', 'Mentoring', 'Counseling', 'Data Collection',
  'Communications', 'IT & Design', 'Finance', 'Legal',
  'Photography/Video', 'Event Planning', 'First Aid', 'Other',
];

export default function GetInvolved() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('donate');

  // Volunteer form state
  const [volunteerForm, setVolunteerForm] = useState({
    name: '', email: '', phone: '', county: '', skills: [] as string[], availability: '', message: '',
  });
  const [partnerForm, setPartnerForm] = useState({
    orgName: '', contactPerson: '', email: '', phone: '', partnershipType: '', message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const addSkill = (skill: string) => {
    if (!volunteerForm.skills.includes(skill) && volunteerForm.skills.length < 5) {
      setVolunteerForm(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    }
    setSkillInput('');
  };

  const removeSkill = (skill: string) => {
    setVolunteerForm(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const filteredSkills = skillOptions.filter(
    s => s.toLowerCase().includes(skillInput.toLowerCase()) && !volunteerForm.skills.includes(s)
  );

  const handleSubmitVolunteer = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting('volunteer');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'volunteer',
          name: volunteerForm.name,
          email: volunteerForm.email,
          phone: volunteerForm.phone,
          county: volunteerForm.county,
          skills: volunteerForm.skills.join(', '),
          availability: volunteerForm.availability,
          message: volunteerForm.message,
        }),
      });
      if (res.ok) {
        setSubmitted('volunteer');
        setVolunteerForm({ name: '', email: '', phone: '', county: '', skills: [], availability: '', message: '' });
      }
    } catch {
      // Error handling
    } finally {
      setIsSubmitting('');
    }
  };

  const handleSubmitPartner = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting('partner');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'partner',
          name: partnerForm.orgName,
          email: partnerForm.email,
          phone: partnerForm.phone,
          contactPerson: partnerForm.contactPerson,
          partnershipType: partnerForm.partnershipType,
          message: partnerForm.message,
        }),
      });
      if (res.ok) {
        setSubmitted('partner');
        setPartnerForm({ orgName: '', contactPerson: '', email: '', phone: '', partnershipType: '', message: '' });
      }
    } catch {
      // Error handling
    } finally {
      setIsSubmitting('');
    }
  };

  return (
    <section id="get-involved" ref={sectionRef} className="py-20 md:py-28 bg-binti-warm-gray/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block text-sm font-bold uppercase tracking-widest text-binti-pink mb-3">
            Make a Difference
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-binti-navy">
            Get{' '}
            <span className="text-gradient">Involved</span>
          </h2>
          <p className="mt-4 text-binti-navy/70 text-base sm:text-lg">
            Whether you donate, volunteer, or partner with us — every action counts in empowering
            young women across Nairobi.
          </p>
        </div>

        {/* Quick Ways to Help */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 ${isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
          {[
            { icon: Heart, title: 'Donate', desc: 'Every KES transforms lives', onClick: () => setActiveTab('donate') },
            { icon: HandHeart, title: 'Volunteer', desc: 'Share your skills and time', onClick: () => setActiveTab('volunteer') },
            { icon: Users, title: 'Partner', desc: 'Collaborate for impact', onClick: () => setActiveTab('partner') },
            { icon: Share2, title: 'Share', desc: 'Spread the word', onClick: () => {} },
          ].map((way, i) => (
            <button
              key={way.title}
              onClick={way.onClick}
              className="group p-5 bg-white rounded-xl border border-binti-warm-gray hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-binti-pink/10 mb-3 transition-transform group-hover:scale-110">
                <way.icon className="w-6 h-6 text-binti-pink" />
              </div>
              <h4 className="font-bold text-binti-navy mb-1">{way.title}</h4>
              <p className="text-xs text-binti-navy/60 leading-relaxed">{way.desc}</p>
            </button>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto mb-8">
            <TabsTrigger value="donate" className="rounded-full text-sm font-medium">
              <Banknote className="w-4 h-4 mr-1.5" />
              Donate
            </TabsTrigger>
            <TabsTrigger value="volunteer" className="rounded-full text-sm font-medium">
              <HandHeart className="w-4 h-4 mr-1.5" />
              Volunteer
            </TabsTrigger>
            <TabsTrigger value="partner" className="rounded-full text-sm font-medium">
              <Users className="w-4 h-4 mr-1.5" />
              Partner
            </TabsTrigger>
          </TabsList>

          {/* Donate Tab */}
          <TabsContent value="donate">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* M-Pesa */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-binti-warm-gray shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-binti-navy text-lg">M-Pesa (Lipa na M-Pesa)</h3>
                    <p className="text-sm text-binti-navy/60">Every KES counts</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-binti-warm-gray/50 rounded-xl">
                    <div className="text-sm text-binti-navy/60 mb-1">Paybill Number</div>
                    <div className="text-2xl font-extrabold text-binti-navy">123456</div>
                  </div>
                  <div className="p-4 bg-binti-warm-gray/50 rounded-xl">
                    <div className="text-sm text-binti-navy/60 mb-1">Account Number</div>
                    <div className="text-xl font-bold text-binti-pink">BINTI</div>
                  </div>
                  <div className="p-3 bg-binti-pink/5 rounded-xl border border-binti-pink/10">
                    <p className="text-xs text-binti-navy/70 leading-relaxed">
                      Go to M-Pesa &gt; Lipa na M-Pesa &gt; Paybill &gt; Enter 123456 &gt; Account: BINTI &gt; Enter Amount &gt; Confirm
                    </p>
                  </div>
                </div>
              </div>

              {/* Bank Transfer */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-binti-warm-gray shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-binti-teal/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-binti-teal" />
                  </div>
                  <div>
                    <h3 className="font-bold text-binti-navy text-lg">Bank Transfer</h3>
                    <p className="text-sm text-binti-navy/60">Direct bank deposit</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-binti-warm-gray/50 rounded-xl">
                    <div className="text-sm text-binti-navy/60 mb-1">Bank</div>
                    <div className="text-lg font-bold text-binti-navy">Kenya Commercial Bank (KCB)</div>
                  </div>
                  <div className="p-4 bg-binti-warm-gray/50 rounded-xl">
                    <div className="text-sm text-binti-navy/60 mb-1">Account Name</div>
                    <div className="text-lg font-bold text-binti-navy">BINTI Rising Initiative</div>
                  </div>
                  <div className="p-4 bg-binti-warm-gray/50 rounded-xl">
                    <div className="text-sm text-binti-navy/60 mb-1">Branch</div>
                    <div className="text-lg font-bold text-binti-navy">Nairobi Main</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Donation Impact Calculator */}
            <div className="mt-8 bg-gradient-navy rounded-2xl p-6 sm:p-8 text-white">
              <h3 className="text-xl font-bold text-center mb-6 flex items-center justify-center gap-2">
                <Heart className="w-5 h-5 text-binti-pink" />
                Your Donation&apos;s Impact
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { amount: 'KES 1,000', impact: '1 training session for a young woman' },
                  { amount: 'KES 5,000', impact: 'Complete pillar training (6-8 sessions)' },
                  { amount: 'KES 10,000', impact: 'Materials for a cohort of 20 participants' },
                  { amount: 'KES 20,000', impact: 'Sponsor an entire cohort of 20 young women' },
                ].map((tier) => (
                  <div key={tier.amount} className="bg-white/10 rounded-xl p-4 text-center border border-white/10">
                    <div className="text-binti-gold font-extrabold text-lg">{tier.amount}</div>
                    <div className="text-white/70 text-xs mt-1 leading-relaxed">{tier.impact}</div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <Button
                  size="lg"
                  className="bg-binti-pink hover:bg-binti-pink/90 text-white rounded-full px-10 shadow-lg shadow-binti-pink/25 transition-all hover:shadow-binti-pink/40"
                >
                  Donate Now - Change a Life
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Volunteer Tab */}
          <TabsContent value="volunteer">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-binti-warm-gray">
                <h3 className="text-xl font-bold text-binti-navy mb-2">Volunteer With Us</h3>
                <p className="text-sm text-binti-navy/60 mb-6">
                  Join our mission in Nairobi. Fill out the form below and we&apos;ll get back to you within 48 hours.
                </p>

                {submitted === 'volunteer' ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                      <CheckCircle2 className="w-7 h-7 text-green-600" />
                    </div>
                    <h4 className="text-lg font-bold text-binti-navy mb-2">Application Submitted!</h4>
                    <p className="text-sm text-binti-navy/60">
                      Thank you for volunteering! We&apos;ll review your application and reach out soon.
                    </p>
                    <Button
                      onClick={() => setSubmitted('')}
                      variant="outline"
                      className="mt-4 border-binti-pink text-binti-pink hover:bg-binti-pink/5"
                    >
                      Submit Another Application
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitVolunteer} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="v-name">Full Name *</Label>
                        <Input
                          id="v-name"
                          placeholder="Your name"
                          value={volunteerForm.name}
                          onChange={(e) => setVolunteerForm(prev => ({ ...prev, name: e.target.value }))}
                          required
                          className="border-binti-warm-gray focus:border-binti-pink focus:ring-binti-pink/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="v-email">Email Address *</Label>
                        <Input
                          id="v-email"
                          type="email"
                          placeholder="your@email.com"
                          value={volunteerForm.email}
                          onChange={(e) => setVolunteerForm(prev => ({ ...prev, email: e.target.value }))}
                          required
                          className="border-binti-warm-gray focus:border-binti-pink focus:ring-binti-pink/20"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="v-phone">Phone Number *</Label>
                        <Input
                          id="v-phone"
                          placeholder="+254 7XX XXX XXX"
                          value={volunteerForm.phone}
                          onChange={(e) => setVolunteerForm(prev => ({ ...prev, phone: e.target.value }))}
                          required
                          className="border-binti-warm-gray focus:border-binti-pink focus:ring-binti-pink/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="v-county">Sub-County in Nairobi *</Label>
                        <select
                          id="v-county"
                          value={volunteerForm.county}
                          onChange={(e) => setVolunteerForm(prev => ({ ...prev, county: e.target.value }))}
                          required
                          className="w-full h-10 rounded-md border border-binti-warm-gray bg-white px-3 py-2 text-sm focus:border-binti-pink focus:ring-binti-pink/20 focus:outline-none"
                        >
                          <option value="">Select sub-county</option>
                          {nairobiSubCounties.map((sc) => (
                            <option key={sc} value={sc}>{sc}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Skills multi-select */}
                    <div className="space-y-2">
                      <Label>Skills (up to 5) *</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {volunteerForm.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-binti-pink/10 text-binti-pink border-binti-pink/20 cursor-pointer hover:bg-binti-pink/20"
                            onClick={() => removeSkill(skill)}
                          >
                            {skill} ×
                          </Badge>
                        ))}
                      </div>
                      <Input
                        placeholder="Type to search skills..."
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onFocus={() => setSkillInput(' ')}
                        className="border-binti-warm-gray focus:border-binti-pink focus:ring-binti-pink/20"
                      />
                      {skillInput && filteredSkills.length > 0 && (
                        <div className="bg-white rounded-lg border border-binti-warm-gray shadow-lg max-h-32 overflow-y-auto custom-scrollbar">
                          {filteredSkills.map((skill) => (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => addSkill(skill)}
                              className="w-full text-left px-3 py-2 text-sm text-binti-navy/70 hover:bg-binti-warm-gray transition-colors"
                            >
                              + {skill}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="v-availability">Availability *</Label>
                      <select
                        id="v-availability"
                        value={volunteerForm.availability}
                        onChange={(e) => setVolunteerForm(prev => ({ ...prev, availability: e.target.value }))}
                        required
                        className="w-full h-10 rounded-md border border-binti-warm-gray bg-white px-3 py-2 text-sm focus:border-binti-pink focus:ring-binti-pink/20 focus:outline-none"
                      >
                        <option value="">Select availability</option>
                        <option value="Weekdays (Morning)">Weekdays (Morning)</option>
                        <option value="Weekdays (Afternoon)">Weekdays (Afternoon)</option>
                        <option value="Weekends">Weekends</option>
                        <option value="Flexible">Flexible</option>
                        <option value="One-time events">One-time events only</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="v-message">Message (optional)</Label>
                      <Textarea
                        id="v-message"
                        placeholder="Tell us about yourself and why you want to volunteer..."
                        rows={3}
                        value={volunteerForm.message}
                        onChange={(e) => setVolunteerForm(prev => ({ ...prev, message: e.target.value }))}
                        className="border-binti-warm-gray focus:border-binti-pink focus:ring-binti-pink/20 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting === 'volunteer'}
                      className="w-full bg-binti-pink hover:bg-binti-pink/90 text-white rounded-full py-6 shadow-lg shadow-binti-pink/25 transition-all hover:shadow-binti-pink/40"
                    >
                      {isSubmitting === 'volunteer' ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Submit Volunteer Application
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Partner Tab */}
          <TabsContent value="partner">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-binti-warm-gray">
                <h3 className="text-xl font-bold text-binti-navy mb-2">Partner With Us</h3>
                <p className="text-sm text-binti-navy/60 mb-6">
                  We welcome partnerships with NGOs, government agencies, private sector, and academic
                  institutions working in Nairobi.
                </p>

                {submitted === 'partner' ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                      <CheckCircle2 className="w-7 h-7 text-green-600" />
                    </div>
                    <h4 className="text-lg font-bold text-binti-navy mb-2">Inquiry Submitted!</h4>
                    <p className="text-sm text-binti-navy/60">
                      Thank you for your interest in partnering with BINTI Rising. We&apos;ll be in touch soon.
                    </p>
                    <Button
                      onClick={() => setSubmitted('')}
                      variant="outline"
                      className="mt-4 border-binti-pink text-binti-pink hover:bg-binti-pink/5"
                    >
                      Submit Another Inquiry
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitPartner} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="p-org">Organization Name *</Label>
                      <Input
                        id="p-org"
                        placeholder="Your organization"
                        value={partnerForm.orgName}
                        onChange={(e) => setPartnerForm(prev => ({ ...prev, orgName: e.target.value }))}
                        required
                        className="border-binti-warm-gray focus:border-binti-pink focus:ring-binti-pink/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="p-contact">Contact Person *</Label>
                      <Input
                        id="p-contact"
                        placeholder="Full name of contact person"
                        value={partnerForm.contactPerson}
                        onChange={(e) => setPartnerForm(prev => ({ ...prev, contactPerson: e.target.value }))}
                        required
                        className="border-binti-warm-gray focus:border-binti-pink focus:ring-binti-pink/20"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="p-email">Email Address *</Label>
                        <Input
                          id="p-email"
                          type="email"
                          placeholder="contact@org.com"
                          value={partnerForm.email}
                          onChange={(e) => setPartnerForm(prev => ({ ...prev, email: e.target.value }))}
                          required
                          className="border-binti-warm-gray focus:border-binti-pink focus:ring-binti-pink/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="p-phone">Phone Number *</Label>
                        <Input
                          id="p-phone"
                          placeholder="+254 7XX XXX XXX"
                          value={partnerForm.phone}
                          onChange={(e) => setPartnerForm(prev => ({ ...prev, phone: e.target.value }))}
                          required
                          className="border-binti-warm-gray focus:border-binti-pink focus:ring-binti-pink/20"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="p-type">Partnership Type *</Label>
                      <select
                        id="p-type"
                        value={partnerForm.partnershipType}
                        onChange={(e) => setPartnerForm(prev => ({ ...prev, partnershipType: e.target.value }))}
                        required
                        className="w-full h-10 rounded-md border border-binti-warm-gray bg-white px-3 py-2 text-sm focus:border-binti-pink focus:ring-binti-pink/20 focus:outline-none"
                      >
                        <option value="">Select partnership type</option>
                        {partnershipTypes.map((pt) => (
                          <option key={pt} value={pt}>{pt}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="p-message">Message *</Label>
                      <Textarea
                        id="p-message"
                        placeholder="Tell us about your organization and the partnership you envision..."
                        rows={4}
                        value={partnerForm.message}
                        onChange={(e) => setPartnerForm(prev => ({ ...prev, message: e.target.value }))}
                        required
                        className="border-binti-warm-gray focus:border-binti-pink focus:ring-binti-pink/20 resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting === 'partner'}
                      className="w-full bg-binti-teal hover:bg-binti-teal/90 text-white rounded-full py-6 shadow-lg shadow-binti-teal/25 transition-all hover:shadow-binti-teal/40"
                    >
                      {isSubmitting === 'partner' ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Submit Partnership Inquiry
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Contact Info */}
        <div className={`mt-12 ${isVisible ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
          <div className="p-6 bg-binti-navy rounded-2xl text-white">
            <h4 className="font-bold mb-4 text-center">Contact Information</h4>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-binti-gold shrink-0" />
                <span className="text-sm text-white/80">Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-binti-gold shrink-0" />
                <span className="text-sm text-white/80">+254 700 000 000</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-binti-gold shrink-0" />
                <span className="text-sm text-white/80">info@bintirising.org</span>
              </div>
            </div>
            {/* Social Links */}
            <div className="mt-4 flex justify-center gap-3">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
              ].map((social) => (
                <button
                  key={social.label}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-binti-pink flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
