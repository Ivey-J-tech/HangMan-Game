// Four topics with questions. Each entry has: question (prompt), answer (single word)
const TOPICS = [
  {
    id: 'animals',
    label: 'Animals',
    items: [
      { question: 'What is the fastest land animal', answer: 'CHEETAH' },
      { question: 'Large mammal known for its trunk', answer: 'ELEPHANT' },
      { question: 'Small animal that purrs', answer: 'CAT' },
      { question: 'Black and white marine bird', answer: 'PENGUIN' },
    ],
  },
  {
    id: 'tech',
    label: 'Technology',
    items: [
      { question: 'Popular scripting language for the web', answer: 'JAVASCRIPT' },
      { question: 'Company that makes the iPhone', answer: 'APPLE' },
      { question: 'Open source operating system', answer: 'LINUX' },
      { question: 'Protocol for the web', answer: 'HTTP' },
    ],
  },
  {
    id: 'geography',
    label: 'Geography',
    items: [
      { question: 'Largest continent by land area', answer: 'ASIA' },
      { question: 'Capital of France', answer: 'PARIS' },
      { question: 'Longest river in the world', answer: 'NILE' },
      { question: 'Country famous for the samba and carnival', answer: 'BRAZIL' },
    ],
  },
  {
    id: 'science',
    label: 'Science',
    items: [
      { question: 'Force that keeps us on the ground', answer: 'GRAVITY' },
      { question: 'Center of an atom', answer: 'NUCLEUS' },
      { question: 'Gas essential for respiration', answer: 'OXYGEN' },
      { question: 'Study of living organisms', answer: 'BIOLOGY' },
    ],
  },
];

export default TOPICS;
