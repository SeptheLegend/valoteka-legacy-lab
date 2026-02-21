# Valoteka Landing Page & Early Access System

Production-grade landing page for capturing early access signups for Valoteka's digital certificate infrastructure.

## Quick Start

```bash
# Install dependencies
bun install

# Create environment file
cp .env.example .env.local

# Development server
bun run dev

# Production build
bun run build
```

## Project Overview

Valoteka provides outsourced digital certificate infrastructure for WooCommerce and Shopify sellers. This landing page:

- **Converts** merchants into early access signups
- **Explains** the problem (no certificate infrastructure)
- **Demonstrates** the solution (3-step process)
- **Builds trust** with GDPR compliance, 20-year storage, independent authority
- **Captures leads** through early access form
- **Validates** input server-side with rate limiting
- **Sends emails** via Resend

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui components
- React Hook Form + Zod validation
- Vercel Serverless Functions
- Resend for email delivery

## Key Features

✅ Mobile-first responsive design  
✅ WCAG 2.1 AA accessibility  
✅ Lighthouse 90+ performance  
✅ GDPR compliance with consent  
✅ Form validation (frontend + backend)  
✅ Rate limiting (5/hour per IP+email)  
✅ Honeypot bot protection  
✅ Email confirmation (user + admin)  
✅ SEO with OpenGraph & JSON-LD schema  
✅ No demo booking (early access only)  

## File Structure

```
src/
├── components/
│   ├── layout/ (Header, Footer, SEO)
│   ├── sections/ (Hero, Problem, Solution, etc.)
│   └── ui/ (shadcn/ui components)
├── context/ (Consent management)
├── hooks/ (Custom React hooks)
├── lib/ (API clients, validation, utilities)
├── pages/ (Index, Privacy, NotFound)
├── types/ (TypeScript definitions)
└── App.tsx (Root component)

api/
└── early-access.ts (Vercel serverless function)
```

## API Endpoint

**POST** `/api/early-access`

Request:
```json
{
  "email": "merchant@example.com",
  "company": "Example Store",
  "merchantType": "shopify",
  "productCategory": "Luxury watches",
  "consent": true
}
```

Response:
```json
{
  "success": true,
  "message": "Successfully joined early access...",
  "id": "early-access-1708000000000-abc123"
}
```

## Environment Setup

Create `.env.local`:

```
VITE_RESEND_API_KEY=your_resend_api_key
VITE_CONTACT_EMAIL=contact@valoteka.com
VITE_SENDER_EMAIL=noreply@valoteka.com
VITE_APP_URL=http://localhost:5173
VITE_ENVIRONMENT=development
VITE_ENABLE_ANALYTICS=true
```

## Deployment to Vercel

1. **Push to GitHub** (or connect repo)
2. **Import in Vercel**: https://vercel.com/new
3. **Add environment variables** (see above)
4. **Deploy** - Done!

Full deployment guide: See `DEPLOYMENT.md`

## Email Setup

Requires Resend account:

1. Create account at [resend.com](https://resend.com)
2. Generate API key
3. Verify sender domain (noreply@valoteka.com)
4. Add key to environment variables

## Performance

Target metrics:
- Lighthouse Score: **90+**
- First Contentful Paint: **<1.5s**
- Largest Contentful Paint: **<2.5s**
- Cumulative Layout Shift: **<0.1**
- Load time (3G): **<2s**

Optimization techniques:
- Code splitting via Vite
- Lazy-loaded sections
- Optimized images
- Tree-shaken CSS
- Minimal JavaScript

## Security & Privacy

✅ Server-side validation (Zod)  
✅ Rate limiting (5 submissions/hour)  
✅ GDPR consent checkbox  
✅ Privacy policy included  
✅ No cookies without consent  
✅ Honeypot field for bots  
✅ Email validation  
✅ No sensitive data in URLs  

## Accessibility

WCAG 2.1 AA compliant:
- Semantic HTML5
- Proper heading hierarchy
- ARIA labels on forms
- Color contrast ratios
- Keyboard navigation
- Screen reader support

## Analytics

Tracks early access events:
- Form submissions
- Form success/failure
- Conversion tracking

Ready for Google Analytics integration.

## Development

```bash
# Format code
bun run lint

# View build analysis
bun run build

# Preview production build
bun run preview
```

## Content

- **Hero**: "Outsource Your Certificate Infrastructure. Forever."
- **Problem**: Certificate infrastructure gaps for merchants
- **Solution**: 3-step process with visual diagram
- **Case Study**: Hypothetical luxury watch example (clearly marked)
- **Trust Signals**: 20-year storage, GDPR, independent authority
- **Heart Section**: Why Valoteka exists (brand story)
- **Final CTA**: Early access form (primary conversion)

No fake statistics. No hype language. Enterprise tone.

## Future Enhancements

- CMS integration (Sanity)
- Real case studies
- Email campaigns (HubSpot)
- A/B testing
- Analytics dashboard
- Customer portal

## Support

Email: contact@valoteka.com

---

© 2026 Valoteka. All rights reserved.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

> Note: This project requires Node.js 18+.

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
# If you plan to run the build in CI or locally, ensure devDependencies are installed:
# npm ci --include=dev
# For normal local development, you can use:
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

### Build & CI notes

- The build requires devDependencies (e.g., Vite) to be available. If your environment installs only production deps, the build will fail with "vite: command not found".
- In CI, run: `npm ci --include=dev` before `npm run build` (a sample GitHub Actions workflow is included in `.github/workflows/ci.yml`).

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
