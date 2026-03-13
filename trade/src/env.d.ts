// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_ADDR: string
  readonly VITE_KEYCLOAK_URL: string
  readonly VITE_KEYCLOAK_REALM: string
  readonly VITE_KEYCLOAK_CLIENT_ID: string
  readonly VITE_KEYCLOAK_ONLOAD?: 'login-required' | 'check-sso'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}