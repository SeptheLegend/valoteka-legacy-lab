import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle, FileQuestion, TrendingDown } from "lucide-react";

const problems = [
  {
    icon: FileQuestion,
    title: "Paper Certificates Fail",
    description: "Easily forged, frequently lost, and impossible to verify digitally. Your authenticity claims mean nothing online."
  },
  {
    icon: TrendingDown,
    title: "Cart Abandonment Rises",
    description: "68% of high-value item buyers hesitate at checkout when authenticity cannot be proven instantly."
  },
  {
    icon: AlertTriangle,
    title: "Resale Value Plummets",
    description: "Without verifiable provenance, your customers lose 40%+ of their investment when reselling."
  }
];

export const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="problem" className="py-24 lg:py-32 bg-charcoal relative overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-block text-gold text-sm font-semibold tracking-wider uppercase mb-4">
            The Problem
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-cream leading-tight mb-6">
            Your Craft Deserves More Than a Paper Trail.
          </h2>
          <p className="text-lg text-cream/60 leading-relaxed">
            The hidden cost of customer doubt is eroding your margins and reputation. 
            Every unverified sale is a trust deficit waiting to compound.
          </p>
        </motion.div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-8 rounded-2xl border border-cream/10 bg-cream/5 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                  <problem.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-xl font-semibold text-cream mb-3">
                  {problem.title}
                </h3>
                <p className="text-cream/60 leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
