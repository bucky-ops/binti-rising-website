'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

export default function Video() {
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
    <section id="video" ref={sectionRef} className="py-20 md:py-28 bg-gradient-to-br from-binti-navy to-binti-navy/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block text-sm font-bold uppercase tracking-widest text-binti-pink mb-3">
            Educational Content
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Learn About{' '}
            <span className="text-gradient-light">SRHR</span>
          </h2>
          <p className="mt-4 text-white/70 text-lg leading-relaxed">
            Watch our comprehensive guide on Sexual and Reproductive Health and Rights to understand key concepts and empowerment strategies.
          </p>
        </div>

        {/* Video Container */}
        <div className={`max-w-4xl mx-auto ${isVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
          <div className="relative group rounded-2xl overflow-hidden shadow-2xl">
            {/* Background gradient */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-binti-pink via-binti-purple to-binti-teal opacity-75 rounded-2xl blur group-hover:opacity-100 transition duration-500" />
            
            {/* Video Frame */}
            <div className="relative bg-binti-navy rounded-2xl overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-binti-navy/50 to-binti-navy/80 flex items-center justify-center relative">
                {/* Play Button */}
                <a
                  href="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group/play"
                >
                  <div className="absolute inset-0 bg-black/20 group-hover/play:bg-black/40 transition-all duration-300 rounded-2xl" />
                  <div className="flex items-center justify-center h-full">
                    <div className="relative">
                      <div className="absolute inset-0 bg-binti-pink/20 rounded-full blur-lg group-hover/play:bg-binti-pink/40 transition-all duration-300" />
                      <Button
                        size="lg"
                        className="relative bg-binti-pink hover:bg-binti-pink/90 text-white rounded-full w-20 h-20 flex items-center justify-center"
                      >
                        <Play className="w-8 h-8 fill-white" />
                      </Button>
                    </div>
                  </div>
                </a>

                {/* Video Title Overlay */}
                <div className="absolute inset-0 flex items-end">
                  <div className="w-full p-6 bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="text-white font-bold text-lg">Understanding SRHR: Empowerment Through Education</h3>
                    <p className="text-white/70 text-sm mt-1">A comprehensive guide for young women</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Below Video */}
          <div className="mt-8 text-center">
            <p className="text-white/70 mb-4 text-sm">
              Want to join our programs? Learn more about our SRHR initiatives.
            </p>
            <a href="#get-involved" className="inline-block">
              <Button className="bg-binti-pink hover:bg-binti-pink/90 text-white">
                Get Involved Today
              </Button>
            </a>
          </div>
        </div>

        {/* Video Stats */}
        <div className="mt-16 grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          {[
            { label: 'Views', value: '2.5K+' },
            { label: 'Duration', value: '12 mins' },
            { label: 'Rating', value: '4.8/5' },
          ].map((stat) => (
            <div key={stat.label} className={`text-center p-4 rounded-xl bg-white/5 border border-white/10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="text-2xl font-bold text-binti-pink">{stat.value}</div>
              <div className="text-sm text-white/60 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
