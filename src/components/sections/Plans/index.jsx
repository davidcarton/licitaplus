import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { plans } from '../../../config/manifest';

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="7.5" cy="7.5" r="7.5" fill="var(--color-green-light)"/>
      <path d="M4.5 7.5L6.5 9.5L10.5 5.5" stroke="var(--color-green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Plans() {
  const navigate = useNavigate();

  return (
    <section id="planes" style={{ padding: 'var(--section-padding) 0', background: 'var(--color-charcoal)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span style={{
            display: 'inline-block', background: 'rgba(61,122,79,0.2)',
            color: 'var(--color-green-mid)', padding: '0.3rem 1rem', borderRadius: 100,
            fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '1rem',
            border: '1px solid rgba(61,122,79,0.3)',
          }}>PLANES Y PRECIOS</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
            Elige el nivel que necesitas
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 480, margin: '0 auto' }}>
            14 días gratis en todos los planes. Sin tarjeta de crédito.
          </p>
        </motion.div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem', alignItems: 'start',
        }}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                background: plan.featured ? 'white' : 'rgba(255,255,255,0.04)',
                borderRadius: 'var(--radius-lg)',
                border: plan.featured ? '2px solid var(--color-green)' : '1px solid rgba(255,255,255,0.08)',
                padding: '2rem',
                position: 'relative',
                transform: plan.featured ? 'scale(1.03)' : 'none',
              }}
            >
              {plan.featured && (
                <div style={{
                  position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                  background: 'var(--color-green)', color: 'white',
                  padding: '0.3rem 1.25rem', borderRadius: 100,
                  fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                }}>MÁS POPULAR</div>
              )}

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', color: plan.featured ? 'var(--color-green)' : 'rgba(255,255,255,0.4)', marginBottom: '0.25rem' }}>
                  {plan.subtitle.toUpperCase()}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: plan.featured ? 'var(--color-text)' : 'white', marginBottom: '0.75rem' }}>
                  {plan.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', fontWeight: 800, color: plan.featured ? 'var(--color-text)' : 'white' }}>
                    {plan.price}€
                  </span>
                  <span style={{ fontSize: '0.85rem', color: plan.featured ? 'var(--color-text-muted)' : 'rgba(255,255,255,0.4)' }}>/{plan.period}</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: plan.featured ? 'var(--color-text-muted)' : 'rgba(255,255,255,0.45)', marginTop: '0.5rem', lineHeight: 1.5 }}>
                  {plan.description}
                </p>
              </div>

              <ul style={{ listStyle: 'none', marginBottom: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.875rem', color: plan.featured ? 'var(--color-text)' : 'rgba(255,255,255,0.75)' }}>
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>

              <button onClick={() => navigate('/dashboard')} style={{
                display: 'block', textAlign: 'center', width: '100%',
                background: plan.featured ? 'var(--color-green)' : 'rgba(255,255,255,0.08)',
                color: plan.featured ? 'white' : 'rgba(255,255,255,0.85)',
                border: plan.featured ? 'none' : '1px solid rgba(255,255,255,0.15)',
                padding: '0.8rem 1.5rem', borderRadius: 10,
                fontWeight: 700, fontSize: '0.9rem',
                transition: 'all 0.25s', cursor: 'pointer',
                boxShadow: plan.featured ? '0 4px 16px rgba(61,122,79,0.3)' : 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.background = plan.featured ? 'var(--color-green-dark)' : 'rgba(255,255,255,0.14)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.background = plan.featured ? 'var(--color-green)' : 'rgba(255,255,255,0.08)';
              }}
              >{plan.cta}</button>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: '2.5rem', color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem' }}
        >
          Todos los planes incluyen actualizaciones automáticas · Datos de BOE, PLACSP y portales autonómicos · Soporte en español
        </motion.p>
      </div>
    </section>
  );
}
