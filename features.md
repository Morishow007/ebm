Feature 1 — Visualização 3D de modelos Revit
O caminho do Revit até o browser é o nó do problema, não o rendering.

O que o Revit exporta de útil
O formato nativo .rvt é proprietário e inútil para a web. As saídas viáveis são:

Formato	Via	Qualidade
IFC	Export nativo	Geometria + metadata BIM completa
FBX	Export nativo	Geometria + materiais, sem metadata BIM
GLTF/GLB	Pipeline externo	Ideal para web, leve, suporte a PBR
Duas abordagens com trade-offs bem diferentes
A) GLTF via pipeline offline (showcase / WoW factor)


Revit → FBX → Blender → GLTF otimizado → hospedado como asset estático
Eduardo exporta FBX do Revit, abre no Blender (gratuito), otimiza poly count, exporta GLB
O ModelViewer.tsx que já está scaffoldado aceita isso nativamente via useGLTF
Custo operacional: zero (asset estático no CDN)
Limitação: é um modelo congelado — não é o BIM real, perde metadata
Complexidade: baixa no lado código (já temos R3F + ModelViewer prontos), média no pipeline de asset preparation — Blender tem curva de aprendizado, mas Eduardo é engenheiro e vai absorver rápido
B) IFC nativo no browser (viewer de BIM de verdade)


Revit → IFC → browser parseia com WASM → geometria + metadata acessível
Duas libs:

web-ifc + web-ifc-three (a que o IFCViewer.tsx referencia no stub)
@thatopen/components — sucessor mais moderno, mantido pela comunidade Open BIM
Isso dá element picking, propriedades BIM, filtros por disciplina. O WoW factor aqui é muito maior.

Porém: o .wasm do parser é ~4MB, precisa ser servido com header correto (application/wasm), e a performance em modelos grandes (>100MB IFC) é desafiadora mesmo com workers. Complexidade: alta — gerenciamento de memória, worker threads, otimização de LOD.

C) Speckle (meio-termo interessante)

Speckle tem plugin oficial para Revit. Eduardo instala, empurra o modelo para o Speckle cloud (free tier), e você embute o @speckle/viewer no site. O viewer deles é excelente e já lida com tudo que a opção B faz manualmente.

Free tier: projetos ilimitados, modelos públicos/privados
Complexidade de integração: baixa-média (é basicamente uma iframe glorificada ou o SDK deles)
Trade-off: dependência de infra de terceiro; se o Speckle sair do ar, o viewer some
Recomendação para a EBM
Curto prazo: opção A com GLTF. O código já existe, o impacto visual já justifica, e Eduardo aprende Blender em um final de semana. Coloca um modelo estrutural rotacionando na hero da página de projetos — isso já é o WoW factor.

Médio prazo (portal do cliente, Phase 2): Speckle. Eduardo empurra modelos por projeto, o cliente acessa pelo portal com element picking e metadata real. Muito mais valor agregado que um GLTF estático.

Feature 2 — CMS gratuito sem redeploy
O ponto crítico: como o projeto é uma SPA com fetch em runtime (src/lib/api.ts já está estruturado assim), qualquer CMS baseado em API resolve o problema sem redeploy. O conteúdo muda no CMS, próxima visita ao site já pega o conteúdo novo.

CMSs git-based (Decap, TinaCMS) descartamos — eles commitam no repositório, triggeram o CI/CD, é um redeploy com mais passos.

Candidatos API-based gratuitos
Sanity

Free tier: projetos ilimitados, 3 usuários, 500k API calls/mês, 10GB assets — mais do que suficiente
SDK TypeScript-first (@sanity/client), tipagem sólida, GROQ para queries
O Sanity Studio (admin UI) é o melhor da categoria — Eduardo vai conseguir usar sem treinamento
Já temos VITE_CMS_API_URL e a estrutura de getProjects() / getServices() esperando apenas trocar o mock por um fetch real
Custo de implementação: migrar o schema para o Sanity Studio + atualizar api.ts → médio
Contentful

Free tier: 25k records, 2 API keys, 1 locale — pode apertar se o portfólio crescer muito
UI mais tradicional (tabela/formulário), Eduardo pode preferir ou não
Complexidade similar ao Sanity
Payload CMS — descarta por ora, precisa de Node server próprio.

Directus self-hosted — só faz sentido se já tiver infra (VPS).

Recomendação
Sanity. Razões objetivas:

O free tier não vai estrangular em escala realista de portfólio de engenharia
O Studio é a melhor UX de edição do mercado — Eduardo edita projetos e serviços sem fricção
A migração do api.ts atual (mock → Sanity) é cirúrgica porque a interface pública (getProjects(), getServices()) não muda — apenas a implementação interna
TypeScript schema nativo = os tipos de models.ts que já temos viram o schema do Sanity sem duplicação
Resumo de complexidade:

Feature	Complexidade	Bloqueio principal
GLTF showcase (opção A)	Baixa	Pipeline de asset (Blender)
IFC nativo (opção B)	Alta	WASM perf + memory management
Speckle viewer	Baixa-média	Setup do plugin Revit
Sanity CMS	Média	Schema migration + Studio setup