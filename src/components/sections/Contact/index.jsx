import { useState } from 'react';
import { motion } from 'framer-motion';
import { brand, testimonials } from '../../../config/manifest';

export default function Contact() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', plan: 'crm', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contacto" style={{ padding: 'var(--section-padding) 0', background: 'var(--color-off-white)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span style={{
            display: 'inline-block', background: 'var(--color-green-light)',
            color: 'var(--color-green)', padding: '0.3rem 1rem', borderRadius: 100,
            fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '1rem',
          }}>SOLICITAR DEMO</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, marginBottom: '1rem' }}>
            Empieza hoy. Son 5 minutos.
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: 480, margin: '0 auto' }}>
            Te llamamos en menos de 24 horas y te hacemos una demo personalizada con licitaciones reales de tu sector.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }} className="contact-grid">

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--color-text-muted)', letterSpacing: '0.04em' }}>
              LO QUE DICEN NUESTROS CLIENTES
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {testimonials.map((t, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                  style={{
                    background: 'white', borderRadius: 'var(--radius)', padding: '1.25rem',
                    border: '1px solid var(--color-border)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  }}
                >
                  {/* Stars */}
                  <div style={{ marginBottom: '0.5rem' }}>
                    {'★★★★★'.split('').map((s, j) => (
                      <span key={j} style={{ color: '#FBBF24', fontSize: '0.85rem' }}>{s}</span>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-text)', lineHeight: 1.7, marginBottom: '0.85rem', fontStyle: 'italic' }}>
                    "{t.text}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'var(--color-green)', color: 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.75rem', fontWeight: 700,
                    }}>{t.avatar}</div>
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{t.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{
              background: 'white', borderRadius: 'var(--radius-lg)', padding: '2rem',
              border: '1px solid var(--color-border)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            }}
          >
            {sent ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  ¡Recibido!
                </h3>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  Te contactaremos en menos de 24 horas para preparar tu demo personalizada.
                </p>
                <button onClick={() => setSent(false)} style={{
                  marginTop: '1.5rem', background: 'var(--color-green-light)', color: 'var(--color-green)',
                  border: 'none', padding: '0.7rem 1.5rem', borderRadius: 8,
                  fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem',
                }}>Enviar otro mensaje</button>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                  Solicita tu demo gratuita
                </h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {[
                    { key: 'name', label: 'Nombre', type: 'text', placeholder: 'Tu nombre' },
                    { key: 'company', label: 'Empresa', type: 'text', placeholder: 'Nombre de tu empresa' },
                    { key: 'email', label: 'Email', type: 'email', placeholder: 'email@empresa.com' },
                    { key: 'phone', label: 'Teléfono', type: 'tel', placeholder: '+34 600 000 000' },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem', color: 'var(--color-text)' }}>{f.label}</label>
                      <input
                        type={f.type} placeholder={f.placeholder} required
                        value={form[f.key]}
                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        style={{
                          width: '100%', padding: '0.65rem 0.9rem',
                          borderRadius: 8, border: '1px solid var(--color-border)',
                          fontSize: '0.875rem', outline: 'none',
                          fontFamily: 'var(--font-body)',
                          transition: 'border-color 0.2s',
                        }}
                        onFocus={e => e.target.style.borderColor = 'var(--color-green)'}
                        onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                      />
                    </div>
                  ))}

                  {/* Plan selector */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem' }}>Plan de interés</label>
                    <select
                      value={form.plan}
                      onChange={e => setForm({ ...form, plan: e.target.value })}
                      style={{
                        width: '100%', padding: '0.65rem 0.9rem',
                        borderRadius: 8, border: '1px solid var(--color-border)',
                        fontSize: '0.875rem', fontFamily: 'var(--font-body)',
                        background: 'white', cursor: 'pointer',
                      }}
                    >
                      <option value="basico">Básico — 149 €/mes</option>
                      <option value="crm">CRM — 299 €/mes</option>
                      <option value="pro">Pro — 499 €/mes</option>
                      <option value="unknown">No lo sé aún</option>
                    </select>
                  </div>

                  <button type="submit" style={{
                    background: 'var(--color-green)', color: 'white',
                    border: 'none', padding: '0.9rem', borderRadius: 10,
                    fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
                    marginTop: '0.25rem', transition: 'all 0.25s',
                    boxShadow: '0 4px 16px rgba(61,122,79,0.3)',
                  }}
                  onMouseEnter={e => { e.target.style.background = 'var(--color-green-dark)'; e.target.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { e.target.style.background = 'var(--color-green)'; e.target.style.transform = 'none'; }}
                  >
                    Solicitar demo gratuita →
                  </button>
                  <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                    Sin compromiso · Sin tarjeta · Respuesta en &lt;24 horas
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
