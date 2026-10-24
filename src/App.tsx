import { useEffect } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useGame } from './game/GameContext';
import { canOpenSecret } from './game/logic';
import { Inventory } from './components/Inventory';
import { ProgressTracker } from './components/ProgressTracker';
import Town from './pages/Town';
import AlexRoom from './pages/rooms/AlexRoom';
import MaraRoom from './pages/rooms/MaraRoom';
import TeoRoom from './pages/rooms/TeoRoom';
import DariaRoom from './pages/rooms/DariaRoom';
import TrapHouse from './pages/TrapHouse';
import SecretRoom from './pages/SecretRoom';

export default function App() {
  const { state, toggleNight } = useGame();
  const location = useLocation();
  const navigate = useNavigate();
  const lockedInTrap = state.trapEntered && !state.trapEscaped;

  // Prevent escaping via the navbar or the browser Back button.
  useEffect(() => {
    if (lockedInTrap && location.pathname !== '/trap') {
      navigate('/trap', { replace: true });
    }
  }, [lockedInTrap, location.pathname, navigate]);

  return <div className={state.night ? 'app night' : 'app'}>
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to={lockedInTrap ? '/trap' : '/'}>✦ <span>ASII<span className="brand-accent">TOWN</span></span></Link>
        <nav aria-label="Navigare principală">
          <NavLink to={lockedInTrap ? '/trap' : '/'} end>Oraș</NavLink>
          <NavLink to="/trap">Capcană</NavLink>
          <NavLink to={canOpenSecret(state) ? '/secret' : lockedInTrap ? '/trap' : '/'}>Camera secretă</NavLink>
        </nav>
        <button className="small-button" type="button" onClick={toggleNight}>{state.night ? '☀ Zi' : '☾ Noapte'}</button>
      </div>
    </header>
    <div className="app-grid">
      <main className="content">
        <Routes>
          <Route path="/" element={<Town />} />
          <Route path="/rooms/alex" element={<AlexRoom />} />
          <Route path="/rooms/mara" element={<MaraRoom />} />
          <Route path="/rooms/teo" element={<TeoRoom />} />
          <Route path="/rooms/daria" element={<DariaRoom />} />
          <Route path="/trap" element={<TrapHouse />} />
          <Route path="/secret" element={<SecretRoom />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <aside className="sidebar" aria-label="Starea jocului">
        <ProgressTracker />
        <Inventory />
        <p className="sidebar-note">DEMO: nume și obiecte fictive. Fiecare coleg își înlocuiește conținutul propriei camere.</p>
      </aside>
    </div>
    <footer className="site-footer">ASII · Echipa IT 4 · Proiect introductiv · React + TypeScript</footer>
  </div>;
}
