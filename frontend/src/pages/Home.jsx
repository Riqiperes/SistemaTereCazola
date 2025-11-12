import { Link } from 'react-router-dom'
import Card from '../components/Card'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <p className="eyebrow">Circular economy initiative</p>
          <h1 className="display">Give packages a second life</h1>
          <p className="lede">
            Devuelve tus envases Tere Cazola en tienda y ayuda a construir un sistema más sostenible.
            Cada empaque cuenta.
          </p>
          <div className="cta-row">
            <Link to="/scan" className="btn btn-primary">Registrar devolución</Link>
            <Link to="/dashboard" className="btn btn-ghost">Ver impacto</Link>
            <Link to="/qr" className="btn btn-outline">Ver QR</Link>
          </div>

          <div className="hero-search">
            <input placeholder="Encuentra tu tienda (Centro, Altabrisa…)" />
            <button className="btn btn-dark">Buscar</button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section container">
        <h2 className="section-title">How it works</h2>
        <p className="muted center">Tres pasos sencillos para hacer la diferencia</p>

        <div className="cards-3">
          <Card title="Scan the QR code" eyebrow="📷">
            <p>Ubica el QR en la tienda y escanéalo para iniciar el registro.</p>
          </Card>
          <Card title="Return your packaging" eyebrow="🔁">
            <p>Entrega tus envases limpios; el personal valida y suma puntos.</p>
          </Card>
          <Card title="See the impact" eyebrow="📊">
            <p>Consulta el tablero en tiempo real: retornos, peso y CO₂ evitado.</p>
          </Card>
        </div>
      </section>

      {/* Benefits */}
      <section className="section section-tint">
        <div className="container">
          <h2 className="section-title">Benefits for Tere Cazola</h2>
          <p className="muted center">Crecimiento sustentable mediante empaque circular</p>

          <div className="cards-3">
            <Card title="Environmental" eyebrow="🌿">
              <ul className="tick">
                <li>Menos residuos</li>
                <li>Menor CO₂e</li>
                <li>Modelo de economía circular</li>
              </ul>
            </Card>
            <Card title="Social" eyebrow="🤝">
              <ul className="tick">
                <li>Clientes embajadores</li>
                <li>Programas de comunidad</li>
                <li>Reputación de marca</li>
              </ul>
            </Card>
            <Card title="Economic" eyebrow="📦">
              <ul className="tick">
                <li>Ahorros en empaque</li>
                <li>Operación eficiente</li>
                <li>Mejor visibilidad de datos</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
