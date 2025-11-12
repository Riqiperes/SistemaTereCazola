export default function Card({ title, eyebrow, children, footer }) {
  return (
    <section className="card">
      {(eyebrow || title) && (
        <header className="card-head">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          {title && <h3 className="card-title">{title}</h3>}
        </header>
      )}
      <div className="card-body">{children}</div>
      {footer && <footer className="card-foot">{footer}</footer>}
    </section>
  )
}
