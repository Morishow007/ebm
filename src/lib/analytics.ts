// Analytics abstraction — swap GA4 for Plausible without touching feature code.

type EventProps = Record<string, string | number | boolean | undefined>

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

// Inject GA4 once on module load (noop if no measurement ID is set)
if (GA_ID && typeof window !== 'undefined' && !document.getElementById('ga-script')) {
  const script = document.createElement('script')
  script.id = 'ga-script'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments as unknown)
  }
  window.gtag('js', new Date())
  // Disable automatic page_view — we fire manually on route change
  window.gtag('config', GA_ID, { send_page_view: false })
}

export function trackPageView(url?: string): void {
  const path = url ?? window.location.pathname
  if (import.meta.env.DEV) console.debug('[analytics] pageView', path)
  if (!GA_ID || !window.gtag) return
  window.gtag('event', 'page_view', { page_path: path })
}

export function trackEvent(name: string, props?: EventProps): void {
  if (import.meta.env.DEV) console.debug('[analytics] event', name, props)
  if (!GA_ID || !window.gtag) return
  window.gtag('event', name, props)
}

export function identify(_userId: string, _traits?: EventProps): void {
  // Reserved for user-level analytics (Phase 2 portal)
}
