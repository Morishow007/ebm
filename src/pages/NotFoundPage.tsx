import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

import { PageMeta } from '@/components/seo/PageMeta'
import { Container } from '@/components/ui'
import { slideUp } from '@/lib/motion'
import { BUSINESS } from '@/lib/seo'

export default function NotFoundPage() {
  return (
    <>
      <PageMeta
        title={`Página não encontrada | ${BUSINESS.name}`}
        description="A página que você acessou não existe."
        path="/404"
        noIndex
      />

      <Container className="flex min-h-[80vh] flex-col items-center justify-center text-center">
        <motion.div
          variants={slideUp}
          initial="hidden"
          animate="visible"
          className="max-w-md"
        >
          <p className="font-heading text-8xl font-bold text-amber-400">404</p>
          <h1 className="font-heading mt-4 text-2xl font-bold text-zinc-900">
            Página não encontrada
          </h1>
          <p className="mt-3 text-zinc-500">
            O endereço que você acessou não existe ou foi removido.
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex h-10 items-center gap-2 rounded bg-amber-400 px-5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-amber-300"
            >
              <ArrowLeft size={16} />
              Voltar ao início
            </Link>
          </div>
        </motion.div>
      </Container>
    </>
  )
}
