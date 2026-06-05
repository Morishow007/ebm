import { Star } from 'lucide-react'

import { BUSINESS } from '@/lib/seo'
import { cn } from '@/lib/utils'

interface GoogleRatingProps {
  /** 'light' para seção clara, 'dark' para seção escura */
  theme?: 'light' | 'dark'
  className?: string
}

// Badge de avaliação Google — hardcoded agora.
// Para integrar com Places API: substituir BUSINESS.rating e BUSINESS.ratingCount
// por um fetch a /api/google-rating (endpoint que chama Places API server-side
// para não expor a API key no bundle).
export function GoogleRating({ theme = 'dark', className }: GoogleRatingProps) {
  const isDark = theme === 'dark'
  const fullStars = Math.floor(BUSINESS.rating)
  const hasHalf = BUSINESS.rating % 1 >= 0.5

  return (
    <a
      href={BUSINESS.googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ver avaliações da EBM Engenharia no Google — nota ${BUSINESS.rating}`}
      className={cn(
        'group inline-flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors',
        isDark
          ? 'border-white/10 bg-white/5 hover:bg-white/10'
          : 'border-zinc-200 bg-white hover:border-zinc-300 shadow-sm',
        className
      )}
    >
      {/* Logo Google — SVG inline para não precisar de asset externo */}
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden>
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>

      <div className="flex flex-col">
        {/* Stars */}
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }, (_, i) => {
            const filled = i < fullStars
            const half = !filled && i === fullStars && hasHalf
            return (
              <Star
                key={i}
                size={13}
                className={cn(
                  filled || half ? 'text-amber-400' : isDark ? 'text-zinc-700' : 'text-zinc-300'
                )}
                fill={filled ? 'currentColor' : half ? 'url(#half)' : 'none'}
              />
            )
          })}
          <span
            className={cn(
              'ml-1.5 text-sm font-bold',
              isDark ? 'text-white' : 'text-zinc-900'
            )}
          >
            {BUSINESS.rating.toFixed(1)}
          </span>
        </div>

        {/* Label */}
        <span className={cn('text-xs', isDark ? 'text-zinc-500' : 'text-zinc-500')}>
          {BUSINESS.ratingCount} avaliações · Google
        </span>
      </div>
    </a>
  )
}
