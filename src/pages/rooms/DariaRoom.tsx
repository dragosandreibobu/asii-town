import { useState } from 'react';
import { RoomShell } from '../../components/RoomShell';
import { useGame } from '../../game/GameContext';

const QUESTIONS = [
  { question: 'Ce instrument folosești pentru a surprinde o imagine reală?', answers: ['Aparat foto', 'Telescop', 'Microfon'], correct: 0 },
  { question: 'Ce unitate elementară compune o imagine digitală?', answers: ['Frame', 'Pixel', 'Strat'], correct: 1 },
  { question: 'Unde se pot nota rapid idei pentru ilustrații?', answers: ['Pe un caiet de schițe', 'Pe un disc vinil', 'Pe o planetă'], correct: 0 }
];

// WORKSHOP: /rooms/daria. Independent multiple-choice game.
export default function DariaRoom() {
  const { win } = useGame();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [feedback, setFeedback] = useState('');
  function check() {
    if (QUESTIONS.every((q, index) => answers[index] === q.correct)) win('daria');
    else setFeedback('Unele răspunsuri sunt incorecte. Inspectează obiectele din studio.');
  }
  return <RoomShell member="daria">
    <p>Răspunde la trei întrebări despre instrumentele folosite în studioul creativ.</p>
    {QUESTIONS.map((q, i) => <fieldset className="quiz-field" key={q.question}>
      <legend>{i + 1}. {q.question}</legend>
      {q.answers.map((answer, j) => <label key={answer}>
        <input type="radio" name={'daria-' + i} checked={answers[i] === j}
          onChange={() => { setAnswers(a => ({ ...a, [i]: j })); setFeedback(''); }} /> {answer}
      </label>)}
    </fieldset>)}
    <button className="button" disabled={Object.keys(answers).length !== QUESTIONS.length} onClick={check}>Verifică răspunsurile</button>
    {feedback && <p role="alert" className="error">{feedback}</p>}
  </RoomShell>;
}
