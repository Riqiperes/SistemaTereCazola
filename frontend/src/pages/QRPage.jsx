import { QRCodeCanvas } from 'qrcode.react'

export default function QRPage(){
  const url = window.location.origin + '/scan'
  return (
    <section className="fullscreen-center">
      <div className="qr-card">
        <p className="eyebrow center">In-store QR</p>
        <h2 className="display-sm center">Escanea para registrar</h2>
        <div className="qr-wrap">
          <QRCodeCanvas value={url} size={256} includeMargin />
        </div>
        <p className="muted center">{url}</p>
        <p className="muted center">Imprime esta pantalla o guarda la imagen del QR.</p>
      </div>
    </section>
  )
}
