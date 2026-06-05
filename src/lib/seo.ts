// ─── Config central de SEO ────────────────────────────────────────────────────

export interface SEOConfig {
  title: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  noIndex?: boolean
}

export const BUSINESS = {
  name: 'EBM Engenharia',
  legalName: 'EBM Engenharia',
  founder: 'Eduardo Brignol Moreira',
  founderTitle: 'Engenheiro Civil',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'contato@ebmengenharia.com.br',
  phone: import.meta.env.VITE_CONTACT_PHONE || '',
  url: import.meta.env.VITE_APP_URL || 'https://ebmengenharia.com.br',
  city: 'Rio Grande',
  state: 'RS',
  stateFullName: 'Rio Grande do Sul',
  country: 'BR',
  postalCode: import.meta.env.VITE_POSTAL_CODE || '',
  streetAddress: import.meta.env.VITE_STREET_ADDRESS || '',
  // Coordenadas reais da EBM Engenharia (extraídas do Google Maps)
  lat: -32.2084794,
  lng: -52.3782151,
  // Avaliação Google — trocar por Places API call quando houver backend
  rating: 4.8,
  ratingCount: 33,
  googleMapsUrl:
    import.meta.env.VITE_GOOGLE_MAPS_URL ||
    'https://www.google.com/maps/place/EBM+Engenharia+-+Regulariza%C3%A7%C3%A3o+de+Im%C3%B3veis/@-32.2074707,-52.7078539,10z/data=!3m1!4b1!4m6!3m5!1s0xa32d2219f1baeb17:0x4b38da1fcf7a7c06!8m2!3d-32.2084794!4d-52.3782151!16s%2Fg%2F11khrx59pv?entry=ttu',
  googlePlaceId: import.meta.env.VITE_GOOGLE_PLACE_ID || '0xa32d2219f1baeb17:0x4b38da1fcf7a7c06',
} as const

const SITE_URL = BUSINESS.url

// ─── Meta tags por página ─────────────────────────────────────────────────────

export const pageSEO = {
  home: {
    title: `${BUSINESS.name} | Engenharia Civil em ${BUSINESS.city}, ${BUSINESS.state}`,
    description: `Regularização de imóveis, administração de obras e projetos técnicos em ${BUSINESS.city}, ${BUSINESS.stateFullName}. ${BUSINESS.founder}, Engenheiro Civil. Nota ${BUSINESS.rating} ⭐ no Google.`,
    keywords: [
      'engenharia civil Rio Grande RS',
      'regularização de imóveis Rio Grande',
      'administração de obras Rio Grande RS',
      'projetos técnicos Rio Grande do Sul',
      'EBM Engenharia Rio Grande',
      'engenheiro civil Rio Grande do Sul',
      'habite-se Rio Grande RS',
      'laudos técnicos Rio Grande',
      'consultoria BIM Rio Grande',
      'segurança do trabalho Rio Grande RS',
    ],
  },
  projects: {
    title: `Projetos | ${BUSINESS.name} — ${BUSINESS.city}, ${BUSINESS.state}`,
    description: `Portfólio de projetos de engenharia civil realizados em ${BUSINESS.city} e região. Estruturas residenciais, comerciais e industriais com responsabilidade técnica.`,
    keywords: [
      'projetos estruturais Rio Grande RS',
      'portfólio engenharia civil Rio Grande',
      'obras Rio Grande do Sul',
      'projeto estrutural Rio Grande',
    ],
  },
  services: {
    title: `Serviços de Engenharia Civil | ${BUSINESS.name} — ${BUSINESS.city}, ${BUSINESS.state}`,
    description: `Regularização de imóveis, administração de obras, projetos técnicos, consultoria BIM e segurança do trabalho em ${BUSINESS.city}, ${BUSINESS.stateFullName}.`,
    keywords: [
      'regularização imóveis Rio Grande RS',
      'administração obras Rio Grande',
      'projetos técnicos engenharia',
      'segurança trabalho construção civil Rio Grande',
      'BIM Revit Rio Grande do Sul',
      'laudo técnico Rio Grande RS',
      'inspeção predial Rio Grande',
    ],
  },
  contact: {
    title: `Contato | ${BUSINESS.name} — ${BUSINESS.city}, ${BUSINESS.state}`,
    description: `Entre em contato com a ${BUSINESS.name} em ${BUSINESS.city}, RS. Solicite um orçamento para regularização de imóveis, obras e projetos técnicos.`,
    keywords: [
      'orçamento engenharia civil Rio Grande',
      'contratar engenheiro Rio Grande RS',
      'EBM Engenharia contato',
    ],
  },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function buildPageTitle(pageTitle: string): string {
  return `${pageTitle} | ${BUSINESS.name}`
}

export function buildCanonicalUrl(path: string): string {
  return `${SITE_URL}${path}`
}

// ─── JSON-LD builders ────────────────────────────────────────────────────────

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description: pageSEO.home.description,
    url: SITE_URL,
    email: BUSINESS.email,
    ...(BUSINESS.phone && { telephone: BUSINESS.phone }),
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.state,
      addressCountry: BUSINESS.country,
      ...(BUSINESS.postalCode && { postalCode: BUSINESS.postalCode }),
      ...(BUSINESS.streetAddress && { streetAddress: BUSINESS.streetAddress }),
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.lat,
      longitude: BUSINESS.lng,
    },
    areaServed: [
      { '@type': 'City', name: 'Rio Grande', containedInPlace: { '@type': 'State', name: 'Rio Grande do Sul' } },
      { '@type': 'City', name: 'Pelotas', containedInPlace: { '@type': 'State', name: 'Rio Grande do Sul' } },
      { '@type': 'State', name: 'Rio Grande do Sul' },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(BUSINESS.rating),
      reviewCount: String(BUSINESS.ratingCount),
      bestRating: '5',
      worstRating: '1',
    },
    founder: {
      '@type': 'Person',
      name: BUSINESS.founder,
      jobTitle: BUSINESS.founderTitle,
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Professional License',
        recognizedBy: { '@type': 'Organization', name: 'CREA' },
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de Engenharia Civil',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Regularização de Imóveis' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Administração de Obras' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Projetos Técnicos' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Consultoria BIM' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Engenharia de Segurança do Trabalho' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Laudos e Inspeções Prediais' } },
      ],
    },
    sameAs: [
      BUSINESS.googleMapsUrl,
      'https://www.instagram.com/eng.ebm',
    ],
  }
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: BUSINESS.name,
    url: SITE_URL,
    inLanguage: 'pt-BR',
    publisher: { '@id': `${SITE_URL}/#business` },
  }
}

export function buildPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#founder`,
    name: BUSINESS.founder,
    jobTitle: BUSINESS.founderTitle,
    worksFor: { '@id': `${SITE_URL}/#business` },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'Fundação Getulio Vargas', department: 'Direito Imobiliário' },
    ],
    hasCredential: [
      { '@type': 'EducationalOccupationalCredential', name: 'Pós-graduação em Engenharia de Segurança do Trabalho' },
      { '@type': 'EducationalOccupationalCredential', name: 'TOEFL ITP B2 — Inglês' },
    ],
  }
}

// ─── Tipos herdados ───────────────────────────────────────────────────────────

export const defaultSEO = pageSEO.home
