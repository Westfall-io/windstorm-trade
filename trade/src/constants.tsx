export const api_addr =
  import.meta.env.VITE_API_ADDR || 'https://windstorm-api.digitalforge.app'

export const artifact_addr = 'https://configs.digitalforge.app'
export const harbor_addr = 'https://harbor.digitalforge.app'
export const model_addr = 'https://models.digitalforge.app'

export const keycloak_url = import.meta.env.VITE_KEYCLOAK_URL
export const keycloak_realm = import.meta.env.VITE_KEYCLOAK_REALM
export const keycloak_client_id = import.meta.env.VITE_KEYCLOAK_CLIENT_ID
export const keycloak_onload =
  import.meta.env.VITE_KEYCLOAK_ONLOAD || 'login-required'