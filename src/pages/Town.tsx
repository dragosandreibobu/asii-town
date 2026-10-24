import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from '../components/Modal';
import { useGame } from '../game/GameContext';
import { MEMBER_IDS, ROOMS } from '../game/data';
import { canEnterTrap, canOpenSecret } from '../game/logic';

const decorations = [
  { title: 'Biblioteca', icon: '📚', message: 'Bibliotecarul a auzit că parola unui seif se poate găsi pe o hartă a constelațiilor. Indiciu pentru Casa Capcană: vizitează camera cu stele.' },
  { title: 'Cafeneaua', icon: '☕', message: 'Un espresso și o glumă: de câți programatori ai nevoie ca să schimbi un bec? Niciunul, este o problemă hardware!' }
];

export default function Town() {
  const { state, enterTrap, reset } = useGame();
  const [decor, setDecor] = useState<(typeof decorations)[number] | null>(null);
  const [easterEgg, setEasterEgg] = useState(false);
  const navigate = useNavigate();
  const secretReady = canOpenSecret(state);
  const trapReady = canEnterTrap(state);
  return <div className="page">
    <div className="eyebrow">PROIECT INTRODUCTIV · ECHIPA 4</div>
    <h1>Bine ai venit în <em>ASII Town.</em></h1>
    <p className="lead">Un oraș mic, cinci povești diferite și un mister de rezolvat împreună. Vizitează fiecare casă, strânge fragmente și descoperă camera secretă.</p>
    <div className="hero-stats">
      <span>⌂ {MEMBER_IDS.length} camere personale</span>
      <span>◇ 1 capcană comună</span>
      <span>✦ 1 provocare finală</span>
    </div>
    <div className="town-scene" aria-label="Harta orașului">
      <div className="town-sky"><span>✦</span><span>☁</span><span>✦</span></div>
      <button type="button" className="easter-egg" aria-label="Stea misterioasă" title="Ce ascunde steaua?" onClick={() => setEasterEgg(true)}>✧</button>
      <div className="town-road" />
      <div className="town-houses">
        {MEMBER_IDS.map((id, i) => <Link className={'house house-' + (i + 1)} style={{ '--house-accent': ROOMS[id].accent } as React.CSSProperties} to={'/rooms/' + id} key={id}>
          <div className="house-roof" /><div className="house-building"><div className="house-window">✦</div><div className="house-door" /></div>
          <strong>{ROOMS[id].name}</strong><small>{state.completedGames.includes(id) ? '✓ Joc câștigat' : 'Intră în casă →'}</small>
        </Link>)}
      </div>
    </div>
    <h2 className="section-title">Explorează mai departe</h2>
    <div className="feature-grid">
      <article className="feature-card">
        <span className="feature-icon">⚿</span><div className="eyebrow">CASĂ COMUNĂ</div><h3>Casa Capcană</h3>
        <p>Șase enigme, indicii din camerele colegilor și maximum trei ajutoare. Ușa se încuie până rezolvi tot.</p>
        <button className="button" type="button" disabled={!trapReady}
          onClick={() => { enterTrap(); navigate('/trap'); }}>
          {trapReady ? 'Intră în capcană →' : 'Completează întâi toate jocurile'}
        </button>
      </article>
      <article className="feature-card">
        <span className="feature-icon">◈</span><div className="eyebrow">DESTINAȚIA FINALĂ</div><h3>Camera Secretă</h3>
        <p>Ghicește cui îi aparține fiecare obiect sau replică. Se deblochează după câștigarea jocurilor și evadare.</p>
        {secretReady ? <Link className="button" to="/secret">Deschide camera →</Link> : <span className="button disabled">🔒 Încuiată</span>}
      </article>
    </div>
    <h2 className="section-title">Casele de decor</h2>
    <div className="decor-grid">
      {decorations.map(item => <button type="button" key={item.title} className="decor-card" onClick={() => setDecor(item)}>
        <span className="decor-icon">{item.icon}</span><strong>{item.title}</strong><small>Descoperă un mesaj →</small>
      </button>)}
    </div>
    <div className="reset-bar"><span>Vrei să reîncepi demonstrația?</span><button type="button" className="text-button" onClick={() => { if (window.confirm('Ștergi progresul local al jocului?')) reset(); }}>Resetează progresul</button></div>
    {easterEgg && <Modal title="Secretul stelei" onClose={() => setEasterEgg(false)}><p>Ai găsit steaua ascunsă în oraș. Indiciu: răspunsul pentru Seiful lunar apare pe o hartă a constelațiilor.</p><button className="button" onClick={() => setEasterEgg(false)}>Continuă explorarea</button></Modal>}
    {decor && <Modal title={decor.title} onClose={() => setDecor(null)}><p>{decor.message}</p><button className="button" onClick={() => setDecor(null)}>Înapoi la explorare</button></Modal>}
  </div>;
}
