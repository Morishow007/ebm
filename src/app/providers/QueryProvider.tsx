import type { ReactNode } from 'react'

// Stub for future TanStack Query (react-query) integration.
// When adding react-query, wrap children in <QueryClientProvider client={queryClient}>.
interface QueryProviderProps {
  children: ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  return <>{children}</>
}
