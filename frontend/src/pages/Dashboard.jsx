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
    <div style={{maxWidth: 720, margin:'40px auto', padding:16}}>
      <h2>Dashboard de Puntos</h2>
      <p><b>Total de escaneos:</b> {stats.total_scans} · <b>Usuarios:</b> {stats.total_users}</p>
      <table style={{width:'100%', borderCollapse:'collapse'}}>
        <thead>
          <tr>
            <th style={{textAlign:'left', borderBottom:'1px solid #eee', padding:8}}>#</th>
            <th style={{textAlign:'left', borderBottom:'1px solid #eee', padding:8}}>Nombre</th>
            <th style={{textAlign:'left', borderBottom:'1px solid #eee', padding:8}}>Apellido</th>
            <th style={{textAlign:'left', borderBottom:'1px solid #eee', padding:8}}>Puntos</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i)=> (
            <tr key={`${u.first}-${u.last}`}>
              <td style={{borderBottom:'1px solid #f5f5f5', padding:8}}>{i+1}</td>
              <td style={{borderBottom:'1px solid #f5f5f5', padding:8}}>{u.first}</td>
              <td style={{borderBottom:'1px solid #f5f5f5', padding:8}}>{u.last}</td>
              <td style={{borderBottom:'1px solid #f5f5f5', padding:8}}><b>{u.points}</b></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
