import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Box, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { PageMeta } from '@/components/seo/PageMeta'
import { Badge, Container, Section } from '@/components/ui'
import { getProjects } from '@/lib/api'
import { fadeIn, slideUp, staggerChildren } from '@/lib/motion'
import { pageSEO } from '@/lib/seo'
import type { Project, ProjectCategory } from '@/types/models'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'Todos'>('Todos')
  const [isLoading, setIsLoading] = useState(true)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .finally(() => setIsLoading(false))
  }, [])

  const categories: Array<ProjectCategory | 'Todos'> = [
    'Todos',
    ...Array.from(new Set(projects.map((p) => p.category))),
  ]

  const filtered =
    activeCategory === 'Todos'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <>
      <PageMeta
        title={pageSEO.projects.title}
        description={pageSEO.projects.description}
        keywords={[...pageSEO.projects.keywords]}
        path="/projetos"
      />

      {/* Page header */}
      <section className="bg-charcoal-900 py-20">
        <Container>
          <motion.div
            variants={shouldReduceMotion ? {} : fadeIn}
            initial="hidden"
            animate="visible"
          >
            <h1 className="font-heading text-4xl font-bold text-white">Projetos</h1>
            <p className="mt-4 max-w-xl text-charcoal-400">
              Obras reais, documentadas com precisão técnica — e alguns disponíveis para{' '}
              <span className="font-semibold text-orange-400">
                exploração em modelagem 3D interativa
              </span>{' '}
              pelo celular ou computador, sem instalar nada.
            </p>
          </motion.div>
        </Container>
      </section>

      <Section>
        <Container>
          {/* 3D showcase CTA */}
          <motion.div
            variants={shouldReduceMotion ? {} : fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <Link
              to="/projetos/3d"
              className="group flex items-center justify-between gap-4 rounded-xl border border-charcoal-200 bg-charcoal-50 px-6 py-5 transition-all hover:border-orange-200 hover:bg-orange-50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-charcoal-800 text-orange-400">
                  <Box size={22} />
                </div>
                <div>
                  <p className="font-heading font-semibold text-charcoal-900">
                    Visualização 3D interativa
                  </p>
                  <p className="mt-0.5 text-sm text-charcoal-500">
                    Explore modelos BIM exportados do Revit em tempo real no navegador
                  </p>
                </div>
              </div>
              <ArrowRight
                size={18}
                className="shrink-0 text-charcoal-400 transition-transform group-hover:translate-x-1 group-hover:text-orange-500"
              />
            </Link>
          </motion.div>

          {/* Category filter */}
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-orange-400 text-charcoal-900'
                    : 'bg-charcoal-100 text-charcoal-600 hover:bg-charcoal-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-charcoal-200 border-t-orange-400" />
            </div>
          ) : (
            <motion.div
              variants={shouldReduceMotion ? {} : staggerChildren}
              initial="hidden"
              animate="visible"
              className="grid items-start gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((project) => (
                <motion.article
                  key={project.id}
                  variants={shouldReduceMotion ? {} : slideUp}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="group overflow-hidden rounded-lg border border-charcoal-200 bg-white shadow-sm hover:border-orange-400 hover:shadow-lg"
                >
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="aspect-video w-full object-cover"
                    />
                  ) : (
                    <div className="aspect-video bg-charcoal-100" />
                  )}
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge>{project.category}</Badge>
                        {project.subtitle && (
                          <span className="text-xs text-charcoal-500">{project.subtitle}</span>
                        )}
                      </div>
                      <span className="text-xs text-charcoal-400">{project.year}</span>
                    </div>
                    <h2 className="font-heading mt-3 text-lg font-semibold text-charcoal-900">
                      {project.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal-500">
                      {project.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xs text-charcoal-400">{project.location}</p>
                      {project.sketchfabSlug && (
                        <Link
                          to={`/projetos/3d/${project.sketchfabSlug}`}
                          className="flex items-center gap-1 rounded bg-charcoal-900 px-2.5 py-1 text-xs font-medium text-orange-400 transition-colors hover:bg-charcoal-800"
                        >
                          <Box size={11} />
                          Ver em 3D
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </Container>
      </Section>
    </>
  )
}
