import { Hero } from '@/components/sections/Hero';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { StatsStrip } from '@/components/sections/StatsStrip';
import { ProcessRoadmap } from '@/components/sections/ProcessRoadmap';
import { WhyEnquiry } from '@/components/sections/WhyEnquiry';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <StatsStrip />
      <ProcessRoadmap />
      <WhyEnquiry />
    </>
  );
}
