import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, RefreshCw, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: TrendingUp,
    title: "Conversion Boost",
    subtitle: "Trust at Checkout",
    stat: "+23%",
    description: "Customers complete high-value purchases when authenticity is guaranteed. Reduce cart abandonment with visible trust signals."
  },
  {
    icon: RefreshCw,
    title: "Resale Value",
    subtitle: "Easy Transfer",
    stat: "+40%",
    description: "Your products retain their value in secondary markets. One-click ownership transfer builds generational trust."
  },
  {
    icon: Heart,
    title: "Customer Loyalty",
    subtitle: "Origin Stories",
    stat: "3x",
    description: "Buyers become advocates when they can share verified provenance. Every certificate tells your craft's story."
  }
];

export const BenefitsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="benefits" className="py-24 lg:py-32 bg-secondary/50 relative">
      <div className="container mx-auto px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-block text-gold text-sm font-semibold tracking-wider uppercase mb-4">
            The Impact
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-6">
            From Conversion Rate to Customer Loyalty:
            <br />
            <span className="text-gradient-gold">The Valoteka Effect</span>
          </h2>
        </motion.div>

        {/* Benefits cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl bg-card border border-border hover:border-gold/30 hover:shadow-gold transition-all duration-300">
                {/* Icon and stat */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <benefit.icon className="w-7 h-7 text-gold" />
                  </div>
                  <span className="text-3xl font-display font-bold text-gold">
                    {benefit.stat}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{benefit.subtitle}</p>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Button variant="gold-outline" size="lg" asChild>
            <Link to="/demo">
              See the Live Demo
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
