import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/binti/Navbar'), { ssr: true });
const Hero = dynamic(() => import('@/components/binti/Hero'), { ssr: true });
const About = dynamic(() => import('@/components/binti/About'), { ssr: true });
const Programs = dynamic(() => import('@/components/binti/Programs'), { ssr: true });
const Leadership = dynamic(() => import('@/components/binti/Leadership'), { ssr: true });
const Impact = dynamic(() => import('@/components/binti/Impact'), { ssr: true });
const Stories = dynamic(() => import('@/components/binti/Stories'), { ssr: true });
const Video = dynamic(() => import('@/components/binti/Video'), { ssr: true });
const FAQ = dynamic(() => import('@/components/binti/FAQ'), { ssr: true });
const GetInvolved = dynamic(() => import('@/components/binti/GetInvolved'), { ssr: true });
const Footer = dynamic(() => import('@/components/binti/Footer'), { ssr: true });
const ScrollToTop = dynamic(() => import('@/components/binti/ScrollToTop'), { ssr: true });

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Programs />
        <Leadership />
        <Impact />
        <Stories />
        <Video />
        <FAQ />
        <GetInvolved />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
