import { Helmet } from 'react-helmet-async'

import { buildLocalBusinessSchema, buildPersonSchema, buildWebSiteSchema } from '@/lib/seo'

// Injeta todos os schemas JSON-LD relevantes no <head>.
// Renderizado uma vez no RootLayout para cobrir todas as páginas.
export function StructuredData() {
  const schemas = [buildLocalBusinessSchema(), buildWebSiteSchema(), buildPersonSchema()]

  return (
    <Helmet>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}
