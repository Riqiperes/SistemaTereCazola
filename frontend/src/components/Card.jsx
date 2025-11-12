export default function Card({ title, children, footer }) {
  return (
    <div style={{
      border: '1px solid #eee',
      borderRadius: 12,
      padding: 16,
      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
      background: '#fff'
    }}>
      {title && <h3 style={{marginTop:0}}>{title}</h3>}
      <div>{children}</div>
      {footer && <div style={{borderTop:'1px solid #f0f0f0', marginTop:12, paddingTop:12}}>{footer}</div>}
    </div>
  )
}
