export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function pickRandomFromTopic(topic) {
  const list = topic.items;
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

export function maskedAnswer(answer, guessed) {
  return answer
    .split('')
    .map(c => (c === ' ' ? ' ' : guessed.has(c) ? c : '_'))
    .join(' ');
}
