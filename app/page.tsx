import HeroSection from './components/landing/HeroSection';
import TrustedBrandsSection from './components/landing/TrustedBrandsSection';
import StatsSection from './components/landing/StatsSection';
import SubjectsSection from './components/landing/SubjectsSection';
import FeaturedTeachersSection from './components/landing/FeaturedTeachersSection';
import TopCentersSection from './components/landing/TopCentersSection';
import TestimonialsSection from './components/landing/TestimonialsSection';
import HowItWorksSection from './components/landing/HowItWorksSection';
import PricingSection from './components/landing/PricingSection';
import FAQSection from './components/landing/FAQSection';
import FooterSection from './components/landing/FooterSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TrustedBrandsSection />
      <StatsSection />
      <SubjectsSection />
      <FeaturedTeachersSection />
      <TopCentersSection />
      <TestimonialsSection />
      <HowItWorksSection />
      <PricingSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}