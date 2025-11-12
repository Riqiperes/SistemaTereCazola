import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Scan from './pages/Scan'
import Dashboard from './pages/Dashboard'
import QRPage from './pages/QRPage'

export default function App(){
  return (
    <div>
      <nav style={{
        display:'flex', gap:12, alignItems:'center', padding:'12px 16px',
        position:'sticky', top:0, background:'#fff', borderBottom:'1px solid #eee', zIndex:10
      }}>
        <b>Tere Cazola · Recicla</b>
        <Link to="/">Inicio</Link>
        <Link to="/scan">Registrar usuario</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/qr">Ver QR</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/scan" element={<Scan/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/qr" element={<QRPage/>} />
      </Routes>

      <style>{`
        body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif; }
        a { color: #111; text-decoration: none; }
        a:hover { text-decoration: underline; }
      `}</style>
    </div>
  )
}
