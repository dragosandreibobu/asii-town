import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../game/GameContext';
import { ROOMS, type MemberId, type RoomObject } from '../game/data';
import { Modal } from './Modal';

export function RoomShell({ member, children }: { member: MemberId; children: ReactNode }) {
  const { state, visit, collect } = useGame();
  const data = ROOMS[member];
  const [inspecting, setInspecting] = useState<RoomObject | null>(null);
  const [light, setLight] = useState(false);
  const [rugMoved, setRugMoved] = useState(false);
  const [message, setMessage] = useState('');

  // This component mounts only when its room route is opened.
  useEffect(() => { visit(member); }, [member]);

  function inspect(object: RoomObject) {
    if (object.kind === 'hidden' && !light) {
      setMessage('Este prea întuneric. Pornește lumina specială!');
      return;
    }
    if (object.kind === 'collectible') {
      if (state.collectedItems.includes(object.id)) {
        setMessage('Acest obiect este deja în inventar.');
      } else {
        collect(object.id);
        setMessage('Obiect colectat: ' + object.label);
      }
      return;
    }
    setInspecting(object);
  }

  return <div className="page">
    <div className="eyebrow">CASA PERSONALĂ · {data.name.toUpperCase()}</div>
    <div className="page-header">
      <div><h1>{data.title}</h1><p className="lead">Cinci obiecte, indicii personale, o poveste și un mini-joc.</p></div>
      <Link className="button ghost" to="/">← Înapoi în oraș</Link>
    </div>
    <section className={light ? 'room-stage illuminated' : 'room-stage'} style={{ borderColor: data.accent }}>
      <div className="stage-decor"><span>✦</span><span>◈</span><span>✦</span></div>
      <div className="room-titleplate">Camera lui {data.name}</div>
      <div className="objects-grid">
        {data.objects.filter(object => !state.collectedItems.includes(object.id)).map(object => <button className="object-card" type="button"
          key={object.id} onClick={() => inspect(object)} aria-label={'Inspectează: ' + object.label}>
          <span className="object-icon">{object.icon}</span>
          <span>{object.label}</span>
          {state.collectedItems.includes(object.id) && <small>✓ colectat</small>}
        </button>)}
      </div>
      <div className="stage-bottom">
        <button className="button outline" type="button" onClick={() => setLight(!light)}>
          {light ? '◌ Oprește lumina UV' : '☼ Pornește lumina UV'}
        </button>
        <div className="rug-zone" onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); setRugMoved(true); }}>
          <button className="button outline" draggable onDragStart={e => e.dataTransfer.setData('text/plain', 'rug')} type="button" onClick={() => setRugMoved(true)}>
            {rugMoved ? '✓ Covor mutat' : '▱ Mută covorul (drag/click)'}
          </button>
          {rugMoved && <span className="rug-clue">Sub covor: un simbol comun ✦</span>}
        </div>
      </div>
    </section>
    {message && <div className="toast" role="status">{message} <button type="button" onClick={() => setMessage('')} aria-label="Închide mesajul">×</button></div>}
    <section className="game-section">
      <div className="eyebrow">PROVOCAREA PERSONALĂ</div>
      <h2>Mini-jocul lui {data.name}</h2>
      <p className="muted">Câștigă jocul pentru a primi {data.reward.toLowerCase()} în inventar.</p>
      {state.completedGames.includes(member)
        ? <div className="success">✓ Provocare completă. Fragmentul a fost adăugat în inventar.</div>
        : children}
    </section>
    {inspecting && <Modal title={inspecting.label} onClose={() => setInspecting(null)}>
      <div className="modal-object">{inspecting.icon}</div><p>{inspecting.description}</p>
      <button className="button" type="button" onClick={() => setInspecting(null)}>Am înțeles</button>
    </Modal>}
  </div>;
}
