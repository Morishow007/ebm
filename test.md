# Create a professional engineering company website foundation using React 18, TypeScript, and Vite

## CONTEXT

This site is for a structural engineering firm. The goal is to convert qualified leads, showcase completed projects, and eventually serve as a client portal with BIM/Revit model visualization.

The audience is companies and developers seeking structural design, inspection, and BIM consulting services.

**PHASE 1 ONLY — architecture, tooling, and boilerplate. No real content. No real pages.**

---

# TECH STACK

## Core

* React 18.3.x (NOT React 19 — React Three Fiber v8 has unstable React 19 support)
* TypeScript 5.x (strict mode)
* Vite 5.x
* react-router-dom v6.x

## Styling & Motion

* Tailwind CSS v4 (using @tailwindcss/vite plugin, not PostCSS)
* Framer Motion v11
* clsx + tailwind-merge for conditional class merging

## 3D

* @react-three/fiber v8 (pinned to React 18)
* @react-three/drei v9
* three.js r165+

## State & Forms

* Zustand v5 with immer middleware
* React Hook Form v7
* Zod v3
* @hookform/resolvers

## SEO & Meta

* react-helmet-async (for dynamic meta tags, Open Graph, structured data)

## Icons

* lucide-react

## Analytics (stub only)

Prepare an `/src/lib/analytics.ts` abstraction layer (no real GTM yet).

Export:

```ts
trackEvent(name, props)
trackPageView()
identify(userId)
```

This will be swapped for GA4 or Plausible later without touching feature code.

## Code Quality

* ESLint v9 (flat config — eslint.config.ts)
* Prettier v3
* Husky v9 (use `npx husky init`, NOT the old `.huskyrc` approach)
* lint-staged

---

# PROJECT STRUCTURE

```txt
src/
├── app/
│   ├── router/
│   │   ├── index.tsx
│   │   └── guards/
│   │       ├── PrivateRoute.tsx
│   │       └── RoleGuard.tsx
│   │
│   ├── providers/
│   │   ├── index.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── QueryProvider.tsx
│   │
│   └── layouts/
│       ├── RootLayout.tsx
│       ├── PortalLayout.tsx
│       └── PrintLayout.tsx
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Container.tsx
│   │   ├── Section.tsx
│   │   ├── Badge.tsx
│   │   └── index.ts
│   │
│   ├── sections/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   │
│   └── three/
│       ├── ThreeCanvas.tsx
│       ├── ModelViewer.tsx
│       ├── ThreeFallback.tsx
│       ├── IFCViewer.tsx
│       └── hooks/
│           └── useModelLoader.ts
│
├── features/
│   ├── home/
│   ├── projects/
│   ├── services/
│   ├── contact/
│   └── portal/
│
├── hooks/
│   ├── useTheme.ts
│   ├── useBreakpoint.ts
│   └── useScrollProgress.ts
│
├── store/
│   ├── index.ts
│   ├── uiSlice.ts
│   ├── projectSlice.ts
│   └── authSlice.ts
│
├── lib/
│   ├── analytics.ts
│   ├── api.ts
│   ├── seo.ts
│   ├── motion.ts
│   └── utils.ts
│
├── styles/
│   ├── globals.css
│   └── tokens.css
│
├── assets/
│   ├── models/
│   ├── images/
│   └── icons/
│
├── types/
│   ├── global.d.ts
│   └── models.ts
│
└── pages/
    ├── HomePage.tsx
    ├── ProjectsPage.tsx
    ├── ServicesPage.tsx
    ├── ContactPage.tsx
    └── NotFoundPage.tsx
```

---

# DESIGN TOKENS

`src/styles/tokens.css`

Create a design system appropriate for a serious engineering firm:

