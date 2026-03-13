import Keycloak, { type KeycloakInitOptions } from 'keycloak-js'
import {
  keycloak_client_id,
  keycloak_onload,
  keycloak_realm,
  keycloak_url,
} from '../constants'

if (!keycloak_url || !keycloak_realm || !keycloak_client_id) {
  throw new Error('Missing Keycloak configuration')
}

export const keycloak = new Keycloak({
  url: keycloak_url,
  realm: keycloak_realm,
  clientId: keycloak_client_id,
})

let initialized = false

export async function initKeycloak() {
  if (initialized) return keycloak.authenticated ?? false

  const initOptions: KeycloakInitOptions = {
    onLoad: keycloak_onload as 'login-required' | 'check-sso',
    pkceMethod: 'S256',
    responseMode: 'query',
    checkLoginIframe: false,
  }

  const authenticated = await keycloak.init(initOptions)
  initialized = true
  return authenticated
}

export function login() {
  return keycloak.login({
    redirectUri: window.location.origin,
  })
}

export function logout() {
  return keycloak.logout({
    redirectUri: window.location.origin,
  })
}

export function getUsername() {
  return (
    keycloak.tokenParsed?.preferred_username ||
    keycloak.tokenParsed?.email ||
    'User'
  )
}