import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGame } from '../game/GameContext';
import { TRAP_PUZZLES } from '../game/data';
import { canEnterTrap, canEscapeTrap } from '../game/logic';

export default function TrapHouse() {
  const { state, enterTrap, solve, hint, escape } = useGame();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<string[]>([]);
  const ready = canEnterTrap(state);

  useEffect(() => {
    if (ready && !state.trapEntered) enterTrap();
  }, [ready, state.trapEntered]);

  if (!ready) return <div className="page">
    <div className="eyebrow">CASA CAPCANĂ</div><h1>Pregătește-te înainte de intrare</h1>
    <p className="lead">Înăuntru, ușa se încuie. Pentru a evita un blocaj ireversibil, trebuie să câștigi toate mini-jocurile personale și să aduni fragmentele mai întâi.</p>
    <Link className="button" to="/">← Înapoi în oraș</Link>
  </div>;

  function submit(event: FormEvent<HTMLFormElement>, id: string) {
    event.preventDefault();
    const correct = solve(id, inputs[id] || '');
    setErrors(e => ({ ...e, [id]: correct ? '' : 'Cod greșit sau nu ai selectat fragmentul necesar în inventar.' }));
  }
  function reveal(id: string) {
    if (revealed.includes(id)) return;
    if (hint()) setRevealed(r => [...r, id]);
  }
  const remaining = TRAP_PUZZLES.length - state.trapSolved.length;
  const canEscape = canEscapeTrap(state);

  return <div className="page">
    <div className="eyebrow">CASA COMUNĂ · ESCAPE ROOM</div>
    <h1>Casa Capcană <span className="lock-symbol">⚿</span></h1>
    <p className="lead">Ușa s-a încuiat în urma ta. Rezolvă enigmele în orice ordine. Fragmentele personale trebuie selectate în inventarul din dreapta.</p>
    <div className={canEscape ? 'trap-banner success' : 'trap-banner'}>
      <strong>{canEscape ? 'Ușa este deschisă!' : 'Ușa este încuiată'}</strong>
      <span>{remaining} din {TRAP_PUZZLES.length} enigme rămase · {3 - state.hintUses} indicii disponibile</span>
    </div>
    <div className="puzzles-grid">
      {TRAP_PUZZLES.map((p, index) => {
        const solved = state.trapSolved.includes(p.id);
        return <section key={p.id} className={solved ? 'puzzle-card solved' : 'puzzle-card'}>
          <div className="puzzle-index">ENIGMA 0{index + 1} · {p.source}</div>
          <h2>{p.title} {solved && '✓'}</h2>
          <p>{p.prompt}</p>
          {p.requiredItem && <p className="tiny muted">Necesită: {p.requiredItem.replace('fragment-', 'fragmentul ')}, selectat din inventar.</p>}
          {solved ? <div className="success">✓ Rezolvată</div>
            : <form className="challenge-form" onSubmit={event => submit(event, p.id)}>
              <label htmlFor={'answer-' + p.id}>Răspuns</label>
              <input id={'answer-' + p.id} value={inputs[p.id] || ''}
                onChange={event => { setInputs(v => ({ ...v, [p.id]: event.target.value })); setErrors(e => ({ ...e, [p.id]: '' })); }}
                placeholder="Scrie codul" autoComplete="off" required />
              <button className="button" type="submit">Verifică</button>
            </form>}
          {errors[p.id] && !solved && <p className="error" role="alert">{errors[p.id]}</p>}
          {!solved && <button className="text-button" type="button" disabled={state.hintUses >= 3 && !revealed.includes(p.id)} onClick={() => reveal(p.id)}>
            {revealed.includes(p.id) ? 'Indiciu consultat' : 'Cere un indiciu'}
          </button>}
          {revealed.includes(p.id) && <p className="hint">{p.hint}</p>}
        </section>;
      })}
    </div>
    {canEscape && <div className="win-banner">
      <h2>Ai rezolvat toate enigmele.</h2>
      <p>Ușa se deschide și primești fragmentul final pentru Camera Secretă.</p>
      <button className="button" onClick={() => { escape(); navigate('/'); }}>Evadați din casă →</button>
    </div>}
    {state.trapEscaped && <Link className="button ghost" to="/">← Înapoi în oraș</Link>}
  </div>;
}
