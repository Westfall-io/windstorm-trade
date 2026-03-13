import { ensureFreshToken } from '../auth/keycloak'
import * as defaults from '../constants'

type FetchOptions = RequestInit & {
  skipAuth?: boolean
}

export async function apiFetch(path: string, options: FetchOptions = {}) {
  const { skipAuth = false, headers, ...rest } = options

  const finalHeaders = new Headers(headers || {})
  finalHeaders.set('Accept', 'application/json')

  if (!skipAuth) {
    const token = await ensureFreshToken()
    if (token) {
      finalHeaders.set('Authorization', `Bearer ${token}`)
    }
  }

  return fetch(`${defaults.api_addr}${path}`, {
    ...rest,
    headers: finalHeaders,
  })
}

export async function apiJson<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const response = await apiFetch(path, options)

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`API error ${response.status}: ${text}`)
  }

  return response.json() as Promise<T>
}