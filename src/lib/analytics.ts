// Analytics abstraction layer — swap the implementation for GA4 or Plausible
// without touching any feature code.

type EventProps = Record<string, string | number | boolean | undefined>

export function trackEvent(name: string, props?: EventProps): void {
  if (import.meta.env.DEV) {
    console.debug('[analytics] trackEvent', name, props)
  }
  // TODO: implement GA4 / Plausible event push
}

export function trackPageView(url?: string): void {
  if (import.meta.env.DEV) {
    console.debug('[analytics] trackPageView', url ?? window.location.pathname)
  }
  // TODO: implement GA4 / Plausible page view
}

export function identify(userId: string, traits?: EventProps): void {
  if (import.meta.env.DEV) {
    console.debug('[analytics] identify', userId, traits)
  }
  // TODO: implement user identification
}
