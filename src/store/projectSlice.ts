import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import type { Project, ProjectCategory } from '@/types/models'

interface ProjectState {
  projects: Project[]
  selectedCategory: ProjectCategory | 'Todos'
  selectedProject: Project | null
  isLoading: boolean
  error: string | null
  setProjects: (projects: Project[]) => void
  setSelectedCategory: (category: ProjectCategory | 'Todos') => void
  setSelectedProject: (project: Project | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useProjectStore = create<ProjectState>()(
  immer((set) => ({
    projects: [],
    selectedCategory: 'Todos',
    selectedProject: null,
    isLoading: false,
    error: null,

    setProjects: (projects) =>
      set((state) => {
        state.projects = projects
      }),

    setSelectedCategory: (category) =>
      set((state) => {
        state.selectedCategory = category
      }),

    setSelectedProject: (project) =>
      set((state) => {
        state.selectedProject = project
      }),

    setLoading: (loading) =>
      set((state) => {
        state.isLoading = loading
      }),

    setError: (error) =>
      set((state) => {
        state.error = error
      }),
  }))
)
