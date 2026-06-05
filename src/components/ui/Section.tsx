import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'article'
}

export function Section({ as: Tag = 'section', className, ...props }: SectionProps) {
  // Cast to 'section' so TypeScript resolves the correct HTML attribute set.
  // All three allowed tags share the same HTMLAttributes<HTMLElement> interface.
  const El = Tag as 'section'
  return <El className={cn('py-16 md:py-24', className)} {...props} />
}
