import { motion } from 'framer-motion';
import { EarlyAccessForm } from './EarlyAccessForm';

export const SuccessMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="text-center"
    >
      <div className="inline-block mb-6">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <svg
            className="w-8 h-8 text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <h3 className="text-2xl font-semibold text-foreground mb-3">Welcome to Valoteka!</h3>
      <p className="text-muted-foreground mb-6">
        Check your email for next steps. We'll reach out within 48 hours to discuss your specific needs.
      </p>
    </motion.div>
  );
};
