import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Bell, Kanban, FileText, Settings,
  Search, Plus, ChevronRight, ChevronDown, ArrowLeft, X,
  UploadCloud, CheckCircle, AlertTriangle, TrendingUp,
  Mail, Send, Award, SlidersHorizontal, Pencil,
  MapPin, Banknote, Calendar, Target, Sparkles,
  FileType, Clock, Eye, Trash2, FolderOpen,
  FileSearch, Save, BarChart2
} from 'lucide-react'

const C = {
  green:      '#3D7A4F',
  greenDark:  '#2A5938',
  greenLight: '#EAF4EE',
  greenMid:   '#5A9A6E',
  charcoal:   '#1B2B1F',
  charcoalMid:'#243329',
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

const LICITACIONES = [
  { id:1, nombre:'Pavimentación Av. del Ejército', org:'Ayto. Pamplona', importe:'185.000 €', limite:'15 jul', match:98, estado:'Nueva', provincia:'Navarra' },
  { id:2, nombre:'Rehabilitación cubierta polideportivo', org:'Ayto. Tudela', importe:'92.000 €', limite:'22 jul', match:91, estado:'Nueva', provincia:'Navarra' },
  { id:3, nombre:'Urbanización Sector Norte Fase 2', org:'Gob. Navarra', importe:'420.000 €', limite:'8 ago', match:87, estado:'Estudiando', provincia:'Navarra' },
  { id:4, nombre:'Vestuarios campo municipal', org:'Ayto. Estella', importe:'68.500 €', limite:'30 jul', match:79, estado:'Presentada', provincia:'Navarra' },
  { id:5, nombre:'Reparación aceras Casco Antiguo', org:'Ayto. Pamplona', importe:'47.200 €', limite:'18 jul', match:94, estado:'Nueva', provincia:'Navarra' },
]

function estadoBadge(estado) {
  const map = {
    Nueva:      { bg: C.greenLight, color: C.greenDark, dot: C.green, pulse: true },
    Estudiando: { bg: C.amberLight, color: '#92400E', dot: C.amber, pulse: false },
    Presentada: { bg: C.blueLight,  color: C.blue,    dot: C.blue, pulse: false },
    Ganada:     { bg: '#F0FDF4',    color: '#166534',  dot: '#16A34A', pulse: false },
  }
  const s = map[estado] || map.Nueva
  return (
    <span style={{
      display: 'inline-flex', gap: 5, alignItems: 'center',
      borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 600,
      background: s.bg, color: s.color,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%', background: s.dot, flexShrink: 0,
        animation: s.pulse ? 'dotPulse 2s infinite' : 'none',
      }} />
      {estado}
    </span>
  )
}

function matchColor(m) {
  if (m >= 90) return { color: C.greenDark, fontWeight: 700 }
  if (m >= 80) return { color: C.amber, fontWeight: 700 }
  return { color: C.muted }
}

// ─── SIDEBAR ───────────────────────────────────────────────────────────────
function Sidebar({ section, setSection }) {
  const [hoveredItem, setHoveredItem] = useState(null)

  const items = [
    { id: 'inicio',     icon: <LayoutDashboard size={18} strokeWidth={1.6} />, label: 'Inicio' },
    { id: 'alertas',   icon: <Bell size={18} strokeWidth={1.6} />,             label: 'Mis alertas' },
    { id: 'crm',       icon: <Kanban size={18} strokeWidth={1.6} />,           label: 'CRM / Pipeline' },
    { id: 'documentos',icon: <FileText size={18} strokeWidth={1.6} />,         label: 'Documentos' },
    { id: 'config',    icon: <Settings size={18} strokeWidth={1.6} />,         label: 'Configuración' },
  ]

  return (
    <div style={{
      position: 'fixed', left: 0, top: 0, bottom: 0, width: 52,
      background: C.charcoal, display: 'flex', flexDirection: 'column',
      alignItems: 'center', zIndex: 100, overflow: 'visible',
    }}>
      {/* Logo */}
      <div style={{ width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <polygon points="14,2 25,8 25,20 14,26 3,20 3,8" fill={C.green} />
          <text x="14" y="18" textAnchor="middle" fill="white" fontSize="12" fontWeight="700" fontFamily="Inter">L</text>
        </svg>
      </div>

      <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.08)' }} />

      {/* Nav icons */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 8 }}>
        {items.map(item => {
          const active = section === item.id
          const hovered = hoveredItem === item.id
          return (
            <div
              key={item.id}
              onClick={() => setSection(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                width: 52, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', position: 'relative',
                color: active ? C.white : 'rgba(255,255,255,0.45)',
                background: active ? 'rgba(61,122,79,0.35)' : hovered ? 'rgba(255,255,255,0.06)' : 'transparent',
                borderLeft: active ? `3px solid ${C.greenMid}` : '3px solid transparent',
                paddingLeft: active ? 2 : 0,
                transition: 'all 0.15s',
              }}
            >
              {item.icon}
              {hovered && (
                <div style={{
                  position: 'absolute', left: 56, top: '50%', transform: 'translateY(-50%)',
                  background: C.charcoal, color: 'white', padding: '4px 10px',
                  borderRadius: 5, fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap',
                  zIndex: 999, boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                }}>
                  {item.label}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.08)' }} />

      {/* Avatar */}
      <div
        style={{ margin: '10px 0', position: 'relative' }}
        onMouseEnter={() => setHoveredItem('avatar')}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <div style={{
          width: 32, height: 32, borderRadius: '50%', background: C.green,
          color: 'white', fontSize: 12, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>CG</div>
        {hoveredItem === 'avatar' && (
          <div style={{
            position: 'absolute', left: 40, top: '50%', transform: 'translateY(-50%)',
            background: C.charcoal, color: 'white', padding: '4px 10px',
            borderRadius: 5, fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap',
            zIndex: 999, boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
          }}>
            Constructora García
          </div>
        )}
      </div>
    </div>
  )
}

// ─── TOPBAR ───────────────────────────────────────────────────────────────
function Topbar({ section }) {
  const navigate = useNavigate()
  const labels = {
    inicio: 'Inicio', alertas: 'Mis alertas',
    crm: 'CRM / Pipeline', documentos: 'Documentos', config: 'Configuración',
  }
  return (
    <div style={{
      height: 52, background: C.white,
      borderBottom: `1px solid ${C.border}`,
      display: 'flex', alignItems: 'center', gap: 16,
      paddingLeft: 52 + 24, paddingRight: 24, flexShrink: 0,
    }}>
      {/* Back */}
      <button
        onClick={() => navigate('/')}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 12, color: C.muted, background: 'none', border: 'none',
          cursor: 'pointer', padding: 0, whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => e.currentTarget.style.color = C.green}
        onMouseLeave={e => e.currentTarget.style.color = C.muted}
      >
        <ArrowLeft size={15} />
        Volver a la web
      </button>
      <div style={{ width: 1, height: 20, background: C.border }} />
      <span style={{ fontWeight: 600, fontSize: 14, color: C.text }}>{labels[section]}</span>

      {/* Search */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: C.muted, pointerEvents: 'none' }}>
            <Search size={14} />
          </div>
          <input
            placeholder="Buscar licitaciones..."
            style={{
              width: 380, height: 32,
              background: C.offWhite, border: `1px solid ${C.border}`,
              borderRadius: 6, padding: '0 12px 0 34px',
              fontSize: 13, outline: 'none', color: C.text,
            }}
          />
        </div>
      </div>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <Bell size={18} color={C.muted} />
          <div style={{
            position: 'absolute', top: -4, right: -4,
            width: 16, height: 16, borderRadius: '50%',
            background: C.red, color: 'white',
            fontSize: 9, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>3</div>
        </div>

        <div style={{ width: 1, height: 20, background: C.border }} />

        <button style={{
          background: C.green, color: 'white', borderRadius: 6,
          padding: '6px 12px', fontSize: 12, fontWeight: 600,
          border: 'none', cursor: 'pointer',
          display: 'flex', gap: 4, alignItems: 'center',
        }}>
          <Plus size={13} />
          Nueva alerta
        </button>

        <div style={{ width: 30, height: 30, borderRadius: '50%', background: C.green, color: 'white', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>CG</div>
        <span style={{ fontSize: 13, fontWeight: 500, color: C.text }}>Constructora García</span>
        <ChevronDown size={14} color={C.muted} />
      </div>
    </div>
  )
}

// ─── SECTION: INICIO ──────────────────────────────────────────────────────
function SeccionInicio({ setSection, setDrawerOpen, setDrawerData }) {
  const [hoveredBar, setHoveredBar] = useState(null)
  const [hoveredRow, setHoveredRow] = useState(null)

  const kpis = [
    { label: 'Licitaciones recibidas', value: '23', trend: '+4',   icon: <Mail size={16} color={C.muted} /> },
    { label: 'Ofertas presentadas',    value: '4',  trend: '+1',   icon: <Send size={16} color={C.muted} /> },
    { label: 'Contratos ganados',      value: '1',  trend: '--',   icon: <Award size={16} color={C.muted} /> },
    { label: 'Importe potencial',      value: '847.000 €', trend: '+12%', icon: <TrendingUp size={16} color={C.muted} /> },
  ]

  const bars = [
    { mes: 'Ene', val: 8 }, { mes: 'Feb', val: 11 }, { mes: 'Mar', val: 9 },
    { mes: 'Abr', val: 14 }, { mes: 'May', val: 18 }, { mes: 'Jun', val: 23 },
  ]
  const maxVal = 23

  const horizontalBars = [
    { label: 'Obra civil',     pct: 42, color: C.green },
    { label: 'Edificación',    pct: 28, color: C.greenMid },
    { label: 'Urbanización',   pct: 18, color: '#8DC4A3' },
    { label: 'Rehabilitación', pct: 12, color: C.border },
  ]

  const now = new Date()
  const dateStr = now.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: C.text, margin: 0 }}>
          Resumen general
        </h1>
        <p style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>
          {dateStr.charAt(0).toUpperCase() + dateStr.slice(1)}
        </p>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {kpis.map(k => (
          <div key={k.label} style={{
            background: C.white, borderRadius: 10, padding: '20px 24px',
            border: `1px solid ${C.border}`,
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', color: C.muted, textTransform: 'uppercase' }}>
                {k.label}
              </span>
              {k.icon}
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Syne',sans-serif", color: C.text, marginTop: 8 }}>
              {k.value}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
              {k.trend !== '--' ? (
                <span style={{
                  background: C.greenLight, color: C.greenDark,
                  borderRadius: 100, padding: '2px 8px', fontSize: 11, fontWeight: 700,
                  display: 'inline-flex', gap: 3, alignItems: 'center',
                }}>
                  <TrendingUp size={11} />
                  {k.trend}
                </span>
              ) : (
                <span style={{ fontSize: 11, color: C.muted }}>—</span>
              )}
              <span style={{ fontSize: 11, color: C.muted }}>vs mes anterior</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '65% 1fr', gap: 16, marginBottom: 24 }}>
        {/* Bar chart */}
        <div style={{ background: C.white, borderRadius: 10, padding: 24, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 16 }}>
            Alertas recibidas — últimos 6 meses
          </div>
          <div style={{ height: 160, display: 'flex', alignItems: 'flex-end', gap: 12, padding: '0 8px', borderBottom: `1px solid ${C.border}` }}>
            {bars.map((b, i) => (
              <div key={b.mes} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                  style={{
                    width: '100%', position: 'relative',
                    height: Math.round((b.val / maxVal) * 140) + 'px',
                    background: hoveredBar === i ? C.greenDark : C.green,
                    borderRadius: '4px 4px 0 0',
                    transition: 'all 0.2s', cursor: 'pointer',
                  }}
                >
                  {hoveredBar === i && (
                    <div style={{
                      position: 'absolute', top: -28, left: '50%', transform: 'translateX(-50%)',
                      background: C.charcoal, color: 'white',
                      padding: '2px 8px', borderRadius: 4, fontSize: 11, whiteSpace: 'nowrap',
                    }}>{b.val} alertas</div>
                  )}
                </div>
                <span style={{ fontSize: 11, color: C.muted }}>{b.mes}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Horizontal bars */}
        <div style={{ background: C.white, borderRadius: 10, padding: 24, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 16 }}>
            Por tipo de obra
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {horizontalBars.map(h => (
              <div key={h.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.text, marginBottom: 6 }}>
                  <span>{h.label}</span>
                  <span style={{ fontWeight: 700 }}>{h.pct}%</span>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: '#E8EDEB', overflow: 'hidden' }}>
                  <div style={{ width: h.pct + '%', height: '100%', borderRadius: 4, background: h.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabla licitaciones */}
      <div style={{ background: C.white, borderRadius: 10, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
        <div style={{
          padding: '12px 24px', borderBottom: `1px solid ${C.border}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Últimas licitaciones</span>
          <span style={{
            background: C.greenLight, color: C.greenDark,
            borderRadius: 100, padding: '2px 10px', fontSize: 11, fontWeight: 700,
          }}>{LICITACIONES.length} registros</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: C.offWhite }}>
              {['Licitación','Organismo','Presupuesto','Límite','Match','Estado','Acciones'].map(col => (
                <th key={col} style={{
                  padding: '10px 16px', textAlign: 'left', fontSize: 11,
                  fontWeight: 700, color: C.muted, textTransform: 'uppercase',
                  letterSpacing: '0.05em', borderBottom: `2px solid ${C.green}`,
                }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LICITACIONES.map(row => (
              <tr
                key={row.id}
                onMouseEnter={() => setHoveredRow(row.id)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{ background: hoveredRow === row.id ? C.offWhite : C.white }}
              >
                <td style={{ padding: '12px 16px', fontSize: 13, borderBottom: `1px solid ${C.border}`, color: C.text, fontWeight: 500, maxWidth: 220 }}>
                  {row.nombre}
                </td>
                <td style={{ padding: '12px 16px', fontSize: 13, borderBottom: `1px solid ${C.border}`, color: C.muted }}>
                  {row.org}
                </td>
                <td style={{ padding: '12px 16px', fontSize: 13, borderBottom: `1px solid ${C.border}`, color: C.text, fontWeight: 600 }}>
                  {row.importe}
                </td>
                <td style={{ padding: '12px 16px', fontSize: 13, borderBottom: `1px solid ${C.border}`, color: C.muted }}>
                  {row.limite}
                </td>
                <td style={{ padding: '12px 16px', fontSize: 13, borderBottom: `1px solid ${C.border}`, ...matchColor(row.match) }}>
                  {row.match}%
                </td>
                <td style={{ padding: '12px 16px', fontSize: 13, borderBottom: `1px solid ${C.border}` }}>
                  {estadoBadge(row.estado)}
                </td>
                <td style={{ padding: '12px 16px', fontSize: 13, borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      onClick={() => { setDrawerData(row); setDrawerOpen(true) }}
                      style={{
                        border: `1px solid ${C.border}`, background: C.white, color: C.text,
                        borderRadius: 5, padding: '4px 10px', fontSize: 11, fontWeight: 500, cursor: 'pointer',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.color = C.green }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text }}
                    >Ver detalles</button>
                    <button style={{
                      background: C.greenLight, color: C.green,
                      border: 'none', borderRadius: 5, padding: '4px 10px',
                      fontSize: 11, fontWeight: 600, cursor: 'pointer',
                    }}>+ CRM</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── SECTION: ALERTAS ─────────────────────────────────────────────────────
function SeccionAlertas({ setDrawerOpen, setDrawerData }) {
  const [alertFilter, setAlertFilter] = useState('todas')
  const [hPrefs, setHPrefs] = useState(false)

  const alertas = LICITACIONES.map(l => ({ ...l, nueva: l.estado === 'Nueva' }))
  const filtered = alertFilter === 'nuevas'
    ? alertas.filter(a => a.nueva)
    : alertFilter === 'hoy'
    ? alertas.filter((_, i) => i < 2)
    : alertas

  const tabs = [
    { id: 'todas',  label: `Todas (${alertas.length})` },
    { id: 'nuevas', label: `Nuevas (${alertas.filter(a => a.nueva).length})` },
    { id: 'hoy',    label: 'Hoy (2)' },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 24 }}>
      {/* Panel izquierdo */}
      <div style={{ background: C.charcoal, borderRadius: 10, padding: 20 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
          <SlidersHorizontal size={14} color={C.greenMid} />
          <span style={{ fontSize: 13, fontWeight: 700, color: C.white }}>Mis preferencias</span>
        </div>
        {[
          { key: 'Tipo de obra',    val: 'Obra civil, Pavimentación, Urbanización' },
          { key: 'Provincias',      val: 'Navarra, La Rioja, País Vasco' },
          { key: 'Importe mínimo',  val: '30.000 €' },
          { key: 'Importe máximo',  val: '500.000 €' },
          { key: 'Frecuencia',      val: 'Inmediata' },
        ].map(p => (
          <div key={p.key} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '8px 0', fontSize: 12 }}>
            <div style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 2 }}>{p.key}</div>
            <div style={{ color: C.white, fontWeight: 500 }}>{p.val}</div>
          </div>
        ))}
        <button
          onMouseEnter={() => setHPrefs(true)}
          onMouseLeave={() => setHPrefs(false)}
          style={{
            marginTop: 16, width: '100%',
            background: 'transparent', border: `1px solid ${C.greenMid}`,
            color: hPrefs ? C.white : C.greenMid, borderRadius: 7, padding: '8px',
            fontSize: 12, fontWeight: 600, cursor: 'pointer',
            display: 'flex', gap: 6, justifyContent: 'center', alignItems: 'center',
            transition: 'color 0.15s',
          }}
        >
          <Pencil size={13} />
          Editar preferencias
        </button>
      </div>

      {/* Panel derecho */}
      <div>
        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, marginBottom: 16 }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setAlertFilter(t.id)}
              style={{
                background: 'none', border: 'none',
                padding: '8px 16px', fontSize: 13, cursor: 'pointer',
                color: alertFilter === t.id ? C.green : C.muted,
                fontWeight: alertFilter === t.id ? 600 : 400,
                borderBottom: alertFilter === t.id ? `2px solid ${C.green}` : '2px solid transparent',
                marginBottom: -1,
              }}
            >{t.label}</button>
          ))}
        </div>

        {/* Alert cards */}
        {filtered.map(alert => (
          <div key={alert.id} style={{
            background: C.white, borderRadius: 10, padding: '16px 20px',
            border: alert.nueva ? `1px solid ${C.green}` : `1px solid ${C.border}`,
            marginBottom: 12,
            boxShadow: alert.nueva ? '0 2px 12px rgba(61,122,79,0.08)' : 'none',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                {estadoBadge(alert.estado)}
                {alert.nueva && (
                  <span style={{ background: C.green, color: C.white, borderRadius: 100, padding: '2px 8px', fontSize: 10, fontWeight: 700 }}>
                    NUEVA
                  </span>
                )}
              </div>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, padding: 0 }}>
                <X size={14} />
              </button>
            </div>

            <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginTop: 8, marginBottom: 4 }}>
              {alert.nombre}
            </div>
            <div style={{ fontSize: 12, color: C.muted, display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
              <MapPin size={11} />
              {alert.org} · {alert.provincia}
            </div>

            <div style={{ display: 'flex', gap: 20, marginBottom: 12 }}>
              <span style={{ display: 'flex', gap: 5, alignItems: 'center', fontSize: 13 }}>
                <Banknote size={13} color={C.green} />
                <span style={{ fontWeight: 700, color: C.green }}>{alert.importe}</span>
              </span>
              <span style={{ display: 'flex', gap: 5, alignItems: 'center', fontSize: 13, color: C.muted }}>
                <Calendar size={13} />
                {alert.limite}
              </span>
              <span style={{ display: 'flex', gap: 5, alignItems: 'center', fontSize: 13, ...matchColor(alert.match) }}>
                <Target size={13} />
                {alert.match}% match
              </span>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => { setDrawerData(alert); setDrawerOpen(true) }}
                style={{
                  border: `1px solid ${C.border}`, background: C.white, color: C.text,
                  borderRadius: 6, padding: '6px 14px', fontSize: 12, fontWeight: 500, cursor: 'pointer',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.color = C.green }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text }}
              >Ver detalles</button>
              <button style={{
                background: C.greenLight, color: C.green, border: 'none',
                borderRadius: 6, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}>Añadir al CRM</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── SECTION: CRM ─────────────────────────────────────────────────────────
function SeccionCRM() {
  const [kanban, setKanban] = useState({
    nueva: [
      { id:1, nombre:'Pavimentación Av. del Ejército', importe:'185.000 €', match:98, limite:'15 jul' },
      { id:2, nombre:'Reparación aceras Casco Antiguo', importe:'47.200 €', match:94, limite:'18 jul' },
      { id:3, nombre:'Rehabilitación cubierta polideportivo', importe:'92.000 €', match:91, limite:'22 jul' },
    ],
    estudiando: [
      { id:4, nombre:'Urbanización Sector Norte Fase 2', importe:'420.000 €', match:87, limite:'8 ago' },
    ],
    presentada: [
      { id:5, nombre:'Vestuarios campo municipal', importe:'68.500 €', match:79, limite:'30 jul' },
    ],
    resultado: [],
  })

  const colOrder = ['nueva', 'estudiando', 'presentada', 'resultado']

  function moveCard(cardId, fromCol, toCol) {
    setKanban(prev => {
      const card = prev[fromCol].find(c => c.id === cardId)
      if (!card) return prev
      return {
        ...prev,
        [fromCol]: prev[fromCol].filter(c => c.id !== cardId),
        [toCol]: [...prev[toCol], card],
      }
    })
  }

  const colMeta = {
    nueva:      { label: 'Nueva', bg: C.charcoal, accent: C.green },
    estudiando: { label: 'Estudiando', bg: '#7C4A00', accent: C.amber },
    presentada: { label: 'Presentada', bg: '#1E3A5F', accent: C.blue },
    resultado:  { label: 'Resultado', bg: '#374151', accent: '#9CA3AF' },
  }

  const totalCards = Object.values(kanban).flat().length
  const totalValue = '1.237.700 €'

  return (
    <div>
      {/* Stats row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 0,
        background: C.white, borderRadius: 10, border: `1px solid ${C.border}`,
        padding: '12px 24px', marginBottom: 20, fontSize: 13,
      }}>
        <span>En pipeline: <strong style={{ color: C.green }}>{totalCards}</strong></span>
        <div style={{ width: 1, height: 20, background: C.border, margin: '0 20px' }} />
        <span>Valor total: <strong style={{ color: C.green }}>{totalValue}</strong></span>
        <div style={{ width: 1, height: 20, background: C.border, margin: '0 20px' }} />
        <span>Tasa de éxito: <strong style={{ color: C.green }}>25%</strong></span>
      </div>

      {/* Kanban */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, alignItems: 'start' }}>
        {colOrder.map((col, ci) => {
          const meta = colMeta[col]
          const cards = kanban[col]
          const nextCol = colOrder[ci + 1]
          return (
            <div key={col}>
              <div style={{
                background: meta.bg, borderRadius: '8px 8px 0 0',
                padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>{meta.label}</span>
                <span style={{
                  background: 'rgba(255,255,255,0.15)', color: 'white',
                  borderRadius: 100, padding: '1px 8px', fontSize: 11, fontWeight: 700,
                }}>{cards.length}</span>
              </div>
              <div style={{
                background: C.white, border: `1px solid ${C.border}`, borderTop: 'none',
                borderRadius: '0 0 8px 8px', padding: 12, minHeight: 200,
              }}>
                {cards.length === 0 && col === 'resultado' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 140, gap: 8 }}>
                    <FolderOpen size={24} color={C.border} />
                    <span style={{ fontSize: 12, color: C.border, textAlign: 'center' }}>Arrastra aquí las presentadas</span>
                  </div>
                ) : (
                  cards.map(card => (
                    <div key={card.id} style={{
                      background: C.white, border: `1px solid ${C.border}`,
                      borderLeft: `3px solid ${meta.accent}`,
                      borderRadius: 8, padding: '12px 14px', marginBottom: 8,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6, lineHeight: 1.3 }}>
                        {card.nombre}
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: C.green }}>
                        {card.importe}
                      </div>
                      <div style={{
                        fontSize: 11, color: C.muted, display: 'flex',
                        justifyContent: 'space-between', alignItems: 'center', marginTop: 6,
                      }}>
                        <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                          <Calendar size={10} />
                          {card.limite}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ ...matchColor(card.match) }}>{card.match}%</span>
                          {nextCol && (
                            <button
                              onClick={() => moveCard(card.id, col, nextCol)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, padding: 0, display: 'flex' }}
                              title={`Mover a ${colMeta[nextCol].label}`}
                            >
                              <ChevronRight size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── SECTION: DOCUMENTOS ──────────────────────────────────────────────────
function SeccionDocumentos() {
  const [hoverZone, setHoverZone] = useState(false)

  const docs = [
    { nombre: 'Clasificación Empresarial.pdf', fecha: '12 jun 2026', size: '2.3 MB', verificado: true },
    { nombre: 'Solvencia Económica 2025.pdf',  fecha: '10 jun 2026', size: '1.8 MB', verificado: true },
    { nombre: 'Póliza Seguro RC.pdf',          fecha: '8 jun 2026',  size: '4.1 MB', verificado: true },
  ]

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, color: C.text, margin: 0 }}>
          Mis documentos
        </h2>
        <span style={{
          background: C.amberLight, color: C.amber,
          borderRadius: 100, padding: '2px 10px', fontSize: 11, fontWeight: 700,
        }}>Plan Pro</span>
      </div>

      {/* Upload zone */}
      <div
        onMouseEnter={() => setHoverZone(true)}
        onMouseLeave={() => setHoverZone(false)}
        style={{
          border: `2px dashed ${hoverZone ? C.green : C.greenMid}`,
          borderRadius: 12,
          background: hoverZone ? C.greenLight : C.offWhite,
          padding: '40px 24px', textAlign: 'center', marginBottom: 24, cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        <div style={{ marginBottom: 12 }}><UploadCloud size={32} color={C.greenMid} /></div>
        <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>Arrastra tus documentos aquí</div>
        <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>PDF, DOC — máximo 20MB por archivo</div>
        <button style={{
          background: C.green, color: 'white', border: 'none',
          borderRadius: 7, padding: '8px 20px', marginTop: 16,
          fontSize: 13, fontWeight: 600, cursor: 'pointer',
          display: 'inline-flex', gap: 6, alignItems: 'center',
        }}>
          <FolderOpen size={14} />
          Seleccionar archivos
        </button>
      </div>

      {/* Doc grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
        {docs.map(doc => (
          <div key={doc.nombre} style={{
            background: C.white, border: `1px solid ${C.border}`,
            borderRadius: 10, padding: '16px 20px',
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <FileType size={28} color={C.red} />
              {doc.verificado && (
                <span style={{
                  background: C.greenLight, color: C.green,
                  fontSize: 10, fontWeight: 700, borderRadius: 100, padding: '2px 8px',
                  display: 'inline-flex', gap: 3, alignItems: 'center',
                }}>
                  <CheckCircle size={10} />
                  Verificado
                </span>
              )}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text, lineHeight: 1.3 }}>{doc.nombre}</div>
            <div style={{ fontSize: 11, color: C.muted, display: 'flex', gap: 5, alignItems: 'center' }}>
              <Clock size={10} />
              {doc.fecha} · {doc.size}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{
                background: C.offWhite, border: `1px solid ${C.border}`,
                color: C.text, borderRadius: 5, padding: '5px 12px',
                fontSize: 11, fontWeight: 500, cursor: 'pointer',
                display: 'inline-flex', gap: 5, alignItems: 'center',
              }}>
                <Eye size={11} />
                Ver
              </button>
              <button style={{
                background: 'none', border: '1px solid #FEE2E2',
                color: C.red, borderRadius: 5, padding: '5px 12px',
                fontSize: 11, fontWeight: 500, cursor: 'pointer',
                display: 'inline-flex', gap: 5, alignItems: 'center',
              }}>
                <Trash2 size={11} />
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Análisis IA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <Sparkles size={16} color={C.green} />
        <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Análisis de compatibilidad</span>
      </div>

      <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
        <div style={{
          background: C.offWhite, padding: '12px 16px',
          fontSize: 13, fontWeight: 600, color: C.text,
          display: 'flex', gap: 8, alignItems: 'center',
        }}>
          <FileSearch size={14} color={C.muted} />
          Pavimentación Av. del Ejército
        </div>
        <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { ok: true,  txt: 'Clasificación G requerida — Tu empresa tiene G2 ✓' },
            { ok: true,  txt: 'Solvencia mínima 50.000€ — Acreditada ✓' },
            { ok: false, txt: 'Seguro mínimo 300.000€ — Tu póliza cubre 200.000€' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 12, lineHeight: 1.5 }}>
              {item.ok
                ? <CheckCircle size={15} color="#16A34A" style={{ flexShrink: 0, marginTop: 1 }} />
                : <AlertTriangle size={15} color={C.amber} style={{ flexShrink: 0, marginTop: 1 }} />
              }
              <span style={{ color: C.text }}>{item.txt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── SECTION: CONFIGURACIÓN ───────────────────────────────────────────────
function SeccionConfig() {
  const [configTab, setConfigTab] = useState('perfil')
  const [tipoObra, setTipoObra] = useState({
    'Obra civil': true, 'Pavimentación': true, 'Urbanización': true,
    'Edificación': false, 'Rehabilitación': true, 'Instalaciones': false,
  })
  const [provincias, setProvincias] = useState({
    'Navarra': true, 'La Rioja': true, 'País Vasco': true, 'Aragón': false, 'Cataluña': false,
  })
  const [notifs, setNotifs] = useState({
    'Nuevas licitaciones por email': true,
    'Alertas de fechas límite próximas (3 días)': true,
    'Resumen semanal': false,
    'Notificaciones en el navegador': true,
    'Avisos de mantenimiento': false,
  })
  const [frecuencia, setFrecuencia] = useState('Inmediata')

  const tabs = ['Perfil', 'Preferencias', 'Plan actual', 'Notificaciones']

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, marginBottom: 24 }}>
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setConfigTab(t.toLowerCase().replace(' ', '-'))}
            style={{
              background: 'none', border: 'none', padding: '10px 20px', fontSize: 14, cursor: 'pointer',
              color: configTab === t.toLowerCase().replace(' ', '-') ? C.green : C.muted,
              fontWeight: configTab === t.toLowerCase().replace(' ', '-') ? 600 : 400,
              borderBottom: configTab === t.toLowerCase().replace(' ', '-') ? `2px solid ${C.green}` : '2px solid transparent',
              marginBottom: -1,
            }}
          >{t}</button>
        ))}
      </div>

      {/* Tab: Perfil */}
      {configTab === 'perfil' && (
        <div style={{ background: C.white, borderRadius: 10, padding: 28, border: `1px solid ${C.border}` }}>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, color: C.text, margin: '0 0 20px 0' }}>
            Datos de la empresa
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: 'Nombre empresa', val: 'Constructora García S.L.' },
              { label: 'CIF', val: 'B31234567' },
              { label: 'Email contacto', val: 'admin@constructoragarcia.es' },
              { label: 'Teléfono', val: '+34 948 123 456' },
            ].map(f => (
              <div key={f.label}>
                <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>
                  {f.label}
                </label>
                <input defaultValue={f.val} style={{
                  width: '100%', padding: '9px 12px', borderRadius: 7,
                  border: `1px solid ${C.border}`, fontSize: 13,
                  fontFamily: 'Inter, sans-serif', outline: 'none', boxSizing: 'border-box',
                }}
                onFocus={e => { e.target.style.borderColor = C.green; e.target.style.boxShadow = `0 0 0 3px ${C.greenLight}` }}
                onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = 'none' }}
                />
              </div>
            ))}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>
                Dirección
              </label>
              <input defaultValue="Calle Mayor 45, 31001 Pamplona, Navarra" style={{
                width: '100%', padding: '9px 12px', borderRadius: 7,
                border: `1px solid ${C.border}`, fontSize: 13,
                fontFamily: 'Inter, sans-serif', outline: 'none', boxSizing: 'border-box',
              }}
              onFocus={e => { e.target.style.borderColor = C.green; e.target.style.boxShadow = `0 0 0 3px ${C.greenLight}` }}
              onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = 'none' }}
              />
            </div>
          </div>
          <button style={{
            background: C.green, color: 'white', border: 'none', borderRadius: 8,
            padding: '10px 24px', fontSize: 14, fontWeight: 600, marginTop: 20, cursor: 'pointer',
            display: 'inline-flex', gap: 8, alignItems: 'center',
          }}>
            <Save size={15} />
            Guardar cambios
          </button>
        </div>
      )}

      {/* Tab: Preferencias */}
      {configTab === 'preferencias' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: C.white, borderRadius: 10, padding: 24, border: `1px solid ${C.border}` }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: '0 0 16px 0' }}>Tipo de obra</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
              {Object.entries(tipoObra).map(([label, checked]) => (
                <label key={label} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, cursor: 'pointer' }}>
                  <input
                    type="checkbox" checked={checked}
                    onChange={() => setTipoObra(p => ({ ...p, [label]: !p[label] }))}
                    style={{ accentColor: C.green, width: 15, height: 15 }}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <div style={{ background: C.white, borderRadius: 10, padding: 24, border: `1px solid ${C.border}` }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: '0 0 16px 0' }}>Provincias</h4>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {Object.entries(provincias).map(([p, active]) => (
                <button
                  key={p}
                  onClick={() => setProvincias(prev => ({ ...prev, [p]: !prev[p] }))}
                  style={{
                    borderRadius: 100, padding: '5px 14px', fontSize: 13, fontWeight: 500, cursor: 'pointer',
                    background: active ? C.green : C.white,
                    color: active ? 'white' : C.text,
                    border: active ? `1px solid ${C.green}` : `1px solid ${C.border}`,
                    transition: 'all 0.15s',
                  }}
                >{p}</button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: 'block', marginBottom: 6 }}>Importe mínimo</label>
                <input defaultValue="30.000" style={{ width: '100%', padding: '8px 12px', borderRadius: 7, border: `1px solid ${C.border}`, fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => { e.target.style.borderColor = C.green }}
                  onBlur={e => { e.target.style.borderColor = C.border }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: 'block', marginBottom: 6 }}>Importe máximo</label>
                <input defaultValue="500.000" style={{ width: '100%', padding: '8px 12px', borderRadius: 7, border: `1px solid ${C.border}`, fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => { e.target.style.borderColor = C.green }}
                  onBlur={e => { e.target.style.borderColor = C.border }}
                />
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: 'block', marginBottom: 8 }}>Frecuencia de alertas</label>
              <div style={{ display: 'flex', gap: 16 }}>
                {['Inmediata', 'Diaria', 'Semanal'].map(f => (
                  <label key={f} style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13, cursor: 'pointer' }}>
                    <input type="radio" name="frecuencia" checked={frecuencia === f} onChange={() => setFrecuencia(f)}
                      style={{ accentColor: C.green }} />
                    {f}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button style={{
            background: C.green, color: 'white', border: 'none', borderRadius: 8,
            padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            display: 'inline-flex', gap: 8, alignItems: 'center', alignSelf: 'flex-start',
          }}>
            <Save size={15} />
            Guardar preferencias
          </button>
        </div>
      )}

      {/* Tab: Plan actual */}
      {configTab === 'plan-actual' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div style={{ border: `2px solid ${C.green}`, borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
              <span style={{ background: C.greenLight, color: C.green, borderRadius: 100, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>ACTIVO</span>
              <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: C.text }}>Plan CRM</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 16 }}>
              <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 36, fontWeight: 800, color: C.text }}>299€</span>
              <span style={{ color: C.muted, fontSize: 14 }}>/mes</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {['Todo lo del plan Básico','Panel CRM completo','Kanban de licitaciones','Historial y notas','Usuarios ilimitados','Soporte prioritario'].map(f => (
                <li key={f} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: C.text }}>
                  <CheckCircle size={14} color={C.green} />
                  {f}
                </li>
              ))}
            </ul>
            <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>Próxima renovación: 1 ago 2026</p>
          </div>

          <div style={{ background: C.charcoal, borderRadius: 12, padding: 24 }}>
            <div style={{ marginBottom: 12 }}>
              <span style={{ background: C.green, color: 'white', borderRadius: 100, padding: '2px 10px', fontSize: 10, fontWeight: 700 }}>
                RECOMENDADO
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 16 }}>
              <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 30, fontWeight: 800, color: 'white' }}>499€</span>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>/mes</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {['Lectura de pliegos PDF','Chat con documentos IA','Checklist de requisitos','Google Drive / OneDrive'].map(f => (
                <li key={f} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                  <CheckCircle size={14} color={C.greenMid} />
                  {f}
                </li>
              ))}
            </ul>
            <button style={{
              background: C.green, color: 'white', border: 'none', width: '100%',
              padding: '10px', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer',
            }}>Actualizar ahora</button>
          </div>
        </div>
      )}

      {/* Tab: Notificaciones */}
      {configTab === 'notificaciones' && (
        <div style={{ background: C.white, borderRadius: 10, padding: 24, border: `1px solid ${C.border}` }}>
          {Object.entries(notifs).map(([label, on]) => (
            <div key={label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '14px 0', borderBottom: `1px solid ${C.border}`,
            }}>
              <span style={{ fontSize: 13, color: C.text }}>{label}</span>
              <div
                onClick={() => setNotifs(p => ({ ...p, [label]: !p[label] }))}
                style={{
                  width: 40, height: 22, borderRadius: 11,
                  background: on ? C.green : C.border,
                  position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0,
                }}
              >
                <div style={{
                  width: 18, height: 18, borderRadius: '50%', background: 'white',
                  position: 'absolute', top: 2,
                  left: on ? 20 : 2, transition: 'left 0.2s',
                }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── DRAWER ───────────────────────────────────────────────────────────────
function Drawer({ open, data, onClose }) {
  if (!open || !data) return null

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 200,
        }}
      />
      <div style={{
        position: 'fixed', right: 0, top: 0, bottom: 0, width: 480,
        background: C.white, boxShadow: '-4px 0 32px rgba(0,0,0,0.12)',
        display: 'flex', flexDirection: 'column', zIndex: 201,
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px', borderBottom: `1px solid ${C.border}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: C.text }}>Detalle de licitación</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, padding: 0 }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            {estadoBadge(data.estado)}
            <span style={{ ...matchColor(data.match), fontSize: 12, fontWeight: 700 }}>
              {data.match}% match
            </span>
          </div>

          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: C.text, margin: '0 0 20px 0', lineHeight: 1.3 }}>
            {data.nombre}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            {[
              { label: 'Organismo', val: data.org },
              { label: 'Provincia', val: data.provincia },
              { label: 'Tipo de obra', val: 'Obra civil' },
              { label: 'Presupuesto', val: data.importe },
              { label: 'Fecha límite', val: data.limite },
              { label: 'Código CPV', val: '45233141-9' },
              { label: 'Fuente', val: 'BOE / PLACSP' },
            ].map(f => (
              <div key={f.label}>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.label}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: C.text, marginTop: 2 }}>{f.val}</div>
              </div>
            ))}
          </div>

          {/* AI summary */}
          <div style={{ background: C.greenLight, borderRadius: 8, padding: '14px 16px' }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 8 }}>
              <Sparkles size={14} color={C.green} />
              <span style={{ fontSize: 12, fontWeight: 700, color: C.green }}>Resumen generado por IA</span>
            </div>
            <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7, margin: 0 }}>
              Licitación de pavimentación urbana en Pamplona. Requiere clasificación empresarial Grupo G, plazo de ejecución 4 meses. El presupuesto encaja con tu rango configurado. Alta probabilidad de encaje con tu perfil.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px', borderTop: `1px solid ${C.border}`,
          display: 'flex', gap: 10,
        }}>
          <button style={{
            flex: 1, background: C.green, color: 'white',
            border: 'none', borderRadius: 8, padding: '10px',
            fontSize: 14, fontWeight: 600, cursor: 'pointer',
          }}>Añadir al CRM</button>
          <button onClick={onClose} style={{
            flex: 1, background: C.offWhite, color: C.muted,
            border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px',
            fontSize: 14, fontWeight: 500, cursor: 'pointer',
          }}>Descartar</button>
        </div>
      </div>
    </>
  )
}

// ─── DASHBOARD ROOT ────────────────────────────────────────────────────────
export default function Dashboard() {
  const [section, setSection] = useState('inicio')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerData, setDrawerData] = useState(null)

  function renderSection() {
    switch (section) {
      case 'inicio':
        return <SeccionInicio setSection={setSection} setDrawerOpen={setDrawerOpen} setDrawerData={setDrawerData} />
      case 'alertas':
        return <SeccionAlertas setDrawerOpen={setDrawerOpen} setDrawerData={setDrawerData} />
      case 'crm':
        return <SeccionCRM />
      case 'documentos':
        return <SeccionDocumentos />
      case 'config':
        return <SeccionConfig />
      default:
        return null
    }
  }

  return (
    <>
      <style>{`
        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>

      <div style={{
        display: 'flex', height: '100vh', overflow: 'hidden',
        fontFamily: "'Inter', sans-serif", background: C.offWhite,
      }}>
        <Sidebar section={section} setSection={setSection} />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', marginLeft: 52 }}>
          <Topbar section={section} />
          <main style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }}>
            {renderSection()}
          </main>
        </div>
      </div>

      <Drawer open={drawerOpen} data={drawerData} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
