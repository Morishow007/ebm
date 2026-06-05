// Árvore de conversa do chatbot estático da EBM Engenharia.
// Cada nó tem uma mensagem do bot e opções clicáveis.
// Nodes com `link` abrem uma URL ao serem selecionados antes de avançar.

export interface ChatOption {
  label: string
  next: string
  link?: string
  external?: boolean
}

export interface ChatNode {
  id: string
  message: string
  options: ChatOption[]
}

const CONTACT_EMAIL = 'contato@ebmengenharia.com.br'
const WHATSAPP_URL = 'https://wa.me/5511999999999' // substituir pelo número real

// Opções de retorno reutilizáveis
const backToStart: ChatOption = { label: '↩ Voltar ao início', next: 'start' }
const backToServices: ChatOption = { label: '← Outros serviços', next: 'menu-services' }

const quoteOptions = (serviceLabel: string): ChatOption[] => [
  { label: '📋 Preencher formulário', next: 'cta-form', link: '/contato' },
  {
    label: '💬 Falar pelo WhatsApp',
    next: 'cta-whatsapp',
    link: `${WHATSAPP_URL}?text=Olá! Tenho interesse em ${serviceLabel}.`,
    external: true,
  },
  {
    label: '✉️ Enviar e-mail',
    next: 'cta-email',
    link: `mailto:${CONTACT_EMAIL}?subject=Orçamento - ${serviceLabel}`,
    external: true,
  },
  backToServices,
]

