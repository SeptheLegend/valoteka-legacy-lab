import { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

// Validation schema (same as frontend for consistency)
const EarlyAccessSchema = z.object({
  email: z.string().email().min(5).max(255),
  company: z.string().min(2).max(100),
  merchantType: z.enum(['woocommerce', 'shopify', 'other']),
  productCategory: z.string().min(2).max(200),
  consent: z.boolean().refine(val => val === true),
});

// In-memory rate limiting (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const checkRateLimit = (identifier: string): boolean => {
  const now = Date.now();
  const limit = rateLimitMap.get(identifier);

  if (!limit || now > limit.resetTime) {
    // Reset limit
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + 3600000, // 1 hour
    });
    return true;
  }

  if (limit.count >= 5) {
    // 5 submissions per hour per IP/email combination
    return false;
  }

  limit.count++;
  return true;
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const generateId = (): string => {
  return `early-access-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const sendEmail = async (
  toEmail: string,
  subject: string,
  htmlContent: string
): Promise<boolean> => {
  // This would use Resend in production
  // For MVP, we'll log to console and file
  try {
    if (process.env.RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.SENDER_EMAIL || 'noreply@valoteka.com',
          to: toEmail,
          subject,
          html: htmlContent,
          reply_to: process.env.CONTACT_EMAIL || 'contact@valoteka.com',
        }),
      });

      return response.ok;
    } else {
      // Fallback: log submission
      console.log(`[EMAIL] To: ${toEmail}, Subject: ${subject}`);
      return true;
    }
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};

const generateConfirmationEmail = (
  email: string,
  company: string
): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1f2937; }
          .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #1f2937; }
          .content { line-height: 1.6; color: #4b5563; }
          .footer { font-size: 12px; color: #9ca3af; text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
          .button { display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 500; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Valoteka</div>
          </div>
          <div class="content">
            <p>Hi ${company},</p>
            <p>Thank you for joining Valoteka's early access program. We're excited to work with you on certificate infrastructure for your business.</p>
            <p>Here's what happens next:</p>
            <ul>
              <li><strong>Within 24 hours:</strong> We'll review your information and confirm you're a good fit for Valoteka</li>
              <li><strong>Within 48 hours:</strong> Our team will reach out directly to discuss your timeline, technical requirements, and pricing</li>
              <li><strong>Week 1-2:</strong> We'll prepare your integration plan and set up a secure onboarding session</li>
            </ul>
            <p>If you have any questions, feel free to reply to this email or reach out to <a href="mailto:contact@valoteka.com">contact@valoteka.com</a>.</p>
            <p>Looking forward to partnering with you.</p>
            <p>
              <strong>The Valoteka Team</strong><br>
              <a href="https://valoteka.com">valoteka.com</a>
            </p>
          </div>
          <div class="footer">
            <p>&copy; 2026 Valoteka. All rights reserved.</p>
            <p>You received this email because you joined the early access program.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

const generateAdminNotification = (data: {
  email: string;
  company: string;
  merchantType: string;
  productCategory: string;
  submittedAt: string;
}): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: monospace; color: #1f2937; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          td { padding: 8px; border-bottom: 1px solid #e5e7eb; }
          td:first-child { font-weight: bold; width: 150px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>New Early Access Submission</h2>
          <table>
            <tr><td>Email:</td><td>${data.email}</td></tr>
            <tr><td>Company:</td><td>${data.company}</td></tr>
            <tr><td>Platform:</td><td>${data.merchantType}</td></tr>
            <tr><td>Products:</td><td>${data.productCategory}</td></tr>
            <tr><td>Submitted:</td><td>${data.submittedAt}</td></tr>
          </table>
        </div>
      </body>
    </html>
  `;
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({
      success: false,
      message: 'Method not allowed',
      error: 'Only POST requests are accepted',
    });
    return;
  }

  try {
    // Get client IP for rate limiting
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
      req.headers['x-real-ip'] ||
      'unknown';

    // Validate request body
    const validatedData = EarlyAccessSchema.parse(req.body);

    // Rate limiting check (per IP + email)
    const rateLimitKey = `${ip}-${validatedData.email}`;
    if (!checkRateLimit(rateLimitKey)) {
      res.status(429).json({
        success: false,
        message: 'Too many submission attempts. Please try again later.',
        error: 'rate_limit_exceeded',
      });
      return;
    }

    // Additional email validation
    if (!validateEmail(validatedData.email)) {
      res.status(400).json({
        success: false,
        message: 'Invalid email address',
        error: 'invalid_email',
      });
      return;
    }

    // Generate submission ID
    const submissionId = generateId();
    const submittedAt = new Date().toISOString();

    // Send confirmation email to user
    const confirmationEmail = generateConfirmationEmail(
      validatedData.email,
      validatedData.company
    );
    await sendEmail(
      validatedData.email,
      'Welcome to Valoteka Early Access',
      confirmationEmail
    );

    // Send notification to admin
    const adminEmail = generateAdminNotification({
      ...validatedData,
      submittedAt,
    });
    const adminAddress = process.env.CONTACT_EMAIL || 'contact@valoteka.com';
    await sendEmail(
      adminAddress,
      `[Valoteka] New Early Access Signup: ${validatedData.company}`,
      adminEmail
    );

    // Log submission (in production, save to database)
    console.log(`[SUBMISSION] ${submissionId}:`, {
      email: validatedData.email,
      company: validatedData.company,
      merchantType: validatedData.merchantType,
      productCategory: validatedData.productCategory,
      submittedAt,
      ip: ip !== 'unknown' ? '[REDACTED]' : 'unknown',
    });

    // Success response
    res.status(200).json({
      success: true,
      message: 'Successfully joined early access. Check your email for next steps.',
      id: submissionId,
    });
  } catch (error) {
    console.error('API error:', error);

    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.errors[0]?.message || 'Invalid input',
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'unknown_error',
    });
  }
}
