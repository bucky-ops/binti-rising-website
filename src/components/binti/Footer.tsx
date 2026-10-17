import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Mail, Instagram, Facebook, Twitter, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ORG } from '@/lib/data/organization';
import { PROGRAMS } from '@/lib/data/programs';

/**
 * Site-wide footer - server component. All org details come from
 * src/lib/data/organization.ts (R7). No phone number is shown until a real
 * one is confirmed (PENDING_HUMAN_INPUT).
 */
const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Programs', href: '/programs' },
  { label: 'Communities', href: '/communities' },
  { label: 'Our Team', href: '/about/team' },
  { label: 'Governance', href: '/about/governance' },
  { label: 'Stories', href: '/stories' },
  { label: 'Learn', href: '/learn' },
  { label: 'Resources', href: '/resources' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact', href: '/contact' },
];

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/bintirising' },
  { label: 'Facebook', href: 'https://www.facebook.com/bintirising' },
  { label: 'Twitter / X', href: 'https://twitter.com/bintirising' },
];

export default function Footer() {
  return (
    <footer className="bg-binti-navy text-white mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Organization Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/binti-logo-white.jpg"
                alt="BINTI Rising Initiative logo"
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

            <Button
              asChild
              className="w-full bg-binti-pink hover:bg-binti-pink/90 text-white rounded-full shadow-lg shadow-binti-pink/25 transition-all hover:shadow-binti-pink/40 mb-6"
            >
              <Link href="/get-involved/donate">
                <Heart className="w-4 h-4 mr-2" />
                Make a Donation
              </Link>
            </Button>

            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${ORG.legalName} on ${social.label}`}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-binti-pink flex items-center justify-center transition-colors"
                >
                  {social.label === 'Instagram' ? (
                    <Instagram className="w-4 h-4" />
                  ) : social.label === 'Facebook' ? (
                    <Facebook className="w-4 h-4" />
                  ) : (
                    <Twitter className="w-4 h-4" />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <nav aria-label="Quick links">
            <h2 className="font-bold text-sm uppercase tracking-wider mb-4 text-binti-gold">
              Quick Links
            </h2>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-binti-pink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Programs */}
          <nav aria-label="Program links">
            <h2 className="font-bold text-sm uppercase tracking-wider mb-4 text-binti-gold">
              Programs
            </h2>
            <ul className="space-y-2.5">
              {PROGRAMS.map((program) => (
                <li key={program.slug}>
                  <Link
                    href={`/programs/${program.slug}`}
                    className="text-sm text-white/60 hover:text-binti-pink transition-colors"
                  >
                    {program.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/get-involved/volunteer"
                  className="text-sm text-white/60 hover:text-binti-pink transition-colors"
                >
                  Volunteer With Us
                </Link>
              </li>
              <li>
                <Link
                  href="/get-involved/partner"
                  className="text-sm text-white/60 hover:text-binti-pink transition-colors"
                >
                  Partner With Us
                </Link>
              </li>
            </ul>
          </nav>

          {/* Column 4: Contact */}
          <div>
            <h2 className="font-bold text-sm uppercase tracking-wider mb-4 text-binti-gold">
              Contact
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-binti-pink shrink-0 mt-0.5" />
                <span className="text-sm text-white/60">
                  Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-binti-pink shrink-0" />
                <a href={`mailto:${ORG.email}`} className="text-sm text-white/60 hover:text-binti-pink transition-colors">
                  {ORG.email}
                </a>
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
              &copy; {new Date().getFullYear()} {ORG.legalName}. All rights reserved.
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
