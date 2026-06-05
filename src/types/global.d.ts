/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_URL: string
  readonly VITE_CONTACT_EMAIL: string
  readonly VITE_GA_MEASUREMENT_ID: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_CMS_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
