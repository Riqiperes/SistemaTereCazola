import { useEffect, useState } from 'react'
import { getUsers, getStats } from '../api'

export default function Dashboard(){
  const [users, setUsers] = useState([])
  const [stats, setStats] = useState({ total_scans: 0, total_users: 0 })

  async function refresh(){
    const [u, s] = await Promise.all([getUsers(), getStats()])
    if (u?.ok) setUsers(u.users)
    if (s?.ok !== undefined) setStats(s)
  }

  useEffect(()=>{
    refresh()
    const id = setInterval(refresh, 2000)
    return ()=>clearInterval(id)
  }, [])

  return (
    <section className="container section">
      <h1 className="display-sm">Impact Dashboard</h1>
      <p className="muted">Datos en tiempo real de retornos y participación.</p>

      {/* Stat cards */}
      <div className="stats">
        <div className="stat">
          <div className="stat-kicker">Total de escaneos</div>
          <div className="stat-value">{stats.total_scans.toLocaleString()}</div>
          <div className="stat-help">Registros confirmados</div>
        </div>
        <div className="stat">
          <div className="stat-kicker">Usuarios</div>
          <div className="stat-value">{stats.total_users.toLocaleString()}</div>
          <div className="stat-help">Participantes únicos</div>
        </div>
      </div>

      {/* Table */}
      <div className="table-card">
        <div className="table-head">
          <h3>Ranking de puntos</h3>
          <button className="btn btn-outline btn-sm" onClick={refresh}>Actualizar</button>
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Puntos</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i)=> (
                <tr key={`${u.first}-${u.last}`}>
                  <td>{i+1}</td>
                  <td>{u.first}</td>
                  <td>{u.last}</td>
                  <td><b>{u.points}</b></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
