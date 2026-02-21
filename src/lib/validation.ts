import { z } from 'zod';

export const EarlyAccessFormSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(5, 'Email is too short')
    .max(255, 'Email is too long'),
  
  company: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be less than 100 characters')
    .trim(),
  
  merchantType: z
    .enum(['woocommerce', 'shopify', 'other'], {
      errorMap: () => ({ message: 'Please select your platform' }),
    }),
  
  productCategory: z
    .string()
    .min(2, 'Please tell us about your products')
    .max(200, 'Product description must be less than 200 characters')
    .trim(),
  
  consent: z
    .boolean()
    .refine(val => val === true, {
      message: 'You must agree to our Privacy Policy to continue',
    }),
  
  honeypot: z.string().optional(),
});

export type EarlyAccessFormValues = z.infer<typeof EarlyAccessFormSchema>;

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateHoneypot = (honeypot?: string): boolean => {
  // Honeypot should be empty - if it's filled, it's a bot
  return !honeypot || honeypot.trim() === '';
};
