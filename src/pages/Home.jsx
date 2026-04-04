import React, { useState } from 'react';
import Navbar from '../components/landing/navbar';
import HeroSection from '../components/landing/HeroSection';
import ProblemSection from '../components/landing/problemsection';
import FeaturesSection from '../components/landing/FeaturesSection';
import HowItWorks from '../components/landing/howitworks';
import BenefitsTable from '../components/landing/BenefitsTable';
import Testimonials from '../components/landing/testimnonials';
import FAQSection from '../components/landing/faqs';
import CTASection from '../components/landing/CTAsection';
import FooterSection from '../components/landing/fottersection';

export default function Home() {
  const [joined, setJoined] = useState(() => localStorage.getItem('joined_waitlist') === 'true');

  // @ts-ignore
  const handleJoined = () => {
    setJoined(true);
    localStorage.setItem('joined_waitlist', 'true');
  };

  return (
    <div className="font-poppins" style={{ background: '#0A0A0A' }}>
      <Navbar joined={joined} onJoinWaitlist={undefined} />
      <HeroSection joined={joined} onJoined={handleJoined} />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorks />
      <BenefitsTable />
      <Testimonials />
      <FAQSection />
      <CTASection />
      <FooterSection joined={joined} onJoined={handleJoined} />
    </div>
  );
}
