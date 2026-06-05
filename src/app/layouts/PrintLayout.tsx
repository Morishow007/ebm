import type { ReactNode } from 'react'

// Minimal layout for printable documents (laudos, relatórios).
interface PrintLayoutProps {
  children: ReactNode
}

export function PrintLayout({ children }: PrintLayoutProps) {
  return (
    <div className="mx-auto max-w-[210mm] bg-white p-8 print:p-0">
      {children}
    </div>
  )
}
