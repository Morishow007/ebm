// API abstraction layer — currently returns mock data.
// Replace fetch calls below with real CMS endpoints (Sanity, Contentful, etc.)
// without changing the public surface.

import type { Project, Service } from '@/types/models'

import parqueDoLagoImg from '@/assets/images/parque-do-lago.png'
import galpaoComercialImg from '@/assets/images/galpao-comercial.png'
import projetoHidroImg from '@/assets/images/projeto-hidro.png'
import projetoEletricoImg from '@/assets/images/projeto-eletrico.png'

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Sobrado Residencial Ipanema',
    subtitle: 'Projeto Arquitetônico',
    description:
      'Projeto arquitetônico completo de residência unifamiliar com 2 pavimentos, 2 dormitórios e 90 m² de área construída, contemplando layout funcional, compatibilização dos ambientes e atendimento às normas técnicas.',
    category: 'Residencial',
    imageUrl: '',
    year: 2024,
    location: 'Rio Grande, RS',
    tags: ['Projeto Arquitetônico', '2 Pavimentos', '90 m²'],
    featured: true,
  },
  {
    id: '2',
    title: 'Revenda de Motos',
    subtitle: 'Projeto Arquitetônico',
    description:
      'Projeto arquitetônico de galpão pré-moldado em concreto destinado à comercialização de motocicletas, contemplando área de exposição, atendimento ao cliente, setor administrativo e oficina.',
    category: 'Comercial',
    imageUrl: galpaoComercialImg,
    year: 2025,
    location: 'Rio Grande, RS',
    tags: ['Projeto Arquitetônico', 'Galpão Pré-moldado', 'Motocicletas'],
    featured: true,
    sketchfabSlug: 'galpao-comercial',
  },
  {
    id: '3',
    title: 'Projeto Elétrico – Sobrado Residencial Ipanema',
    subtitle: 'Projeto Elétrico',
    description:
      'Projeto elétrico de residência unifamiliar com 2 pavimentos, 2 dormitórios e 90 m² de área construída, desenvolvido em conformidade com a NBR 5410 e demais requisitos normativos aplicáveis, contemplando o dimensionamento de circuitos, proteção contra sobrecorrentes, aterramento, distribuição de cargas e especificação dos pontos elétricos.',
    category: 'Residencial',
    imageUrl: '',
    year: 2024,
    location: 'Rio Grande, RS',
    tags: ['Projeto Elétrico', 'NBR 5410', '90 m²'],
    featured: false,
    imageUrl: projetoEletricoImg,
  },
  {
    id: '4',
    title: 'Projeto Hidrossanitário – Sobrado Residencial Ipanema',
    subtitle: 'Projeto Hidrossanitário',
    description:
      'Projeto hidrossanitário elaborado em conformidade com as normas ABNT NBR 5626 (Sistemas Prediais de Água Fria e Água Quente), ABNT NBR 8160 (Sistemas Prediais de Esgoto Sanitário), ABNT NBR 10844 (Instalações Prediais de Águas Pluviais) e demais requisitos técnicos aplicáveis.',
    category: 'Residencial',
    imageUrl: '',
    year: 2024,
    location: 'Rio Grande, RS',
    tags: ['Projeto Hidrossanitário', 'ABNT NBR 5626', 'NBR 8160'],
    featured: false,
    sketchfabSlug: 'hidrossanitario-sobrado',
    imageUrl: projetoHidroImg,
  },
  {
    id: '5',
    title: 'Projeto Arquitetônico – Residência Térrea Ipanema',
    subtitle: 'Projeto Arquitetônico',
    description:
      'Projeto arquitetônico de residência unifamiliar térrea com 2 dormitórios, 2 banheiros e 75 m² de área construída, contemplando ambientes integrados, aproveitamento eficiente dos espaços, iluminação e ventilação natural, além da documentação técnica necessária para aprovação e execução da obra.',
    category: 'Residencial',
    imageUrl: '',
    year: 2024,
    location: 'Rio Grande, RS',
    tags: ['Projeto Arquitetônico', 'Térrea', '75 m²'],
    featured: true,
    sketchfabSlug: 'residencial-terreo',
    imageUrl: parqueDoLagoImg,
  },
]

const mockServices: Service[] = [
  {
    id: '1',
    title: 'Projeto Estrutural',
    description:
      'Desenvolvimento completo de projetos estruturais em concreto armado, metálico e misto, com responsabilidade técnica e ART inclusa.',
    icon: 'building-2',
    features: [
      'Análise e dimensionamento estrutural',
      'Detalhamento de armaduras e perfis',
      'Memorial de cálculo completo',
      'Pranchas executivas e as-built',
    ],
    highlighted: true,
  },
  {
    id: '2',
    title: 'Regularização Imobiliária',
    description:
      'Assessoria completa na regularização de imóveis junto aos órgãos competentes, com embasamento em Direito Imobiliário.',
    icon: 'file-check',
    features: [
      'Regularização de obras e edificações',
      'Habite-se e averbação',
      'Usucapião extrajudicial',
      'Documentação técnica completa',
    ],
    highlighted: true,
  },
  {
    id: '3',
    title: 'Segurança do Trabalho',
    description:
      'Gestão de SST para empresas da construção civil, com elaboração de laudos, PPR, LTCAT e programas obrigatórios.',
    icon: 'shield-check',
    features: [
      'Elaboração de PGR e PCMSO',
      'Laudos técnicos NR-18 e NR-35',
      'Treinamentos e palestras de SST',
      'Responsável técnico de SST',
    ],
    highlighted: false,
  },
  {
    id: '4',
    title: 'Consultoria BIM',
    description:
      'Modelagem estrutural em Revit e coordenação BIM, com exportação IFC compatível e quantitativos automáticos.',
    icon: 'cube',
    features: [
      'Modelagem estrutural em Revit',
      'Exportação IFC compatível',
      'Compatibilização de disciplinas',
      'Quantitativos e relatórios automáticos',
    ],
    highlighted: false,
  },
  {
    id: '5',
    title: 'Laudos e Inspeções',
    description:
      'Inspeção predial, laudos técnicos e identificação de patologias construtivas conforme a NBR 16747.',
    icon: 'clipboard-check',
    features: [
      'Inspeção predial completa',
      'Laudos de patologia estrutural',
      'Plano de manutenção preventiva',
      'ART/RRT inclusa',
    ],
    highlighted: false,
  },
  {
    id: '6',
    title: 'Gestão Técnica de Obras',
    description:
      'Acompanhamento e gestão técnica de obras civis, garantindo conformidade com projeto, normas e prazos.',
    icon: 'hard-hat',
    features: [
      'Acompanhamento de execução',
      'Controle de qualidade',
      'Interface com projetistas',
      'Relatórios periódicos de obra',
    ],
    highlighted: false,
  },
]

export async function getProjects(): Promise<Project[]> {
  // Future: return fetch(`${import.meta.env.VITE_CMS_API_URL}/projects`).then(r => r.json())
  const sorted = [...mockProjects].sort((a, b) => {
    if (a.sketchfabSlug && !b.sketchfabSlug) return -1
    if (!a.sketchfabSlug && b.sketchfabSlug) return 1
    return 0
  })
  return Promise.resolve(sorted)
}

export async function getServices(): Promise<Service[]> {
  // Future: return fetch(`${import.meta.env.VITE_CMS_API_URL}/services`).then(r => r.json())
  return Promise.resolve(mockServices)
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const projects = await getProjects()
  return projects.find((p) => p.id === id)
}
