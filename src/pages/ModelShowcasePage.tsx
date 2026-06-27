import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

import { PageMeta } from '@/components/seo/PageMeta'
import { Container } from '@/components/ui'
import { fadeIn } from '@/lib/motion'
import { BUSINESS } from '@/lib/seo'

const SKETCHFAB_MODEL_ID = import.meta.env.VITE_SKETCHFAB_MODEL_ID

const embedUrl = SKETCHFAB_MODEL_ID
  ? `https://sketchfab.com/models/${SKETCHFAB_MODEL_ID}/embed?autospin=0&autostart=1&ui_theme=dark&preload=1&ui_infos=0&ui_settings=0&ui_vr=0&ui_help=0&ui_annotations=0`
  : null

export default function ModelShowcasePage() {
  return (
    <>
      <PageMeta
        title={`Visualização 3D | ${BUSINESS.name}`}
        description="Explore projetos de engenharia civil em visualização 3D interativa. Modelos BIM exportados do Revit."
        path="/projetos/3d"
      />

      <section className="bg-charcoal-900 py-16">
        <Container>
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <span className="text-xs font-semibold uppercase tracking-widest text-orange-400">
              Tecnologia BIM
            </span>
            <h1 className="font-heading mt-2 text-4xl font-bold text-white">
              Visualização 3D interativa
            </h1>
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
                  title="Modelo 3D — EBM Engenharia"
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
                  href={`https://sketchfab.com/models/${SKETCHFAB_MODEL_ID}`}
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
              <p className="mt-1 text-xs text-charcoal-700">
                Configure <code className="text-charcoal-500">VITE_SKETCHFAB_MODEL_ID</code> no .env
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
