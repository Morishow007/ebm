import { useEffect } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'

import { ChatBot } from '@/components/chat/ChatBot'
import { StructuredData } from '@/components/seo/StructuredData'
import { Footer } from '@/components/sections/Footer'
import { Navbar } from '@/components/sections/Navbar'
import { trackPageView } from '@/lib/analytics'

export default function RootLayout() {
  const location = useLocation()

  useEffect(() => {
    trackPageView(location.pathname)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <StructuredData />
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
      <ChatBot />
      <ScrollRestoration />
    </div>
  )
}
