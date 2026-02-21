import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export const HeartSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
            We Built This Because We Care
          </h2>

          <div className="space-y-6 text-muted-foreground text-lg">
            <p>
              Infrastructure isn't sexy. It's not innovative on paper. But it's the foundation of trust, and trust is what builds real business relationships.
            </p>

            <p>
              We didn't build Valoteka to sell features. We built it because we saw merchants struggling with the same problem: how do you prove your products are real?
            </p>

            <p>
              Digital certificates sound simple until you realize you need them to work forever. Not for 5 years. Not for your company's lifetime. Forever. That requires serious infrastructure thinking.
            </p>

            <div className="bg-slate-50 p-8 rounded-lg my-8">
              <p className="text-foreground font-semibold text-xl mb-4">
                That's why we exist.
              </p>
              <p>
                We handle the 20-year storage, the encryption, the compliance, the updates. You handle your business. Your customers get a certificate they can trust for the lifetime of the product.
              </p>
            </div>

            <p>
              This is infrastructure for the long term. We're not here to scale fast and exit. We're here to be your certificate authority forever.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
