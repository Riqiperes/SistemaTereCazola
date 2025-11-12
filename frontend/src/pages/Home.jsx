import { Link } from 'react-router-dom'
import Card from '../components/Card'

export default function Home(){
  return (
    <div style={{maxWidth: 720, margin: '40px auto', padding: 16}}>
      <h1>Bienvenid@ a Tere Cazola – Recicla y Gana</h1>
      <p>Escanea el código en tienda, registra tu nombre y acumula puntos por cada devolución.</p>

      <div style={{display:'grid', gap:16, gridTemplateColumns:'1fr 1fr'}}>
        <Card title="Registrar usuario">
          <p>Captura tu nombre tras escanear el QR en tienda.</p>
          <Link to="/scan" className="btn">Ir a registro</Link>
        </Card>
        <Card title="Ver dashboard">
          <p>Consulta el ranking de puntos en tiempo real.</p>
          <Link to="/dashboard" className="btn">Abrir dashboard</Link>
        </Card>
      </div>

      <div style={{marginTop:16}}>
        <Card title="Ver Código QR">
          <p>Colócalo impreso en la tienda. Siempre dirige a la misma URL de registro.</p>
          <Link to="/qr" className="btn">Mostrar QR</Link>
        </Card>
      </div>

      <style>{`
        .btn { display:inline-block; padding:10px 14px; border-radius:8px; border:1px solid #111; text-decoration:none; }
        a.btn:hover { background:#111; color:#fff; }
      `}</style>
    </div>
  )
}
