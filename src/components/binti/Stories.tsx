'use client';

import { useEffect, useRef, useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Quote, MapPin } from 'lucide-react';

const stories = [
  {
    name: 'Amina Wanjiku',
    location: 'Kayole, Nairobi',
    quote:
      'Before joining BINTI Rising, I had no idea about my reproductive health rights. The SRHR sessions gave me knowledge and confidence I never had. Now I help other young women in Kayole understand their bodies and make informed choices about their health.',
    pillar: 'SRHR',
    pillarColor: 'bg-binti-pink/10 text-binti-pink border-binti-pink/20',
    initials: 'AW',
  },
  {
    name: 'Wanjiru Njoroge',
    location: 'Kibra, Nairobi',
    quote:
      'The financial literacy program changed my life completely. I learned how to budget, save, and even started a small business selling handmade jewelry. For the first time, I feel economically independent and hopeful about my future.',
    pillar: 'Financial Freedom',
    pillarColor: 'bg-binti-teal/10 text-binti-teal border-binti-teal/20',
    initials: 'WN',
  },
  {
    name: 'Faith Atieno',
    location: 'Dagoretti, Nairobi',
    quote:
      'Mental health was never something we talked about in my community. BINTI Rising created a safe space for us to share our struggles. I learned coping strategies that help me every day. I am stronger and more resilient now.',
    pillar: 'Mental Health',
    pillarColor: 'bg-binti-purple/10 text-binti-purple border-binti-purple/20',
    initials: 'FA',
  },
  {
    name: 'Njeri Kamau',
    location: 'Mathare, Nairobi',
    quote:
      'The Women Empowerment program taught me that my voice matters. I now speak up at community meetings and advocate for girls\' education. I never saw myself as a leader, but BINTI Rising helped me discover my potential.',
    pillar: 'Leadership',
    pillarColor: 'bg-binti-gold/10 text-binti-gold border-binti-gold/20',
    initials: 'NK',
  },
  {
    name: 'Akello Obondo',
    location: 'Embakasi, Nairobi',
    quote:
      'After completing all four program pillars, I became a peer mentor. I now help new participants navigate the program and share my own journey. Watching other young women transform is the most rewarding experience of my life.',
    pillar: 'SRHR',
    pillarColor: 'bg-binti-pink/10 text-binti-pink border-binti-pink/20',
    initials: 'AO',
  },
  {
    name: 'Syombua Musyoka',
    location: 'Rongai, Nairobi',
    quote:
      'I used to think starting a business was only for people with capital. Through BINTI\'s entrepreneurship sessions, I learned that with KES 500 and determination, I could start something meaningful. Today I run a small grocery kiosk.',
    pillar: 'Financial Freedom',
    pillarColor: 'bg-binti-teal/10 text-binti-teal border-binti-teal/20',
    initials: 'SM',
  },
];

const partners = [
  'Nairobi County Government',
  'Nairobi City County Health Dept.',
  'Local Community Health Units',
  'Women\'s Groups in Nairobi',
  'Nairobi Youth Organizations',
  'Local Health Facilities',
];

export default function Stories() {
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
    <section id="stories" ref={sectionRef} className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block text-sm font-bold uppercase tracking-widest text-binti-pink mb-3">
            Community Impact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-binti-navy">
            Stories of{' '}
            <span className="text-gradient">Change</span>
          </h2>
          <p className="mt-4 text-binti-navy/70 text-base sm:text-lg">
            Hear from the young women across Nairobi whose lives have been transformed through our programs.
            Their stories inspire our work every day.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {stories.map((story, i) => (
            <div
              key={story.name}
              className={`group relative bg-binti-warm-gray/40 rounded-2xl p-6 sm:p-8 hover:bg-binti-warm-gray/70 transition-all duration-300 hover:shadow-lg ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-12 h-12 text-binti-pink" />
              </div>

              {/* Quote Text */}
              <p className="text-binti-navy/70 text-sm sm:text-base leading-relaxed mb-6 relative">
                &ldquo;{story.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                  <AvatarFallback className="bg-binti-pink text-white font-bold text-sm">
                    {story.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-bold text-binti-navy text-sm">{story.name}</div>
                  <div className="flex items-center gap-1 text-binti-navy/50 text-xs">
                    <MapPin className="w-3 h-3" />
                    {story.location}
                  </div>
                </div>
              </div>

              {/* Pillar Badge */}
              <Badge
                variant="outline"
                className={`mt-4 text-xs ${story.pillarColor}`}
              >
                {story.pillar}
              </Badge>
            </div>
          ))}
        </div>

        {/* Community Partners */}
        <div className={`mt-20 ${isVisible ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
          <div className="text-center mb-8">
            <h3 className="text-lg font-bold text-binti-navy">Our Community Partners</h3>
            <p className="text-sm text-binti-navy/50 mt-1">Working together for lasting impact across Nairobi</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {partners.map((partner) => (
              <div
                key={partner}
                className="px-4 py-2 bg-binti-warm-gray/60 rounded-full text-sm text-binti-navy/70 font-medium border border-binti-warm-gray hover:border-binti-pink/30 hover:text-binti-pink transition-colors"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
