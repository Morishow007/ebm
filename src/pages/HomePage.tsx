import { motion, useReducedMotion, type Variants } from 'framer-motion'
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle,
  ClipboardList,
  HardHat,
  Layers,
  ShieldCheck,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import capaceteEbm from '@/assets/images/capacete-ebm.png'
import profileDudu from '@/assets/images/profile_dudu.png'
import { GoogleRating } from '@/components/seo/GoogleRating'
import { PageMeta } from '@/components/seo/PageMeta'
import { Badge, Card, CardContent, Container, Section } from '@/components/ui'
import { fadeIn, pageTransition, scaleIn, slideUp, staggerChildren } from '@/lib/motion'
import { pageSEO } from '@/lib/seo'

interface InViewProps {
  variants?: Variants
  initial?: string
  whileInView?: string
  viewport?: { once: boolean }
}

const stats = [
  { value: '+80', label: 'Projetos entregues' },
  { value: '8+', label: 'Anos de experiência' },
  { value: '+5000 m²', label: 'Regularizados' },
  { value: '+100', label: 'Laudos emitidos' },
]

const highlights = [
  {
    icon: HardHat,
    title: 'Projeto Estrutural',
    description: 'Concreto armado, metálico e misto — com memorial de cálculo e pranchas executivas.',
  },
  {
    icon: ClipboardList,
    title: 'Regularização Imobiliária',
    description:
      'Habite-se, averbação e documentação técnica com embasamento em Direito Imobiliário (FGV).',
  },
  {
    icon: ShieldCheck,
    title: 'Segurança do Trabalho',
    description:
      'PGR, PCMSO, laudos NR-18/35 e treinamentos SST para empresas da construção civil.',
  },
  {
    icon: Layers,
    title: 'Consultoria BIM',
    description: 'Modelos Revit e IFC com coordenação multidisciplinar e quantitativos automáticos.',
  },
]

