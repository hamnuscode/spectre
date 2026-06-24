import { Hero } from '@/components/sections/Hero';
import { TrustedBy } from '@/components/sections/TrustedBy';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { StatsStrip } from '@/components/sections/StatsStrip';
import { ProcessRoadmap } from '@/components/sections/ProcessRoadmap';
import { WhyEnquiry } from '@/components/sections/WhyEnquiry';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <ServicesGrid />
      <StatsStrip />
      <ProcessRoadmap />
      <WhyEnquiry />
    </>
  );
}
