import { useGame } from '../game/GameContext';
import { MEMBER_IDS, ROOMS } from '../game/data';

function label(id: string): string {
  if (id === 'fragment-trap') return 'Fragmentul final';
  const member = MEMBER_IDS.find(m => id === 'fragment-' + m);
  if (member) return ROOMS[member].reward;
  for (const m of MEMBER_IDS) {
    const item = ROOMS[m].objects.find(x => x.id === id);
    if (item) return item.label + ' (' + ROOMS[m].name + ')';
  }
  return id;
}

export function Inventory() {
  const { state, selectItem } = useGame();
  return <section className="panel">
    <h2>🎒 Inventar</h2>
    <p className="muted tiny">Selectează un fragment înainte de a-l folosi în Casa Capcană.</p>
    {state.collectedItems.length === 0
      ? <p className="muted">Nu ai colectat nimic încă.</p>
      : <div className="inventory-items">
        {state.collectedItems.map(id => <button key={id}
          className={state.selectedItem === id ? 'inventory-item selected' : 'inventory-item'}
          aria-pressed={state.selectedItem === id}
          onClick={() => selectItem(state.selectedItem === id ? null : id)}>
          {id.startsWith('fragment') ? '◆' : '✦'} {label(id)}
        </button>)}
      </div>}
  </section>;
}