const credentials = [
  'Engenheiro Civil — CREA RS-242316',
  'Pós-graduado em Engenharia de Segurança do Trabalho',
  'Especialização em Direito Imobiliário — FGV',
  'Formação técnica em Desenvolvimento de Software e Instrumentação Industrial',
  'Inglês B2 certificado — TOEFL ITP',
  'Responsável técnico de empresas da construção civil',
  'Professor de Física — Programa PAIDEIA Educação Popular',
  'Palestrante em eventos acadêmicos de SST',
]

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion()

  function inView(variants: Variants): InViewProps {
    if (shouldReduceMotion) return {}
    return { variants, initial: 'hidden', whileInView: 'visible', viewport: { once: true } }
  }

  return (
    <>
      <PageMeta
        title={pageSEO.home.title}
        description={pageSEO.home.description}
        keywords={[...pageSEO.home.keywords]}
        path="/"
      />

      {/* ── Hero — foto com overlay ────────────────────────────── */}
      <section
        className="relative flex min-h-[92vh] items-center"
        style={{
          backgroundImage: `url(${capaceteEbm})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
        }}
      >
        {/* Overlay gradiente: mais denso na esquerda onde está o texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />
        <div className="absolute inset-0 bg-black/30" />

        <Container className="relative z-10 py-24">
          <motion.div
            variants={shouldReduceMotion ? {} : staggerChildren}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.div variants={shouldReduceMotion ? {} : fadeIn}>
              <Badge variant="accent" className="mb-6">
                Engenharia Civil · SST · BIM · Regularização
              </Badge>
            </motion.div>

            <motion.h1
              variants={shouldReduceMotion ? {} : slideUp}
              className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Estrutura sólida para{' '}
              <span className="text-amber-400">cada projeto</span>
            </motion.h1>

            <motion.p
              variants={shouldReduceMotion ? {} : slideUp}
              className="mt-6 text-lg leading-relaxed text-white/75"
            >
              Da concepção estrutural à regularização imobiliária — a EBM Engenharia entrega
              soluções técnicas completas com responsabilidade, prazo e comprometimento.
            </motion.p>

            <motion.div
              variants={shouldReduceMotion ? {} : slideUp}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                to="/contato"
                className="inline-flex h-12 items-center gap-2 rounded bg-amber-400 px-7 text-base font-semibold text-black transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                Solicitar Orçamento <ArrowRight size={18} />
              </Link>
              <Link
                to="/projetos"
                className="inline-flex h-12 items-center rounded border border-white/30 px-7 text-base text-white transition-colors hover:border-white/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Ver Projetos
              </Link>
            </motion.div>

          </motion.div>
        </Container>
      </section>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="border-y border-white/8 bg-zinc-950 py-12">
        <Container>
          <motion.div
            {...inView(staggerChildren)}
            className="grid grid-cols-2 gap-8 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={shouldReduceMotion ? {} : scaleIn}
                className="text-center"
              >
                <p className="font-heading text-3xl font-bold text-amber-400">{stat.value}</p>
                <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ── Serviços em destaque ───────────────────────────────── */}
      <Section className="bg-white">
        <Container>
          <motion.div {...inView(fadeIn)} className="text-center">
            <h2 className="font-heading text-3xl font-bold text-zinc-900 sm:text-4xl">
              O que fazemos
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-500">
              Soluções completas de engenharia civil para cada fase do seu empreendimento.
              Consultoria em segurança do trabalho.
            </p>
          </motion.div>

          <motion.div
            {...inView(staggerChildren)}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {highlights.map((item) => (
              <motion.div key={item.title} variants={shouldReduceMotion ? {} : slideUp}>
                <Card className="h-full border-zinc-100 p-6 transition-all hover:border-amber-200 hover:shadow-md">
                  <CardContent className="p-0">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded bg-zinc-100 text-zinc-700">
                      <item.icon size={22} />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-zinc-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 text-center">
            <Link
              to="/servicos"
              className="inline-flex h-11 items-center gap-2 rounded border border-zinc-200 px-7 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-900"
            >
              Todos os serviços <ArrowRight size={16} />
            </Link>
          </div>
        </Container>
      </Section>

      {/* ── Sobre o engenheiro ─────────────────────────────────── */}
      <section className="bg-zinc-50 py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Texto */}
            <motion.div {...inView(slideUp)}>
              {/* Profile — estilo Instagram */}
              <div className="mb-8 flex items-center gap-6">
                <div className="relative shrink-0">
                  <div className="h-32 w-32 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 p-[3px]">
                    <img
                      src={profileDudu}
                      alt="Eduardo Brignol Moreira"
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <Badge className="mb-2 bg-zinc-200 text-zinc-700">Responsável Técnico</Badge>
                  <h2 className="font-heading text-2xl font-bold text-zinc-900 sm:text-3xl">
                    Eduardo Brignol Moreira
                  </h2>
                  <p className="mt-1 text-sm font-medium text-amber-600">
                    Engenheiro Civil · CREA RS-242316
                  </p>
                </div>
              </div>
              <p className="mt-5 leading-relaxed text-zinc-600">
                Engenheiro civil com pós-graduação em Engenharia de Segurança do Trabalho e
                especialização em Direito Imobiliário pela{' '}
                <strong className="text-zinc-900">Fundação Getulio Vargas</strong>. Com formação técnica em Desenvolvimento de Software e
                Instrumentação Industrial, une o rigor da engenharia à visão tecnológica para
                entregar projetos mais eficientes.
              </p>
              <p className="mt-4 leading-relaxed text-zinc-600">
                Proprietário da EBM Engenharia, atua como responsável técnico de empresas do
                segmento da construção civil. Possui{' '}
                <strong className="text-zinc-900">inglês B2 certificado (TOEFL ITP)</strong> e
                é professor de Física no programa{' '}
                <strong className="text-zinc-900">PAIDEIA Educação Popular</strong>, além de
                palestrante em eventos acadêmicos de SST.
              </p>
            </motion.div>

            {/* Credenciais */}
            <motion.div {...inView(staggerChildren)}>
              <div className="rounded-lg border border-zinc-200 bg-white p-8 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-zinc-100">
                    <Award size={20} className="text-amber-500" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-zinc-900">
                    Formação e Credenciais
                  </h3>
                </div>
                <ul className="divide-y divide-zinc-100">
                  {credentials.map((cred) => (
                    <motion.li
                      key={cred}
                      variants={shouldReduceMotion ? {} : slideUp}
                      className="flex items-center gap-3 py-2.5"
                    >
                      <CheckCircle size={14} className="shrink-0 text-amber-500" aria-hidden />
                      <span className="text-sm leading-snug text-zinc-700">{cred}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    to="/contato"
                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded bg-black text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
                  >
                    Agendar uma conversa <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { icon: BookOpen, label: 'Educador e palestrante' },
                  { icon: Award, label: 'Inglês B2 — TOEFL ITP' },
                  { icon: ShieldCheck, label: 'Segurança do Trabalho' },
                  { icon: CheckCircle, label: 'Direito Imobiliário FGV' },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded border border-zinc-200 bg-white px-3 py-2.5 text-xs font-medium text-zinc-600 shadow-sm"
                  >
                    <Icon size={13} className="text-amber-500 shrink-0" />
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Avaliações Google ─────────────────────────────────── */}
      <section className="bg-white py-20">
        <Container>
          <motion.div {...inView(fadeIn)} className="mb-10 text-center">
            <h2 className="font-heading text-3xl font-bold text-zinc-900 sm:text-4xl">
              O que dizem os clientes
            </h2>
          
          </motion.div>
          <div
            className="elfsight-app-17f592bd-d782-42a4-8175-29f73935f8f1"
            data-elfsight-app-lazy
          />
        </Container>
      </section>

      {/* ── CTA final ─────────────────────────────────────────── */}
      <motion.section
        variants={shouldReduceMotion ? {} : pageTransition}
        {...(shouldReduceMotion
          ? {}
          : { initial: 'hidden', whileInView: 'visible', viewport: { once: true } })}
        className="bg-black py-24"
      >
        <Container className="text-center">
          {/* Linha decorativa âmbar */}
          <div className="mx-auto mb-8 h-px w-16 bg-amber-400" />
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Pronto para começar seu projeto?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-zinc-400">
            Entre em contato e receba uma proposta personalizada sem compromisso.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/contato"
              className="inline-flex h-12 items-center gap-2 rounded bg-amber-400 px-8 text-base font-semibold text-black transition-colors hover:bg-amber-300"
            >
              Solicitar Orçamento <ArrowRight size={18} />
            </Link>
            <Link
              to="/servicos"
              className="inline-flex h-12 items-center rounded border border-white/20 px-8 text-base text-zinc-300 transition-colors hover:border-white/40 hover:text-white"
            >
              Conhecer serviços
            </Link>
          </div>
          <div className="mt-10 flex justify-center">
            <GoogleRating theme="dark" />
          </div>
        </Container>
      </motion.section>
    </>
  )
}
