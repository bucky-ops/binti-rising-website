'use client';

import Image from 'next/image';
import { MapPin, Mail, Phone, Instagram, Facebook, Twitter, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Our Impact', href: '#impact' },
  { label: 'Stories', href: '#stories' },
  { label: 'Get Involved', href: '#get-involved' },
];

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-binti-navy text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Organization Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/binti-logo-white.jpg"
                alt="BINTI Rising Initiative"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <div className="font-bold text-lg">BINTI Rising</div>
                <div className="text-xs text-white/50 tracking-wider uppercase">Initiative</div>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Empowering young women aged 15-25 through comprehensive programs in SRHR, mental
              health, financial literacy, and women&apos;s leadership in Nairobi, Kenya.
            </p>

            {/* Donate Button */}
            <Button
              asChild
              className="w-full bg-binti-pink hover:bg-binti-pink/90 text-white rounded-full shadow-lg shadow-binti-pink/25 transition-all hover:shadow-binti-pink/40 mb-6"
            >
              <a href="#get-involved" onClick={(e) => handleNavClick(e, '#get-involved')}>
                <Heart className="w-4 h-4 mr-2" />
                Make a Donation
              </a>
            </Button>

            <div className="flex gap-3">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
              ].map((social) => (
                <button
                  key={social.label}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-binti-pink flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-binti-gold">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-white/60 hover:text-binti-pink transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-binti-gold">
              Programs
            </h4>
            <ul className="space-y-2.5">
              {[
                'SRHR Education',
                'Mental Health & Wellbeing',
                'Financial Freedom',
                'Women Empowerment',
              ].map((program) => (
                <li key={program}>
                  <a
                    href="#programs"
                    onClick={(e) => handleNavClick(e, '#programs')}
                    className="text-sm text-white/60 hover:text-binti-pink transition-colors"
                  >
                    {program}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-binti-gold">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-binti-pink shrink-0 mt-0.5" />
                <span className="text-sm text-white/60">
                  Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-binti-pink shrink-0" />
                <span className="text-sm text-white/60">info@bintirising.org</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-binti-pink shrink-0" />
                <span className="text-sm text-white/60">+254 700 000 000</span>
              </li>
            </ul>

            {/* CBO Badge */}
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-xs text-white/60 font-medium">Registered CBO in Kenya</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40">
              &copy; {new Date().getFullYear()} BINTI Rising Initiative. All rights reserved.
            </p>
            <p className="text-sm text-white/40 flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-binti-pink fill-binti-pink" /> for young women in Nairobi
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
