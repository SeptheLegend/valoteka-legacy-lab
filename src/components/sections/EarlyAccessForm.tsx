import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { submitEarlyAccessForm, trackEarlyAccessEvent } from '@/lib/earlyAccessAPI';
import { EarlyAccessFormSchema, validateHoneypot } from '@/lib/validation';
import type { EarlyAccessFormValues } from '@/lib/validation';
import { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export const EarlyAccessForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<EarlyAccessFormValues>({
    resolver: zodResolver(EarlyAccessFormSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      company: '',
      merchantType: undefined,
      productCategory: '',
      consent: false,
      honeypot: '',
    },
  });

  const onSubmit = async (data: EarlyAccessFormValues) => {
    // Check honeypot
    if (!validateHoneypot(data.honeypot)) {
      console.warn('Honeypot triggered - potential bot submission');
      return;
    }

    setIsSubmitting(true);

    try {
      trackEarlyAccessEvent('early_access_form_submit', {
        merchant_type: data.merchantType,
      });

      const response = await submitEarlyAccessForm({
        email: data.email,
        company: data.company,
        merchantType: data.merchantType,
        productCategory: data.productCategory,
        consent: data.consent,
      });

      if (response.success) {
        setSubmitSuccess(true);
        form.reset();
        toast({
          title: 'Welcome to Valoteka!',
          description: "Check your email for next steps. We'll be in touch within 48 hours.",
          duration: 5000,
        });
        trackEarlyAccessEvent('early_access_form_success', {
          submission_id: response.id,
        });
      } else {
        toast({
          title: 'Submission failed',
          description: response.message || 'Please try again later.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-md mx-auto"
      >
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 ml-2">
            <div className="font-semibold mb-2">Thank you for joining early access!</div>
            <p className="text-sm">
              We've sent a confirmation email to your inbox. Our team will reach out within 48 hours to discuss your specific needs and timeline.
            </p>
          </AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="max-w-md"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    disabled={isSubmitting}
                    {...field}
                    className="h-11 text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Company Field */}
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Company Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your business name"
                    disabled={isSubmitting}
                    {...field}
                    className="h-11 text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Platform Field */}
          <FormField
            control={form.control}
            name="merchantType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Your Platform</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="h-11 text-base">
                      <SelectValue placeholder="Select your platform" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="woocommerce">WooCommerce</SelectItem>
                    <SelectItem value="shopify">Shopify</SelectItem>
                    <SelectItem value="other">Other / Custom</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Product Category Field */}
          <FormField
            control={form.control}
            name="productCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">What Do You Sell?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Luxury watches, handmade jewelry, organic skincare..."
                    disabled={isSubmitting}
                    {...field}
                    className="resize-none text-base"
                    rows={3}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Briefly describe your product category or main offerings.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Honeypot field - hidden from users */}
          <FormField
            control={form.control}
            name="honeypot"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <input type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Consent Checkbox */}
          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-xs font-normal cursor-pointer">
                    I agree to the{' '}
                    <a
                      href="/privacy"
                      className="underline hover:no-underline text-blue-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>{' '}
                    and accept that Valoteka will contact me about this product.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 text-base font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Joining...' : 'Join Early Access'}
          </Button>

          {/* Expected response time */}
          <p className="text-xs text-muted-foreground text-center">
            Our team will respond within 48 hours.
          </p>
        </form>
      </Form>
    </motion.div>
  );
};