* Primary: slate-based dark blues (#0F172A, #1E293B)
* Accent: strong amber (#F59E0B)
* Surface: white and very light grays
* Typography:

  * Inter (body)
  * Outfit or DM Sans (headings)
* Spacing scale:

  * base 4px
  * multiples of 4
* Border radius:

  * 4px
  * 8px
* Avoid rounded-full on structural UI components

---

# ANIMATION UTILITIES

`src/lib/motion.ts`

Create shared Framer Motion variants:

* fadeIn
* slideUp
* staggerChildren
* scaleIn
* pageTransition

Rule:

Wrap animated components in a `motion.div` that respects `useReducedMotion()` and returns neutral variants when reduced motion is enabled.

---

# THREE.JS INTEGRATION LAYER

## ThreeCanvas.tsx

* Wraps Canvas from @react-three/fiber
* Dev-only Perf monitor from r3f-perf
* Environment preset="studio"
* OrbitControls with damping enabled
* Suspense with ThreeFallback

## ModelViewer.tsx

* Accepts `modelPath: string`
* Uses useGLTF
* Centers and normalizes model bounds automatically
* Cleanup:

```ts
useGLTF.clear(modelPath)
```

on unmount to prevent memory leaks.

---

# ROUTING

Routes:

```txt
/
├── HomePage

/projetos
├── ProjectsPage

/servicos
├── ServicesPage

/contato
├── ContactPage

/portal
├── PortalLayout
├── Protected by PrivateRoute

*
├── NotFoundPage
```

All route components must use:

```tsx
React.lazy()
Suspense
```

with a page-level skeleton fallback.

---

# ENVIRONMENT VARIABLES

Create `.env.example`

```env
VITE_APP_NAME=
VITE_APP_URL=
VITE_CONTACT_EMAIL=
VITE_GA_MEASUREMENT_ID=

VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

VITE_CMS_API_URL=
```

`src/types/global.d.ts`

Declare all VITE variables via `ImportMetaEnv`.

---

# HUSKY + LINT-STAGED SETUP

Use Husky v9 API.

```bash
npx husky init
```

Create:

```txt
.husky/pre-commit
```

with:

```bash
npx lint-staged
```

package.json:

```json
{
  "*.{ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,css,md}": [
    "prettier --write"
  ]
}
```

---

# CODE QUALITY

ESLint v9 Flat Config (`eslint.config.ts`)

Include:

* typescript-eslint strict preset
* react-hooks
* jsx-a11y
* import/order

Create path group for:

```txt
@/
```

---

# ABSOLUTE IMPORTS

vite.config.ts

```ts
resolve: {
  alias: {
    "@": path.resolve(__dirname, "src")
  }
}
```

tsconfig.json

```json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

---

# FUTURE-READY STUBS

## Authentication

PrivateRoute component that redirects to `/login`.

Store:

```ts
authSlice
```

with:

```ts
user
token
isAuthenticated
```

---

## Client Portal

Feature folder:

```txt
features/portal/
```

Stub files:

```txt
ProjectFiles.tsx
ModelList.tsx
```

Export default placeholder components only.

---

## BIM / IFC Viewer

Create:

```txt
src/components/three/IFCViewer.tsx
```

Add explanatory comment block describing future integration with:

```txt
web-ifc
web-ifc-three
```

Do not implement.

---

## CMS Layer

`src/lib/api.ts`

Expose:

```ts
getProjects()
getServices()
```

Currently return mock data.

Architecture should support future CMS endpoints.

---

## Quote Request

Prepare Contact feature schema:

```ts
QuoteRequestSchema = {
  name,
  company,
  email,
  phone,
  projectType,
  message,
  budget
}
```

using Zod.

No backend integration.

---

# OUTPUT EXPECTED

Generate all files listed above with real implementations.

Include:

* package.json
* tsconfig.json
* tsconfig.node.json
* vite.config.ts
* eslint.config.ts
* .prettierrc
* README.md
* ARCHITECTURE.md

README.md must explain:

* setup
* scripts
* folder structure

ARCHITECTURE.md must explain:

* Why React 18
* Why Vite
* Why Zustand instead of Redux
* Why React Hook Form + Zod
* Why React Three Fiber
* Future CMS strategy
* Future Client Portal strategy

---

# PACKAGE.JSON SCRIPTS

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "lint": "eslint .",
  "format": "prettier --write ."
}
```

---

Do not over-engineer.

Prefer explicit over clever.

Follow React 18 and TypeScript 5 best practices.
