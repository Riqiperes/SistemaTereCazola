import { useState } from 'react'
import { scanUser } from '../api'
import Card from '../components/Card'

export default function Scan(){
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [resp, setResp] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const r = await scanUser(first, last)
      setResp(r)
    } catch (err) {
      setError(err.message || 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{maxWidth: 520, margin:'40px auto', padding:16}}>
      <Card title="Registrar / Escanear">
        <form onSubmit={onSubmit}>
          <label>Nombre</label>
          <input value={first} onChange={e=>setFirst(e.target.value)} required />
          <label>Apellido</label>
          <input value={last} onChange={e=>setLast(e.target.value)} required />
          <button disabled={loading} type="submit">{loading ? 'Guardando…' : 'Guardar +1 punto'}</button>
        </form>

        {resp?.ok && (
          <div style={{marginTop:12, padding:10, background:'#f6fff6', border:'1px solid #cfe9cf', borderRadius:8}}>
            ✅ {resp.user.first} {resp.user.last} ahora tiene <b>{resp.user.points}</b> punto(s).
          </div>
        )}
        {error && (
          <div style={{marginTop:12, padding:10, background:'#fff6f6', border:'1px solid #e9cfcf', borderRadius:8}}>
            ❌ {error}
          </div>
        )}
      </Card>

      <style>{`
        form{ display:grid; gap:8px; }
        input{ padding:10px; border-radius:8px; border:1px solid #ddd; }
        button{ padding:10px 14px; border-radius:8px; border:1px solid #111; background:#111; color:#fff; }
        button:disabled{ opacity:.6; }
      `}</style>
    </div>
  )
}
