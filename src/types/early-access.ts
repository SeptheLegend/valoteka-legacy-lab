export interface EarlyAccessFormData {
  email: string;
  company: string;
  merchantType: 'woocommerce' | 'shopify' | 'other';
  productCategory: string;
  consent: boolean;
  honeypot?: string;
}

export interface EarlyAccessSubmission extends EarlyAccessFormData {
  submittedAt: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface EarlyAccessResponse {
  success: boolean;
  message: string;
  id?: string;
  error?: string;
}

export interface RateLimitData {
  ip: string;
  email: string;
  timestamp: number;
  count: number;
}
