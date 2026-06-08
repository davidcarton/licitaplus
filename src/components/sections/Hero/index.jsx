import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { brand, stats } from '../../../config/manifest';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section style={{
      minHeight: '100vh',
      background: `linear-gradient(160deg, var(--color-charcoal) 0%, var(--color-green-dark) 50%, #1A3D28 100%)`,
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      paddingTop: '5rem',
      paddingBottom: '140px',
    }}>
      {/* Background pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      {/* Green glow */}
      <div style={{
        position: 'absolute', top: '20%', right: '-10%',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(61,122,79,0.3) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial="hidden" animate="visible" variants={stagger}
          style={{ maxWidth: 720 }}
        >
          {/* Badge */}
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(61,122,79,0.25)', border: '1px solid rgba(61,122,79,0.5)',
              color: '#7FC99A', padding: '0.4rem 1rem', borderRadius: 100,
              fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em',
              marginBottom: '1.5rem',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7FC99A', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              POWERED BY IA — BOE · PLACSP · CCAA
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1 variants={fadeUp} transition={{ duration: 0.7 }} style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 800, color: 'white', lineHeight: 1.1, marginBottom: '1.25rem',
          }}>
            Nunca más pierdas<br />
            <span style={{ color: 'var(--color-green-mid)' }}>una licitación</span><br />
            de obra pública
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={fadeUp} transition={{ duration: 0.7 }} style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(255,255,255,0.7)',
            maxWidth: 560, marginBottom: '2.5rem', lineHeight: 1.7,
          }}>
            {brand.description}
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/dashboard')} style={{
              background: 'var(--color-green)', color: 'white',
              padding: '0.9rem 2rem', borderRadius: 10,
              fontWeight: 700, fontSize: '1rem',
              display: 'inline-flex', alignItems: 'center',
              transition: 'all 0.25s',
              boxShadow: '0 4px 24px rgba(61,122,79,0.4)',
              border: 'none', cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-green-dark)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-green)'; e.currentTarget.style.transform = 'none'; }}
            >
              Solicitar demo gratuita →
            </button>
            <a href="#como-funciona" style={{
              background: 'rgba(255,255,255,0.1)', color: 'white',
              padding: '0.9rem 2rem', borderRadius: 10,
              fontWeight: 600, fontSize: '1rem',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'inline-block',
              transition: 'all 0.25s',
            }}
            onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.18)'; }}
            onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.1)'; }}
            >
              Ver cómo funciona
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.p variants={fadeUp} transition={{ duration: 0.6 }} style={{
            marginTop: '1.5rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)',
          }}>
            ✓ 14 días gratis sin tarjeta · ✓ Cancela cuando quieras · ✓ Setup en 5 minutos
          </motion.p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1px', marginTop: '5rem', marginBottom: '80px',
            background: 'rgba(255,255,255,0.08)', borderRadius: 16,
            overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)',
            position: 'relative', zIndex: 1,
          }}
        >
          {stats.map((s) => (
            <div key={s.label} style={{
              padding: '1.5rem', background: 'rgba(255,255,255,0.03)',
              textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, color: 'var(--color-green-mid)' }}>
                {s.value}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.35rem', lineHeight: 1.4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Wave bottom */}
      <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0, zIndex: 2 }}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
          <path d="M0 60H1440V30C1200 60 960 0 720 30C480 60 240 0 0 30V60Z" fill="var(--color-off-white)"/>
        </svg>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
