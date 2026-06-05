import { RouterProvider } from 'react-router-dom'

import { router } from '@/app/router'

import { QueryProvider } from './QueryProvider'
import { ThemeProvider } from './ThemeProvider'

export function Providers() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </ThemeProvider>
  )
}
