import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Play } from "lucide-react";
import { Link } from "react-router-dom";

export const DemoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="demo" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-gold/5 to-transparent blur-3xl" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="inline-block text-gold text-sm font-semibold tracking-wider uppercase mb-4">
            Interactive Demo
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-6">
            See the Future of E-commerce Trust
            <br />
            <span className="text-gradient-gold">In Action</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Experience how Valoteka transforms the checkout experience. 
            Complete a simulated purchase and receive your digital certificate.
          </p>
        </motion.div>

        {/* Demo preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative group">
            {/* Browser mockup */}
            <div className="rounded-2xl bg-charcoal p-2 shadow-elevated">
              {/* Browser header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-cream/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1.5 rounded-lg bg-cream/10 text-cream/60 text-xs font-mono">
                    luxe-boutique.com/product/artisan-watch
                  </div>
                </div>
              </div>

              {/* Preview content */}
              <div className="relative aspect-[16/9] bg-gradient-to-br from-cream/5 to-cream/10 rounded-lg overflow-hidden">
                {/* Simulated product page */}
                <div className="absolute inset-0 p-8 flex flex-col lg:flex-row items-center gap-8">
                  {/* Product image placeholder */}
                  <div className="flex-1 h-full rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full bg-gold/30 mx-auto mb-4 flex items-center justify-center">
                        <span className="text-5xl">⌚</span>
                      </div>
                      <p className="text-cream/60 text-sm">Artisan Gold Watch</p>
                    </div>
                  </div>

                  {/* Product details placeholder */}
                  <div className="flex-1 space-y-4">
                    <div className="h-6 w-3/4 bg-cream/20 rounded" />
                    <div className="h-4 w-1/2 bg-cream/10 rounded" />
                    <div className="h-8 w-1/3 bg-gold/30 rounded" />
                    
                    {/* Valoteka checkbox */}
                    <div className="mt-6 p-4 rounded-lg border-2 border-gold/50 bg-gold/10">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded border-2 border-gold bg-gold flex items-center justify-center">
                          <span className="text-charcoal text-xs">✓</span>
                        </div>
                        <span className="text-cream text-sm font-medium">
                          Include Valoteka Certificate (+$9.99)
                        </span>
                      </div>
                    </div>

                    <div className="h-12 w-full bg-gold/40 rounded-lg" />
                  </div>
                </div>

                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-charcoal/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center shadow-gold">
                    <Play className="w-8 h-8 text-charcoal ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-10"
          >
            <Button variant="gold" size="xl" asChild>
              <Link to="/demo" className="group">
                Experience the Checkout
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
