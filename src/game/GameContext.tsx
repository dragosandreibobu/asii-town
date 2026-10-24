import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { type MemberId } from './data';
import {
  INITIAL_STATE, type GameState, visitRoom, winGame, collectItem,
  solveTrapPuzzle, escapeTrap, canEnterTrap, canEscapeTrap
} from './logic';

type GameAPI = {
  state: GameState;
  visit: (id: MemberId) => void;
  win: (id: MemberId) => void;
  collect: (id: string) => void;
  selectItem: (id: string | null) => void;
  enterTrap: () => void;
  solve: (id: string, answer: string) => boolean;
  escape: () => void;
  hint: () => boolean;
  setAnswer: (id: string, member: MemberId) => void;
  toggleNight: () => void;
  reset: () => void;
};
const GameContext = createContext<GameAPI | null>(null);
const STORAGE = 'asii-town-progress-v1';

function load(): GameState {
  try {
    const saved = localStorage.getItem(STORAGE);
    if (!saved) return INITIAL_STATE;
    const parsed: Partial<GameState> = JSON.parse(saved);
    return { ...INITIAL_STATE, ...parsed };
  } catch {
    return INITIAL_STATE;
  }
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(load);
  useEffect(() => { localStorage.setItem(STORAGE, JSON.stringify(state)); }, [state]);

  const api: GameAPI = {
    state,
    visit: id => setState(s => visitRoom(s, id)),
    win: id => setState(s => winGame(s, id)),
    collect: id => setState(s => collectItem(s, id)),
    selectItem: id => setState(s => ({ ...s, selectedItem: id })),
    enterTrap: () => setState(s => canEnterTrap(s) ? { ...s, trapEntered: true } : s),
    solve: (id, answer) => {
      const next = solveTrapPuzzle(state, id, answer);
      if (next === state) return false;
      setState(next);
      return true;
    },
    escape: () => setState(s => canEscapeTrap(s) ? escapeTrap(s) : s),
    hint: () => {
      if (state.hintUses >= 3) return false;
      setState(s => s.hintUses >= 3 ? s : { ...s, hintUses: s.hintUses + 1 });
      return true;
    },
    setAnswer: (id, member) => setState(s => ({ ...s, finalAnswers: { ...s.finalAnswers, [id]: member } })),
    toggleNight: () => setState(s => ({ ...s, night: !s.night })),
    reset: () => setState(INITIAL_STATE)
  };
  return <GameContext.Provider value={api}>{children}</GameContext.Provider>;
}

export function useGame(): GameAPI {
  const value = useContext(GameContext);
  if (!value) throw new Error('useGame requires GameProvider');
  return value;
}