export const chatNodes: Record<string, ChatNode> = {
  // ── Início ─────────────────────────────────────────────────────────
  start: {
    id: 'start',
    message:
      'Olá! Sou o assistente virtual da **EBM Engenharia**. Posso te ajudar a encontrar o serviço certo ou colocar você em contato com o Eduardo. O que você precisa?',
    options: [
      { label: '🏗️ Conhecer os serviços', next: 'menu-services' },
      { label: '💰 Solicitar um orçamento', next: 'menu-quote' },
      { label: '📁 Ver projetos realizados', next: 'menu-projects' },
      { label: '👤 Falar com o Eduardo', next: 'menu-contact' },
    ],
  },

  // ── Menu de serviços ───────────────────────────────────────────────
  'menu-services': {
    id: 'menu-services',
    message: 'Ótimo! Qual área te interessa?',
    options: [
      { label: '🏛️ Projeto Estrutural', next: 'service-structural' },
      { label: '📑 Regularização Imobiliária', next: 'service-regularization' },
      { label: '⛑️ Segurança do Trabalho (SST)', next: 'service-safety' },
      { label: '🧊 Consultoria BIM / Revit', next: 'service-bim' },
      { label: '🔍 Laudos e Inspeções', next: 'service-inspection' },
      { label: '🔧 Gestão Técnica de Obras', next: 'service-management' },
      backToStart,
    ],
  },

  // ── Serviços individuais ───────────────────────────────────────────
  'service-structural': {
    id: 'service-structural',
    message:
      'Desenvolvemos **projetos estruturais completos** em concreto armado, estrutura metálica e misto — seguindo as normas ABNT. Entregamos memorial de cálculo, detalhamento, pranchas executivas e ART inclusa.',
    options: [
      ...quoteOptions('Projeto Estrutural'),
    ],
  },

  'service-regularization': {
    id: 'service-regularization',
    message:
      'Auxiliamos na **regularização de imóveis** junto aos órgãos competentes: Habite-se, averbação, usucapião extrajudicial e documentação técnica completa. Eduardo possui especialização em **Direito Imobiliário pela FGV**.',
    options: [
      ...quoteOptions('Regularização Imobiliária'),
    ],
  },

  'service-safety': {
    id: 'service-safety',
    message:
      'Oferecemos gestão completa de **Saúde e Segurança do Trabalho** para a construção civil: PGR, PCMSO, laudos NR-18/35, treinamentos e atuação como **responsável técnico de SST**. Eduardo é pós-graduado em Engenharia de Segurança do Trabalho.',
    options: [
      ...quoteOptions('Segurança do Trabalho'),
    ],
  },

  'service-bim': {
    id: 'service-bim',
    message:
      'Realizamos **modelagem estrutural em Revit** com exportação IFC compatível, coordenação entre disciplinas e geração automática de quantitativos. Ideal para projetos que exigem BIM nível 2.',
    options: [
      ...quoteOptions('Consultoria BIM'),
    ],
  },

  'service-inspection': {
    id: 'service-inspection',
    message:
      'Realizamos **inspeção predial** conforme a NBR 16747, com laudos de patologia estrutural, identificação de riscos e plano de manutenção preventiva. ART inclusa em todos os laudos.',
    options: [
      ...quoteOptions('Laudos e Inspeções'),
    ],
  },

  'service-management': {
    id: 'service-management',
    message:
      'Acompanhamos a execução da obra garantindo **conformidade com o projeto**, controle de qualidade e cumprimento de prazos. Relatórios periódicos e interface direta com projetistas e equipes.',
    options: [
      ...quoteOptions('Gestão Técnica de Obras'),
    ],
  },

  // ── Orçamento direto ───────────────────────────────────────────────
  'menu-quote': {
    id: 'menu-quote',
    message: 'Para preparar uma proposta personalizada, me conta: qual é o tipo de serviço?',
    options: [
      { label: '🏛️ Projeto Estrutural', next: 'service-structural' },
      { label: '📑 Regularização Imobiliária', next: 'service-regularization' },
      { label: '⛑️ Segurança do Trabalho', next: 'service-safety' },
      { label: '🧊 Consultoria BIM', next: 'service-bim' },
      { label: '🔍 Laudo / Inspeção', next: 'service-inspection' },
      { label: '🔧 Gestão de Obra', next: 'service-management' },
      backToStart,
    ],
  },

  // ── Projetos ───────────────────────────────────────────────────────
  'menu-projects': {
    id: 'menu-projects',
    message:
      'Temos um portfólio com projetos residenciais, comerciais e industriais em São Paulo e região. Você pode conferir todos os projetos no nosso site!',
    options: [
      { label: '🗂️ Ver portfólio', next: 'cta-projects', link: '/projetos' },
      { label: '💰 Solicitar orçamento', next: 'menu-quote' },
      backToStart,
    ],
  },

  // ── Contato direto ─────────────────────────────────────────────────
  'menu-contact': {
    id: 'menu-contact',
    message:
      'Você pode falar diretamente com o **Eduardo Brignol**, engenheiro civil e responsável técnico da EBM, pelos canais abaixo:',
    options: [
      { label: '📋 Formulário de contato', next: 'cta-form', link: '/contato' },
      {
        label: '💬 WhatsApp',
        next: 'cta-whatsapp',
        link: WHATSAPP_URL,
        external: true,
      },
      {
        label: '✉️ E-mail',
        next: 'cta-email',
        link: `mailto:${CONTACT_EMAIL}`,
        external: true,
      },
      backToStart,
    ],
  },

  // ── CTAs terminais ─────────────────────────────────────────────────
  'cta-form': {
    id: 'cta-form',
    message:
      'Perfeito! Você será redirecionado para o formulário de contato. O Eduardo responde em até 1 dia útil. 👍',
    options: [{ label: '↩ Voltar ao início', next: 'start' }],
  },

  'cta-whatsapp': {
    id: 'cta-whatsapp',
    message: 'Abrindo o WhatsApp... O Eduardo vai te atender em breve! 👋',
    options: [{ label: '↩ Voltar ao início', next: 'start' }],
  },

  'cta-email': {
    id: 'cta-email',
    message:
      'Abrindo seu cliente de e-mail. Caso prefira, você também pode preencher o formulário no site. 📬',
    options: [
      { label: '📋 Formulário de contato', next: 'cta-form', link: '/contato' },
      { label: '↩ Voltar ao início', next: 'start' },
    ],
  },

  'cta-projects': {
    id: 'cta-projects',
    message: 'Abrindo a página de projetos... Fique à vontade para explorar o portfólio! 🏗️',
    options: [
      { label: '💰 Solicitar orçamento', next: 'menu-quote' },
      { label: '↩ Voltar ao início', next: 'start' },
    ],
  },
}
