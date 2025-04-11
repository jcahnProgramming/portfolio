// src/components/KonamiListener.tsx
import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import winSound from '../assets/sfx/affirmation.mp3';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export default function KonamiListener() {
  useEffect(() => {
    let inputSequence: string[] = [];

    const audio = new Audio(winSound);
    audio.volume = 0.5;

    const handleKeyDown = (e: KeyboardEvent) => {
      inputSequence.push(e.key);

      if (inputSequence.length > KONAMI_CODE.length) {
        inputSequence.shift(); // keep the sequence size fixed
      }

      if (inputSequence.join('') === KONAMI_CODE.join('')) {
        alert('Secret Mode Activated');
        audio.play();

        // Confetti burst from center
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.5 },
        });

        inputSequence = []; // reset
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return null;
}
