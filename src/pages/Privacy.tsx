export const Privacy = () => {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
        <h1 className="text-4xl font-semibold text-foreground mb-8">Privacy Policy</h1>
        
        <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
            <p>
              Valoteka ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and otherwise process personal information in connection with our website and services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-foreground mb-2">Information You Provide:</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Email address</li>
              <li>Company name</li>
              <li>Platform type (WooCommerce, Shopify, etc.)</li>
              <li>Product category information</li>
              <li>Any other information you voluntarily provide</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-2 mt-6">Information Collected Automatically:</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>IP address (used for rate limiting only, then discarded)</li>
              <li>User agent information</li>
              <li>Pages visited and time spent</li>
              <li>Referral source</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Process your early access application</li>
              <li>Send confirmation and follow-up emails</li>
              <li>Respond to your inquiries</li>
              <li>Improve our website and services</li>
              <li>Prevent fraud and abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Sharing</h2>
            <p>
              We do not sell or rent your personal information. We may share your information only with:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li>Our email service provider (Resend) to send you communications</li>
              <li>Legal authorities if required by law</li>
              <li>Service providers necessary to operate our business</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Your Rights (GDPR)</h2>
            <p>
              If you are located in the EU, UK, or similar jurisdictions, you have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Restrict processing</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, contact us at privacy@valoteka.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Data Retention</h2>
            <p>
              We retain personal information for as long as necessary to fulfill the purposes outlined in this policy, typically:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li>Early access applications: Until you request deletion or 2 years of inactivity</li>
              <li>Email communications: Until you unsubscribe</li>
              <li>Website analytics: 12 months</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, and destruction. However, no method of transmission over the internet is completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Cookies and Tracking</h2>
            <p>
              We only use cookies for essential functionality (session management, security). We do not track you with cookies until you provide consent. Analytics cookies are only loaded after consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-slate-50 rounded-lg">
              <p className="font-semibold">Valoteka</p>
              <p>Email: privacy@valoteka.com</p>
              <p>Email: contact@valoteka.com</p>
            </div>
          </section>

          <section>
            <p className="text-sm text-muted-foreground italic">
              Last Updated: February 2026
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
