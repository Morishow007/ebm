import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

import logotipo from '@/assets/images/logotipo.png'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/projetos', label: 'Projetos' },
  { href: '/servicos', label: 'Serviços' },
  { href: '/contato', label: 'Contato' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/8 bg-black/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" aria-label="EBM Engenharia — início" className="flex items-center">
          <img src={logotipo} alt="EBM Engenharia" className="h-7 w-auto brightness-0 invert" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === '/'}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium transition-colors',
                  isActive ? 'text-amber-400' : 'text-zinc-400 hover:text-white'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contato"
            className="rounded bg-amber-400 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            Solicitar Orçamento
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="rounded p-1.5 text-zinc-400 hover:text-white md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-white/8 bg-black md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Menu mobile">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === '/'}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'rounded px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-white/8 text-amber-400'
                        : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/contato"
                onClick={() => setIsOpen(false)}
                className="mt-2 rounded bg-amber-400 px-4 py-2.5 text-center text-sm font-semibold text-black transition-colors hover:bg-amber-300"
              >
                Solicitar Orçamento
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
