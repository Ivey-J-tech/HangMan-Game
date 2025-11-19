import React from 'react';

export default function HelpModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <h2>How to play</h2>
        <ul>
          <li>Select one of the four topics.</li>
          <li>A question will appear. Use the on-screen keyboard to guess letters.</li>
          <li>Each wrong guess adds a part to the hangman. Too many wrong guesses and you lose.</li>
          <li>Reveal the whole word before the hangman is complete to win.</li>
          <li>Click Restart to play again with a new random question.</li>
        </ul>
        <div className="modal-actions">
          <button className="btn" onClick={onClose}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
