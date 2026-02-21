import { motion } from 'framer-motion';
import { EarlyAccessForm } from './EarlyAccessForm';

export const FinalCTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
              Ready to Outsource Your Certificate Infrastructure?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join our early access program and let's build this together. We'll respond within 48 hours.
            </p>
          </motion.div>

          <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
            <EarlyAccessForm />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center text-sm text-muted-foreground mt-8"
          >
            No spam. No endless "onboarding sequences." Just a real conversation about your business.
          </motion.p>
        </div>
      </div>
    </section>
  );
};
