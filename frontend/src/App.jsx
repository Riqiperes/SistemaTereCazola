import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Scan from './pages/Scan'
import Dashboard from './pages/Dashboard'
import QRPage from './pages/QRPage'
import './styles.css'

export default function App() {
  return (
    <div className="app">
      <header className="site-header">
        <div className="container nav">
          <div className="brand">
            <span className="brand-kicker">Eco-Return</span>
            <span className="brand-title">Tere Cazola</span>
          </div>

          <nav className="menu">
            <NavLink to="/" end className="menu-link">Inicio</NavLink>
            <NavLink to="/scan" className="menu-link">Registrar usuario</NavLink>
            <NavLink to="/dashboard" className="menu-link">Dashboard</NavLink>
            <NavLink to="/qr" className="menu-link">Ver QR</NavLink>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/scan" element={<Scan/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/qr" element={<QRPage/>} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="brand small">
              <span className="brand-kicker">Eco-Return</span>
              <span className="brand-title">Tere Cazola</span>
            </div>
            <p className="muted">Programa de retorno de envases. Datos abiertos, impacto real.</p>
          </div>
          <div className="footer-links">
            <a className="muted" href="#">Cómo funciona</a>
            <a className="muted" href="#">Impacto</a>
            <a className="muted" href="#">Beneficios</a>
          </div>
          <div className="footer-note muted">
            © {new Date().getFullYear()} Proyecto académico · Universidad Modelo
          </div>
        </div>
      </footer>
    </div>
  )
}
