import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../game/GameContext';
import { FINAL_QUESTIONS, MEMBER_IDS, ROOMS, TEAM_PROFILE } from '../game/data';
import { canOpenSecret, scoreFinal } from '../game/logic';

export default function SecretRoom() {
  const { state, setAnswer } = useGame();
  const [submitted, setSubmitted] = useState(false);
  if (!canOpenSecret(state)) return <div className="page">
    <div className="eyebrow">PROVOCAREA FINALĂ</div><h1>🔒 Camera Secretă</h1>
    <p className="lead">Se deschide după câștigarea tuturor mini-jocurilor și evadarea din Casa Capcană.</p>
    <Link className="button" to="/">← Înapoi în oraș</Link>
  </div>;

  const allAnswered = FINAL_QUESTIONS.every(q => state.finalAnswers[q.id]);
  return <div className="page">
    <div className="eyebrow">CAMERA SECRETĂ · TEST FINAL</div>
    <h1>Cine deține indiciul?</h1>
    <p className="lead">Zece obiecte sau replici, cinci colegi. Folosește ceea ce ai descoperit în camere pentru a alege corect.</p>
    <div className="final-grid">
      {FINAL_QUESTIONS.map((q, i) => <fieldset className="final-question" key={q.id} disabled={submitted}>
        <legend><span className="question-number">0{i + 1}</span> {q.clue}</legend>
        <div className="answer-options">
          {MEMBER_IDS.map(member => <label key={member} className={state.finalAnswers[q.id] === member ? 'answer-option selected' : 'answer-option'}>
            <input type="radio" name={q.id} checked={state.finalAnswers[q.id] === member} onChange={() => setAnswer(q.id, member)} />
            {ROOMS[member].name}
          </label>)}
        </div>
        {submitted && <p className={state.finalAnswers[q.id] === q.owner ? 'result-correct' : 'result-incorrect'}>
          {state.finalAnswers[q.id] === q.owner ? '✓ Corect.' : '✗ Răspuns corect: ' + ROOMS[q.owner].name + '.'} {q.explanation}
        </p>}
      </fieldset>)}
    </div>
    {!submitted
      ? <button className="button big" type="button" disabled={!allAnswered} onClick={() => setSubmitted(true)}>Trimite răspunsurile</button>
      : <section className="final-result">
        <div className="eyebrow">REZULTATUL FINAL</div>
        <div className="final-score">{scoreFinal(state)}<span> / {FINAL_QUESTIONS.length}</span></div>
        <h2>Profilul echipei</h2><p>{TEAM_PROFILE}</p>
        <button className="button outline" onClick={() => setSubmitted(false)}>Revizuiește răspunsurile</button>
        <Link className="button" to="/">Revino în oraș →</Link>
      </section>}
  </div>;
}
