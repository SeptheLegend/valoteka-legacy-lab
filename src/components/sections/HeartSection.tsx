import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

export const HeartSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleHeartClick = () => {
    setIsLiked(true);
    setTimeout(() => {
      setIsModalOpen(true);
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
      toast({
        title: "Welcome to the movement! 🎉",
        description: "You'll be among the first to know when Valoteka launches.",
      });
    }, 1000);
  };

  return (
    <section className="py-24 lg:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/50" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="inline-block text-gold text-sm font-semibold tracking-wider uppercase mb-4">
            Join Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-6">
            Do You Believe in Authenticity?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            Show your support for a future where every unique item tells its verified story.
          </p>

          {/* Heart button */}
          <motion.button
            onClick={handleHeartClick}
            disabled={isLiked}
            whileHover={!isLiked ? { scale: 1.05 } : {}}
            whileTap={!isLiked ? { scale: 0.95 } : {}}
            className="relative group"
          >
            <motion.div
              animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.4 }}
              className={`
                w-32 h-32 rounded-full flex items-center justify-center
                transition-all duration-300
                ${isLiked 
                  ? 'bg-gold shadow-gold' 
                  : 'bg-gold/10 border-2 border-gold/30 hover:border-gold hover:bg-gold/20'
                }
              `}
            >
              <Heart 
                className={`w-16 h-16 transition-all duration-300 ${
                  isLiked 
                    ? 'text-charcoal fill-charcoal' 
                    : 'text-gold group-hover:scale-110'
                }`} 
              />
            </motion.div>
            
            {/* Pulse effect */}
            {isLiked && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 rounded-full bg-gold"
              />
            )}
          </motion.button>

          <p className="mt-6 text-sm text-muted-foreground">
            {isLiked ? "Thank you for your support!" : "Click to show your love"}
          </p>
        </motion.div>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-center">
              Thank you for showing your love! 💛
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Join our Early Access list to be the first to know when Valoteka launches.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12"
            />
            <Button 
              type="submit" 
              variant="gold" 
              className="w-full h-12"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Joining..." : "Join the Movement"}
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </DialogContent>
      </Dialog>
    </section>
  );
};
