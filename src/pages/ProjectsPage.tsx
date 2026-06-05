import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

import { Badge, Container, Section } from '@/components/ui'
import { getProjects } from '@/lib/api'
import { fadeIn, slideUp, staggerChildren } from '@/lib/motion'
import { buildPageTitle } from '@/lib/seo'
import type { Project, ProjectCategory } from '@/types/models'

const categories: Array<ProjectCategory | 'Todos'> = [
  'Todos',
  'Residencial',
  'Comercial',
  'Industrial',
  'Infraestrutura',
  'Reforma',
]

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

  const filtered =
    activeCategory === 'Todos'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <>
      <Helmet>
        <title>{buildPageTitle('Projetos')}</title>
        <meta name="description" content="Conheça os projetos estruturais desenvolvidos pela EBM Engenharia." />
      </Helmet>

      {/* Page header */}
      <section className="bg-slate-950 py-20">
        <Container>
          <motion.div
            variants={shouldReduceMotion ? {} : fadeIn}
            initial="hidden"
            animate="visible"
          >
            <h1 className="font-heading text-4xl font-bold text-white">Projetos</h1>
            <p className="mt-4 max-w-lg text-slate-400">
              Uma seleção de obras e projetos estruturais entregues com precisão técnica e dentro do prazo.
            </p>
          </motion.div>
        </Container>
      </section>

      <Section>
        <Container>
          {/* Category filter */}
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-amber-400 text-slate-900'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-amber-400" />
            </div>
          ) : (
            <motion.div
              variants={shouldReduceMotion ? {} : staggerChildren}
              initial="hidden"
              animate="visible"
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((project) => (
                <motion.article
                  key={project.id}
                  variants={shouldReduceMotion ? {} : slideUp}
                  className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="aspect-video bg-slate-100" />
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <Badge>{project.category}</Badge>
                      <span className="text-xs text-slate-400">{project.year}</span>
                    </div>
                    <h2 className="font-heading mt-3 text-lg font-semibold text-slate-900">
                      {project.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-2">
                      {project.description}
                    </p>
                    <p className="mt-3 text-xs text-slate-400">{project.location}</p>
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
