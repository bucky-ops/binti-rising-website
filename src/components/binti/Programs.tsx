'use client';

import { useEffect, useRef, useState } from 'react';
import { Heart, Brain, Wallet, Crown, ArrowRight, CheckCircle2, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SessionTopic {
  title: string;
  desc: string;
}

interface ProgramDetail {
  fullDescription: string;
  sessions: SessionTopic[];
  outcomes: string[];
  color: string;
  accentClass: string;
  bgClass: string;
  iconTitle: string;
}

const programDetails: Record<string, ProgramDetail> = {
  SRHR: {
    iconTitle: 'Sexual & Reproductive Health Rights',
    fullDescription:
      'Our Sexual and Reproductive Health Rights (SRHR) program is the cornerstone of BINTI Rising\'s empowerment framework. Over 8 comprehensive sessions, young women gain critical knowledge about their bodies, health rights, and access to services that many have never received before. In Nairobi\'s communities, where cultural taboos often prevent open conversations about sexual health, this program creates a safe, judgment-free space for young women to learn, ask questions, and build confidence in making informed decisions about their reproductive health.',
    sessions: [
      { title: 'Understanding Your Body', desc: 'Anatomy, puberty changes, menstrual health, and hygiene management for young women.' },
      { title: 'Consent & Boundaries', desc: 'Understanding personal boundaries, recognizing consent, and saying no with confidence.' },
      { title: 'Family Planning Methods', desc: 'Overview of modern contraceptive methods, effectiveness, and accessing reproductive health services.' },
      { title: 'STIs & HIV Prevention', desc: 'Comprehensive education on sexually transmitted infections, prevention strategies, and testing.' },
      { title: 'Pregnancy & Maternal Health', desc: 'Antenatal care, nutrition during pregnancy, and safe delivery practices in Nairobi.' },
      { title: 'Gender-Based Violence Awareness', desc: 'Recognizing GBV, understanding legal protections, and knowing where to get help.' },
      { title: 'Body Image & Self-Esteem', desc: 'Building positive body image, resisting harmful beauty standards, and self-acceptance.' },
      { title: 'Accessing Health Services', desc: 'Navigating Nairobi\'s health facilities, understanding patient rights, and health insurance options.' },
    ],
    outcomes: [
      'Increased knowledge of SRHR from 40% to 80% baseline',
      'Improved utilization of reproductive health services',
      'Enhanced ability to recognize and report GBV',
      'Better menstrual health management practices',
      'Increased confidence in accessing health facilities',
    ],
    color: 'bg-binti-pink',
    accentClass: 'text-binti-pink',
    bgClass: 'bg-binti-pink/10',
  },
  MentalHealth: {
    iconTitle: 'Mental Health & Wellbeing',
    fullDescription:
      'Mental health remains one of the most stigmatized topics in Nairobi\'s communities. BINTI Rising\'s Mental Health & Wellbeing program breaks these barriers by creating supportive spaces where young women can openly discuss their emotional struggles. Over 6 structured sessions, participants learn evidence-based coping strategies, build emotional resilience, and develop self-care practices that serve them for life. Our facilitators are trained in psychological first aid and create an environment of trust and confidentiality.',
    sessions: [
      { title: 'Understanding Mental Health', desc: 'What mental health means, common conditions, and breaking stigma in our communities.' },
      { title: 'Stress Management', desc: 'Identifying stress triggers, practical coping techniques, and relaxation exercises.' },
      { title: 'Emotional Regulation', desc: 'Recognizing emotions, healthy expression techniques, and building emotional intelligence.' },
      { title: 'Self-Care Practices', desc: 'Creating daily self-care routines, mindfulness, and prioritizing mental wellbeing.' },
      { title: 'Building Support Systems', desc: 'Identifying trusted people, building healthy relationships, and knowing when to seek professional help.' },
      { title: 'Resilience & Goal Setting', desc: 'Bouncing back from adversity, personal visioning, and setting achievable life goals.' },
    ],
    outcomes: [
      'Improved mental wellbeing scores from 30% to 70%',
      'Reduced stigma around mental health discussions',
      'Established personal self-care routines',
      'Stronger peer support networks',
      'Increased willingness to seek professional help',
    ],
    color: 'bg-binti-purple',
    accentClass: 'text-binti-purple',
    bgClass: 'bg-binti-purple/10',
  },
  FinancialFreedom: {
    iconTitle: 'Financial Freedom & Literacy',
    fullDescription:
      'Economic empowerment is essential for young women\'s autonomy and independence. BINTI Rising\'s Financial Freedom & Literacy program equips participants with practical financial skills that many schools and families fail to teach. Over 6 hands-on sessions, young women learn budgeting, saving strategies, entrepreneurship basics, and how to navigate Nairobi\'s financial landscape. Many graduates have gone on to start small businesses, join savings groups (chamas), and become financially independent for the first time.',
    sessions: [
      { title: 'Financial Literacy Basics', desc: 'Understanding money, income vs. expenses, and why financial knowledge matters for women.' },
      { title: 'Budgeting & Money Management', desc: 'Creating personal budgets, tracking spending, and making smart financial decisions.' },
      { title: 'Saving Strategies', desc: 'Different saving methods, joining chamas (savings groups), building an emergency fund.' },
      { title: 'Entrepreneurship Basics', desc: 'Identifying business opportunities in Nairobi, writing a simple business plan, and starting small.' },
      { title: 'Understanding Credit & Loans', desc: 'How loans work, responsible borrowing, avoiding debt traps, and building credit history.' },
      { title: 'Income Generation & Networking', desc: 'Multiple income streams, leveraging networks in Nairobi, and digital financial tools like M-Pesa.' },
    ],
    outcomes: [
      'Regular saving habits increase from 20% to 65%',
      'Participants start income-generating activities',
      'Improved financial decision-making skills',
      'Formation of peer savings groups (chamas)',
      'Greater economic independence and confidence',
    ],
    color: 'bg-binti-teal',
    accentClass: 'text-binti-teal',
    bgClass: 'bg-binti-teal/10',
  },
  Leadership: {
    iconTitle: 'Women Empowerment & Leadership',
    fullDescription:
      'The Women Empowerment & Leadership program is where young women discover their voice and power. Over 6 transformative sessions, participants develop self-advocacy skills, learn about their legal rights, and build the confidence to take on leadership roles in their communities. This program challenges harmful gender norms, fosters civic engagement, and creates a pipeline of young women leaders who will drive change in Nairobi and beyond. Graduates become ambassadors who mentor the next cohort.',
    sessions: [
      { title: 'Self-Advocacy & Communication', desc: 'Speaking up confidently, assertive communication, and expressing needs effectively.' },
      { title: 'Women\'s Rights & Legal Framework', desc: 'Understanding constitutional rights, gender equality laws, and legal protections for women in Kenya.' },
      { title: 'Leadership Skills Development', desc: 'Different leadership styles, team building, decision-making, and conflict resolution.' },
      { title: 'Community Engagement & Civic Participation', desc: 'Getting involved in community development, understanding local governance, and civic duties.' },
      { title: 'Gender Norms & Equality', desc: 'Challenging harmful stereotypes, promoting gender equality, and creating inclusive spaces.' },
      { title: 'Mentorship & Paying It Forward', desc: 'Becoming a mentor, sharing knowledge, and creating lasting impact in Nairobi communities.' },
    ],
    outcomes: [
      'Leadership competency scores rise from 25% to 70%',
      'Increased participation in community decision-making',
      'Stronger self-advocacy and communication skills',
      'Formation of peer mentorship networks',
      'Greater awareness of women\'s legal rights',
    ],
    color: 'bg-binti-gold',
    accentClass: 'text-binti-gold',
    bgClass: 'bg-binti-gold/10',
  },
};

const programs = [
  {
    icon: Heart,
    title: 'Sexual & Reproductive Health Rights',
    shortTitle: 'SRHR',
    key: 'SRHR',
    sessions: 8,
    description:
      'Comprehensive education on sexual and reproductive health, body autonomy, consent, family planning, and access to health services. Empowering young women with knowledge to make informed decisions about their bodies and health.',
    accentClass: 'text-binti-pink',
    bgClass: 'bg-binti-pink/10',
    borderClass: 'border-binti-pink/20',
    hoverBorderClass: 'hover:border-binti-pink/40',
  },
  {
    icon: Brain,
    title: 'Mental Health & Wellbeing',
    shortTitle: 'Mental Health',
    key: 'MentalHealth',
    sessions: 6,
    description:
      'Building mental resilience through stress management, emotional regulation, self-care practices, and creating safe spaces for young women to discuss their mental health challenges without stigma.',
    accentClass: 'text-binti-purple',
    bgClass: 'bg-binti-purple/10',
    borderClass: 'border-binti-purple/20',
    hoverBorderClass: 'hover:border-binti-purple/40',
  },
  {
    icon: Wallet,
    title: 'Financial Freedom & Literacy',
    shortTitle: 'Financial Freedom',
    key: 'FinancialFreedom',
    sessions: 6,
    description:
      'Equipping young women with practical financial skills including budgeting, saving, entrepreneurship, and income generation. Building pathways to economic independence and breaking cycles of poverty.',
    accentClass: 'text-binti-teal',
    bgClass: 'bg-binti-teal/10',
    borderClass: 'border-binti-teal/20',
    hoverBorderClass: 'hover:border-binti-teal/40',
  },
  {
    icon: Crown,
    title: 'Women Empowerment & Leadership',
    shortTitle: 'Leadership',
    key: 'Leadership',
    sessions: 6,
    description:
      'Developing leadership skills, self-advocacy, community engagement, and confidence building. Preparing young women to take on leadership roles in their communities and beyond.',
    accentClass: 'text-binti-gold',
    bgClass: 'bg-binti-gold/10',
    borderClass: 'border-binti-gold/20',
    hoverBorderClass: 'hover:border-binti-gold/40',
  },
];

export default function Programs() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleJoinProgram = () => {
    setOpenDialog(null);
    setTimeout(() => {
      const el = document.querySelector('#get-involved');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  const activeDetail = openDialog ? programDetails[openDialog] : null;
  const activeProgram = programs.find((p) => p.key === openDialog);

  return (
    <section id="programs" ref={sectionRef} className="py-20 md:py-28 bg-binti-warm-gray/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block text-sm font-bold uppercase tracking-widest text-binti-pink mb-3">
            Our Programs
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-binti-navy">
            Four Pillars of{' '}
            <span className="text-gradient">Empowerment</span>
          </h2>
          <p className="mt-4 text-binti-navy/70 text-base sm:text-lg">
            Our holistic approach addresses the interconnected challenges young women face through
            four comprehensive program pillars, totaling 26 structured sessions.
          </p>
        </div>

        {/* Program Cards Grid */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {programs.map((program, i) => (
            <div
              key={program.shortTitle}
              className={`group relative bg-white rounded-2xl p-6 sm:p-8 border-2 ${program.borderClass} ${program.hoverBorderClass} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${0.1 + i * 0.15}s` }}
            >
              {/* Icon & Sessions Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${program.bgClass} transition-transform group-hover:scale-110`}>
                  <program.icon className={`w-7 h-7 ${program.accentClass}`} />
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${program.bgClass} ${program.accentClass}`}>
                  {program.sessions} Sessions
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl sm:text-2xl font-bold text-binti-navy mb-3">
                {program.title}
              </h3>
              <p className="text-binti-navy/60 text-sm sm:text-base leading-relaxed mb-6">
                {program.description}
              </p>

              {/* CTA */}
              <Button
                variant="ghost"
                className={`${program.accentClass} hover:${program.bgClass} p-0 h-auto font-semibold group/btn`}
                onClick={() => setOpenDialog(program.key)}
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>

        {/* Total Sessions Highlight */}
        <div className={`mt-16 text-center ${isVisible ? 'animate-fade-in-up delay-600' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-4 bg-white rounded-full px-8 py-4 shadow-lg border border-binti-warm-gray">
            <span className="text-binti-navy/70 font-medium">Total Program Sessions:</span>
            <span className="text-2xl font-extrabold text-gradient">26 Sessions</span>
            <span className="text-binti-navy/40">|</span>
            <span className="text-binti-navy/70 font-medium">Duration:</span>
            <span className="text-2xl font-extrabold text-binti-pink">6 Months</span>
          </div>
        </div>
      </div>

      {/* Program Detail Dialog */}
      <Dialog open={!!openDialog} onOpenChange={(open) => { if (!open) setOpenDialog(null); }}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] p-0 overflow-hidden">
          {activeDetail && activeProgram && (
            <>
              {/* Dialog Header with color bar */}
              <div className={`${activeDetail.color} px-6 py-5 text-white`}>
                <DialogHeader>
                  <DialogTitle className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                      <activeProgram.icon className="w-5 h-5 text-white" />
                    </div>
                    {activeDetail.iconTitle}
                  </DialogTitle>
                  <DialogDescription className="text-white/80 text-sm mt-1">
                    {activeProgram.sessions} comprehensive sessions delivered over the program period
                  </DialogDescription>
                </DialogHeader>
              </div>

              <ScrollArea className="max-h-[65vh] custom-scrollbar">
                <div className="px-6 py-6 space-y-6">
                  {/* Full Description */}
                  <div>
                    <p className="text-binti-navy/70 text-sm sm:text-base leading-relaxed">
                      {activeDetail.fullDescription}
                    </p>
                  </div>

                  {/* Session Topics */}
                  <div>
                    <h4 className="font-bold text-binti-navy text-base mb-3 flex items-center gap-2">
                      <div className={`w-1.5 h-5 ${activeDetail.color} rounded-full`} />
                      Session Topics
                    </h4>
                    <div className="space-y-3">
                      {activeDetail.sessions.map((session, idx) => (
                        <div
                          key={session.title}
                          className="flex gap-3 p-3 rounded-lg bg-binti-warm-gray/50 hover:bg-binti-warm-gray/80 transition-colors"
                        >
                          <div className={`flex-shrink-0 w-7 h-7 rounded-full ${activeDetail.bgClass} ${activeDetail.accentClass} flex items-center justify-center text-xs font-bold`}>
                            {idx + 1}
                          </div>
                          <div>
                            <div className="font-semibold text-binti-navy text-sm">{session.title}</div>
                            <div className="text-binti-navy/60 text-xs mt-0.5">{session.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expected Outcomes */}
                  <div>
                    <h4 className="font-bold text-binti-navy text-base mb-3 flex items-center gap-2">
                      <div className={`w-1.5 h-5 ${activeDetail.color} rounded-full`} />
                      Expected Outcomes
                    </h4>
                    <div className="grid gap-2">
                      {activeDetail.outcomes.map((outcome) => (
                        <div key={outcome} className="flex items-start gap-2">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${activeDetail.accentClass}`} />
                          <span className="text-binti-navy/70 text-sm">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Join CTA */}
                  <div className="pt-4 border-t border-binti-warm-gray">
                    <Button
                      onClick={handleJoinProgram}
                      className={`w-full ${activeDetail.color} text-white rounded-full py-6 text-base font-semibold shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl`}
                    >
                      <span className="flex items-center gap-2">
                        Join This Program
                        <ArrowDown className="w-4 h-4" />
                      </span>
                    </Button>
                    <p className="text-center text-xs text-binti-navy/50 mt-2">
                      Scroll down to the Get Involved section to sign up
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
