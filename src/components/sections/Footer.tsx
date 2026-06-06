import { Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

import { BUSINESS } from '@/lib/seo'

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

import logotipo from '@/assets/images/logotipo.png'
import { Container } from '@/components/ui'

const services = [
  'Projeto Estrutural',
  'Regularização Imobiliária',
  'Segurança do Trabalho',
  'Consultoria BIM',
  'Laudos e Inspeções',
  'Gestão Técnica de Obras',
]

const quickLinks = [
  { href: '/projetos', label: 'Projetos' },
  { href: '/servicos', label: 'Serviços' },
  { href: '/contato', label: 'Contato' },
]

const contactLinks = [
  {
    icon: Phone,
    label: '+55 53 9708-1900',
    href: 'https://wa.me/5553997081900',
    external: true,
    highlight: true,
  },
  {
    icon: Mail,
    label: 'contato@ebmengenharia.com',
    href: 'mailto:contato@ebmengenharia.com',
    external: false,
    highlight: false,
  },
  {
    icon: InstagramIcon,
    label: '@eng.ebm',
    href: 'https://www.instagram.com/eng.ebm',
    external: true,
    highlight: false,
  },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/8 bg-black text-zinc-400">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center">
              <img src={logotipo} alt="EBM Engenharia" className="h-8 w-auto brightness-0 invert" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-zinc-500">
              Engenharia estrutural, regularização imobiliária e segurança do trabalho com
              responsabilidade técnica e comprometimento em cada projeto.
            </p>

            <ul className="mt-5 space-y-3">
              {contactLinks.map(({ icon: Icon, label, href, external, highlight }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={`group flex items-center gap-2.5 text-sm transition-colors ${
                      highlight
                        ? 'text-amber-400 hover:text-amber-300'
                        : 'text-zinc-500 hover:text-zinc-200'
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded border transition-colors ${
                        highlight
                          ? 'border-amber-400/30 bg-amber-400/10 text-amber-400 group-hover:bg-amber-400/20'
                          : 'border-white/10 bg-white/5 text-zinc-400 group-hover:border-white/20 group-hover:text-zinc-200'
                      }`}
                    >
                      <Icon size={14} />
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-300">
              Serviços
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/servicos"
                    className="text-sm text-zinc-500 transition-colors hover:text-white"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-300">
              Navegação
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-zinc-500 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                to="/contato"
                className="inline-flex h-10 items-center rounded bg-amber-400 px-5 text-sm font-semibold text-black transition-colors hover:bg-amber-300"
              >
                Solicitar Orçamento
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-700">
          <p>© {currentYear} EBM Engenharia. Todos os direitos reservados.</p>
          <p>Engenheiro Eduardo Brignol Moreira · CREA RS-242316 · CNPJ {BUSINESS.cnpj}</p>
        </div>
      </Container>
    </footer>
  )
}
