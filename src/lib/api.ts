// API abstraction layer — currently returns mock data.
// Replace fetch calls below with real CMS endpoints (Sanity, Contentful, etc.)
// without changing the public surface.

import type { Project, Service } from '@/types/models'

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Edifício Residencial Torres do Parque',
    description:
      'Projeto estrutural completo de edifício residencial de 20 andares em concreto armado, com análise dinâmica e dimensionamento de fundações.',
    category: 'Residencial',
    imageUrl: '/assets/images/project-1.jpg',
    year: 2024,
    location: 'São Paulo, SP',
    tags: ['Concreto Armado', 'Fundações', 'Análise Dinâmica'],
    featured: true,
  },
  {
    id: '2',
    title: 'Galpão Industrial Metálico',
    description:
      'Estrutura metálica para galpão industrial de 5.000m², incluindo mezanino e sistema de coberturas especiais.',
    category: 'Industrial',
    imageUrl: '/assets/images/project-2.jpg',
    year: 2024,
    location: 'Campinas, SP',
    tags: ['Estrutura Metálica', 'Galpão', 'Mezanino'],
    featured: true,
  },
  {
    id: '3',
    title: 'Centro Comercial Plaza',
    description:
      'Laudo de inspeção predial e projeto de reforço estrutural de shopping center com 15 anos de operação.',
    category: 'Comercial',
    imageUrl: '/assets/images/project-3.jpg',
    year: 2023,
    location: 'Rio de Janeiro, RJ',
    tags: ['Inspeção', 'Reforço Estrutural', 'Patologia'],
    featured: false,
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
  return Promise.resolve(mockProjects)
}

export async function getServices(): Promise<Service[]> {
  // Future: return fetch(`${import.meta.env.VITE_CMS_API_URL}/services`).then(r => r.json())
  return Promise.resolve(mockServices)
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const projects = await getProjects()
  return projects.find((p) => p.id === id)
}
