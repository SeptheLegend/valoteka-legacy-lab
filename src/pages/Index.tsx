import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { DemoSection } from "@/components/sections/DemoSection";
import { HeartSection } from "@/components/sections/HeartSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <BenefitsSection />
        <DemoSection />
        <HeartSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
