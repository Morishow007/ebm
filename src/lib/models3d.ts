export interface Model3D {
  slug: string
  title: string
  sketchfabId: string
}

export const models3d: Record<string, Model3D> = {
  'residencial-terreo': {
    slug: 'residencial-terreo',
    title: 'Projeto Arquitetônico – Residência Térrea Ipanema',
    sketchfabId: '3614974a07914c8487ebb3d6fad1dbb8',
  },
  'galpao-comercial': {
    slug: 'galpao-comercial',
    title: 'Revenda de Motos – Galpão Pré-moldado',
    sketchfabId: '06890fa7fca24ecb9234146093ea9c36',
  },
  'hidrossanitario-sobrado': {
    slug: 'hidrossanitario-sobrado',
    title: 'Projeto Hidrossanitário – Sobrado Residencial Ipanema',
    sketchfabId: 'e2e05e9f82474e0e9e1df9b6a432b917',
  },
}

export function getModel(slug: string): Model3D | undefined {
  return models3d[slug]
}
