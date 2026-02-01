import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useBooking } from '@/context/booking';

export const Header = () => {
  const booking = useBooking();
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-charcoal flex items-center justify-center">
              <span className="text-gold font-display font-bold text-lg">V</span>
            </div>
            <span className="font-display text-xl font-semibold text-foreground tracking-tight">
              Valoteka
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#problem" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Why Valoteka
            </a>
            <a href="#solution" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#benefits" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Benefits
            </a>
            <Link to="/demo" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Live Demo
            </Link>
          </nav>

          {/* CTA */}
          <Button variant="gold" size="sm" className="hidden sm:inline-flex" onClick={() => booking.openModal()}>
            Book a Demo
          </Button>
        </div>
      </div>
    </motion.header>
  );
};
