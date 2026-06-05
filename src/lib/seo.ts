export interface SEOConfig {
  title: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
}

const SITE_NAME = import.meta.env.VITE_APP_NAME || 'EBM Engenharia'
const SITE_URL = import.meta.env.VITE_APP_URL || 'https://ebmengenharia.com.br'

export const defaultSEO: SEOConfig = {
  title: SITE_NAME,
  description:
    'EBM Engenharia — projetos estruturais, regularização imobiliária, segurança do trabalho e consultoria BIM. Responsabilidade técnica com precisão e comprometimento.',
  keywords: [
    'engenharia estrutural',
    'projeto estrutural',
    'regularização imobiliária',
    'segurança do trabalho',
    'consultoria BIM',
    'Revit',
    'inspeção predial',
    'laudo técnico',
    'cálculo estrutural',
    'responsável técnico',
    'Eduardo Brignol',
  ],
  type: 'website',
}

export function buildPageTitle(pageTitle: string): string {
  return `${pageTitle} | ${SITE_NAME}`
}

export function buildCanonicalUrl(path: string): string {
  return `${SITE_URL}${path}`
}
