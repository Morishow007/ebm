export interface Project {
  id: string
  title: string
  subtitle?: string
  description: string
  category: ProjectCategory
  imageUrl: string
  year: number
  location: string
  tags: string[]
  featured?: boolean
  sketchfabSlug?: string
}

export type ProjectCategory =
  | 'Residencial'
  | 'Comercial'
  | 'Industrial'
  | 'Infraestrutura'
  | 'Reforma'

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  highlighted?: boolean
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  imageUrl: string
  credentials: string[]
}

export interface ContactInfo {
  phone: string
  email: string
  address: string
  workingHours: string
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  companyName?: string
}

export type UserRole = 'admin' | 'client' | 'engineer'
