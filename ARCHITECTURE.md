# Decisões de Arquitetura — EBM Engenharia

---

## Por que React 18 (e não React 19)?

React Three Fiber v8 — que usamos para visualização 3D de modelos estruturais — tem suporte instável ao React 19. A versão 18.3.x é estável, amplamente testada em produção com R3F e garante compatibilidade com todo o ecossistema Three.js.

Migraremos para React 19 quando @react-three/fiber v9 oferecer suporte oficial.

---

## Por que Vite?

Vite oferece HMR instantâneo via ESM nativo no browser e builds de produção otimizados com Rollup. Para um projeto com Three.js (arquivos WASM, modelos GLTF pesados), o controle granular de chunks e o suporte a assets binários do Vite são essenciais. Alternativas como CRA estão depreciadas; Next.js adicionaria overhead desnecessário para um site estático com eventual SSG.

---

## Por que Zustand e não Redux?

Zustand elimina o boilerplate de actions/reducers/selectors sem sacrificar previsibilidade. Para o estado deste site (tema, autenticação, seleção de projetos), o overhead do Redux seria injustificável. Com o middleware `immer`, mantemos a imutabilidade idiomática sem esforço extra.

---

## Por que React Hook Form + Zod?

- **React Hook Form**: controla formulários com renders mínimos (uncontrolled inputs), essencial para o formulário de orçamento com vários campos.
- **Zod**: tipagem estática de schemas de validação com inferência de tipos TypeScript — uma fonte de verdade para validação no cliente e (futuramente) no servidor.
- A combinação via `@hookform/resolvers/zod` elimina duplicação de regras de validação.

---

## Por que React Three Fiber?

React Three Fiber permite compor cenas 3D declarativamente dentro do React, reutilizando o ciclo de vida de componentes e hooks. Para o portal do cliente com visualização de modelos Revit exportados como GLTF/IFC, isso reduz dramaticamente a complexidade de gerenciamento de estado da cena vs. Three.js imperativo puro.

---

## Estratégia de CMS (futura)

Toda busca de dados passa por `src/lib/api.ts`, que hoje retorna mocks. A interface pública (`getProjects()`, `getServices()`) permanece estável.

Quando houver CMS (Sanity, Contentful ou similar), apenas o corpo dessas funções muda — nenhum componente de feature precisa ser alterado.

---

## Estratégia do Portal do Cliente (futura)

O portal é acessível em `/portal` e protegido por `PrivateRoute`. O estado de autenticação vive em `authSlice` (Zustand). A integração planejada é com **Supabase** (auth + storage para arquivos de projeto).

Fases do portal:
1. Autenticação com magic link (Supabase Auth)
2. Listagem de arquivos por projeto (PDFs, DWG, IFC)
3. Visualizador IFC in-browser (`web-ifc` + `web-ifc-three`)
4. Comentários e aprovação de revisões
