import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Mail } from "lucide-react";

export const FinalCTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 bg-charcoal relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full bg-gradient-to-b from-gold/10 to-transparent blur-3xl" />
      
      {/* Gold line accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-cream leading-tight mb-6">
            Ready to Future-Proof
            <br />
            <span className="text-gradient-gold">Your Business?</span>
          </h2>
          <p className="text-lg text-cream/60 leading-relaxed mb-10 max-w-xl mx-auto">
            Join the growing community of artisans, galleries, and luxury sellers 
            who are building lasting trust with their customers.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gold" size="xl" className="group">
              <Calendar className="w-5 h-5" />
              Book a 15-Min Value Assessment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="ghost" 
              size="xl" 
              className="text-cream hover:text-gold hover:bg-transparent"
            >
              <Mail className="w-5 h-5" />
              Contact Sales
            </Button>
          </div>

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-cream/5 border border-cream/10"
          >
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/40 to-gold/20 border-2 border-charcoal flex items-center justify-center text-xs text-cream/80"
                >
                  {["👨‍🎨", "🏛️", "💎", "🎨"][i]}
                </div>
              ))}
            </div>
            <span className="text-sm text-cream/60">
              Join <span className="text-gold font-semibold">200+</span> early access members
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
