import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { brand, nav } from '../../config/manifest';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      transition: 'background 0.35s, box-shadow 0.35s, padding 0.35s',
      background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
      boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.08)' : 'none',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      padding: scrolled ? '0.75rem 0' : '1.25rem 0',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'var(--color-green)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L15 5.5V12.5L9 16L3 12.5V5.5L9 2Z" stroke="white" strokeWidth="1.5" fill="none"/>
              <circle cx="9" cy="9" r="2" fill="white"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', color: scrolled ? 'var(--color-black)' : 'white' }}>
            LicitaPlus
          </span>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          {nav.map(item => (
            <a key={item.href} href={item.href} style={{
              fontSize: '0.9rem', fontWeight: 500,
              color: scrolled ? 'var(--color-text-muted)' : 'rgba(255,255,255,0.85)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = scrolled ? 'var(--color-green)' : 'white'}
            onMouseLeave={e => e.target.style.color = scrolled ? 'var(--color-text-muted)' : 'rgba(255,255,255,0.85)'}
            >{item.label}</a>
          ))}
          <button onClick={() => navigate('/dashboard')} style={{
            background: 'var(--color-green)', color: 'white',
            padding: '0.55rem 1.25rem', borderRadius: 8,
            fontSize: '0.875rem', fontWeight: 600,
            transition: 'background 0.2s, transform 0.2s',
            border: 'none', cursor: 'pointer',
          }}
          onMouseEnter={e => { e.target.style.background = 'var(--color-green-dark)'; e.target.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.target.style.background = 'var(--color-green)'; e.target.style.transform = 'none'; }}
          >Solicitar demo</button>
        </nav>

        {/* Mobile burger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          display: 'none', background: 'none', border: 'none',
          color: scrolled ? 'var(--color-black)' : 'white', padding: '0.25rem',
        }} className="mobile-burger" aria-label="Menú">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'white', borderTop: '1px solid var(--color-border)',
          padding: '1rem 0',
        }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {nav.map(item => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--color-text)', padding: '0.5rem 0' }}>
                {item.label}
              </a>
            ))}
            <button onClick={() => { setMenuOpen(false); navigate('/dashboard'); }} style={{
              background: 'var(--color-green)', color: 'white',
              padding: '0.75rem 1.25rem', borderRadius: 8,
              fontSize: '0.9rem', fontWeight: 600, textAlign: 'center', marginTop: '0.5rem',
              border: 'none', cursor: 'pointer',
            }}>Solicitar demo</button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-burger { display: block !important; }
        }
      `}</style>
    </header>
  );
}
