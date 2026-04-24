'use client';

import { useEffect, useRef, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is the age range for BINTI Rising programs?',
    answer: 'Our programs are specifically designed for young women aged 15-25. We believe in meeting young women where they are during this critical phase of their lives and providing holistic empowerment that addresses their unique challenges.',
  },
  {
    question: 'How much do the programs cost?',
    answer: 'All BINTI Rising programs are completely FREE for participating young women. We are committed to removing financial barriers to empowerment. Our community partners and donors make this possible.',
  },
  {
    question: 'Where are your programs located?',
    answer: 'We currently operate in 10+ communities across Nairobi, Kenya. Our programs are community-based and locally adapted to meet the specific needs of young women in each area.',
  },
  {
    question: 'What does SRHR stand for?',
    answer: 'SRHR stands for Sexual and Reproductive Health and Rights. Our SRHR program pillar provides comprehensive education on reproductive health, consent, healthy relationships, and access to health services.',
  },
  {
    question: 'Can I volunteer with BINTI Rising?',
    answer: 'Yes! We welcome volunteers who are passionate about empowering young women. Visit our Get Involved section to learn about volunteer opportunities, or contact us at info@bintirising.org.',
  },
  {
    question: 'How do you measure the impact of your programs?',
    answer: 'We track 6 key performance indicators including SRHR knowledge, health service utilization, mental wellbeing, savings habits, leadership skills, and GBV awareness. Regular monitoring and evaluation ensure our programs are evidence-based and effective.',
  },
  {
    question: 'What are your program pillars?',
    answer: 'BINTI Rising has four main program pillars: SRHR (Sexual and Reproductive Health and Rights), Mental Health empowerment, Financial Freedom training, and Women Empowerment initiatives. Each pillar addresses interconnected challenges young women face.',
  },
  {
    question: 'How can organizations partner with BINTI Rising?',
    answer: 'We welcome partnerships with NGOs, corporate organizations, and social enterprises. Partners can support through funding, in-kind donations, expertise sharing, or collaborative program delivery. Contact our partnership team at info@bintirising.org.',
  },
];

export default function FAQ() {
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
    <section id="faq" ref={sectionRef} className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-binti-pink" />
            <span className="text-sm font-bold uppercase tracking-widest text-binti-pink">
              Questions & Answers
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-binti-navy leading-tight">
            Frequently Asked{' '}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="mt-4 text-binti-navy/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Find answers to common questions about BINTI Rising, our programs, and how you can get involved.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className={`space-y-3 ${isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-binti-warm-gray/50 border border-binti-warm-gray rounded-lg px-6 overflow-hidden hover:bg-binti-warm-gray/70 transition-colors"
              >
                <AccordionTrigger className="py-5 hover:no-underline group">
                  <span className="text-left font-semibold text-binti-navy group-hover:text-binti-pink transition-colors">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-binti-navy/70 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div className={`mt-12 text-center p-6 bg-gradient-to-r from-binti-pink/10 to-binti-purple/10 rounded-2xl border border-binti-pink/20 ${isVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
          <p className="text-binti-navy font-medium mb-2">
            Still have questions?
          </p>
          <p className="text-binti-navy/70">
            Contact us at{' '}
            <a href="mailto:info@bintirising.org" className="text-binti-pink font-semibold hover:underline">
              info@bintirising.org
            </a>
            {' '}or call us on our hotline.
          </p>
        </div>
      </div>
    </section>
  );
}
