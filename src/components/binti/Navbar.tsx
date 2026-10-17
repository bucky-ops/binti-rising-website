'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

/**
 * Route-aware navigation. On the homepage, primary entries smooth-scroll to
 * section anchors; on subpages they navigate to real routes (Phase 3
 * hub-and-spoke internal linking). Every page links to the main hubs.
 */
const homeLinks = [
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Communities', href: '/communities' },
  { label: 'Learn', href: '/learn' },
  { label: 'Stories', href: '/stories' },
];

const subpageLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Communities', href: '/communities' },
  { label: 'Learn', href: '/learn' },
  { label: 'Stories', href: '/stories' },
];

export default function Navbar({ variant }: { variant?: 'transparent' | 'solid' }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const solid = variant === 'solid' || scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = isHome && variant !== 'solid' ? homeLinks : subpageLinks;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="BINTI Rising Initiative home">
            <Image
              src="/binti-logo.jpg"
              alt="BINTI Rising Initiative logo"
              width={48}
              height={48}
              className="rounded-full"
              priority
            />
            <div className="hidden sm:block">
              <span className="text-sm font-bold tracking-wide text-binti-pink">
                BINTI
              </span>
              <span className="block text-[10px] font-medium tracking-widest text-binti-navy/70 uppercase">
                Rising Initiative
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:text-binti-pink ${
                  pathname === link.href
                    ? 'text-binti-pink'
                    : solid
                      ? 'text-binti-navy'
                      : 'text-binti-navy/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              asChild
              className="bg-binti-pink hover:bg-binti-pink/90 text-white rounded-full px-6 shadow-lg shadow-binti-pink/25 transition-all hover:shadow-binti-pink/40"
            >
              <Link href="/get-involved/donate">Donate</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-binti-navy">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-white p-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-4 py-4 border-b border-binti-warm-gray">
                  <div className="flex items-center gap-2">
                    <Image src="/binti-logo.jpg" alt="BINTI Rising logo" width={36} height={36} className="rounded-full" />
                    <span className="font-bold text-binti-pink">BINTI Rising</span>
                  </div>
                </div>
                <div className="flex-1 px-4 py-6">
                  <div className="flex flex-col gap-1">
                    {subpageLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="px-4 py-3 text-binti-navy font-medium rounded-lg hover:bg-binti-warm-gray transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                      href="/faqs"
                      onClick={() => setOpen(false)}
                      className="px-4 py-3 text-binti-navy font-medium rounded-lg hover:bg-binti-warm-gray transition-colors"
                    >
                      FAQs
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setOpen(false)}
                      className="px-4 py-3 text-binti-navy font-medium rounded-lg hover:bg-binti-warm-gray transition-colors"
                    >
                      Contact
                    </Link>
                  </div>
                </div>
                <div className="p-4 border-t border-binti-warm-gray">
                  <Button
                    asChild
                    className="w-full bg-binti-pink hover:bg-binti-pink/90 text-white rounded-full shadow-lg"
                  >
                    <Link href="/get-involved/donate" onClick={() => setOpen(false)}>
                      Donate
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
