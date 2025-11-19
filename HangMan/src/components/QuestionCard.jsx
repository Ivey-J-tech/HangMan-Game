import React from 'react';
import { maskedAnswer } from '../utils/gameHelpers';

export default function QuestionCard({ question, answer, guessed }) {
  const display = maskedAnswer(answer, guessed);
  return (
    <div className="question-card">
      <div className="question-text">{question}?</div>
      <div className="answer-mask" aria-label="current answer">
        {display}
      </div>
    </div>
  );
}
