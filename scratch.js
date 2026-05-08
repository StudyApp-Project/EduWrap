const combinedText = `Artificial intelligence is a branch of computer science that aims to create intelligent machines. Machine learning allows computers to learn without being explicitly programmed. Photosynthesis is the process by which green plants make their own food using sunlight. The mitochondrion is often referred to as the powerhouse of the cell because it generates most of the cell's supply of adenosine triphosphate. Gravity is a fundamental force of nature that attracts a body toward the center of the earth, or toward any other physical body having mass. React is a declarative, efficient, and flexible JavaScript library for building user interfaces. Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. State is a React object that is used to contain data or information about the component. Props are arguments passed into React components. A Hook is a special function that lets you "hook into" React features. Spaced repetition is an evidence-based learning technique that is usually performed with flashcards. Active recall involves actively stimulating your memory for a piece of information. The atomic number of an element is the number of protons in the nucleus of an atom. Water is a polar molecule, which means it has a slight positive charge on one side and a slight negative charge on the other. DNA carries the genetic instructions used in the growth, development, functioning, and reproduction of all living organisms. Newton's first law of motion states that an object will remain at rest unless acted upon by an external force. Energy cannot be created or destroyed, only transformed from one form to another. The human brain contains approximately eighty-six billion neurons. Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. The blockchain is a growing list of records, called blocks, that are linked together using cryptography.`;

const allSentences = combinedText
  .replace(/\\n/g, ' ')
  .split(/[.?!](?=\\s|$)/)
  .map(s => s.trim())
  .filter(s => s.length > 40 && s.length < 200 && !s.includes('http'));

console.log("Found sentences:", allSentences.length);
if (allSentences.length > 0) {
  console.log("First:", allSentences[0]);
} else {
  console.log("Empty! Let's check lengths.");
  const split = combinedText.split(/[.?!](?=\\s|$)/).map(s => s.trim());
  console.log(split.map(s => s.length));
}
