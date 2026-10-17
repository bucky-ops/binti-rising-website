import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import JsonLdGraph from '@/components/seo/json-ld';
import { FaqTeaser } from '@/components/binti/FaqList';
import { HOME_FAQ_TEASER } from '@/lib/data/faqs';
import { buildMetadata } from '@/lib/seo/metadata';
import { pageGraph, fullPageGraph } from '@/lib/seo/schema';
import { HelpCircle } from 'lucide-react';

const Navbar = dynamic(() => import('@/components/binti/Navbar'), { ssr: true });
const Hero = dynamic(() => import('@/components/binti/Hero'), { ssr: true });
const About = dynamic(() => import('@/components/binti/About'), { ssr: true });
const Programs = dynamic(() => import('@/components/binti/Programs'), { ssr: true });
const Leadership = dynamic(() => import('@/components/binti/Leadership'), { ssr: true });
const Impact = dynamic(() => import('@/components/binti/Impact'), { ssr: true });
const Stories = dynamic(() => import('@/components/binti/Stories'), { ssr: true });
const Video = dynamic(() => import('@/components/binti/Video'), { ssr: true });
const GetInvolved = dynamic(() => import('@/components/binti/GetInvolved'), { ssr: true });
const Footer = dynamic(() => import('@/components/binti/Footer'), { ssr: true });
const ScrollToTop = dynamic(() => import('@/components/binti/ScrollToTop'), { ssr: true });

export const metadata: Metadata = buildMetadata({
  path: '/',
  title: 'BINTI Rising Initiative | Empowering Young Women in Nairobi',
  description:
    'Registered Kenyan CBO empowering young women 15-25 in Nairobi through SRHR, mental health, financial literacy and leadership programs. Join or donate today.',
});

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <JsonLdGraph
        nodes={fullPageGraph(
          pageGraph({
          path: '/',
          title: 'BINTI Rising Initiative | Empowering Young Women in Nairobi',
          description:
            'Registered Kenyan CBO empowering young women 15-25 in Nairobi through SRHR, mental health, financial literacy and leadership programs.',
          crumbs: [{ name: 'Home', path: '/' }],
        }))}
      />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Programs />
        <Leadership />
        <Impact />
        <Stories />
        <Video />
        {/* Server-rendered FAQ teaser (R3): the 4 questions and answers are
            fully visible in the initial HTML; full list lives on /faqs. */}
        <section id="faq" className="py-20 md:py-28 bg-white" aria-labelledby="faq-heading">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <HelpCircle className="w-8 h-8 text-binti-pink" aria-hidden />
                <span className="text-sm font-bold uppercase tracking-widest text-binti-pink">
                  Questions &amp; Answers
                </span>
              </div>
              <h2
                id="faq-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-binti-navy leading-tight"
              >
                Frequently Asked <span className="text-gradient">Questions</span>
              </h2>
              <p className="mt-4 text-binti-navy/70 text-lg leading-relaxed max-w-2xl mx-auto">
                Quick answers about who we serve, what programs cost, and how to
                get involved.
              </p>
            </div>
            <FaqTeaser faqs={HOME_FAQ_TEASER} />
          </div>
        </section>
        <GetInvolved />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
