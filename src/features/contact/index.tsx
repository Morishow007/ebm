import { z } from 'zod'

export const QuoteRequestSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  company: z.string().optional(),
  email: z.string().email('E-mail inválido'),
  phone: z
    .string()
    .min(10, 'Telefone inválido')
    .regex(/^\+?[\d\s\-().]+$/, 'Formato de telefone inválido'),
  projectType: z.enum(
    ['estrutural', 'bim', 'laudo', 'fundacoes', 'consultoria', 'outro'],
    { errorMap: () => ({ message: 'Selecione um tipo de serviço' }) }
  ),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
  budget: z.string().optional(),
})

export type QuoteRequest = z.infer<typeof QuoteRequestSchema>

export const projectTypeLabels: Record<QuoteRequest['projectType'], string> = {
  estrutural: 'Projeto Estrutural',
  bim: 'Consultoria BIM',
  laudo: 'Laudo / Inspeção',
  fundacoes: 'Cálculo de Fundações',
  consultoria: 'Consultoria Técnica',
  outro: 'Outro',
}
