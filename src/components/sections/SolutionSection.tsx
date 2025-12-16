import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Download, Link2, Zap } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Download,
    title: "Install Plugin",
    description: "One-click installation for WooCommerce or Shopify. Zero configuration required."
  },
  {
    number: "02",
    icon: Link2,
    title: "Connect API",
    description: "Secure handshake with Valoteka's encryption layer. Your keys, your control."
  },
  {
    number: "03",
    icon: Zap,
    title: "Auto-Certify",
    description: "Every sale automatically generates a unique, encrypted digital certificate."
  }
];

export const SolutionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="solution" className="py-24 lg:py-32 bg-background relative">
      <div className="container mx-auto px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <span className="inline-block text-gold text-sm font-semibold tracking-wider uppercase mb-4">
            The Solution
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-6">
            Encrypted Authenticity.
            <br />
            <span className="text-gradient-gold">Seamless Integration.</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Valoteka: The digital passport for your unique items. Item-unique keys, 
            secure ownership transfer, and effortless plugin setup.
          </p>
        </motion.div>

        {/* Steps timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold to-gold/50 hidden md:block" />

            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="relative flex items-start gap-8 mb-12 last:mb-0"
              >
                {/* Step indicator */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-charcoal flex items-center justify-center glow-gold-subtle">
                    <step.icon className="w-7 h-7 text-gold" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-gold font-display text-sm font-semibold">
                      {step.number}
                    </span>
                    <div className="w-8 h-px bg-gold/30" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Visual representation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="relative rounded-3xl bg-gradient-to-br from-charcoal to-charcoal-light p-8 lg:p-12 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/5 rounded-full blur-2xl" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
              {/* Certificate mockup */}
              <div className="flex-1 w-full">
                <div className="bg-cream/5 backdrop-blur rounded-2xl border border-cream/10 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
                      <span className="text-gold font-display font-bold">V</span>
                    </div>
                    <div>
                      <p className="text-cream font-semibold text-sm">Digital Certificate</p>
                      <p className="text-cream/50 text-xs">Valoteka Verified</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-cream/50">Certificate ID</span>
                      <span className="text-cream font-mono">VLT-2024-A8X9B2</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-cream/50">Item</span>
                      <span className="text-cream">Artisan Gold Watch</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-cream/50">Owner</span>
                      <span className="text-cream">••••••@email.com</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-cream/50">Status</span>
                      <span className="text-green-400 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-400" />
                        Verified
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-cream/10 flex items-center justify-between">
                    <div className="w-16 h-16 rounded-lg bg-cream/10 flex items-center justify-center">
                      <div className="grid grid-cols-4 gap-0.5">
                        {[...Array(16)].map((_, i) => (
                          <div key={i} className="w-2 h-2 bg-cream/60 rounded-sm" />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-cream/40">Scan to verify</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="flex-1 space-y-4">
                <h4 className="font-display text-2xl text-cream font-semibold">
                  Every certificate includes:
                </h4>
                <ul className="space-y-3">
                  {[
                    "Unique cryptographic identifier",
                    "Complete ownership history",
                    "Tamper-proof verification",
                    "One-click ownership transfer",
                    "Mobile-ready QR access"
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-cream/70">
                      <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-gold" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
