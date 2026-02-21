import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export const Header = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <span className="text-blue-600 font-display font-bold text-lg">V</span>
            </div>
            <span className="font-display text-xl font-semibold text-foreground tracking-tight">
              Valoteka
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('problem')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              The Problem
            </button>
            <button
              onClick={() => scrollToSection('solution')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </button>
            <a
              href="/privacy"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
          </nav>

          {/* CTA */}
          <Button
            variant="default"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => {
              document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Join Early Access
          </Button>
        </div>
      </div>
    </motion.header>
  );
};
