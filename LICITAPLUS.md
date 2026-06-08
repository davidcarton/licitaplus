# LicitaPlus — Documentación base del proyecto

> Plataforma SaaS de alertas y gestión de licitaciones de obra pública.  
> Desarrollado con React + Vite. Desplegado en GitHub Pages.  
> URL pública: **https://davidcarton.github.io/licitaplus/**

---

## Índice

1. [Concepto de producto](#1-concepto-de-producto)
2. [Stack tecnológico](#2-stack-tecnológico)
3. [Paleta de colores — Benco](#3-paleta-de-colores--benco)
4. [Tipografía](#4-tipografía)
5. [Estructura de archivos](#5-estructura-de-archivos)
6. [Routing](#6-routing)
7. [Landing page](#7-landing-page)
8. [Dashboard simulado](#8-dashboard-simulado)
9. [Despliegue en GitHub Pages](#9-despliegue-en-github-pages)
10. [Comandos de trabajo diario](#10-comandos-de-trabajo-diario)
11. [Próximos pasos sugeridos](#11-próximos-pasos-sugeridos)

---

## 1. Concepto de producto

**LicitaPlus** monitoriza el BOE, PLACSP y portales autonómicos de licitaciones públicas, filtra las oportunidades según el perfil de cada empresa constructora y entrega un resumen por email en menos de 5 minutos desde la publicación.

### Propuesta de valor
- Sin búsqueda manual diaria en el BOE
- Filtros por tipo de obra, provincia e importe
- Resumen IA de cada pliego: requisitos, clasificación, plazo
- Panel CRM/Kanban para gestionar el pipeline de licitaciones
- Análisis de compatibilidad documental (plan Pro)

### Planes
| Plan | Precio | Diferenciador |
|------|--------|---------------|
| Básico | 149 €/mes | Alertas por email, filtros básicos |
| CRM | 299 €/mes | Panel web + Kanban (más popular) |
| Pro | 499 €/mes | IA sobre pliegos PDF, integración Drive |

---

## 2. Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework UI | React 19 |
| Bundler | Vite 8 |
| Router | react-router-dom 7 (HashRouter) |
| Animaciones | framer-motion 12 |
| Iconos | lucide-react |
| Deploy | gh-pages → GitHub Pages |
| CSS | Inline styles (objetos JS) + CSS custom properties globales |
| Fuentes | Google Fonts: Syne 800 (display) + Inter 400/500/600/700 (body) |

### Dependencias en package.json
```json
"dependencies": {
  "framer-motion": "^12.40.0",
  "lucide-react": "^1.17.0",
  "react": "^19.2.6",
  "react-dom": "^19.2.6",
  "react-router-dom": "^7.17.0"
},
"devDependencies": {
  "gh-pages": "^6.3.0",
  "vite": "^8.0.12",
  "@vitejs/plugin-react": "^6.0.1"
}
```

### Scripts npm
```json
"scripts": {
  "dev":       "vite",
  "build":     "vite build",
  "preview":   "vite preview",
  "predeploy": "npm run build",
  "deploy":    "gh-pages -d dist"
}
```

---

## 3. Paleta de colores — Benco

Definida en `src/styles/global.css` como CSS custom properties y replicada como constante `C` dentro del Dashboard y la Demo.

### CSS custom properties (landing)
```
--color-green:       #3D7A4F   → verde primario Benco
--color-green-dark:  #2A5938   → hover, fondos oscuros
--color-green-light: #EAF4EE   → fondos suaves, badges
--color-green-mid:   #5A9A6E   → sidebar activo, acentos
--color-charcoal:    #1E2A22   → fondo hero, navbar oscuro
--color-off-white:   #F7F9F8   → fondo secciones alternas
--color-border:      #D8E6DC   → bordes suaves
--color-text:        #1E2A22   → texto principal
--color-text-muted:  #6B7B72   → texto secundario
--color-amber:       #D97706   → estado "Estudiando"
```

### Constante C (dashboard + demo)
```js
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
```

### Badges de estado
| Estado | Fondo | Color texto | Dot |
|--------|-------|-------------|-----|
| Nueva | `#EAF4EE` | `#2A5938` | `#3D7A4F` + animación pulse |
| Estudiando | `#FEF3C7` | `#92400E` | `#D97706` |
| Presentada | `#EFF6FF` | `#1D4ED8` | `#1D4ED8` |
| Ganada | `#F0FDF4` | `#166534` | `#16A34A` |

### Color del campo Match
```
match >= 90  →  color #2A5938 (verde oscuro), fontWeight 700
match 80–89  →  color #D97706 (ámbar),        fontWeight 700
match < 80   →  color #6B7B72 (muted)
```

---

## 4. Tipografía

```
--font-display: 'Syne', sans-serif    → títulos, KPIs, logo
--font-body:    'Inter', sans-serif   → todo lo demás
```

- **Syne 800** — h1, h2, valores KPI, logo "LicitaPlus"
- **Inter 400/500/600/700** — párrafos, labels, botones, tabla

Importadas desde Google Fonts en `src/styles/global.css`.

---

## 5. Estructura de archivos

```
LicitaPlus_web/
├── public/
│   ├── favicon.svg          → hexágono verde #2A5938 + círculo blanco
│   └── icons.svg
├── src/
│   ├── App.jsx              → HashRouter + rutas / y /dashboard
│   ├── main.jsx             → punto de entrada React
│   ├── index.css            → reset mínimo
│   ├── styles/
│   │   └── global.css       → CSS custom properties + utilidades
│   ├── config/
│   │   └── manifest.js      → datos centralizados (brand, nav, stats,
│   │                           howItWorks, plans, mockAlerts, testimonials)
│   ├── hooks/
│   │   └── useScrollReveal.js
│   ├── assets/
│   │   └── hero.png
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx   → fixed, scroll-aware, navega a /dashboard
│   │   │   └── Footer.jsx
│   │   └── sections/
│   │       ├── Hero/        → CTA navega a /dashboard
│   │       ├── HowItWorks/  → 4 pasos con framer-motion
│   │       ├── Demo/        → browser-chrome mockup del dashboard
│   │       ├── Plans/       → 3 planes, CTA navega a /dashboard
│   │       └── Contact/     → formulario + testimonios
│   └── pages/
│       └── Dashboard.jsx    → dashboard completo autocontenido
├── index.html               → title: LicitaPlus
├── vite.config.js           → base: '/licitaplus/'
├── package.json
└── .gitignore
```

---

## 6. Routing

Se usa **HashRouter** porque GitHub Pages sirve archivos estáticos y no soporta historial HTML5.

```jsx
// src/App.jsx
import { HashRouter, Routes, Route } from 'react-router-dom';

<HashRouter>
  <Routes>
    <Route path="/"          element={<Landing />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
</HashRouter>
```

| URL en producción | Resultado |
|-------------------|-----------|
| `https://davidcarton.github.io/licitaplus/#/` | Landing page |
| `https://davidcarton.github.io/licitaplus/#/dashboard` | Dashboard simulado |

Los botones "Solicitar demo" en Navbar, Hero y Plans usan `useNavigate('/dashboard')`.

Por qué HashRouter y no BrowserRouter:
```
BrowserRouter → /licitaplus/dashboard → 404 en GitHub Pages (no hay servidor)
HashRouter    → /licitaplus/#/dashboard → OK (el servidor ignora el fragmento #)
```

---

## 7. Landing page

### 7.1 Navbar — `components/layout/Navbar.jsx`
- Position fixed, transparente en top → blanco al scroll (threshold 40px)
- Logo: hexágono SVG verde + "LicitaPlus" en Syne
- Links de nav desde `manifest.nav`
- CTA "Solicitar demo" → `navigate('/dashboard')`
- Mobile: burger button + menú desplegable

### 7.2 Hero — `components/sections/Hero/index.jsx`
- Fondo: gradiente 160deg charcoal → green-dark → #1A3D28
- Badge animado "POWERED BY IA — BOE · PLACSP · CCAA"
- H1: "Nunca más pierdas una licitación de obra pública"
- CTA "Solicitar demo gratuita →" → `navigate('/dashboard')`
- CTA secundario "Ver cómo funciona" → scroll a `#como-funciona`
- Fila de 4 stats con framer-motion (delay 0.7s)
- Ola SVG de transición al off-white en el bottom
- Fix de layout aplicado: `paddingBottom 140px`, stats `marginBottom 80px`
  y `zIndex 1`, ola SVG `zIndex 2` para evitar que el SVG recorte las stats

### 7.3 HowItWorks — `components/sections/HowItWorks/index.jsx`
- 4 tarjetas en grid auto-fit, hover lift con framer-motion
- Iconos SVG inline (UserPlus, Search, Mail, LayoutDashboard)
- Numeración grande decorativa en background (green-light)
- Flechas de conexión entre tarjetas: círculo verde con símbolo ›

### 7.4 Demo — `components/sections/Demo/index.jsx`
- Una sola sección con browser chrome completo (máx. 1100px)
- Dentro: réplica visual exacta del dashboard real
  - Sidebar 44px con Bell activo
  - Topbar con buscador + campana + botón "+ Nueva alerta"
  - 4 KPI cards (Licitaciones / Presentadas / Ganadas / Valor potencial)
  - Lista de alertas animada con `AnimatePresence` (framer-motion)
  - Panel derecho: preferencias en charcoal + gráfico de barras con hover
- **Simulación en tiempo real**: nueva alerta llega a los 4 segundos (setTimeout)
- Botón X para descartar alertas
- "Ver detalles" abre un Drawer lateral con datos del pliego + resumen IA
- Animación `dotPulse` en el dot de badges de estado "Nueva"

### 7.5 Plans — `components/sections/Plans/index.jsx`
- 3 tarjetas generadas desde `manifest.plans`
- Plan featured (CRM): escala 1.03, borde verde, badge "MÁS POPULAR"
- Botón CTA de cada plan → `navigate('/dashboard')`
- Fondo: `var(--color-charcoal)`

### 7.6 Contact — `components/sections/Contact/index.jsx`
- Columna izquierda: 3 testimonios desde `manifest.testimonials`
  con avatar iniciales, estrellas (★★★★★) y comillas
- Columna derecha: formulario controlado (useState)
  Campos: nombre, empresa, email, teléfono, selector de plan
  Submit simulado → estado `sent: true` → mensaje de confirmación
- Responsive: 2col → 1col en mobile

### Datos centralizados — `src/config/manifest.js`
```
brand        → nombre, tagline, description, email, phone, by, byUrl
nav          → array de { label, href } para los links
stats        → array de 4 valores para el hero
howItWorks   → 4 pasos { step, title, desc, icon }
plans        → 3 planes { id, name, subtitle, price, period,
                          description, features[], cta, featured }
mockAlerts   → 4 licitaciones { id, title, org, province, type,
                                budget, deadline, match, new }
testimonials → 3 testimonios { name, role, text, avatar }
```

---

## 8. Dashboard simulado

Archivo: `src/pages/Dashboard.jsx` (~750 líneas, autocontenido).
Todo CSS en objetos JS inline. Sin librerías externas salvo lucide-react y react-router-dom.

### Layout
```
position fixed sidebar (52px) + flex column main area

[Sidebar 52px, charcoal, fixed]
[Main — marginLeft 52px]
  [Topbar 52px, blanco, flexShrink 0]
  [main — flex 1, overflowY auto, padding 24px 32px]
    renderSection() según estado `section`
```

### Estado global
```js
const [section, setSection]         = useState('inicio')
const [drawerOpen, setDrawerOpen]   = useState(false)
const [drawerData, setDrawerData]   = useState(null)
const [kanban, setKanban]           = useState({
  nueva:      [{ id, nombre, importe, match, limite }, ...],
  estudiando: [...],
  presentada: [...],
  resultado:  []
})
const [configTab, setConfigTab]     = useState('perfil')
const [alertFilter, setAlertFilter] = useState('todas')
```

### Sidebar (52px, position fixed)
- Fondo `C.charcoal`
- Logo: hexágono SVG con "L" blanca
- 5 iconos de nav con tooltip al hover (estado `hoveredItem`)
- Icono activo: `background rgba(61,122,79,0.35)` + `borderLeft 3px solid #5A9A6E`
- Icono inactivo: `color rgba(255,255,255,0.45)`, hover `rgba(255,255,255,0.06)`
- Tooltip: div absoluto `left 56px`, fondo charcoal, fontSize 12px, zIndex 999
- Avatar "CG" en bottom: círculo 32px verde, tooltip "Constructora García"

### Topbar (height 52px)
- Botón "← Volver a la web": `navigate('/')`, color muted, hover verde
- Separador 1px + breadcrumb sección activa (fontWeight 600)
- Buscador centrado (decorativo en la demo): input 380px, off-white, icono Search
- Campana `Bell size=18` con badge rojo "3"
- Botón "+ Nueva alerta": fondo verde, icono Plus
- Avatar "CG" 30px + "Constructora García" + ChevronDown

### Sección: Inicio (`SeccionInicio`)

**Fila KPIs** — grid 4 columnas:
| Label | Valor | Icono |
|-------|-------|-------|
| Licitaciones recibidas | 23 | Mail |
| Ofertas presentadas | 4 | Send |
| Contratos ganados | 1 | Award |
| Importe potencial | 847.000 € | TrendingUp |

Cada card: blanca, borderRadius 10, padding 20-24, border, shadow suave.
Valor: Syne 800, fontSize 32. Badge trend: greenLight con TrendingUp icon.

**Gráfico de barras** (divs puros, no librería):
- 6 meses: Ene(8) Feb(11) Mar(9) Abr(14) May(18) Jun(23)
- `maxVal = 23`, altura proporcional de cada barra
- Hover: color pasa de `C.green` a `C.greenDark`
- Tooltip absoluto al hover: fondo charcoal, texto "X alertas"

**Barras horizontales** por tipo de obra:
- Obra civil 42% (verde) · Edificación 28% (greenMid)
- Urbanización 18% (#8DC4A3) · Rehabilitación 12% (C.border)

**Tabla** (`<table>` HTML real):
- 5 filas de licitaciones con badge estado + match coloreado
- Hover en fila cambia fondo a offWhite
- Botón "Ver detalles" abre el Drawer, botón "+ CRM" decorativo
- Cabecera: offWhite, uppercase, borderBottom `2px solid C.green`

### Sección: Mis alertas (`SeccionAlertas`)
- Grid 2 columnas: 300px fijo | 1fr

**Panel izquierdo** (charcoal):
- SlidersHorizontal icon + "Mis preferencias"
- 5 filas: Tipo obra / Provincias / Importe mín / Importe máx / Frecuencia
- Botón "Editar preferencias" con Pencil icon, borde greenMid

**Panel derecho**:
- Tabs: Todas (5) · Nuevas (3) · Hoy (2)
- Alert cards: badge estado + NUEVA + X + título + org/provincia (MapPin) +
  importe (Banknote) + límite (Calendar) + match (Target) + botones
- Border verde en cards "nueva", shadow verde suave
- "Ver detalles" → `setDrawerOpen(true)`, `setDrawerData(alert)`

### Sección: CRM / Pipeline (`SeccionCRM`)

**Stats inline** separados por divisores:
- "7 en pipeline" · "1.237.700 € valor total" · "25% tasa de éxito"

**Kanban** — grid 4 columnas:
```
nueva        → charcoal header, borde izq verde
estudiando   → #7C4A00 header, borde izq ámbar
presentada   → #1E3A5F header, borde izq azul
resultado    → #374151 header, borde izq gris
```

Función `moveCard(cardId, fromCol, toCol)`:
```js
setKanban(prev => ({
  ...prev,
  [fromCol]: prev[fromCol].filter(c => c.id !== cardId),
  [toCol]:   [...prev[toCol], card],
}))
```

Cada KanbanCard: borde izq de color + título + importe grande verde +
Calendar icon + match badge + ChevronRight para mover a siguiente columna.

Columna resultado vacía: FolderOpen icon + texto orientativo.

### Sección: Documentos (`SeccionDocumentos`)
- Badge "Plan Pro" (ámbar)
- Upload zone: dashed border greenMid, hover cambia a verde + greenLight
  UploadCloud icon + texto + botón "Seleccionar archivos" con FolderOpen
- Grid 3 columnas de DocCards:
  FileType icon rojo + badge "Verificado" (CheckCircle) + nombre + meta + botones
  Botón "Ver": offWhite. Botón "Eliminar": borde rojo, color rojo
- Análisis IA: FileSearch icon + 3 items con CheckCircle verde / AlertTriangle ámbar

### Sección: Configuración (`SeccionConfig`)
Tabs: Perfil · Preferencias · Plan actual · Notificaciones

**Tab Perfil**: inputs controlados con defaultValue, focus ring verde (boxShadow greenLight).
Campos: Nombre empresa · CIF · Email · Teléfono · Dirección (col-span 2).
Botón "Guardar cambios" con Save icon.

**Tab Preferencias**:
- Checkboxes tipo obra (6 opciones, accentColor verde)
- Chips de provincias (toggle activo/inactivo)
- Inputs importe mín/máx
- Radio buttons frecuencia (Inmediata/Diaria/Semanal)

**Tab Plan actual**:
- Card Plan CRM activo: borde verde 2px, precio 299€, features con CheckCircle, fecha renovación
- Card Pro: fondo charcoal, badge RECOMENDADO, precio 499€, features con CheckCircle verde

**Tab Notificaciones**:
- Lista de 5 toggles: div 40×22px borderRadius 11px
- ON: fondo `C.green`. OFF: fondo `C.border`
- Thumb: div 18×18px blanco, transición `left` entre 2px y 20px

### Drawer de detalle
```
Overlay:  position fixed, inset 0, background rgba(0,0,0,0.35), zIndex 200
Panel:    position fixed, right 0, top 0, bottom 0, width 480px
          background white, boxShadow izquierdo, zIndex 201

Header:   "Detalle de licitación" + botón X
Body:     badge estado + match % + título Syne 800
          grid 2col con 7 campos (Organismo, Provincia, Tipo, Presupuesto,
          Fecha límite, Código CPV, Fuente)
          Card IA: greenLight, Sparkles icon, párrafo resumen
Footer:   [Añadir al CRM] verde · [Descartar] offWhite
```

### Iconos usados (lucide-react)
```
Sidebar/Topbar:   LayoutDashboard, Bell, Kanban, FileText, Settings,
                  Search, Plus, ChevronDown, ArrowLeft

Drawer/acciones:  X, ChevronRight, Sparkles, Save, Pencil

Alertas/datos:    MapPin, Banknote, Calendar, Target, Mail, Send, Award,
                  TrendingUp, SlidersHorizontal

Documentos:       UploadCloud, CheckCircle, AlertTriangle, FileType,
                  Clock, Eye, Trash2, FolderOpen, FileSearch, BarChart2
```

---

## 9. Despliegue en GitHub Pages

### vite.config.js
```js
export default defineConfig({
  plugins: [react()],
  base: '/licitaplus/',
  server: { historyApiFallback: true },
})
```

### Repositorio
- Cuenta GitHub: `davidcarton`
- Repo: https://github.com/davidcarton/licitaplus
- Rama código: `main`
- Rama deploy: `gh-pages` (creada automáticamente por `npm run deploy`)
- URL pública: https://davidcarton.github.io/licitaplus/

### Favicon (public/favicon.svg)
Hexágono verde oscuro #2A5938 con borde blanco y círculo central blanco.
Fondo redondeado (rx=14) para verse bien en tabs y bookmarks.

---

## 10. Comandos de trabajo diario

```bash
# Desarrollo local con hot reload
npm run dev

# Publicar cambios (build + deploy + push)
git add .
git commit -m "descripción del cambio"
git push
npm run deploy
```

`npm run deploy` ejecuta `npm run build` automáticamente (script `predeploy`)
y sube `dist/` a la rama `gh-pages`. La web se actualiza en 1-3 minutos.

---

## 11. Próximos pasos sugeridos

### Backend y datos reales
- [ ] Integrar BOE API / scraping PLACSP para alertas reales
- [ ] Autenticación de usuarios (Supabase, Auth0 o Firebase)
- [ ] Base de datos de licitaciones y preferencias por empresa
- [ ] Envío de emails reales (Resend o SendGrid)
- [ ] Resúmenes IA con Claude API (`claude-sonnet-4-6`)

### UX y producto
- [ ] Responsive completo del dashboard (actualmente optimizado para desktop)
- [ ] Modo oscuro
- [ ] Onboarding de 3 pasos para nuevos usuarios
- [ ] Exportar licitaciones a Excel/PDF
- [ ] Notificaciones push en navegador

### Infraestructura
- [ ] Migrar a Vercel o Netlify (permite BrowserRouter sin 404)
- [ ] Dominio propio: licitaplus.es
- [ ] CI/CD con GitHub Actions (deploy automático en push a main)

### Conversión
- [ ] Video demo embebido en la sección Demo
- [ ] Calculadora de ahorro de tiempo
- [ ] Badge LOPD/privacidad
- [ ] Chat de soporte en vivo (Intercom, Crisp)

---

*Desarrollado por Benco · david.carton@gmail.com*  
*Última actualización: junio 2026*
