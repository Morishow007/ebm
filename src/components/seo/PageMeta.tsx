import { Helmet } from 'react-helmet-async'

import { BUSINESS, buildCanonicalUrl } from '@/lib/seo'

interface PageMetaProps {
  title: string
  description: string
  keywords?: string[]
  path?: string
  noIndex?: boolean
}

// Componente de meta tags por página — Open Graph, geo, canonical, keywords.
export function PageMeta({ title, description, keywords = [], path = '/', noIndex = false }: PageMetaProps) {
  const canonical = buildCanonicalUrl(path)

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <link rel="canonical" href={canonical} />

      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Geo — local SEO */}
      <meta name="geo.region" content={`${BUSINESS.country}-${BUSINESS.state}`} />
      <meta name="geo.placename" content={`${BUSINESS.city}, ${BUSINESS.stateFullName}`} />
      <meta name="geo.position" content={`${BUSINESS.lat};${BUSINESS.lng}`} />
      <meta name="ICBM" content={`${BUSINESS.lat}, ${BUSINESS.lng}`} />
      <meta name="language" content="Portuguese" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content={BUSINESS.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
