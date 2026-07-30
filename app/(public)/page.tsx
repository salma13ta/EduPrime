import HeroBackground from '../component/HeroBackground';
import HeroContent from '../components/Content/page';
import StatsSection from '../components/stats/page';
import SubjectExplorer from '../components/courses/page';
import FeaturedTeachers from '../components/teachers/page';
import LearningCenters from '../components/centers/page';
import PricingSection from '../components/pricing/page';
import FAQSection from '../components/faq/page';

export default function Home() {
    return (
        <main className="relative min-h-screen text-white overflow-hidden">
            <HeroBackground />

            <div className="relative z-10">
                <HeroContent />

                <div className="container mx-auto px-4 md:px-6 space-y-24 pb-24">
                    <StatsSection />
                    <SubjectExplorer />
                    <FeaturedTeachers />
                    <LearningCenters />
                    <PricingSection />
                    <FAQSection />
                </div>
            </div>
        </main>
    );
}
