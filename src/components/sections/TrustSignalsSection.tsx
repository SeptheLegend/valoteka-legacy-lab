import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export const TrustSignalsSection = () => {
  const signals = [
    {
      title: '20-Year Storage',
      description: 'Digital certificates encrypted and stored indefinitely',
    },
    {
      title: 'GDPR Compliant',
      description: 'Full compliance with European data protection regulations',
    },
    {
      title: 'Independent Authority',
      description: 'Third-party verification for maximum credibility',
    },
    {
      title: 'Zero Maintenance',
      description: 'We handle all infrastructure updates and security',
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Built for Enterprise Trust
          </h2>
          <p className="text-muted-foreground text-lg">
            The infrastructure behind your digital certificates is enterprise-grade, auditable, and designed for the long term.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {signals.map((signal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-blue-600 mt-1" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">{signal.title}</h3>
                <p className="text-muted-foreground text-sm">{signal.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
