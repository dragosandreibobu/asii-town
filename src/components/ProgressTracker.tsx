import { useGame } from '../game/GameContext';
import { MEMBER_IDS, ROOMS, TRAP_PUZZLES } from '../game/data';
import { canOpenSecret } from '../game/logic';

export function ProgressTracker() {
  const { state } = useGame();
  return <section className="panel">
    <div className="panel-heading"><h2>✦ Progres</h2><span className="counter">{state.completedGames.length}/{MEMBER_IDS.length}</span></div>
    <div className="progress-track"><span style={{ width: (state.completedGames.length / MEMBER_IDS.length * 100) + '%' }} /></div>
    <ul className="progress-list">
      {MEMBER_IDS.map(id => <li key={id}><span>{state.completedGames.includes(id) ? '✓' : state.visitedRooms.includes(id) ? '◐' : '○'} {ROOMS[id].name}</span><span className="muted tiny">{state.completedGames.includes(id) ? 'joc câștigat' : state.visitedRooms.includes(id) ? 'vizitat' : 'neexplorat'}</span></li>)}
    </ul>
    <div className="progress-milestone">Casa Capcană: <strong>{state.trapEscaped ? 'evadare reușită' : state.trapEntered ? state.trapSolved.length + '/' + TRAP_PUZZLES.length + ' enigme' : 'neexplorată'}</strong></div>
    <div className="progress-milestone">Camera Secretă: <strong>{canOpenSecret(state) ? 'deblocată' : 'încuiată'}</strong></div>
  </section>;
}
