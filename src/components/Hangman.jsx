import React from 'react';

/*
  Hangman is intentionally constructed with plain divs and CSS.
  We animate parts to subtly "fall" or appear as mistakes increase.
*/
export default function Hangman({ wrongCount, maxWrong }) {
  const percent = Math.min(1, wrongCount / maxWrong);
  const stages = [
    'base',
    'post',
    'beam',
    'rope',
    'head',
    'body',
    'left-arm',
    'right-arm',
    'left-leg',
    'right-leg',
  ];

  return (
    <div className="hangman-stage">
      <div className="gallows">
        <div className="g-base" />
        <div className="g-post" />
        <div className="g-beam" />
        {/* Rope is the anchor point */}
        <div className="g-rope" />
      </div>

      {/* Figure is absolutely positioned relative to .hangman-stage */}
      <div className="figure" aria-hidden>
        {stages.map((s, i) => {
          const show = i < Math.round(percent * stages.length);
          return <div key={s} className={`part ${s} ${show ? 'show' : 'hidden'}`} />;
        })}
      </div>

      <div className="meter">
        <div className="meter-bar" style={{ width: `${percent * 100}%` }} />
      </div>
    </div>
  );
}
