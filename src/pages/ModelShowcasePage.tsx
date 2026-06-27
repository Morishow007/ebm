import { motion } from 'framer-motion'
import { ChevronDown, ExternalLink } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import { PageMeta } from '@/components/seo/PageMeta'
import { Container } from '@/components/ui'
import { fadeIn } from '@/lib/motion'
import { getModel, models3d } from '@/lib/models3d'
import { BUSINESS } from '@/lib/seo'

const availableModels = Object.values(models3d).filter((m) => m.sketchfabId)

export default function ModelShowcasePage() {
  const { slug } = useParams<{ slug?: string }>()
  const navigate = useNavigate()

  const model = slug ? getModel(slug) : availableModels[0]
  const sketchfabId = model?.sketchfabId || import.meta.env.VITE_SKETCHFAB_MODEL_ID
  const title = model?.title ?? 'Visualização 3D'

  const embedUrl = sketchfabId
    ? `https://sketchfab.com/models/${sketchfabId}/embed?autospin=0&autostart=1&ui_theme=dark&preload=1&ui_infos=0&ui_settings=0&ui_vr=0&ui_help=0&ui_annotations=0`
    : null

  return (
    <>
      <PageMeta
        title={`${title} | ${BUSINESS.name}`}
        description="Explore projetos de engenharia civil em visualização 3D interativa. Modelos BIM exportados do Revit."
        path={`/projetos/3d${slug ? `/${slug}` : ''}`}
      />

      <section className="bg-charcoal-900 py-16">
        <Container>
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <span className="text-xs font-semibold uppercase tracking-widest text-orange-400">
              Tecnologia BIM
            </span>
            <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
              <h1 className="font-heading text-4xl font-bold text-white">{title}</h1>
              {availableModels.length > 1 && (
                <div className="relative">
                  <select
                    value={model?.slug ?? ''}
                    onChange={(e) => navigate(`/projetos/3d/${e.target.value}`)}
                    className="appearance-none rounded border border-white/10 bg-charcoal-800 py-2 pl-3 pr-8 text-sm text-charcoal-200 outline-none transition-colors hover:border-orange-400/50 focus:border-orange-400 focus:ring-1 focus:ring-orange-400/30 cursor-pointer"
                  >
                    {availableModels.map((m) => (
                      <option key={m.slug} value={m.slug}>
                        {m.title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal-400"
                  />
                </div>
              )}
            </div>
            <p className="mt-3 max-w-xl text-charcoal-400">
              Explore o modelo em tempo real. Arraste para rotacionar, scroll para zoom.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="bg-charcoal-900 py-12">
        <Container>
          {embedUrl ? (
            <>
              <div className="overflow-hidden rounded-xl border border-white/8 bg-charcoal-800">
                <iframe
                  key={sketchfabId}
                  title={`Modelo 3D — ${title}`}
                  src={embedUrl}
                  className="h-[65vh] w-full"
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  allowFullScreen
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-charcoal-600">
                  Arraste para rotacionar · Scroll para zoom · Duplo clique para focar
                </p>
                <a
                  href={`https://sketchfab.com/models/${sketchfabId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-charcoal-500 transition-colors hover:text-charcoal-300"
                >
                  Ver no Sketchfab <ExternalLink size={11} />
                </a>
              </div>
            </>
          ) : (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 text-center">
              <p className="text-charcoal-500">Modelo 3D em breve.</p>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
