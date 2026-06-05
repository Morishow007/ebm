import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import type { User } from '@/types/models'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  login: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  immer((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,

    setUser: (user) =>
      set((state) => {
        state.user = user
        state.isAuthenticated = user !== null
      }),

    setToken: (token) =>
      set((state) => {
        state.token = token
      }),

    login: (user, token) =>
      set((state) => {
        state.user = user
        state.token = token
        state.isAuthenticated = true
      }),

    logout: () =>
      set((state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
      }),
  }))
)
