import { Link } from 'react-router-dom'

import { Container } from '@/components/ui'

const services = [
  'Projeto Estrutural',
  'Consultoria BIM',
  'Laudos e Inspeções',
  'Cálculo de Fundações',
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

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <Container className="py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-heading text-xl font-bold text-white">EBM</span>
              <span className="text-sm font-medium text-amber-400">Engenharia</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Especialistas em projetos estruturais, consultoria BIM e inspeções prediais.
              Precisão técnica e responsabilidade em cada obra.
            </p>
            <p className="mt-4 text-sm">
              <a
                href={`mailto:${contactEmail}`}
                className="text-amber-400 transition-colors hover:text-amber-300"
              >
                {contactEmail}
              </a>
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Serviços
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/servicos"
                    className="text-sm transition-colors hover:text-white"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Navegação
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-xs text-slate-600">
          <p>
            © {currentYear} EBM Engenharia. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  )
}
