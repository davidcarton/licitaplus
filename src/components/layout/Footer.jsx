import { brand, nav } from '../../config/manifest';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-black)', color: 'rgba(255,255,255,0.5)', padding: '3rem 0 2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }} className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--color-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L15 5.5V12.5L9 16L3 12.5V5.5L9 2Z" stroke="white" strokeWidth="1.5" fill="none"/>
                  <circle cx="9" cy="9" r="2" fill="white"/>
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'white' }}>LicitaPlus</span>
            </div>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.7, maxWidth: 280, marginBottom: '1rem' }}>
              Búsqueda automática de licitaciones de obra pública. Filtrado por IA. Alertas en tu email.
            </p>
            <a href={brand.byUrl} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              fontSize: '0.75rem', color: 'var(--color-green-mid)',
              border: '1px solid rgba(61,122,79,0.3)', padding: '0.3rem 0.75rem',
              borderRadius: 6, transition: 'color 0.2s',
            }}>
              Un servicio de Benco →
            </a>
          </div>

          {/* Nav */}
          <div>
            <h4 style={{ color: 'white', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '1rem' }}>PLATAFORMA</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {nav.map(item => (
                <li key={item.href}>
                  <a href={item.href} style={{ fontSize: '0.85rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = 'white'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
                  >{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'white', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '1rem' }}>CONTACTO</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem' }}>
              <a href={`mailto:${brand.email}`} style={{ transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'white'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
              >{brand.email}</a>
              <span>{brand.phone}</span>
              <span style={{ marginTop: '0.25rem', fontSize: '0.75rem' }}>Pamplona, Navarra</span>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ fontSize: '0.75rem' }}>© 2026 LicitaPlus — {brand.by}. Todos los derechos reservados.</p>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.75rem' }}>
            <a href="#" style={{ transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'white'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
            >Política de privacidad</a>
            <a href="#" style={{ transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'white'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
            >Aviso legal</a>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
