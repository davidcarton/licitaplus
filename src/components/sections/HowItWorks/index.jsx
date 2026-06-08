import { motion } from 'framer-motion';
import { howItWorks } from '../../../config/manifest';

const icons = {
  UserPlus: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      <line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
    </svg>
  ),
  Search: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Mail: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  LayoutDashboard: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
  ),
};

export default function HowItWorks() {
  return (
    <section id="como-funciona" style={{ padding: 'var(--section-padding) 0', background: 'var(--color-off-white)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span style={{
            display: 'inline-block', background: 'var(--color-green-light)',
            color: 'var(--color-green)', padding: '0.3rem 1rem', borderRadius: 100,
            fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '1rem',
          }}>CÓMO FUNCIONA</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, marginBottom: '1rem' }}>
            De la publicación al email<br />en menos de 5 minutos
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Sin que nadie toque un ordenador. El sistema trabaja mientras tu equipo se concentra en ganar contratos.
          </p>
        </motion.div>

        {/* Steps */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem', position: 'relative',
        }}>
          {howItWorks.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{
                background: 'white', borderRadius: 'var(--radius)',
                padding: '2rem', border: '1px solid var(--color-border)',
                position: 'relative', overflow: 'hidden',
                boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(61,122,79,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.04)'; }}
            >
              {/* Step number background */}
              <div style={{
                position: 'absolute', top: -8, right: 12,
                fontFamily: 'var(--font-display)', fontSize: '5rem', fontWeight: 800,
                color: 'var(--color-green-light)', lineHeight: 1, userSelect: 'none',
              }}>{step.step}</div>

              {/* Icon */}
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: 'var(--color-green-light)', color: 'var(--color-green)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.25rem',
              }}>
                {icons[step.icon]}
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.65rem' }}>
                {step.title}
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                {step.desc}
              </p>

              {/* Connector arrow */}
              {i < howItWorks.length - 1 && (
                <div style={{
                  position: 'absolute', right: -12, top: '50%', transform: 'translateY(-50%)',
                  zIndex: 2, display: 'flex', alignItems: 'center',
                }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: 'var(--color-green)', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', boxShadow: '0 2px 8px rgba(61,122,79,0.3)',
                  }}>›</div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
