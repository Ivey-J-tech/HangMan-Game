import React from 'react';

export default function TopicSelector({ topics, selectedId, onSelect }) {
  return (
    <div className="topic-selector">
      <h3>Choose a topic</h3>
      <div className="topics-grid">
        {topics.map(t => (
          <button
            key={t.id}
            type="button"
            className={`topic-button ${selectedId === t.id ? 'active' : ''}`}
            onClick={() => onSelect(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
