import { useState, type FormEvent } from 'react';
import { RoomShell } from '../../components/RoomShell';
import { useGame } from '../../game/GameContext';

// WORKSHOP: this is Andrei Irimia's independent page: /rooms/andrei-irimia
// Change this game, the content in src/game/data.ts, and the decorative style.
export default function AndreiIrimiaRoom() {
  const { win } = useGame();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (code.trim() === '3142') win('andrei-irimia');
    else setError('Cod greșit. Inspectează agenda sub lumina UV.');
  }
  return <RoomShell member="andrei-irimia">
    <p>Terminalul cere o parolă de patru cifre. Indiciul este ascuns într-un obiect din această cameră.</p>
    <form className="challenge-form" onSubmit={submit}>
      <label htmlFor="andrei-irimia-code">Cod de acces</label>
      <input id="andrei-irimia-code" type="text" inputMode="numeric" maxLength={4} value={code}
        onChange={e => { setCode(e.target.value); setError(''); }} placeholder="••••" required />
      <button className="button" type="submit">Deblochează terminalul</button>
    </form>
    {error && <p role="alert" className="error">{error}</p>}
  </RoomShell>;
}
