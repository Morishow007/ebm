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
  { href: '/portal', label: 'Portal do Cliente' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'contato@ebmengenharia.com.br'
  const contactPhone = import.meta.env.VITE_CONTACT_PHONE || '+55 53 9708-1900'

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
            <div className="mt-4 space-y-1.5">
              <p className="text-sm">
                <a
                  href={`https://wa.me/5553997081900`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 transition-colors hover:text-amber-300"
                >
                  {contactPhone}
                </a>
              </p>
              <p className="text-sm">
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-zinc-500 transition-colors hover:text-zinc-300"
                >
                  {contactEmail}
                </a>
              </p>
              <p className="text-sm">
                <a
                  href="https://www.instagram.com/eng.ebm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 transition-colors hover:text-zinc-300"
                >
                  @eng.ebm
                </a>
              </p>
            </div>
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
