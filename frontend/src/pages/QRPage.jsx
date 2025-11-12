import { QRCodeCanvas } from 'qrcode.react'

export default function QRPage(){
  const url = window.location.origin + '/scan'
  return (
    <div style={{display:'grid', placeItems:'center', height:'100dvh'}}>
      <div style={{textAlign:'center'}}>
        <h2>QR para escanear en tienda</h2>
        <QRCodeCanvas value={url} size={256} includeMargin />
        <p style={{marginTop:12}}>{url}</p>
        <p style={{opacity:.7}}>Imprime esta pantalla o guarda la imagen del QR.</p>
      </div>
    </div>
  )
}
