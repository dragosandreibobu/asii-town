import { useState, type FormEvent } from 'react';
import { RoomShell } from '../../components/RoomShell';
import { useGame } from '../../game/GameContext';

// WORKSHOP: Dragoș Bobu's independent page: /rooms/dragos-bobu
// Prototype puzzle: replace or expand the game and personal clues as desired.
export default function DragosBobuRoom() {
  const { win } = useGame();
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (answer.trim() === '21') {
      win('dragos-bobu');
    } else {
      setFeedback('Mai privește o dată șirul de pe notițele camerei.');
    }
  }

  return <RoomShell member="dragos-bobu">
    <p>Completează următorul șir din notițele camerei. Fiecare termen este suma celor două anterioare.</p>
    <div className="sequence-puzzle" aria-label="Șir numeric">2 → 3 → 5 → 8 → 13 → <strong>?</strong></div>
    <form className="challenge-form" onSubmit={submit}>
      <label htmlFor="dragos-sequence">Următorul termen</label>
      <input id="dragos-sequence" inputMode="numeric" value={answer}
        onChange={e => { setAnswer(e.target.value); setFeedback(''); }}
        placeholder="Număr" required />
      <button className="button" type="submit">Verifică șirul</button>
    </form>
    {feedback && <p className="error" role="alert">{feedback}</p>}
  </RoomShell>;
}
