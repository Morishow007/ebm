import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

import { PageMeta } from '@/components/seo/PageMeta'
import { Container, Section } from '@/components/ui'
import { getServices } from '@/lib/api'
import { fadeIn, slideUp, staggerChildren } from '@/lib/motion'
import { pageSEO } from '@/lib/seo'
import type { Service } from '@/types/models'

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    getServices()
      .then(setServices)
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <>
      <PageMeta
        title={pageSEO.services.title}
        description={pageSEO.services.description}
        keywords={[...pageSEO.services.keywords]}
        path="/servicos"
      />

      <section className="bg-charcoal-900 py-20">
        <Container>
          <motion.div
            variants={shouldReduceMotion ? {} : fadeIn}
            initial="hidden"
            animate="visible"
          >
            <h1 className="font-heading text-4xl font-bold text-white">Serviços</h1>
            <p className="mt-4 max-w-lg text-charcoal-400">
              Soluções completas de engenharia estrutural — do dimensionamento à entrega do projeto executivo.
            </p>
          </motion.div>
        </Container>
      </section>

      <Section>
        <Container>
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-charcoal-200 border-t-orange-400" />
            </div>
          ) : (
            <motion.div
              variants={shouldReduceMotion ? {} : staggerChildren}
              initial="hidden"
              animate="visible"
              className="grid gap-8 lg:grid-cols-2"
            >
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  variants={shouldReduceMotion ? {} : slideUp}
                  className={`rounded-lg border p-8 ${
                    service.highlighted
                      ? 'border-orange-200 bg-orange-50'
                      : 'border-charcoal-200 bg-white'
                  }`}
                >
                  <h2 className="font-heading text-2xl font-bold text-charcoal-900">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-charcoal-600">{service.description}</p>
                  <ul className="mt-6 space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle
                          size={16}
                          className="mt-0.5 shrink-0 text-orange-500"
                        />
                        <span className="text-sm text-charcoal-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="mt-16 rounded-lg bg-charcoal-900 p-10 text-center">
            <h2 className="font-heading text-2xl font-bold text-white">
              Precisa de um serviço específico?
            </h2>
            <p className="mt-3 text-charcoal-400">
              Fale com a nossa equipe e encontramos a solução ideal para o seu projeto.
            </p>
            <div className="mt-6">
              <Link
                to="/contato"
                className="inline-flex h-12 items-center rounded bg-orange-400 px-7 text-base font-semibold text-charcoal-900 transition-colors hover:bg-orange-300"
              >
                Entrar em contato
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
