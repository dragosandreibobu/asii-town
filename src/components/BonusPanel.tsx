import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../game/GameContext';
import { canOpenSecret } from '../game/logic';

// Bonus features: opt-in 20-minute challenge and opt-in generated audio.
// Uses Web Audio only after a click, avoiding autoplay policy violations.
export function BonusPanel() {
  const { state, startTimer, reset } = useGame();
  const navigate = useNavigate();
  const [now, setNow] = useState(() => Date.now());
  const [musicOn, setMusicOn] = useState(false);
  const [audioUnsupported, setAudioUnsupported] = useState(false);
  const audio = useRef<{ context: AudioContext; interval: number } | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  function playTone(context: AudioContext, frequency: number, duration = 0.22) {
    if (context.state !== 'running') return;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const started = context.currentTime;
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.001, started);
    gain.gain.exponentialRampToValueAtTime(0.022, started + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, started + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(started);
    oscillator.stop(started + duration + 0.01);
    oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
  }

  function stopMusic() {
    if (!audio.current) return;
    window.clearInterval(audio.current.interval);
    void audio.current.context.close();
    audio.current = null;
    setMusicOn(false);
  }

  function toggleMusic() {
    if (audio.current) { stopMusic(); return; }
    if (!window.AudioContext) { setAudioUnsupported(true); return; }

    const context = new AudioContext();
    void context.resume();
    const melody = [261.63, 329.63, 392, 329.63, 293.66, 349.23, 440, 349.23];
    let step = 0;
    playTone(context, melody[step++ % melody.length]);
    const interval = window.setInterval(() => {
      playTone(context, melody[step++ % melody.length]);
    }, 750);
    audio.current = { context, interval };
    setMusicOn(true);
  }

  useEffect(() => {
    const onWin = () => {
      if (!audio.current) return;
      const ctx = audio.current.context;
      playTone(ctx, 523.25, 0.16);
      window.setTimeout(() => { if (audio.current?.context === ctx) playTone(ctx, 659.26, 0.24); }, 120);
    };
    window.addEventListener('asii-town-win', onWin);
    return () => {
      window.removeEventListener('asii-town-win', onWin);
      if (audio.current) {
        window.clearInterval(audio.current.interval);
        void audio.current.context.close();
        audio.current = null;
      }
    };
  }, []);

  const remaining = state.timerDeadline === null
    ? 20 * 60
    : Math.max(0, Math.ceil((state.timerDeadline - now) / 1000));
  const unlocked = canOpenSecret(state);
  const gameOver = state.timerDeadline !== null && remaining === 0 && !unlocked;
  const clock = Math.floor(remaining / 60).toString().padStart(2, '0') +
    ':' + (remaining % 60).toString().padStart(2, '0');

  return <>
    <section className="panel bonus-panel">
      <h2>✧ Bonusuri</h2>
      <div className="bonus-actions">
        <div>
          <div className="muted tiny">Provocare opțională: deblochează Camera Secretă în 20 de minute.</div>
          <div className="bonus-clock" aria-live="off">{unlocked && state.timerDeadline ? '✓ Deblocată' : clock}</div>
          {state.timerDeadline === null && !unlocked
            ? <button className="button outline" type="button" onClick={startTimer}>Pornește cronometrul</button>
            : <div className="muted tiny">{unlocked ? 'Obiectiv îndeplinit.' : gameOver ? 'Timpul s-a terminat.' : 'Timpul curge și după reîncărcarea paginii.'}</div>}
        </div>
        <button className="button outline" type="button" aria-pressed={musicOn} onClick={toggleMusic}>
          {musicOn ? '♫ Oprește muzica' : '♫ Pornește muzica'}
        </button>
        {audioUnsupported && <p className="error">Browserul nu acceptă Web Audio.</p>}
        <p className="muted tiny">Muzică generată local și semnal sonor de victorie; poți opri oricând sunetul.</p>
      </div>
    </section>
    {gameOver && <div className="modal-backdrop" role="presentation">
      <section className="modal gameover-modal" role="alertdialog" aria-modal="true" aria-labelledby="gameover-heading">
        <h2 id="gameover-heading">Game Over</h2>
        <p>Au trecut cele 20 de minute. Camera Secretă nu a fost deblocată.</p>
        <button className="button" onClick={() => { reset(); setNow(Date.now()); navigate('/'); }}>
          Reîncepe jocul
        </button>
      </section>
    </div>}
  </>;
}
