import { describe, expect, it } from 'vitest';
import { MEMBER_IDS, TRAP_PUZZLES, FINAL_QUESTIONS } from './data';
import { INITIAL_STATE, visitRoom, collectItem, winGame, canEnterTrap, solveTrapPuzzle, canEscapeTrap, escapeTrap, canOpenSecret, scoreFinal } from './logic';

describe('ASII Town game logic', () => {
  it('records visited room once', () => {
    const s = visitRoom(visitRoom(INITIAL_STATE, 'andrei-irimia'), 'andrei-irimia');
    expect(s.visitedRooms).toEqual(['andrei-irimia']);
  });
  it('prevents duplicate inventory entries', () => {
    const s = collectItem(collectItem(INITIAL_STATE, 'irimia-key'), 'irimia-key');
    expect(s.collectedItems).toEqual(['irimia-key']);
  });
  it('awards a game fragment only once', () => {
    const s = winGame(winGame(INITIAL_STATE, 'andrei-irimia'), 'andrei-irimia');
    expect(s.completedGames).toEqual(['andrei-irimia']);
    expect(s.collectedItems).toEqual(['fragment-andrei-irimia']);
  });
  it('requires all member mini-games before trap entry', () => {
    expect(canEnterTrap(INITIAL_STATE)).toBe(false);
    expect(canEnterTrap(MEMBER_IDS.reduce((s, m) => winGame(s, m), INITIAL_STATE))).toBe(true);
  });
  it('requires both correct code and selected fragment', () => {
    let s = winGame(INITIAL_STATE, 'andrei-lachovici');
    s = { ...s, trapEntered: true };
    expect(solveTrapPuzzle(s, 'trap-irimia', 'LUNA').trapSolved).toEqual([]);
    s = { ...s, selectedItem: 'fragment-andrei-lachovici' };
    expect(solveTrapPuzzle(s, 'trap-irimia', 'wrong').trapSolved).toEqual([]);
    expect(solveTrapPuzzle(s, 'trap-irimia', ' luna ').trapSolved).toEqual(['trap-irimia']);
  });
  it('blocks escape until every trap puzzle is solved', () => {
    const s = { ...INITIAL_STATE, trapEntered: true, trapSolved: ['trap-irimia'] };
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

describe('Five-member project contract', () => {
  it('has exactly five uniquely named personal rooms', () => {
    expect(MEMBER_IDS).toHaveLength(5);
    expect(new Set(MEMBER_IDS).size).toBe(5);
  });
  it('has at least five interactive objects in every personal room', async () => {
    const { ROOMS } = await import('./data');
    MEMBER_IDS.forEach(m => expect(ROOMS[m].objects.length).toBeGreaterThanOrEqual(5));
  });
  it('gives each member at least two final quiz objects and exactly ten questions', () => {
    expect(FINAL_QUESTIONS).toHaveLength(10);
    MEMBER_IDS.forEach(m => expect(FINAL_QUESTIONS.filter(q => q.owner === m).length).toBeGreaterThanOrEqual(2));
  });
  it('contains one cross-room trap puzzle for each teammate plus a shared puzzle', () => {
    expect(TRAP_PUZZLES).toHaveLength(MEMBER_IDS.length + 1);
    MEMBER_IDS.forEach(m => expect(TRAP_PUZZLES.filter(q => q.requiredItem === 'fragment-' + m)).toHaveLength(1));
  });
});
