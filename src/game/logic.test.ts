import { describe, expect, it } from 'vitest';
import { MEMBER_IDS, TRAP_PUZZLES, FINAL_QUESTIONS } from './data';
import { INITIAL_STATE, visitRoom, collectItem, winGame, canEnterTrap, solveTrapPuzzle, canEscapeTrap, escapeTrap, canOpenSecret, scoreFinal } from './logic';

describe('ASII Town game logic', () => {
  it('records visited room once', () => {
    const s = visitRoom(visitRoom(INITIAL_STATE, 'alex'), 'alex');
    expect(s.visitedRooms).toEqual(['alex']);
  });
  it('prevents duplicate inventory entries', () => {
    const s = collectItem(collectItem(INITIAL_STATE, 'alex-key'), 'alex-key');
    expect(s.collectedItems).toEqual(['alex-key']);
  });
  it('awards a game fragment only once', () => {
    const s = winGame(winGame(INITIAL_STATE, 'alex'), 'alex');
    expect(s.completedGames).toEqual(['alex']);
    expect(s.collectedItems).toEqual(['fragment-alex']);
  });
  it('requires all member mini-games before trap entry', () => {
    expect(canEnterTrap(INITIAL_STATE)).toBe(false);
    expect(canEnterTrap(MEMBER_IDS.reduce((s, m) => winGame(s, m), INITIAL_STATE))).toBe(true);
  });
  it('requires both correct code and selected fragment', () => {
    let s = winGame(INITIAL_STATE, 'mara');
    s = { ...s, trapEntered: true };
    expect(solveTrapPuzzle(s, 'trap-alex', 'LUNA').trapSolved).toEqual([]);
    s = { ...s, selectedItem: 'fragment-mara' };
    expect(solveTrapPuzzle(s, 'trap-alex', 'wrong').trapSolved).toEqual([]);
    expect(solveTrapPuzzle(s, 'trap-alex', ' luna ').trapSolved).toEqual(['trap-alex']);
  });
  it('blocks escape until every trap puzzle is solved', () => {
    const s = { ...INITIAL_STATE, trapEntered: true, trapSolved: ['trap-alex'] };
    expect(canEscapeTrap(s)).toBe(false);
    expect(escapeTrap(s).trapEscaped).toBe(false);
  });
  it('unlocks the secret room after completion and escape', () => {
    let s = MEMBER_IDS.reduce((acc, member) => winGame(acc, member), INITIAL_STATE);
    expect(canOpenSecret(s)).toBe(false);
    s = { ...s, trapEntered: true, trapSolved: TRAP_PUZZLES.map(p => p.id) };
    s = escapeTrap(s);
    expect(s.collectedItems).toContain('fragment-trap');
    expect(canOpenSecret(s)).toBe(true);
  });
  it('correctly scores the attribution quiz', () => {
    const answers = Object.fromEntries(FINAL_QUESTIONS.map(q => [q.id, q.owner]));
    expect(scoreFinal({ ...INITIAL_STATE, finalAnswers: answers })).toBe(FINAL_QUESTIONS.length);
    expect(scoreFinal(INITIAL_STATE)).toBe(0);
  });
});
