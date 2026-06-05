import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type Theme = 'light' | 'dark' | 'system'

interface UIState {
  theme: Theme
  isMobileMenuOpen: boolean
  isContactModalOpen: boolean
  setTheme: (theme: Theme) => void
  toggleMobileMenu: () => void
  setMobileMenuOpen: (open: boolean) => void
  openContactModal: () => void
  closeContactModal: () => void
}

export const useUIStore = create<UIState>()(
  immer((set) => ({
    theme: 'system',
    isMobileMenuOpen: false,
    isContactModalOpen: false,

    setTheme: (theme) =>
      set((state) => {
        state.theme = theme
      }),

    toggleMobileMenu: () =>
      set((state) => {
        state.isMobileMenuOpen = !state.isMobileMenuOpen
      }),

    setMobileMenuOpen: (open) =>
      set((state) => {
        state.isMobileMenuOpen = open
      }),

    openContactModal: () =>
      set((state) => {
        state.isContactModalOpen = true
      }),

    closeContactModal: () =>
      set((state) => {
        state.isContactModalOpen = false
      }),
  }))
)
