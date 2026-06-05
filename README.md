# EBM Engenharia

Site institucional e portal do cliente para empresa de engenharia estrutural.

---

## Configuração

### Pré-requisitos

- Node.js 20+
- npm 10+

### Instalação

```bash
npm install
```

### Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha as variáveis:

```bash
cp .env.example .env.local
```

| Variável | Descrição |
|---|---|
| `VITE_APP_NAME` | Nome do site (ex.: `EBM Engenharia`) |
| `VITE_APP_URL` | URL de produção |
| `VITE_CONTACT_EMAIL` | E-mail de contato exibido no site |
| `VITE_GA_MEASUREMENT_ID` | ID do Google Analytics 4 |
| `VITE_SUPABASE_URL` | URL do projeto Supabase (portal) |
| `VITE_SUPABASE_ANON_KEY` | Chave anon do Supabase |
| `VITE_CMS_API_URL` | URL da API do CMS headless |

---

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção (`dist/`) |
| `npm run preview` | Pré-visualiza o build de produção |
| `npm run lint` | Verifica o código com ESLint |
| `npm run format` | Formata o código com Prettier |

---

## Estrutura de pastas

```
src/
├── app/              # Roteador, providers e layouts
│   ├── router/       # Rotas e guards (PrivateRoute, RoleGuard)
│   ├── providers/    # ThemeProvider, QueryProvider
│   └── layouts/      # RootLayout, PortalLayout, PrintLayout
│
├── components/
│   ├── ui/           # Componentes base reutilizáveis (Button, Card, etc.)
│   ├── sections/     # Navbar e Footer
│   └── three/        # Canvas Three.js, ModelViewer, IFCViewer
│
├── features/         # Features por domínio (home, projects, services, contact, portal)
├── hooks/            # Hooks customizados (useTheme, useBreakpoint, useScrollProgress)
├── lib/              # Utilitários (analytics, api, seo, motion, utils)
├── pages/            # Componentes de página (lazy-loaded pelo roteador)
├── store/            # Estado global com Zustand (ui, project, auth slices)
├── styles/           # CSS global e tokens de design
└── types/            # Tipos TypeScript globais e modelos de domínio
```

---

## Convenções

- Imports absolutos via `@/` (mapeado para `src/`)
- Commits verificados por Husky + lint-staged (ESLint + Prettier)
- Framer Motion respeita `prefers-reduced-motion`
- Todas as variáveis de ambiente tipadas em `src/types/global.d.ts`
