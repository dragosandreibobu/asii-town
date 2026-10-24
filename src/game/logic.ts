import { FINAL_QUESTIONS, MEMBER_IDS, TRAP_PUZZLES, type MemberId } from './data';

export type GameState = {
  visitedRooms: MemberId[];
  completedGames: MemberId[];
  collectedItems: string[];
  selectedItem: string | null;
  trapEntered: boolean;
  trapSolved: string[];
  trapEscaped: boolean;
  hintUses: number;
  night: boolean;
  timerDeadline: number | null;
  finalAnswers: Record<string, MemberId>;
};

export const INITIAL_STATE: GameState = {
  visitedRooms: [],
  completedGames: [],
  collectedItems: [],
  selectedItem: null,
  trapEntered: false,
  trapSolved: [],
  trapEscaped: false,
  hintUses: 0,
  night: false,
  timerDeadline: null,
  finalAnswers: {}
};

function unique<T>(items: T[], value: T): T[] {
  return items.includes(value) ? items : [...items, value];
}

export function visitRoom(state: GameState, room: MemberId): GameState {
  return { ...state, visitedRooms: unique(state.visitedRooms, room) };
}
export function collectItem(state: GameState, id: string): GameState {
  return { ...state, collectedItems: unique(state.collectedItems, id) };
}
export function winGame(state: GameState, room: MemberId): GameState {
  return {
    ...state,
    completedGames: unique(state.completedGames, room),
    collectedItems: unique(state.collectedItems, 'fragment-' + room)
  };
}
export function canEnterTrap(state: GameState): boolean {
  // Safety gate: prevent soft-lock when a puzzle requires an unobtainable fragment.
  return MEMBER_IDS.every(id => state.completedGames.includes(id));
}
export function canSolveTrapPuzzle(state: GameState, puzzleId: string, answer: string): boolean {
  const puzzle = TRAP_PUZZLES.find(p => p.id === puzzleId);
  return !!puzzle && answer.trim().toLocaleUpperCase('ro-RO') === puzzle.answer &&
    (!puzzle.requiredItem || (state.collectedItems.includes(puzzle.requiredItem) && state.selectedItem === puzzle.requiredItem));
}
export function solveTrapPuzzle(state: GameState, puzzleId: string, answer: string): GameState {
  return canSolveTrapPuzzle(state, puzzleId, answer)
    ? { ...state, trapSolved: unique(state.trapSolved, puzzleId) }
    : state;
}
export function canEscapeTrap(state: GameState): boolean {
  return state.trapEntered && TRAP_PUZZLES.every(p => state.trapSolved.includes(p.id));
}
export function escapeTrap(state: GameState): GameState {
  return canEscapeTrap(state)
    ? { ...state, trapEscaped: true, collectedItems: unique(state.collectedItems, 'fragment-trap') }
    : state;
}
export function canOpenSecret(state: GameState): boolean {
  return MEMBER_IDS.every(id => state.completedGames.includes(id)) &&
    state.trapEscaped && state.collectedItems.includes('fragment-trap');
}
export function scoreFinal(state: GameState): number {
  return FINAL_QUESTIONS.filter(q => state.finalAnswers[q.id] === q.owner).length;
}
