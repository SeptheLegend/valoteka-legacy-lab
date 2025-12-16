import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-charcoal border-t border-cream/10 py-12">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center">
              <span className="text-gold font-display font-bold text-lg">V</span>
            </div>
            <span className="font-display text-xl font-semibold text-cream tracking-tight">
              Valoteka
            </span>
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-cream/50">
            <a href="#" className="hover:text-cream transition-colors">Privacy</a>
            <a href="#" className="hover:text-cream transition-colors">Terms</a>
            <a href="#" className="hover:text-cream transition-colors">Contact</a>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-cream/40">
            © {new Date().getFullYear()} Valoteka. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
