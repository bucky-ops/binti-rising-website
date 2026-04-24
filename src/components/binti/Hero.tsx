'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles, ShieldCheck, Globe, BarChart3 } from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const handleScrollDown = () => {
    const about = document.querySelector('#about');
    if (about) about.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20" />
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-binti-pink/10 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-binti-purple/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-binti-gold/5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 pt-28 md:pt-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-binti-pink/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-binti-pink" />
              <span className="text-sm font-medium text-binti-pink">Registered CBO in Nairobi, Kenya</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-binti-navy leading-tight">
              BINTI{' '}
              <span className="text-gradient">RISING</span>
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-binti-navy/90">
                Initiative
              </span>
            </h1>

            <p className="mt-4 text-xl sm:text-2xl font-medium text-binti-purple">
              Empowering Young Women to Rise
            </p>

            <p className="mt-6 text-base sm:text-lg text-binti-navy/70 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              We are a community-based organization in Nairobi, Kenya dedicated to empowering young women
              aged 15-25 through comprehensive programs in sexual &amp; reproductive health, mental wellbeing,
              financial literacy, and women&apos;s leadership.
            </p>

            <p className="mt-3 text-base sm:text-lg text-binti-pink font-semibold max-w-xl mx-auto lg:mx-0">
              Your support directly transforms young women&apos;s lives in Nairobi.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-binti-pink hover:bg-binti-pink/90 text-white rounded-full px-8 py-6 text-base shadow-lg shadow-binti-pink/25 transition-all hover:shadow-binti-pink/40 hover:scale-105"
              >
                <a href="#programs">Our Programs</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-binti-pink text-binti-pink hover:bg-binti-pink/5 rounded-full px-8 py-6 text-base transition-all hover:scale-105"
              >
                <a href="#get-involved">Get Involved</a>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
              {[
                { icon: ShieldCheck, label: 'Registered CBO' },
                { icon: Globe, label: 'UN-aligned Programs' },
                { icon: BarChart3, label: 'Evidence-based M&E' },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-binti-warm-gray shadow-sm"
                >
                  <badge.icon className="w-3.5 h-3.5 text-binti-teal" />
                  <span className="text-xs font-medium text-binti-navy/70">{badge.label}</span>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 flex flex-wrap gap-8 justify-center lg:justify-start">
              {[
                { value: '500+', label: 'Young Women' },
                { value: '10+', label: 'Nairobi Communities' },
                { value: '26', label: 'Sessions' },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center animate-fade-in-up" style={{ animationDelay: `${0.3 + i * 0.15}s` }}>
                  <div className="text-2xl sm:text-3xl font-extrabold text-binti-pink">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-binti-navy/60 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Logo/Image */}
          <div className="flex justify-center lg:justify-end animate-fade-in delay-300">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-binti-pink/10 blur-2xl scale-110" />
              <div className="relative animate-float">
                <Image
                  src="/binti-logo.jpg"
                  alt="BINTI Rising Initiative Logo"
                  width={400}
                  height={400}
                  className="rounded-full shadow-2xl shadow-binti-pink/20"
                  priority
                />
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-2 animate-fade-in delay-500">
                <span className="text-sm font-bold text-binti-teal">Est. 2024</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-4 py-2 animate-fade-in delay-600">
                <span className="text-sm font-bold text-binti-purple">Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <button
            onClick={handleScrollDown}
            className="flex flex-col items-center gap-1 text-binti-navy/40 hover:text-binti-pink transition-colors"
            aria-label="Scroll down"
          >
            <span className="text-xs font-medium">Explore</span>
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
