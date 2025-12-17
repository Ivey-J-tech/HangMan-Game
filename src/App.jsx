import React, { useMemo, useState, useEffect, useCallback } from 'react';
import TOPICS from './data/words';
import { pickRandomFromTopic, maskedAnswer } from './utils/gameHelpers';
import Header from './components/Header';
import TopicSelector from './components/TopicSelector';
import QuestionCard from './components/QuestionCard';
import Keyboard from './components/Keyboard';
import Hangman from './components/Hangman';
import HelpModal from './components/HelpModal';
import Footer from './components/Footer';

const MAX_WRONG = 7;

export default function App() {
  const [topics] = useState(TOPICS);
  const [selectedTopicId, setSelectedTopicId] = useState(topics[0].id);
  const selectedTopic = useMemo(
    () => topics.find(t => t.id === selectedTopicId),
    [topics, selectedTopicId]
  );

  // current question (question + answer)
  const [current, setCurrent] = useState(() => pickRandomFromTopic(selectedTopic));

  // guessed letters as a Set for O(1) checks
  const [guessed, setGuessed] = useState(() => new Set());
  const [wrongGuessed, setWrongGuessed] = useState(() => new Set());
  const [wrongCount, setWrongCount] = useState(0);

  const [gameStatus, setGameStatus] = useState('playing'); // playing | won | lost
  const [showHelp, setShowHelp] = useState(false);

  // When topic changes, pick a new random question and reset game
  useEffect(() => {
    const q = pickRandomFromTopic(selectedTopic);
    setCurrent(q);
    resetGameState(q.answer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTopicId]);

  const resetGameState = useCallback(
    (answer = current.answer) => {
      setGuessed(new Set());
      setWrongGuessed(new Set());
      setWrongCount(0);
      setGameStatus('playing');
      // choose a fresh current if caller didn't pass answer
      if (!answer) {
        setCurrent(pickRandomFromTopic(selectedTopic));
      }
    },
    [selectedTopic, current]
  );

  // When guessed changes, check win/lose
  useEffect(() => {
    const answer = current.answer.toUpperCase();
    const allRevealed = answer.split('').every(c => c === ' ' || guessed.has(c));
    if (allRevealed) setGameStatus('won');
  }, [guessed, current]);

  useEffect(() => {
    if (wrongCount >= MAX_WRONG) setGameStatus('lost');
  }, [wrongCount]);

  const handleGuess = letter => {
    if (gameStatus !== 'playing') return;
    const upper = letter.toUpperCase();
    if (guessed.has(upper)) return;
    setGuessed(prev => new Set(prev).add(upper));
    if (!current.answer.toUpperCase().includes(upper)) {
      setWrongGuessed(prev => new Set(prev).add(upper));
      setWrongCount(c => c + 1);
    }
  };

  const handleRestart = () => {
    const q = pickRandomFromTopic(selectedTopic);
    setCurrent(q);
    resetGameState(q.answer);
  };

  const displayMasked = maskedAnswer(current.answer.toUpperCase(), guessed);

  return (
    <main className="app">
      <div className="left">
        <div className="card">
          <Header />
        </div>

        <div className="card">
          <TopicSelector
            topics={topics}
            selectedId={selectedTopicId}
            onSelect={setSelectedTopicId}
          />
        </div>

        <div className="card">
          <QuestionCard
            question={current.question}
            answer={current.answer.toUpperCase()}
            guessed={guessed}
          />

          <div className="controls" style={{ marginTop: 12 }}>
            <div className="status">
              {gameStatus === 'playing' && <span>Keep guessing</span>}
              {gameStatus === 'won' && <span style={{ color: 'var(--accent)' }}>You won! 🎉</span>}
              {gameStatus === 'lost' && <span style={{ color: 'var(--danger)' }}>You lost</span>}
            </div>

            <button className="btn secondary" onClick={() => setShowHelp(true)}>
              Help
            </button>

            <button className="btn" onClick={handleRestart}>
              Restart
            </button>
          </div>

          <div style={{ marginTop: 14 }}>
            <Keyboard
              guessed={guessed}
              wrongGuessed={wrongGuessed}
              onGuess={handleGuess}
              disabled={gameStatus !== 'playing'}
            />
          </div>
        </div>

        <div className="card" style={{ textAlign: 'left' }}>
          <h3>Answer preview</h3>
          <p style={{ color: 'var(--muted)', marginTop: 8 }}>{displayMasked}</p>
        </div>

        <Footer />
      </div>

      <div className="right">
        <div className="card">
          <h3>Hangman</h3>
          <Hangman wrongCount={wrongCount} maxWrong={MAX_WRONG} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
            <div style={{ color: 'var(--muted)' }}>
              Wrong guesses: {wrongCount} / {MAX_WRONG}
            </div>
            <div
              style={{
                color:
                  gameStatus === 'won'
                    ? 'var(--accent)'
                    : gameStatus === 'lost'
                      ? 'var(--danger)'
                      : 'var(--muted)',
              }}
            >
              {gameStatus === 'won'
                ? 'You saved them!'
                : gameStatus === 'lost'
                  ? `Answer: ${current.answer.toUpperCase()}`
                  : 'Game in progress'}
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Tips</h3>
          <ul>
            <li>Start with common vowels: A, E, I, O, U</li>
            <li>Short words are easier — scan the masked answer</li>
            <li>Use the topic to inform likely letters</li>
          </ul>
        </div>
      </div>

      <HelpModal open={showHelp} onClose={() => setShowHelp(false)} />
    </main>
  );
}
