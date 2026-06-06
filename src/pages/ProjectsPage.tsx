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
      <PageMeta
        title={pageSEO.projects.title}
        description={pageSEO.projects.description}
        keywords={[...pageSEO.projects.keywords]}
        path="/projetos"
      />

      {/* Page header */}
      <section className="bg-black py-20">
        <Container>
          <motion.div
            variants={shouldReduceMotion ? {} : fadeIn}
            initial="hidden"
            animate="visible"
          >
            <h1 className="font-heading text-4xl font-bold text-white">Projetos</h1>
            <p className="mt-4 max-w-lg text-zinc-400">
              Uma seleção de obras e projetos estruturais entregues com precisão técnica e dentro do prazo.
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
              className="group flex items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-zinc-50 px-6 py-5 transition-all hover:border-amber-200 hover:bg-amber-50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-amber-400">
                  <Box size={22} />
                </div>
                <div>
                  <p className="font-heading font-semibold text-zinc-900">
                    Visualização 3D interativa
                  </p>
                  <p className="mt-0.5 text-sm text-zinc-500">
                    Explore modelos BIM exportados do Revit em tempo real no navegador
                  </p>
                </div>
              </div>
              <ArrowRight
                size={18}
                className="shrink-0 text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-amber-500"
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
                    ? 'bg-amber-400 text-zinc-900'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-amber-400" />
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
                  className="group overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="aspect-video bg-zinc-100" />
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <Badge>{project.category}</Badge>
                      <span className="text-xs text-zinc-400">{project.year}</span>
                    </div>
                    <h2 className="font-heading mt-3 text-lg font-semibold text-zinc-900">
                      {project.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-500 line-clamp-2">
                      {project.description}
                    </p>
                    <p className="mt-3 text-xs text-zinc-400">{project.location}</p>
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
