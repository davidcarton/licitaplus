// DECISIONES DE DISEÑO
// Arquetipo: SaaS moderno B2B — profesional, limpio, confianza técnica
// Paleta: verde Benco #3D7A4F (primario) / #1E2A22 (charcoal) / #F7F9F8 (off-white)
// Tipografía display: Syne 800 — cuerpo: Inter 400/500
// Diferenciador visual: demo interactiva con alertas en tiempo real (mock)
// CTA principal: "Solicitar demo gratuita" — navbar + hero + planes + contacto

import { HashRouter, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero/index';
import HowItWorks from './components/sections/HowItWorks/index';
import Demo from './components/sections/Demo/index';
import Plans from './components/sections/Plans/index';
import Contact from './components/sections/Contact/index';
import Dashboard from './pages/Dashboard';

function Landing() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Demo />
        <Plans />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </HashRouter>
  );
}
