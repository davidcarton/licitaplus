// src/config/manifest.js
// DECISIONES DE DISEÑO
// Arquetipo: SaaS moderno — limpio, profesional, confianza
// Paleta: verde Benco #3D7A4F / negro #111111 / blanco #F7F9F8
// Tipografía display: Syne 700 — cuerpo: Inter 400/500
// Diferenciador visual: demo interactiva mockeada con alertas en tiempo real
// CTA principal: "Solicitar demo gratuita"

export const brand = {
  name: 'LicitaPlus',
  tagline: 'Nunca más pierdas una licitación de obra pública',
  description: 'El sistema que busca, filtra y resume licitaciones del BOE y PLACSP automáticamente. Tu equipo recibe solo las que le interesan.',
  email: 'hola@licitaplus.es',
  phone: '+34 948 000 000',
  by: 'Un servicio de Benco',
  byUrl: 'https://benco.es',
};

export const nav = [
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Planes', href: '#planes' },
  { label: 'Demo', href: '#demo' },
  { label: 'Contacto', href: '#contacto' },
];

export const stats = [
  { value: '+12.000', label: 'licitaciones analizadas al mes' },
  { value: '< 5 min', label: 'desde publicación hasta tu email' },
  { value: '96%', label: 'de margen en filtrado inteligente' },
  { value: '3 niveles', label: 'adaptados a tu empresa' },
];

export const howItWorks = [
  {
    step: '01',
    title: 'Tu empresa se registra',
    desc: 'Creas tu cuenta, indicas qué tipo de obras buscas, en qué provincias y a partir de qué importe. Cinco minutos y listo.',
    icon: 'UserPlus',
  },
  {
    step: '02',
    title: 'El agente busca cada día',
    desc: 'Nuestro sistema entra solo al BOE, PLACSP y portales autonómicos. Lee todos los anuncios nuevos y los compara con tus preferencias.',
    icon: 'Search',
  },
  {
    step: '03',
    title: 'Recibes solo lo que te interesa',
    desc: 'Cada licitación que encaja llega a tu email resumida: qué es, dónde, cuánto y cuándo. Sin PDFs de 200 páginas.',
    icon: 'Mail',
  },
  {
    step: '04',
    title: 'Gestionas desde el panel',
    desc: 'Marca cada oportunidad como interesante, en proceso o descartada. Tu equipo trabaja organizado desde un solo lugar.',
    icon: 'LayoutDashboard',
  },
];

export const plans = [
  {
    id: 'basico',
    name: 'Básico',
    subtitle: 'Alertas automáticas',
    price: '149',
    period: 'mes',
    description: 'Ideal para empresas que quieren empezar a recibir alertas sin complicaciones.',
    features: [
      'Búsqueda diaria en PLACSP y BOE',
      'Filtros por tipo de obra y provincia',
      'Email con resumen de cada licitación',
      'Hasta 3 usuarios por empresa',
      'Soporte por email',
    ],
    cta: 'Empezar gratis 14 días',
    featured: false,
  },
  {
    id: 'crm',
    name: 'CRM',
    subtitle: 'Panel de gestión completo',
    price: '299',
    period: 'mes',
    description: 'Para empresas que quieren gestionar su pipeline de licitaciones desde un panel propio.',
    features: [
      'Todo lo del plan Básico',
      'Panel web con todas las licitaciones',
      'Tablero Kanban por estados',
      'Historial y notas del equipo',
      'Usuarios ilimitados',
      'Soporte prioritario',
    ],
    cta: 'Empezar gratis 14 días',
    featured: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    subtitle: 'IA + documentos',
    price: '499',
    period: 'mes',
    description: 'La versión completa. La IA lee los pliegos y comprueba si tu empresa cumple los requisitos.',
    features: [
      'Todo lo del plan CRM',
      'Lectura automática de pliegos (PDF)',
      'Checklist de requisitos por licitación',
      'Chat con el pliego en lenguaje natural',
      'Integración Google Drive / OneDrive',
      'Account manager dedicado',
    ],
    cta: 'Solicitar demo',
    featured: false,
  },
];

export const mockAlerts = [
  {
    id: 1,
    title: 'Pavimentación Avenida del Ejército',
    org: 'Ayuntamiento de Pamplona',
    province: 'Navarra',
    type: 'Obra civil',
    budget: '185.000 €',
    deadline: '15 jul 2026',
    match: 98,
    new: true,
  },
  {
    id: 2,
    title: 'Rehabilitación cubierta polideportivo municipal',
    org: 'Ayuntamiento de Tudela',
    province: 'Navarra',
    type: 'Rehabilitación',
    budget: '92.000 €',
    deadline: '22 jul 2026',
    match: 91,
    new: true,
  },
  {
    id: 3,
    title: 'Urbanización Sector Norte — Fase 2',
    org: 'Gobierno de Navarra',
    province: 'Navarra',
    type: 'Urbanización',
    budget: '420.000 €',
    deadline: '8 ago 2026',
    match: 87,
    new: false,
  },
  {
    id: 4,
    title: 'Construcción vestuarios campo municipal',
    org: 'Ayuntamiento de Estella',
    province: 'Navarra',
    type: 'Edificación',
    budget: '68.500 €',
    deadline: '30 jul 2026',
    match: 79,
    new: false,
  },
];

export const testimonials = [
  {
    name: 'Carlos Mendívil',
    role: 'Gerente — Construcciones Mendívil S.L.',
    text: 'Antes tardábamos 2 horas al día buscando en el BOE. Ahora recibimos el resumen en el móvil antes de llegar a la oficina. Ya hemos ganado tres contratos que antes no veíamos.',
    avatar: 'CM',
  },
  {
    name: 'Laura Sánchez',
    role: 'Directora técnica — Obras Sánchez & Hijos',
    text: 'El plan Pro es una pasada. Le pregunto al sistema si cumplimos los requisitos de una licitación y me dice en 30 segundos si podemos presentarnos o no.',
    avatar: 'LS',
  },
  {
    name: 'Andrés Ruiz',
    role: 'Socio — Grupo Constructor Ruiz',
    text: 'Lo mejor es el panel CRM. Todo el equipo ve el estado de cada licitación. Nada se pierde.',
    avatar: 'AR',
  },
];
