'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Impact', href: '#impact' },
  { label: 'Stories', href: '#stories' },
  { label: 'Get Involved', href: '#get-involved' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-2">
            <Image
              src="/binti-logo.jpg"
              alt="BINTI Rising Initiative"
              width={48}
              height={48}
              className="rounded-full"
              priority
            />
            <div className="hidden sm:block">
              <span className={`text-sm font-bold tracking-wide ${scrolled ? 'text-binti-pink' : 'text-binti-pink'}`}>
                BINTI
              </span>
              <span className="block text-[10px] font-medium tracking-widest text-binti-navy/70 uppercase">
                Rising Initiative
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:text-binti-pink ${
                  scrolled ? 'text-binti-navy' : 'text-binti-navy/80'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              asChild
              className="bg-binti-pink hover:bg-binti-pink/90 text-white rounded-full px-6 shadow-lg shadow-binti-pink/25 transition-all hover:shadow-binti-pink/40"
            >
              <a href="#get-involved" onClick={(e) => handleNavClick(e, '#get-involved')}>
                Get Involved
              </a>
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
                    <Image src="/binti-logo.jpg" alt="BINTI" width={36} height={36} className="rounded-full" />
                    <span className="font-bold text-binti-pink">BINTI Rising</span>
                  </div>
                </div>
                <div className="flex-1 px-4 py-6">
                  <div className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="px-4 py-3 text-binti-navy font-medium rounded-lg hover:bg-binti-warm-gray transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="p-4 border-t border-binti-warm-gray">
                  <Button
                    asChild
                    className="w-full bg-binti-pink hover:bg-binti-pink/90 text-white rounded-full shadow-lg"
                  >
                    <a href="#get-involved" onClick={(e) => handleNavClick(e, '#get-involved')}>
                      Get Involved
                    </a>
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
