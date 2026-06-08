import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockAlerts } from '../../../config/manifest';
import {
  Bell, LayoutDashboard, Kanban, FileText, Settings,
  Search, Plus, ChevronDown, MapPin, Banknote, Calendar,
  Target, X, SlidersHorizontal, Pencil, Sparkles,
  TrendingUp, Mail, Send, Award,
} from 'lucide-react';

const C = {
  green:      '#3D7A4F',
  greenDark:  '#2A5938',
  greenLight: '#EAF4EE',
  greenMid:   '#5A9A6E',
  charcoal:   '#1B2B1F',
  white:      '#FFFFFF',
  offWhite:   '#F4F6F5',
  border:     '#E2EAE5',
  text:       '#1E2A22',
  muted:      '#6B7B72',
  amber:      '#D97706',
  amberLight: '#FEF3C7',
  blue:       '#1D4ED8',
  blueLight:  '#EFF6FF',
  red:        '#DC2626',
}

function getEstado(alert) {
  if (alert.new) return 'Nueva'
  if (alert.match >= 85) return 'Estudiando'
  return 'Presentada'
}

function EstadoBadge({ estado }) {
  const map = {
    Nueva:      { bg: C.greenLight, color: C.greenDark, dot: C.green,  pulse: true  },
    Estudiando: { bg: C.amberLight, color: '#92400E',   dot: C.amber,  pulse: false },
    Presentada: { bg: C.blueLight,  color: C.blue,      dot: C.blue,   pulse: false },
  }
  const s = map[estado] || map.Nueva
  return (
    <span style={{
      display: 'inline-flex', gap: 4, alignItems: 'center',
      borderRadius: 100, padding: '2px 8px', fontSize: 10, fontWeight: 600,
      background: s.bg, color: s.color,
    }}>
      <span style={{
        width: 5, height: 5, borderRadius: '50%', background: s.dot, flexShrink: 0,
        animation: s.pulse ? 'dotPulse 2s infinite' : 'none',
      }} />
      {estado}
    </span>
  )
}

function matchStyle(m) {
  if (m >= 90) return { color: C.greenDark, fontWeight: 700 }
  if (m >= 80) return { color: C.amber,     fontWeight: 700 }
  return { color: C.muted }
}

function AlertCard({ alert, onDismiss, onView }) {
  const estado = getEstado(alert)
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
      style={{
        background: C.white, borderRadius: 8, padding: '11px 13px',
        border: alert.new ? `1px solid ${C.green}` : `1px solid ${C.border}`,
        marginBottom: 8,
        boxShadow: alert.new ? '0 2px 10px rgba(61,122,79,0.1)' : 'none',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <div style={{ display: 'flex', gap: 5 }}>
          <EstadoBadge estado={estado} />
          {alert.new && (
            <span style={{ background: C.green, color: 'white', borderRadius: 100, padding: '2px 6px', fontSize: 9, fontWeight: 700 }}>
              NUEVA
            </span>
          )}
        </div>
        <button onClick={() => onDismiss(alert.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, padding: 0, display: 'flex' }}>
          <X size={12} />
        </button>
      </div>

      <div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 3, lineHeight: 1.3 }}>
        {alert.title}
      </div>
      <div style={{ fontSize: 10, color: C.muted, display: 'flex', alignItems: 'center', gap: 3, marginBottom: 8 }}>
        <MapPin size={9} style={{ flexShrink: 0 }} />
        {alert.org} · {alert.province}
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
        <span style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: 11 }}>
          <Banknote size={11} color={C.green} />
          <span style={{ fontWeight: 700, color: C.green }}>{alert.budget}</span>
        </span>
        <span style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: 11, color: C.muted }}>
          <Calendar size={10} />
          {alert.deadline}
        </span>
        <span style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: 11, ...matchStyle(alert.match) }}>
          <Target size={10} />
          {alert.match}%
        </span>
      </div>

      <div style={{ display: 'flex', gap: 6 }}>
        <button
          onClick={() => onView(alert)}
          style={{ border: `1px solid ${C.border}`, background: C.white, color: C.text, borderRadius: 5, padding: '3px 10px', fontSize: 10, fontWeight: 500, cursor: 'pointer' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.color = C.green }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text }}
        >Ver detalles</button>
        <button style={{ background: C.greenLight, color: C.green, border: 'none', borderRadius: 5, padding: '3px 10px', fontSize: 10, fontWeight: 600, cursor: 'pointer' }}>
          + CRM
        </button>
      </div>
    </motion.div>
  )
}

