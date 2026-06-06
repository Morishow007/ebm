# EBM Engenharia — Feature Log & Roadmap

---

## Estado atual (Junho 2026)

### Implementado e funcional

| Feature | Estado | Notas |
|---|---|---|
| Site público PT-BR | ✅ | Home, Serviços, Projetos, Contato, 404 |
| Identidade visual preta/zinc/âmbar | ✅ | Tailwind v4 tokens, sem azul |
| SEO local Rio Grande RS | ✅ | JSON-LD, geo meta tags, sitemap, robots.txt |
| Google Rating badge 4.8★ | ✅ | Hardcoded, comentário documenta path para Places API |
| Navbar + Footer | ✅ | Logo, links, contatos com ícones (Phone/Mail/Instagram) |
| Chatbot estático FAQ | ✅ | Tree-based, zero custo, flui para WhatsApp |
| WhatsApp floating button | ✅ | Verde, some quando chat abre, +55 53 9708-1900 |
| ScrollRestoration | ✅ | Qualquer navegação vai ao topo |
| GA4 analytics | ✅ | Script injetado dinamicamente, trackPageView por rota |
| Formulário de contato | ✅ | Zod validado, POST Web3Forms (precisar de VITE_WEB3FORMS_KEY) |
| trackEvent quote_request | ✅ | Dispara no submit do formulário |
| Visualização 3D — Sketchfab embed | ✅ | Rota /projetos/3d, ID via VITE_SKETCHFAB_MODEL_ID |
| Página de projetos | ✅ | Cards com filtro por categoria, CTA card para 3D |

### Variáveis de ambiente necessárias (.env.local)

```
VITE_WEB3FORMS_KEY=         # web3forms.com → formulário de contato ativo
VITE_SKETCHFAB_MODEL_ID=    # ID do modelo público no Sketchfab
VITE_GA_MEASUREMENT_ID=     # G-XXXXXXXXXX → analytics.google.com
VITE_CONTACT_PHONE=+55 53 9708-1900
VITE_CONTACT_EMAIL=contato@ebmengenharia.com.br
```

---

## Decisões de arquitetura tomadas

### 3D — Sketchfab em vez de R3F/Three.js
**Decisão:** Remover @react-three/fiber, @react-three/drei, three, r3f-perf do projeto.
**Razão:** Modelos de projetos reais de engenharia são pesados (50–200MB). O pipeline Revit → GLB otimizado tem fricção alta. Sketchfab resolve tudo: compressão, CDN, streaming progressivo, mobile — via iframe.
**Trade-off aceite:** Logo do Sketchfab visível no embed (free tier). Removível com plano Pro se necessário.
**Como funciona:** `VITE_SKETCHFAB_MODEL_ID` aponta para qualquer modelo público. Trocar o ID = trocar o modelo, sem redeploy.

### Projetos com 3D opcional (decisão de design, não implementada)
Quando o CMS for implementado, o campo `sketchfabId?: string` no modelo `Project` permite que alguns projetos tenham badge "Ver em 3D" e outros não. O Eduardo cola o ID no Sanity Studio sem tocar em código.

### CMS — Sanity (decidido, não implementado)
**Razão:** Free tier suficiente (500k calls/mês, 10GB assets), Studio UI excelente para uso não-técnico, SDK TypeScript-first. A migração de `src/lib/api.ts` (mock → Sanity) é cirúrgica — a interface pública `getProjects()` / `getServices()` não muda.
**Quando fazer:** Após o portfólio ter conteúdo real validado. Fazer antes é over-engineering.

---

## O que falta para impacto comercial imediato

### Prioridade alta — bloqueantes de lead

#### 1. Formulário de contato ativo
**O que falta:** Criar conta em [web3forms.com](https://web3forms.com), gerar chave para `contato@ebmengenharia.com.br`, adicionar ao `.env.local`.
**Impacto:** O formulário hoje valida mas não envia nada. Eduardo não recebe leads.
**Esforço:** 10 minutos.

#### 2. Analytics GA4 ativo
**O que falta:** Criar property em [analytics.google.com](https://analytics.google.com), copiar o `G-XXXXXXXXXX` para `VITE_GA_MEASUREMENT_ID`.
**Impacto:** Sem isso Eduardo opera cego — não sabe quais serviços atraem mais, onde os visitantes saem, quantos chegam à página de contato.
**Esforço:** 15 minutos.

#### 3. Sketchfab — modelo real do Eduardo
**O que falta:** Eduardo exporta um projeto do Revit (IFC ou FBX), faz upload no Sketchfab, cola o ID no `.env.local`.
**Impacto:** O modelo de demo atual (casa indiana de terceiro) não representa a EBM. Um modelo real de projeto entregue é o WoW factor que diferencia.
**Esforço:** 1–2h (export + upload + configuração do viewer no Sketchfab).

---

### Prioridade média — credibilidade

#### 4. Portfólio com fotos e dados reais
**O que falta:** Eduardo fornece fotos e descrições de projetos reais. Substituir mock data em `src/lib/api.ts`.
**Impacto:** Cards com placeholder cinza destroem credibilidade. É a segunda coisa que um visitante qualificado olha depois da home.
**Esforço:** 2–4h de código + tempo do Eduardo para reunir conteúdo.

#### 5. Depoimentos / avaliações
**O que falta:** Selecionar 3–4 avaliações do Google (já tem 33 com nota 4.8) e colocar numa seção estática na HomePage.
**Impacto:** O badge de 4.8★ gera curiosidade — mas não tem prova social textual na página. Depoimentos convertem.
**Esforço:** 3–4h.

---

### Prioridade baixa — infraestrutura futura

#### 6. Sanity CMS
**Quando:** Após portfólio ter conteúdo real. Permite Eduardo editar projetos, serviços e depoimentos sem redeploy ou desenvolvedor.
**Esforço:** ~1 semana.

#### 7. Sketchfab por projeto (projetos com 3D opcional)
**Depende de:** CMS implementado (item 6) + Eduardo com modelos no Sketchfab.
**Como:** Campo `sketchfabId?: string` no schema do projeto. Cards com esse campo exibem badge "Ver em 3D".

#### 8. Portal do cliente (Phase 2)
**Quando:** Produto separado. Requer Supabase, auth, file storage, UI completa.
**Não iniciar** até os itens 1–5 estarem resolvidos.

---

## Guia Sketchfab — pipeline do Eduardo

1. `File → Export → IFC` (IFC 2x3) ou `File → Export → FBX` no Revit
2. Upload em [sketchfab.com](https://sketchfab.com) (conta gratuita, limite 200MB)
3. Aguardar conversão (2–10 min)
4. `Model Settings → Allow downloads: off`
5. Copiar o ID da URL: `sketchfab.com/3d-models/nome-`**`{ID}`**
6. Colar em `.env.local`: `VITE_SKETCHFAB_MODEL_ID={ID}`
7. Em produção: adicionar a mesma variável no painel da Vercel/Netlify → redeploy
