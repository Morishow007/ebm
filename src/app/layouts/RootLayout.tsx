import { Outlet } from 'react-router-dom'

import { ChatBot } from '@/components/chat/ChatBot'
import { Footer } from '@/components/sections/Footer'
import { Navbar } from '@/components/sections/Navbar'

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
      <ChatBot />
    </div>
  )
}
