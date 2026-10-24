import { useState } from 'react';
import { RoomShell } from '../../components/RoomShell';
import { useGame } from '../../game/GameContext';

// WORKSHOP: /rooms/andrei-lachovici. A small memory game themed to room objects.
const CARDS = [
  { pair: 'muzica', symbol: '🎧' }, { pair: 'stele', symbol: '🌙' },
  { pair: 'vinil', symbol: '💿' }, { pair: 'muzica', symbol: '🎧' },
  { pair: 'vinil', symbol: '💿' }, { pair: 'stele', symbol: '🌙' }
];

export default function AndreiLachoviciRoom() {
  const { win } = useGame();
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [locked, setLocked] = useState(false);
  function flip(index: number) {
    if (locked || flipped.includes(index) || matched.includes(index)) return;
    if (flipped.length === 0) { setFlipped([index]); return; }
    const first = flipped[0];
    if (CARDS[first].pair === CARDS[index].pair) {
      const next = [...matched, first, index];
      setMatched(next); setFlipped([]);
      if (next.length === CARDS.length) win('andrei-lachovici');
    } else {
      setFlipped([first, index]); setLocked(true);
      window.setTimeout(() => { setFlipped([]); setLocked(false); }, 750);
    }
  }
  return <RoomShell member="andrei-lachovici">
    <p>Găsește cele trei perechi de obiecte care apar în povestea acestei camere.</p>
    <div className="memory-grid">
      {CARDS.map((card, index) => <button type="button" key={index}
        className={matched.includes(index) ? 'memory-card matched' : 'memory-card'}
        aria-label={'Carte ' + (index + 1)}
        disabled={matched.includes(index)}
        onClick={() => flip(index)}>
        {flipped.includes(index) || matched.includes(index) ? card.symbol : '?'}
      </button>)}
    </div>
    <p className="muted">{matched.length / 2} / 3 perechi identificate</p>
  </RoomShell>;
}
