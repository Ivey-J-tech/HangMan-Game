# Hangman Capstone

A clean, reviewer-friendly Hangman game built with React.

## Overview

- Choose a topic (Animals, Technology, Geography, Science).
- A question appears along with masked answer blocks.
- Use the on-screen keyboard to guess letters.
- Each wrong guess builds the hangman; after too many wrong guesses you lose.
- Restart anytime for a new random question.

## Features

- Built with Vite + React
- Modular components (TopicSelector, QuestionCard, Keyboard, Hangman, HelpModal)
- Keyboard and topic buttons are rendered with array.map and unique keys
- State is held in App and synced across components
- Attractive UI with motion via CSS transitions and animations
- Readily extensible word/topic data in `src/data/words.js`

## Inspiration

I drew inspiration from the Geeks for Geeks tutorials on building a HangMan project
