import { motion } from 'framer-motion';

export const CaseStudySection = () => {
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
          <div className="inline-block mb-6">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Hypothetical Example
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
            How Luxury Brands Added Authenticity in 30 Days
          </h2>

          <div className="space-y-6 text-muted-foreground text-lg">
            <p>
              A mid-market luxury watchmaker sold primarily through high-end retailers and direct-to-consumer channels. Their customers demanded proof of authenticity, but the manufacturer had no system in place.
            </p>

            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="font-semibold text-foreground mb-4">The Challenge</h3>
              <ul className="space-y-2">
                <li>• Counterfeit products circulating in secondary markets</li>
                <li>• No way to verify authenticity at point of sale</li>
                <li>• Retailers requesting third-party certification</li>
                <li>• Compliance pressure from luxury consortiums</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="font-semibold text-foreground mb-4">The Solution</h3>
              <p className="mb-4">
                They implemented Valoteka's certificate system directly into their Shopify storefront. Each watch received a unique, encrypted digital certificate at point of manufacture. Customers received the certificate URL in their order confirmation.
              </p>
              <ul className="space-y-2">
                <li>• 24-hour integration with existing Shopify store</li>
                <li>• Zero additional infrastructure cost</li>
                <li>• Certificates stored for 20+ years automatically</li>
                <li>• Full GDPR compliance for customer data</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Outcome</h3>
              <p className="mb-4">
                Within 6 weeks, secondary market sales increased by 18%. Retailers gained confidence in the supply chain. Customer trust in authenticity became a competitive advantage.
              </p>
              <p className="text-sm text-muted-foreground">
                The system required zero ongoing maintenance. Valoteka handled all updates, security patches, and infrastructure—forever.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
