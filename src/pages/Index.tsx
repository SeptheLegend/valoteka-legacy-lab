import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { CaseStudySection } from "@/components/sections/CaseStudySection";
import { TrustSignalsSection } from "@/components/sections/TrustSignalsSection";
import { HeartSection } from "@/components/sections/HeartSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section id="hero">
          <HeroSection />
        </section>
        <section id="problem">
          <ProblemSection />
        </section>
        <section id="solution">
          <SolutionSection />
        </section>
        <section id="benefits">
          <BenefitsSection />
        </section>
        <section id="case-study">
          <CaseStudySection />
        </section>
        <section id="trust">
          <TrustSignalsSection />
        </section>
        <section id="story">
          <HeartSection />
        </section>
        <section id="final-cta">
          <FinalCTASection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
