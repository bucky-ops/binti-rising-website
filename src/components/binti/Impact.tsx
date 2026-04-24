'use client';

import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Target, Heart, Banknote } from 'lucide-react';

const kpis = [
  {
    name: 'Knowledge Level',
    before: 40,
    target: 80,
    description: 'SRHR, health, and rights knowledge',
    color: 'bg-binti-pink',
    textColor: 'text-binti-pink',
  },
  {
    name: 'Service Utilization',
    before: 15,
    target: 60,
    description: 'Health services access and utilization',
    color: 'bg-binti-purple',
    textColor: 'text-binti-purple',
  },
  {
    name: 'Mental Wellbeing',
    before: 30,
    target: 70,
    description: 'Overall mental health scores',
    color: 'bg-binti-teal',
    textColor: 'text-binti-teal',
  },
  {
    name: 'Savings Habits',
    before: 20,
    target: 65,
    description: 'Regular saving behavior among participants',
    color: 'bg-binti-gold',
    textColor: 'text-binti-gold',
  },
  {
    name: 'Leadership Skills',
    before: 25,
    target: 70,
    description: 'Self-rated leadership competency',
    color: 'bg-binti-navy',
    textColor: 'text-binti-navy',
  },
  {
    name: 'GBV Awareness',
    before: 35,
    target: 75,
    description: 'Gender-based violence awareness and reporting',
    color: 'bg-binti-pink',
    textColor: 'text-binti-pink',
  },
];

const donationImpact = [
  { amount: 'KES 1,000', impact: '1 session for a young woman', icon: '📚' },
  { amount: 'KES 5,000', impact: 'Complete pillar training (6-8 sessions)', icon: '🎓' },
  { amount: 'KES 10,000', impact: 'Materials & supplies for a cohort of 20', icon: '📦' },
  { amount: 'KES 20,000', impact: 'Sponsor an entire cohort of 20 young women', icon: '🌟' },
  { amount: 'KES 50,000', impact: 'Fund a full program cycle for one community', icon: '💪' },
];

function ProgressBar({ before, target, color, index, isVisible }: {
  before: number;
  target: number;
  color: string;
  index: number;
  isVisible: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/70 font-medium">Baseline: {before}%</span>
        <span className="text-white font-bold">Target: {target}%</span>
      </div>
      <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
        {/* Before bar */}
        <div
          className={`absolute top-0 left-0 h-full bg-white/20 rounded-full ${isVisible ? 'animate-progress' : ''}`}
          style={{ width: `${before}%`, animationDelay: `${index * 0.15}s` }}
        />
        {/* Target bar */}
        <div
          className={`absolute top-0 left-0 h-full ${color} rounded-full ${isVisible ? 'animate-progress' : ''}`}
          style={{ width: `${target}%`, animationDelay: `${index * 0.15 + 0.3}s` }}
        />
      </div>
    </div>
  );
}

export default function Impact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="impact" ref={sectionRef} className="py-20 md:py-28 bg-gradient-navy relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-binti-pink/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-binti-purple/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-4">
            <Target className="w-4 h-4 text-binti-gold" />
            <span className="text-sm font-medium text-binti-gold">Monitoring & Evaluation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Measuring Our{' '}
            <span className="text-binti-gold">Impact</span>
          </h2>
        </div>

        {/* Narrative */}
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed">
            Every young woman who joins BINTI Rising in Nairobi experiences measurable change. Our evidence-based
            programs track 6 key performance indicators — from SRHR knowledge and health service utilization to
            mental wellbeing, savings habits, leadership skills, and GBV awareness. The results speak for
            themselves: young women who enter our programs with limited knowledge leave as informed, resilient,
            and economically empowered leaders.
          </p>
          <p className="text-binti-gold/90 text-base sm:text-lg font-medium mt-4">
            Every KES you invest creates a measurable, lasting impact in a young woman&apos;s life.
          </p>
        </div>

        {/* KPI Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpis.map((kpi, i) => (
            <div
              key={kpi.name}
              className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <TrendingUp className={`w-5 h-5 ${kpi.textColor}`} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">{kpi.name}</h3>
                  <p className="text-white/50 text-xs">{kpi.description}</p>
                </div>
              </div>

              <div className="flex items-end gap-2 mb-4">
                <span className="text-4xl font-extrabold text-white">{kpi.before}%</span>
                <div className="flex items-center gap-1 mb-1.5">
                  <svg className="w-5 h-5 text-binti-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span className="text-2xl font-extrabold text-binti-gold">{kpi.target}%</span>
                </div>
              </div>

              <ProgressBar
                before={kpi.before}
                target={kpi.target}
                color={kpi.color}
                index={i}
                isVisible={isVisible}
              />
            </div>
          ))}
        </div>

        {/* Impact Per KES Section */}
        <div className={`mt-16 ${isVisible ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-binti-gold">
              <Banknote className="w-5 h-5" />
              <h3 className="text-xl font-bold text-white">Your Donation&apos;s Impact</h3>
            </div>
            <p className="text-white/50 text-sm mt-2">
              Transparent, measurable outcomes for every contribution
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {donationImpact.map((item, i) => (
              <div
                key={item.amount}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-binti-gold font-extrabold text-lg">{item.amount}</div>
                <div className="text-white/60 text-xs mt-1 leading-relaxed">{item.impact}</div>
              </div>
            ))}
          </div>
        </div>

        {/* M&E Approach Note */}
        <div className={`mt-12 text-center ${isVisible ? 'animate-fade-in-up delay-600' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <Heart className="w-4 h-4 text-binti-pink" />
            <p className="text-white/50 text-sm max-w-xl">
              Our M&E framework uses baseline and endline assessments, quarterly reviews, and participatory
              feedback to ensure programs are evidence-based and responsive to community needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