function Drawer({ alert, onClose }) {
  if (!alert) return null
  const estado = getEstado(alert)
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 300 }} />
      <div style={{
        position: 'fixed', right: 0, top: 0, bottom: 0, width: 420,
        background: C.white, boxShadow: '-4px 0 32px rgba(0,0,0,0.12)',
        display: 'flex', flexDirection: 'column', zIndex: 301,
      }}>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: C.text }}>Detalle de licitación</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, padding: 0 }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
            <EstadoBadge estado={estado} />
            <span style={{ ...matchStyle(alert.match), fontSize: 12 }}>{alert.match}% match</span>
          </div>

          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: C.text, margin: '0 0 20px 0', lineHeight: 1.3 }}>
            {alert.title}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
            {[
              ['Organismo',    alert.org],
              ['Provincia',    alert.province],
              ['Tipo de obra', alert.type],
              ['Presupuesto',  alert.budget],
              ['Fecha límite', alert.deadline],
              ['Código CPV',   '45233141-9'],
              ['Fuente',       'BOE / PLACSP'],
            ].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{k}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: C.text, marginTop: 2 }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ background: C.greenLight, borderRadius: 8, padding: '14px 16px' }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 8 }}>
              <Sparkles size={14} color={C.green} />
              <span style={{ fontSize: 12, fontWeight: 700, color: C.green }}>Resumen generado por IA</span>
            </div>
            <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7, margin: 0 }}>
              {alert.match >= 95
                ? 'Licitación de pavimentación urbana en Pamplona. Requiere clasificación empresarial Grupo G, plazo de ejecución 4 meses. El presupuesto encaja con tu rango configurado. Alta probabilidad de encaje con tu perfil.'
                : `Licitación de ${alert.type.toLowerCase()} en ${alert.province}. Presupuesto dentro de tu rango configurado. ${alert.match >= 90 ? 'Alta' : 'Media'} probabilidad de encaje según tus criterios de filtrado.`}
            </p>
          </div>
        </div>

        <div style={{ padding: '16px 24px', borderTop: `1px solid ${C.border}`, display: 'flex', gap: 10 }}>
          <button style={{ flex: 1, background: C.green, color: 'white', border: 'none', borderRadius: 8, padding: '10px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Añadir al CRM
          </button>
          <button onClick={onClose} style={{ flex: 1, background: C.offWhite, color: C.muted, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
            Descartar
          </button>
        </div>
      </div>
    </>
  )
}

const SIDEBAR_ITEMS = [
  { id: 'inicio',    icon: <LayoutDashboard size={15} strokeWidth={1.6} />, active: false },
  { id: 'alertas',  icon: <Bell            size={15} strokeWidth={1.6} />, active: true  },
  { id: 'crm',      icon: <Kanban          size={15} strokeWidth={1.6} />, active: false },
  { id: 'docs',     icon: <FileText        size={15} strokeWidth={1.6} />, active: false },
  { id: 'config',   icon: <Settings        size={15} strokeWidth={1.6} />, active: false },
]

const BARS = [
  { m: 'Ene', v: 8 }, { m: 'Feb', v: 11 }, { m: 'Mar', v: 9 },
  { m: 'Abr', v: 14 }, { m: 'May', v: 18 }, { m: 'Jun', v: 23 },
]

export default function Demo() {
  const [alerts, setAlerts] = useState(mockAlerts)
  const [selected, setSelected] = useState(null)
  const [newAdded, setNewAdded] = useState(false)
  const [hoveredBar, setHoveredBar] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => {
      if (!newAdded) {
        setAlerts(prev => [{
          id: 99, title: 'Reparación aceras Casco Antiguo',
          org: 'Ayuntamiento de Pamplona', province: 'Navarra',
          type: 'Obra civil', budget: '47.200 €',
          deadline: '18 jul 2026', match: 94, new: true,
        }, ...prev])
        setNewAdded(true)
      }
    }, 4000)
    return () => clearTimeout(t)
  }, [newAdded])

  const dismiss = id => setAlerts(prev => prev.filter(a => a.id !== id))
  const newCount = alerts.filter(a => a.new).length

  const kpis = [
    { label: 'Licitaciones',   value: '23',    icon: <Mail       size={13} color={C.muted} /> },
    { label: 'Presentadas',    value: '4',     icon: <Send       size={13} color={C.muted} /> },
    { label: 'Ganadas',        value: '1',     icon: <Award      size={13} color={C.muted} /> },
    { label: 'Val. potencial', value: '847K€', icon: <TrendingUp size={13} color={C.muted} /> },
  ]

  return (
    <section id="demo" style={{ padding: 'var(--section-padding) 0', background: 'var(--color-off-white)' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span style={{
            display: 'inline-block', background: C.greenLight, color: C.green,
            padding: '0.3rem 1rem', borderRadius: 100,
            fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '1rem',
          }}>DEMO INTERACTIVA</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, marginBottom: '1rem', color: C.text }}>
            Así se ve LicitaPlus
          </h2>
          <p style={{ color: C.muted, maxWidth: 500, margin: '0 auto', lineHeight: 1.6 }}>
            Datos simulados. Espera 4 segundos y verás llegar una nueva alerta en tiempo real.
          </p>
        </motion.div>

        {/* Full-width browser mockup */}
        <motion.div
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
          style={{ maxWidth: 1100, margin: '0 auto' }}
        >
          <div style={{
            borderRadius: 14, overflow: 'hidden',
            boxShadow: '0 32px 80px rgba(0,0,0,0.13), 0 4px 16px rgba(0,0,0,0.06)',
            border: `1px solid ${C.border}`,
          }}>
            {/* Chrome bar */}
            <div style={{ background: '#E5E7EB', padding: '0.55rem 1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FC615D' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FDBC40' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#34C749' }} />
              <div style={{ flex: 1, background: 'white', borderRadius: 4, padding: '0.2rem 0.75rem', fontSize: '0.7rem', color: '#9CA3AF', marginLeft: '0.5rem' }}>
                app.licitaplus.es/alertas
              </div>
            </div>

            {/* Dashboard body */}
            <div style={{ display: 'flex', height: 530, overflow: 'hidden', background: C.offWhite }}>

              {/* ── Sidebar ── */}
              <div style={{ width: 44, background: C.charcoal, display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                {/* Logo */}
                <div style={{ height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="22" height="22" viewBox="0 0 28 28">
                    <polygon points="14,2 25,8 25,20 14,26 3,20 3,8" fill={C.green} />
                    <text x="14" y="18.5" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="Inter,sans-serif">L</text>
                  </svg>
                </div>
                <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.08)' }} />
                {/* Nav */}
                <div style={{ paddingTop: 6 }}>
                  {SIDEBAR_ITEMS.map(item => (
                    <div key={item.id} style={{
                      width: 44, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: item.active ? C.white : 'rgba(255,255,255,0.35)',
                      background: item.active ? 'rgba(61,122,79,0.35)' : 'transparent',
                      borderLeft: item.active ? `3px solid ${C.greenMid}` : '3px solid transparent',
                    }}>
                      {item.icon}
                    </div>
                  ))}
                </div>
                <div style={{ flex: 1 }} />
                <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.08)' }} />
                {/* Avatar */}
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: C.green, color: 'white', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '8px 0' }}>
                  CG
                </div>
              </div>

              {/* ── Main area ── */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

                {/* Topbar */}
                <div style={{ height: 44, background: C.white, borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', paddingLeft: 18, paddingRight: 18, gap: 12, flexShrink: 0 }}>
                  <span style={{ fontWeight: 600, fontSize: 13, color: C.text, whiteSpace: 'nowrap' }}>Mis alertas</span>
                  <div style={{ width: 1, height: 18, background: C.border, flexShrink: 0 }} />
                  {/* Search */}
                  <div style={{ position: 'relative', flexShrink: 1 }}>
                    <div style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: C.muted, pointerEvents: 'none', display: 'flex' }}>
                      <Search size={12} />
                    </div>
                    <div style={{ height: 26, background: C.offWhite, border: `1px solid ${C.border}`, borderRadius: 5, paddingLeft: 26, paddingRight: 10, display: 'flex', alignItems: 'center', fontSize: 11, color: C.muted, width: 200 }}>
                      Buscar licitaciones...
                    </div>
                  </div>
                  {/* Right */}
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                    <button style={{ background: C.green, color: 'white', borderRadius: 5, padding: '4px 10px', fontSize: 11, fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', gap: 4, alignItems: 'center' }}>
                      <Plus size={11} />
                      Nueva alerta
                    </button>
                    <div style={{ position: 'relative' }}>
                      <Bell size={16} color={C.muted} />
                      <div style={{ position: 'absolute', top: -4, right: -4, width: 14, height: 14, borderRadius: '50%', background: C.red, color: 'white', fontSize: 8, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {Math.min(newCount + 2, 9)}
                      </div>
                    </div>
                    <div style={{ width: 1, height: 18, background: C.border }} />
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: C.green, color: 'white', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>CG</div>
                    <span style={{ fontSize: 12, fontWeight: 500, color: C.text }}>Constructora García</span>
                    <ChevronDown size={12} color={C.muted} />
                  </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1, overflow: 'hidden', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>

                  {/* KPI row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, flexShrink: 0 }}>
                    {kpis.map((k, i) => (
                      <div key={k.label} style={{ background: C.white, borderRadius: 8, padding: '12px 14px', border: `1px solid ${C.border}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                          <span style={{ fontSize: 10, fontWeight: 600, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.2 }}>{k.label}</span>
                          {k.icon}
                        </div>
                        <div style={{ fontSize: 24, fontWeight: 800, fontFamily: "'Syne',sans-serif", color: C.text, lineHeight: 1 }}>{k.value}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
                          <span style={{ background: C.greenLight, color: C.greenDark, borderRadius: 100, padding: '1px 6px', fontSize: 9, fontWeight: 700, display: 'inline-flex', gap: 2, alignItems: 'center' }}>
                            <TrendingUp size={7} />
                            +{i + 1}
                          </span>
                          <span style={{ fontSize: 9, color: C.muted }}>vs mes ant.</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 2-col: alerts | right panel */}
                  <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 260px', gap: 12, overflow: 'hidden', minHeight: 0 }}>

                    {/* Alert list */}
                    <div style={{ background: C.white, borderRadius: 10, border: `1px solid ${C.border}`, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ padding: '9px 13px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Alertas recibidas</span>
                          <span style={{ background: C.greenLight, color: C.greenDark, borderRadius: 100, padding: '1px 8px', fontSize: 10, fontWeight: 700 }}>
                            {alerts.length}
                          </span>
                        </div>
                        <span style={{ fontSize: 10, color: C.muted }}>Actualizado hace 2 min</span>
                      </div>
                      <div style={{ flex: 1, overflowY: 'auto', padding: 10 }}>
                        <AnimatePresence mode="popLayout">
                          {alerts.map(alert => (
                            <AlertCard key={alert.id} alert={alert} onDismiss={dismiss} onView={setSelected} />
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Right: prefs + chart */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>

                      {/* Preferences panel */}
                      <div style={{ background: C.charcoal, borderRadius: 10, padding: '13px 15px', flexShrink: 0 }}>
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 10 }}>
                          <SlidersHorizontal size={12} color={C.greenMid} />
                          <span style={{ fontSize: 12, fontWeight: 700, color: C.white }}>Mis preferencias</span>
                        </div>
                        {[
                          { k: 'Tipo de obra', v: 'Obra civil, Pavimentación' },
                          { k: 'Provincias',   v: 'Navarra, La Rioja'         },
                          { k: 'Importe',      v: '30K – 500K €'              },
                          { k: 'Frecuencia',   v: 'Inmediata'                 },
                        ].map(p => (
                          <div key={p.k} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '5px 0', fontSize: 11 }}>
                            <div style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 1 }}>{p.k}</div>
                            <div style={{ color: C.white, fontWeight: 500 }}>{p.v}</div>
                          </div>
                        ))}
                        <button style={{ marginTop: 10, width: '100%', background: 'transparent', border: `1px solid ${C.greenMid}`, color: C.greenMid, borderRadius: 6, padding: '5px', fontSize: 11, fontWeight: 600, cursor: 'pointer', display: 'flex', gap: 4, justifyContent: 'center', alignItems: 'center' }}>
                          <Pencil size={10} />
                          Editar preferencias
                        </button>
                      </div>

                      {/* Bar chart */}
                      <div style={{ background: C.white, borderRadius: 10, padding: '13px 15px', border: `1px solid ${C.border}`, flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 10 }}>
                          Alertas últimos 6 meses
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 7, borderBottom: `1px solid ${C.border}`, paddingBottom: 4 }}>
                          {BARS.map((b, i) => (
                            <div key={b.m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
                              <div
                                onMouseEnter={() => setHoveredBar(i)}
                                onMouseLeave={() => setHoveredBar(null)}
                                title={`${b.m}: ${b.v} alertas`}
                                style={{
                                  width: '100%', position: 'relative',
                                  height: `${Math.round((b.v / 23) * 80)}px`,
                                  background: hoveredBar === i ? C.greenDark : C.green,
                                  borderRadius: '3px 3px 0 0', transition: 'all 0.2s', cursor: 'pointer',
                                }}
                              />
                              <span style={{ fontSize: 9, color: C.muted }}>{b.m}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <Drawer alert={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      <style>{`
        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </section>
  )
}
