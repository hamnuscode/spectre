import { Hero } from '@/components/sections/Hero';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { ProcessRoadmap } from '@/components/sections/ProcessRoadmap';
import { WhyEnquiry } from '@/components/sections/WhyEnquiry';
import { FaqSection } from '@/components/sections/FaqSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <ProcessRoadmap />
      <WhyEnquiry />
      <FaqSection />
    </>
  );
}
