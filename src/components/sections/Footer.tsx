import { Instagram, Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

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
    label: 'contato@ebmengenharia.com.br',
    href: 'mailto:contato@ebmengenharia.com.br',
    external: false,
    highlight: false,
  },
  {
    icon: Instagram,
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
              <span className="rounded bg-white px-3 py-1.5">
                <img src={logotipo} alt="EBM Engenharia" className="h-8 w-auto" />
              </span>
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
          <p>Engenheiro Eduardo Brignol Moreira · CREA</p>
        </div>
      </Container>
    </footer>
  )
}
