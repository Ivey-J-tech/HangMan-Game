import React from 'react';
import { ALPHABET } from '../utils/gameHelpers';

export default function Keyboard({ guessed, onGuess, disabled, wrongGuessed }) {
  return (
    <div className="keyboard">
      <div className="keyboard-grid">
        {ALPHABET.map(letter => {
          const isGuessed = guessed.has(letter);
          const isWrong = wrongGuessed.has(letter);
          return (
            <button
              key={letter}
              type="button"
              className={`key ${isGuessed ? 'guessed' : ''} ${isWrong ? 'wrong' : ''}`}
              onClick={() => onGuess(letter)}
              disabled={disabled || isGuessed}
              aria-pressed={isGuessed}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
