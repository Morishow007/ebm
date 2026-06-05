import { motion, useReducedMotion, type Variants } from 'framer-motion'

interface InViewProps {
  variants?: Variants
  initial?: string
  whileInView?: string
  viewport?: { once: boolean }
}
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
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { Badge, Card, CardContent, Container, Section } from '@/components/ui'
import { fadeIn, pageTransition, scaleIn, slideUp, staggerChildren } from '@/lib/motion'
import { buildPageTitle, defaultSEO } from '@/lib/seo'

const stats = [
  { value: '+80', label: 'Projetos entregues' },
  { value: '10+', label: 'Anos de experiência' },
  { value: '100%', label: 'ART garantida' },
  { value: 'B2', label: 'Inglês — TOEFL ITP' },
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
  'Engenheiro Civil — CREA',
  'Pós-graduado em Engenharia de Segurança do Trabalho',
  'Especialização em Direito Imobiliário — FGV (conclusão 06/2026)',
  'Formação técnica em Desenvolvimento de Software e Instrumentação Industrial',
  'Inglês B2 certificado — TOEFL ITP',
  'Responsável técnico de empresas da construção civil',
  'Professor de Física — Programa PAIDEIA Educação Popular',
  'Palestrante em eventos acadêmicos de SST',
]

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion()

  function motionView(variants: Variants): InViewProps {
    if (shouldReduceMotion) return {}
    return { variants, initial: 'hidden', whileInView: 'visible', viewport: { once: true } }
  }

  return (
    <>
      <Helmet>
        <title>{buildPageTitle('Início')}</title>
        <meta name="description" content={defaultSEO.description} />
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[92vh] items-center bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,_rgba(245,158,11,0.10)_0%,_transparent_70%)]" />
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
              className="mt-6 text-lg leading-relaxed text-slate-300"
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
                className="inline-flex h-12 items-center gap-2 rounded bg-amber-400 px-7 text-base font-semibold text-slate-900 transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                Solicitar Orçamento <ArrowRight size={18} />
              </Link>
              <Link
                to="/projetos"
                className="inline-flex h-12 items-center rounded border border-slate-700 px-7 text-base text-slate-300 transition-colors hover:border-slate-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                Ver Projetos
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="border-y border-slate-800 bg-slate-900 py-12">
        <Container>
          <motion.div
            {...motionView(staggerChildren)}
            className="grid grid-cols-2 gap-8 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={shouldReduceMotion ? {} : scaleIn}
                className="text-center"
              >
                <p className="font-heading text-3xl font-bold text-amber-400">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ── Serviços em destaque ───────────────────────────────── */}
      <Section>
        <Container>
          <motion.div {...motionView(fadeIn)} className="text-center">
            <h2 className="font-heading text-3xl font-bold text-slate-900 sm:text-4xl">
              O que fazemos
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-slate-500">
              Soluções completas de engenharia civil para cada fase do seu empreendimento —
              do cálculo estrutural à regularização junto aos órgãos competentes.
            </p>
          </motion.div>

          <motion.div
            {...motionView(staggerChildren)}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {highlights.map((item) => (
              <motion.div key={item.title} variants={shouldReduceMotion ? {} : slideUp}>
                <Card className="h-full p-6 transition-shadow hover:shadow-md">
                  <CardContent className="p-0">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded bg-amber-50 text-amber-500">
                      <item.icon size={24} />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-10 text-center">
            <Link
              to="/servicos"
              className="inline-flex h-11 items-center gap-2 rounded border border-slate-300 px-7 text-sm text-slate-700 transition-colors hover:bg-slate-50"
            >
              Todos os serviços <ArrowRight size={16} />
            </Link>
          </div>
        </Container>
      </Section>

      {/* ── Sobre o engenheiro ─────────────────────────────────── */}
      <section className="bg-slate-50 py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Texto */}
            <motion.div {...motionView(slideUp)}>
              <Badge className="mb-4">Responsável Técnico</Badge>
              <h2 className="font-heading text-3xl font-bold text-slate-900 sm:text-4xl">
                Eduardo Brignol Moreira
              </h2>
              <p className="mt-1 text-amber-600 font-medium">
                Engenheiro Civil · CREA
              </p>
              <p className="mt-5 text-slate-600 leading-relaxed">
                Engenheiro civil com pós-graduação em Engenharia de Segurança do Trabalho e
                especialização em Direito Imobiliário pela{' '}
                <strong className="text-slate-800">Fundação Getulio Vargas</strong> (conclusão
                prevista em 06/2026). Com formação técnica em Desenvolvimento de Software e
                Instrumentação Industrial, une o rigor da engenharia à visão tecnológica para
                entregar projetos mais eficientes e precisos.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Proprietário da EBM Engenharia, atua como responsável técnico de empresas do
                segmento da construção civil, com experiência em regularização imobiliária,
                projetos estruturais, gestão técnica e segurança do trabalho. Possui{' '}
                <strong className="text-slate-800">inglês B2 certificado (TOEFL ITP)</strong>,
                permitindo atendimento a projetos e clientes internacionais.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Comprometido com a educação, atua como professor de Física preparatória para o
                ENEM no programa{' '}
                <strong className="text-slate-800">PAIDEIA Educação Popular</strong> e como
                palestrante em eventos acadêmicos de SST.
              </p>
            </motion.div>

            {/* Credenciais */}
            <motion.div {...motionView(staggerChildren)}>
              <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-amber-100">
                    <Award size={20} className="text-amber-600" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-slate-900">
                    Formação e Credenciais
                  </h3>
                </div>
                <ul className="space-y-3">
                  {credentials.map((cred) => (
                    <motion.li
                      key={cred}
                      variants={shouldReduceMotion ? {} : slideUp}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle
                        size={16}
                        className="mt-0.5 shrink-0 text-amber-500"
                        aria-hidden
                      />
                      <span className="text-sm text-slate-700">{cred}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    to="/contato"
                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded bg-amber-400 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-300"
                  >
                    Agendar uma conversa <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Diferenciais */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  { icon: BookOpen, label: 'Educador e palestrante' },
                  { icon: Award, label: 'Inglês B2 — TOEFL ITP' },
                  { icon: ShieldCheck, label: 'Segurança do Trabalho' },
                  { icon: CheckCircle, label: 'Direito Imobiliário FGV' },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 shadow-sm"
                  >
                    <Icon size={14} className="text-amber-500 shrink-0" />
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── CTA final ─────────────────────────────────────────── */}
      <motion.section
        variants={shouldReduceMotion ? {} : pageTransition}
        {...(shouldReduceMotion
          ? {}
          : { initial: 'hidden', whileInView: 'visible', viewport: { once: true } })}
        className="bg-slate-950 py-20"
      >
        <Container className="text-center">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Pronto para começar seu projeto?
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-slate-400">
            Entre em contato e receba uma proposta personalizada sem compromisso. Atendimento
            em todo o Brasil.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contato"
              className="inline-flex h-12 items-center gap-2 rounded bg-amber-400 px-7 text-base font-semibold text-slate-900 transition-colors hover:bg-amber-300"
            >
              Solicitar Orçamento <ArrowRight size={18} />
            </Link>
            <Link
              to="/servicos"
              className="inline-flex h-12 items-center rounded border border-slate-700 px-7 text-base text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
            >
              Conhecer serviços
            </Link>
          </div>
        </Container>
      </motion.section>
    </>
  )
}
