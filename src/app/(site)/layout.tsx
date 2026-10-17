import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/binti/Navbar'), { ssr: true });
const Footer = dynamic(() => import('@/components/binti/Footer'), { ssr: true });

/**
 * Shared chrome for all content pages (route group - does not affect URLs).
 * Server components: Navbar (solid) + Footer wrap every page.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar variant="solid" />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
