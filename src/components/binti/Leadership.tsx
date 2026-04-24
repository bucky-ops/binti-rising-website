'use client';

import { useEffect, useRef, useState } from 'react';
import { Linkedin } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Leader {
  name: string;
  title: string;
  initials: string;
  bio: string;
  color: string;
  initialsBg: string;
}

const leaders: Leader[] = [
  {
    name: 'BINTI Founder',
    title: 'Founder & Executive Director',
    initials: 'ED',
    bio: 'Visionary leader driving BINTI\'s mission to empower young women across Nairobi communities.',
    color: 'border-binti-pink/20 hover:border-binti-pink/50',
    initialsBg: 'bg-binti-pink',
  },
  {
    name: 'Programs Manager',
    title: 'Programs Manager',
    initials: 'PM',
    bio: 'Oversees all 4 program pillars, ensuring quality delivery and alignment with community needs.',
    color: 'border-binti-purple/20 hover:border-binti-purple/50',
    initialsBg: 'bg-binti-purple',
  },
  {
    name: 'M&E Lead',
    title: 'Monitoring & Evaluation Lead',
    initials: 'ME',
    bio: 'Ensures evidence-based programming through rigorous data collection and impact measurement.',
    color: 'border-binti-teal/20 hover:border-binti-teal/50',
    initialsBg: 'bg-binti-teal',
  },
  {
    name: 'Finance Lead',
    title: 'Finance & Admin Lead',
    initials: 'FA',
    bio: 'Manages financial systems, compliance, and administrative operations with transparency.',
    color: 'border-binti-gold/20 hover:border-binti-gold/50',
    initialsBg: 'bg-binti-gold',
  },
  {
    name: 'Board Chairperson',
    title: 'Board Chairperson',
    initials: 'BC',
    bio: 'Provides strategic governance, oversight, and guidance for organizational growth and impact.',
    color: 'border-binti-navy/20 hover:border-binti-navy/50',
    initialsBg: 'bg-binti-navy',
  },
  {
    name: 'Board Secretary',
    title: 'Board Secretary',
    initials: 'BS',
    bio: 'Ensures compliance, governance standards, and documentation across all board activities.',
    color: 'border-binti-pink/20 hover:border-binti-pink/50',
    initialsBg: 'bg-binti-pink',
  },
];

export default function Leadership() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="leadership" ref={sectionRef} className="py-20 md:py-28 bg-binti-warm-gray/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block text-sm font-bold uppercase tracking-widest text-binti-pink mb-3">
            Our Team
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-binti-navy">
            Our{' '}
            <span className="text-gradient">Leadership</span>
          </h2>
          <p className="mt-4 text-binti-navy/70 text-base sm:text-lg">
            A dedicated team of professionals and volunteers committed to empowering young women
            across Nairobi, Kenya.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaders.map((leader, i) => (
            <div
              key={leader.title}
              className={`group bg-white rounded-2xl p-6 border-2 ${leader.color} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                  <AvatarFallback className={`${leader.initialsBg} text-white font-bold text-lg`}>
                    {leader.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-binti-navy text-base truncate">{leader.name}</h3>
                  <p className="text-xs text-binti-navy/60 font-medium">{leader.title}</p>
                </div>
                <button
                  aria-label={`${leader.name} LinkedIn profile`}
                  className="w-8 h-8 rounded-full bg-binti-warm-gray flex items-center justify-center text-binti-navy/40 hover:bg-binti-pink/10 hover:text-binti-pink transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-binti-navy/60 leading-relaxed">{leader.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
