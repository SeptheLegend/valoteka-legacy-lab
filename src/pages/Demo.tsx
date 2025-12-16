import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, ShoppingCart, Shield, ArrowRight, Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type DemoStep = "product" | "confirmation";

const Demo = () => {
  const [step, setStep] = useState<DemoStep>("product");
  const [includeCertificate, setIncludeCertificate] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = () => {
    if (!includeCertificate) {
      setIncludeCertificate(true);
      return;
    }
    
    setIsAddingToCart(true);
    setTimeout(() => {
      setIsAddingToCart(false);
      setStep("confirmation");
    }, 1500);
  };

  const resetDemo = () => {
    setStep("product");
    setIncludeCertificate(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Valoteka</span>
            </Link>

            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold/10 border border-gold/20">
              <Shield className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-foreground">Demo Mode</span>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {step === "product" ? (
          <ProductPage 
            key="product"
            includeCertificate={includeCertificate}
            setIncludeCertificate={setIncludeCertificate}
            onAddToCart={handleAddToCart}
            isAddingToCart={isAddingToCart}
          />
        ) : (
          <ConfirmationPage 
            key="confirmation"
            onReset={resetDemo}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

interface ProductPageProps {
  includeCertificate: boolean;
  setIncludeCertificate: (value: boolean) => void;
  onAddToCart: () => void;
  isAddingToCart: boolean;
}

const ProductPage = ({ 
  includeCertificate, 
  setIncludeCertificate, 
  onAddToCart,
  isAddingToCart 
}: ProductPageProps) => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-6 lg:px-8 py-12 lg:py-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Store header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-muted-foreground tracking-wider uppercase">
            Luxe Artisan Boutique
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Product image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center relative overflow-hidden">
              {/* Watch placeholder */}
              <div className="text-center relative z-10">
                <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center border-4 border-gold/20">
                  <div className="w-40 h-40 rounded-full bg-charcoal/90 flex items-center justify-center border-2 border-gold/40">
                    <div className="text-center">
                      <div className="text-6xl mb-2">⌚</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gold/10 rounded-full blur-2xl" />
              <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-gold/5 rounded-full blur-xl" />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className={`
                    w-20 h-20 rounded-lg cursor-pointer transition-all
                    ${i === 1 ? 'ring-2 ring-gold bg-secondary' : 'bg-muted hover:bg-secondary'}
                  `}
                />
              ))}
            </div>
          </motion.div>

          {/* Product details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <span className="text-sm text-gold font-medium">Limited Edition</span>
              <h1 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mt-2">
                Heritage Artisan Gold Watch
              </h1>
              <p className="text-muted-foreground mt-2">
                Handcrafted Swiss Movement • 18K Gold Plating
              </p>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-display font-bold text-foreground">$2,499.00</span>
              <span className="text-lg text-muted-foreground line-through">$2,999.00</span>
              <span className="px-2 py-1 rounded bg-gold/10 text-gold text-sm font-medium">
                Save $500
              </span>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Each Heritage Artisan watch is individually numbered and crafted by master 
              horologists in Geneva. The 18K gold case houses a certified Swiss automatic 
              movement with 42-hour power reserve.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
              {[
                { label: "Movement", value: "Swiss Auto" },
                { label: "Case Size", value: "40mm" },
                { label: "Water Resist", value: "100m" },
                { label: "Warranty", value: "5 Years" },
              ].map((feature) => (
                <div key={feature.label}>
                  <span className="text-sm text-muted-foreground">{feature.label}</span>
                  <p className="font-medium text-foreground">{feature.value}</p>
                </div>
              ))}
            </div>

            {/* Valoteka Certificate Option */}
            <motion.div
              animate={!includeCertificate ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 0.3 }}
              className={`
                p-5 rounded-xl border-2 transition-all cursor-pointer
                ${includeCertificate 
                  ? 'border-gold bg-gold/5' 
                  : 'border-border bg-muted/50 hover:border-gold/50'
                }
              `}
              onClick={() => setIncludeCertificate(!includeCertificate)}
            >
              <div className="flex items-start gap-4">
                <Checkbox 
                  checked={includeCertificate}
                  onCheckedChange={(checked) => setIncludeCertificate(checked as boolean)}
                  className="mt-1 border-gold data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-gold" />
                    <span className="font-semibold text-foreground">
                      Include Valoteka Digital Certificate
                    </span>
                    <span className="px-2 py-0.5 rounded bg-gold/20 text-gold text-xs font-medium">
                      Recommended
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Secure, transferable proof of authenticity. Protect your investment 
                    and maintain resale value with encrypted digital certification.
                  </p>
                  <p className="text-gold font-semibold mt-2">+$9.99</p>
                </div>
              </div>
            </motion.div>

            {/* Total */}
            <div className="flex items-center justify-between py-4 border-t border-border">
              <span className="text-lg font-medium text-foreground">Total</span>
              <span className="text-2xl font-display font-bold text-foreground">
                ${includeCertificate ? "2,508.99" : "2,499.00"}
              </span>
            </div>

            {/* Add to Cart */}
            <Button 
              variant="gold" 
              size="xl" 
              className="w-full"
              onClick={onAddToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? (
                <>
                  <div className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </>
              )}
            </Button>

            {/* Trust signals */}
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Check className="w-4 h-4 text-green-500" />
                Free Shipping
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-4 h-4 text-green-500" />
                30-Day Returns
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
};

interface ConfirmationPageProps {
  onReset: () => void;
}

const ConfirmationPage = ({ onReset }: ConfirmationPageProps) => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-6 lg:px-8 py-12 lg:py-20"
    >
      <div className="max-w-3xl mx-auto">
        {/* Success header */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-2">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground">
            Order #VLT-2024-12847 • Thank you for your purchase
          </p>
        </motion.div>

        {/* Email preview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-gold" />
            <span className="font-medium text-foreground">Your Certificate Email</span>
            <span className="text-sm text-muted-foreground">(Preview)</span>
          </div>

          {/* Email mockup */}
          <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-elevated">
            {/* Email header */}
            <div className="p-4 border-b border-border bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-charcoal flex items-center justify-center">
                  <span className="text-gold font-display font-bold">V</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Valoteka Certificates</p>
                  <p className="text-xs text-muted-foreground">certificates@valoteka.com</p>
                </div>
              </div>
            </div>

            {/* Email content */}
            <div className="p-6 lg:p-8">
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                Your Digital Certificate is Ready 🎉
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Congratulations on your purchase! Your Heritage Artisan Gold Watch is now 
                permanently registered in the Valoteka verification network.
              </p>

              {/* Certificate card */}
              <div className="rounded-xl bg-charcoal p-6 mb-6">
                <div className="flex flex-col lg:flex-row items-center gap-6">
                  {/* QR Code */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-lg bg-cream p-3">
                      <div className="w-full h-full grid grid-cols-8 gap-0.5">
                        {[...Array(64)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`rounded-sm ${
                              Math.random() > 0.4 ? 'bg-charcoal' : 'bg-transparent'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-center text-xs text-cream/50 mt-2">Scan to verify</p>
                  </div>

                  {/* Certificate details */}
                  <div className="flex-1 text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                      <Shield className="w-5 h-5 text-gold" />
                      <span className="text-gold font-semibold">Valoteka Verified</span>
                    </div>
                    <h3 className="font-display text-lg text-cream font-semibold mb-3">
                      Heritage Artisan Gold Watch
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between lg:justify-start gap-8">
                        <span className="text-cream/50">Certificate ID</span>
                        <span className="text-cream font-mono">VLT-2024-A8X9B2-7K</span>
                      </div>
                      <div className="flex justify-between lg:justify-start gap-8">
                        <span className="text-cream/50">Issued</span>
                        <span className="text-cream">{new Date().toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between lg:justify-start gap-8">
                        <span className="text-cream/50">Status</span>
                        <span className="text-green-400 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-green-400" />
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="gold" className="flex-1">
                  <Download className="w-4 h-4" />
                  Download Certificate
                </Button>
                <Button variant="outline" className="flex-1">
                  View in Browser
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-center space-y-4"
        >
          <Button variant="hero-secondary" onClick={onReset}>
            Try Demo Again
          </Button>
          <div className="pt-4">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-gold hover:underline"
            >
              Ready to implement this for your store?
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
};

export default Demo;
