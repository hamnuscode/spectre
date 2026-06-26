import { Hero } from '@/components/sections/Hero';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { ProcessRoadmap } from '@/components/sections/ProcessRoadmap';
import { WhyEnquiry } from '@/components/sections/WhyEnquiry';
import { FaqSection } from '@/components/sections/FaqSection';
import { SectionDivider } from '@/components/ui/SectionDivider';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <SectionDivider />
      <ProcessRoadmap />
      <SectionDivider />
      <WhyEnquiry />
      <FaqSection />
    </>
  );
}
