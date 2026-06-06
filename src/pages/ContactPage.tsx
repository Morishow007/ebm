import { motion, useReducedMotion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { PageMeta } from '@/components/seo/PageMeta'
import { Button, Container, Section } from '@/components/ui'
import { QuoteRequestSchema, projectTypeLabels, type QuoteRequest } from '@/features/contact'
import { trackEvent } from '@/lib/analytics'
import { fadeIn, slideUp } from '@/lib/motion'
import { pageSEO } from '@/lib/seo'

const contactDetails = [
  {
    icon: Phone,
    label: 'Telefone / WhatsApp',
    value: import.meta.env.VITE_CONTACT_PHONE || '+55 53 9708-1900',
  },
  {
    icon: Mail,
    label: 'E-mail',
    value: import.meta.env.VITE_CONTACT_EMAIL || 'contato@ebmengenharia.com',
  },
  { icon: MapPin, label: 'Atendimento', value: 'Rio Grande, Pelotas e sul do RS — projetos em todo o Brasil' },
]

export default function ContactPage() {
  const shouldReduceMotion = useReducedMotion()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<QuoteRequest>({
    resolver: zodResolver(QuoteRequestSchema),
  })

  async function onSubmit(data: QuoteRequest) {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: import.meta.env.VITE_WEB3FORMS_KEY,
        subject: `Solicitação de orçamento — ${data.projectType}`,
        from_name: data.name,
        ...data,
      }),
    })

    if (!res.ok) throw new Error('Falha no envio')

    trackEvent('quote_request', { project_type: data.projectType })
    reset()
  }

  return (
    <>
      <PageMeta
        title={pageSEO.contact.title}
        description={pageSEO.contact.description}
        keywords={[...pageSEO.contact.keywords]}
        path="/contato"
      />

      <section className="bg-black py-20">
        <Container>
          <motion.div
            variants={shouldReduceMotion ? {} : fadeIn}
            initial="hidden"
            animate="visible"
          >
            <h1 className="font-heading text-4xl font-bold text-white">Contato</h1>
            <p className="mt-4 max-w-lg text-zinc-400">
              Preencha o formulário e retornamos uma proposta personalizada.
            </p>
          </motion.div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact info */}
            <motion.div
              variants={shouldReduceMotion ? {} : slideUp}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <h2 className="font-heading text-xl font-bold text-zinc-900">
                Informações de contato
              </h2>
              {contactDetails.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-amber-50 text-amber-500">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                      {label}
                    </p>
                    <p className="mt-0.5 text-sm text-zinc-700">{value}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Quote form */}
            <motion.div
              variants={shouldReduceMotion ? {} : slideUp}
              initial="hidden"
              animate="visible"
              className="lg:col-span-2"
            >
              {isSubmitSuccessful ? (
                <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
                  <p className="font-heading text-xl font-semibold text-green-800">
                    Mensagem enviada com sucesso!
                  </p>
                  <p className="mt-2 text-sm text-green-700">
                    Retornaremos em breve com sua proposta.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Nome *" error={errors.name?.message}>
                      <input
                        {...register('name')}
                        placeholder="Seu nome completo"
                        className={inputClass(!!errors.name)}
                      />
                    </Field>
                    <Field label="Empresa" error={errors.company?.message}>
                      <input
                        {...register('company')}
                        placeholder="Nome da empresa (opcional)"
                        className={inputClass(false)}
                      />
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="E-mail *" error={errors.email?.message}>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="seu@email.com.br"
                        className={inputClass(!!errors.email)}
                      />
                    </Field>
                    <Field label="Telefone *" error={errors.phone?.message}>
                      <input
                        {...register('phone')}
                        type="tel"
                        placeholder="(11) 99999-9999"
                        className={inputClass(!!errors.phone)}
                      />
                    </Field>
                  </div>

                  <Field label="Tipo de serviço *" error={errors.projectType?.message}>
                    <select {...register('projectType')} className={inputClass(!!errors.projectType)}>
                      <option value="">Selecione um serviço...</option>
                      {Object.entries(projectTypeLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Faixa de investimento" error={errors.budget?.message}>
                    <select {...register('budget')} className={inputClass(false)}>
                      <option value="">Prefiro não informar</option>
                      <option value="ate-5k">Até R$ 5.000</option>
                      <option value="5k-15k">R$ 5.000 – R$ 15.000</option>
                      <option value="15k-50k">R$ 15.000 – R$ 50.000</option>
                      <option value="acima-50k">Acima de R$ 50.000</option>
                    </select>
                  </Field>

                  <Field label="Descrição do projeto *" error={errors.message?.message}>
                    <textarea
                      {...register('message')}
                      rows={5}
                      placeholder="Descreva brevemente o seu projeto ou dúvida..."
                      className={inputClass(!!errors.message)}
                    />
                  </Field>

                  <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full sm:w-auto">
                    Enviar solicitação
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </Container>
      </Section>
    </>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-zinc-700">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

function inputClass(hasError: boolean) {
  return `w-full rounded border px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:ring-2 focus:ring-amber-400/50 ${
    hasError
      ? 'border-red-400 bg-red-50 focus:border-red-400'
      : 'border-zinc-300 bg-white focus:border-amber-400'
  }`
}
