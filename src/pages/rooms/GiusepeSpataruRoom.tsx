import { useState } from 'react';
import { RoomShell } from '../../components/RoomShell';
import { useGame } from '../../game/GameContext';

const EVENTS = {
  sketch: '1. Construirea proiectului pe hârtie',
  test: '2. Testarea prototipului',
  launch: '3. Lansarea vehiculului'
} as const;
type EventId = keyof typeof EVENTS;
const CORRECT: EventId[] = ['sketch', 'test', 'launch'];

// WORKSHOP: /rooms/giusepe-spataru. Reorder the milestones with accessible buttons.
export default function GiusepeSpataruRoom() {
  const { win } = useGame();
  const [order, setOrder] = useState<EventId[]>(['launch', 'sketch', 'test']);
  const [feedback, setFeedback] = useState('');
  function move(index: number, direction: number) {
    const target = index + direction;
    if (target < 0 || target >= order.length) return;
    const next = [...order];
    [next[index], next[target]] = [next[target], next[index]];
    setOrder(next);
    setFeedback('');
  }
  return <RoomShell member="giusepe-spataru">
    <p>O misiune spațială reușită urmează pașii în ordinea corectă. Mută etapele folosind săgețile.</p>
    <ol className="timeline">
      {order.map((id, i) => <li key={id}>
        <span>{EVENTS[id]}</span>
        <div><button type="button" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Mută mai sus">↑</button>
          <button type="button" disabled={i === order.length - 1} onClick={() => move(i, 1)} aria-label="Mută mai jos">↓</button></div>
      </li>)}
    </ol>
    <button className="button" type="button" onClick={() => {
      if (order.every((id, i) => id === CORRECT[i])) win('giusepe-spataru');
      else setFeedback('Ordinea nu este corectă. Încearcă din nou.');
    }}>Verifică ordinea</button>
    {feedback && <p role="alert" className="error">{feedback}</p>}
  </RoomShell>;
}
