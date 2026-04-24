'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Users, MapPin, BookOpen, Star, Heart } from 'lucide-react';

const stats = [
  { icon: Users, value: 500, suffix: '+', label: 'Young Women Reached' },
  { icon: MapPin, value: 10, suffix: '+', label: 'Nairobi Communities' },
  { icon: BookOpen, value: 26, suffix: '+', label: 'Sessions Completed' },
  { icon: Star, value: 50, suffix: '+', label: 'Community Partners' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span ref={(node) => {
      if (node && !started) {
        const observer = new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
          { threshold: 0.5 }
        );
        observer.observe(node);
      }
    }}>
      {count}{suffix}
    </span>
  );
}

export default function About() {
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
    <section id="about" ref={sectionRef} className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className={isVisible ? 'animate-slide-in-left' : 'opacity-0'}>
            <span className="inline-block text-sm font-bold uppercase tracking-widest text-binti-pink mb-3">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-binti-navy leading-tight">
              Empowering the{' '}
              <span className="text-gradient">Next Generation</span>
            </h2>
            <p className="mt-6 text-binti-navy/70 text-base sm:text-lg leading-relaxed">
              <strong className="text-binti-navy">BINTI Rising Initiative</strong> is a registered
              Community-Based Organization in Kenya, dedicated to transforming the lives of young women
              aged 15-25. Founded in 2024, we work across{' '}
              <strong className="text-binti-navy">10+ communities in Nairobi</strong> to provide
              holistic empowerment programs that address the real needs of young women in the city.
            </p>
            <p className="mt-4 text-binti-navy/70 text-base sm:text-lg leading-relaxed">
              Our comprehensive approach addresses the interconnected challenges young women face from
              limited access to sexual and reproductive health education, to mental health struggles,
              financial barriers, and gender-based violence. We believe in meeting young women where
              they are and walking alongside them on their journey to empowerment.
            </p>
            <p className="mt-4 text-binti-navy/70 text-base sm:text-lg leading-relaxed">
              Through our four program pillars: <strong className="text-binti-pink">SRHR</strong>,
              {' '}<strong className="text-binti-purple">Mental Health</strong>,
              {' '}<strong className="text-binti-teal">Financial Freedom</strong>, and
              {' '}<strong className="text-binti-gold">Women Empowerment</strong> - we&apos;re building
              a generation of informed, resilient, and economically independent young women leaders.
            </p>

            {/* Why Support BINTI - Donor paragraph */}
            <div className="mt-6 p-5 bg-gradient-to-r from-binti-pink/5 to-binti-purple/5 rounded-xl border border-binti-pink/10">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-binti-pink" />
                <h3 className="font-bold text-binti-navy text-sm">Why Support BINTI?</h3>
              </div>
              <p className="text-binti-navy/70 text-sm leading-relaxed">
                Every shilling donated to BINTI Rising goes directly toward transforming a young woman&apos;s life.
                Our evidence-based programs are aligned with UN Sustainable Development Goals and measured
                through rigorous monitoring and evaluation. With over 500 young women already reached across
                Nairobi communities, your investment creates ripple effects empowered women lift families
                and communities out of poverty.
              </p>
            </div>

            {/* Trust indicators */}
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-binti-gold text-binti-gold" />
                  ))}
                </div>
                <span className="text-sm text-binti-navy/60 font-medium">Registered CBO</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-binti-warm-gray rounded-full">
                <MapPin className="w-3.5 h-3.5 text-binti-pink" />
                <span className="text-sm text-binti-navy/60 font-medium">Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className={isVisible ? 'animate-slide-in-right' : 'opacity-0'}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-binti-pink/10 via-binti-purple/10 to-binti-teal/10 rounded-3xl blur-xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/about-visual.jpg"
                  alt="Young women in BINTI Rising programs"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Overlay card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 animate-fade-in delay-500">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-binti-pink/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-binti-pink" />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-binti-navy">500+</div>
                    <div className="text-xs text-binti-navy/60">Lives Impacted</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Counter Row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center p-6 rounded-2xl bg-binti-warm-gray/60 hover:bg-binti-warm-gray transition-colors ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${0.3 + i * 0.15}s` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white shadow-sm mb-4">
                <stat.icon className="w-7 h-7 text-binti-pink" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-binti-navy">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1 text-sm text-binti-navy/60 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
