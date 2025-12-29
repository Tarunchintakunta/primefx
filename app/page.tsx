import Navigation from '@/components/Navigation';
import HeroClone from '@/components/HeroClone';
import OurProducts from '@/components/OurProducts';
import StatsRow from '@/components/StatsRow';
import ServicesGrid from '@/components/ServicesGrid';
import InfrastructureSection from '@/components/InfrastructureSection';

import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative flex flex-col gap-32 pb-32">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section with 3D Dashboard */}
      <HeroClone />

      {/* Our Products Section */}
      <OurProducts />
      
      {/* Key Statistics */}
      <StatsRow />
      
      {/* Services Bento Grid */}
      <ServicesGrid />
      
      {/* Modern Infrastructure Section */}
      <InfrastructureSection />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
