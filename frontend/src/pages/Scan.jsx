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
    <section className="container section">
      <div className="narrow">
        <Card eyebrow="🔐" title="Registrar / Escanear">
          <form onSubmit={onSubmit} className="form">
            <label>Nombre</label>
            <input value={first} onChange={e=>setFirst(e.target.value)} required placeholder="María" />
            <label>Apellido</label>
            <input value={last} onChange={e=>setLast(e.target.value)} required placeholder="García" />
            <button disabled={loading} type="submit" className="btn btn-dark">
              {loading ? 'Guardando…' : 'Guardar +1 punto'}
            </button>
          </form>

          {resp?.ok && (
            <div className="alert success">
              ✅ {resp.user.first} {resp.user.last} ahora tiene <b>{resp.user.points}</b> punto(s).
            </div>
          )}
          {error && (
            <div className="alert error">❌ {error}</div>
          )}
        </Card>
      </div>
    </section>
  )
}
