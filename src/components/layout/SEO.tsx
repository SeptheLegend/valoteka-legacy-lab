import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
}

export const SEO = ({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
}: SEOProps) => {
  const siteUrl = process.env.VITE_APP_URL || 'https://valoteka.com';
  const fullTitle = `${title} | Valoteka`;

  return (
    <Helmet>
      {/* Basics */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Canonical */}
      {canonical && <link rel="canonical" href={`${siteUrl}${canonical}`} />}

      {/* OpenGraph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content="Valoteka" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* JSON-LD Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Valoteka',
          url: siteUrl,
          description:
            'Outsourced digital certificate infrastructure for WooCommerce and Shopify sellers',
          email: 'contact@valoteka.com',
          sameAs: [
            'https://twitter.com/valoteka',
            'https://linkedin.com/company/valoteka',
          ],
          areaServed: 'Worldwide',
          knowsAbout: [
            'Digital Certificates',
            'Certificate Authority',
            'E-commerce',
            'GDPR Compliance',
            'WooCommerce',
            'Shopify',
          ],
        })}
      </script>

      {/* JSON-LD WebSite Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Valoteka',
          url: siteUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${siteUrl}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        })}
      </script>
    </Helmet>
  );
};
