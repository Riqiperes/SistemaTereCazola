// Rutas relativas para que el proxy de Vite evite CORS tanto en localhost como en devtunnel
async function request(path, options = {}) {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  if (!res.ok) {
    let msg = `HTTP ${res.status}`
    try { const d = await res.json(); if (d?.detail) msg += ` – ${d.detail}` } catch {}
    throw new Error(msg)
  }
  return res.status === 204 ? null : res.json()
}

export const scanUser = (first, last) =>
  request('/api/scan', { method: 'POST', body: JSON.stringify({ first, last }) })

export const getUsers = () => request('/api/users')
export const getStats = () => request('/api/stats')
