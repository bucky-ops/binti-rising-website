import Navbar from '@/components/binti/Navbar';
import Hero from '@/components/binti/Hero';
import About from '@/components/binti/About';
import Programs from '@/components/binti/Programs';
import Leadership from '@/components/binti/Leadership';
import Impact from '@/components/binti/Impact';
import Stories from '@/components/binti/Stories';
import GetInvolved from '@/components/binti/GetInvolved';
import Footer from '@/components/binti/Footer';
import ScrollToTop from '@/components/binti/ScrollToTop';

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
        <GetInvolved />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
