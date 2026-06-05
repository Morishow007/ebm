import { useEffect, useState } from 'react'

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const breakpoints: Record<Breakpoint, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

function getBreakpoint(width: number): Breakpoint {
  if (width >= 1536) return '2xl'
  if (width >= 1280) return 'xl'
  if (width >= 1024) return 'lg'
  if (width >= 768) return 'md'
  if (width >= 640) return 'sm'
  return 'xs'
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() =>
    getBreakpoint(window.innerWidth)
  )

  useEffect(() => {
    const handler = () => setBreakpoint(getBreakpoint(window.innerWidth))
    const observer = new ResizeObserver(handler)
    observer.observe(document.documentElement)
    return () => observer.disconnect()
  }, [])

  return {
    breakpoint,
    isMobile: breakpoints[breakpoint] < breakpoints['md'],
    isTablet: breakpoints[breakpoint] >= breakpoints['md'] && breakpoints[breakpoint] < breakpoints['lg'],
    isDesktop: breakpoints[breakpoint] >= breakpoints['lg'],
  }
}
