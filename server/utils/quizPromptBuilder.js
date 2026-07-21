export const buildQuizPrompt = (notesContent) => {
  return `
You are an expert teacher and exam paper creator.

Your task is to create a quiz based ONLY on the study notes provided below.

========================
STUDY NOTES
========================

${notesContent}

========================
INSTRUCTIONS
========================

Generate EXACTLY 10 multiple choice questions.

Rules:

1. Each question must have exactly 4 options.
2. Only ONE option should be correct.
3. Questions should cover different parts of the notes.
4. Difficulty should be Medium.
5. Add a short explanation for the correct answer.
6. Do NOT ask duplicate questions.
7. Every question must belong to a topic.
8. Every question must represent ONE specific concept.
9. Mark the importance of each concept as High, Medium or Low.
10. Assign question IDs from 1 to 10.
11. Do NOT include markdown.
12. Do NOT wrap the response inside \`\`\`json.
13. Return ONLY valid JSON.

Response Format:

[
  {
    "id": 1,
    "question": "What is TCP?",
    "options": [
      "Programming Language",
      "Transport Protocol",
      "Database",
      "Operating System"
    ],
    "answer": 1,
    "explanation": "TCP is a transport layer protocol used for reliable communication.",
    "difficulty": "Medium",

    "topic": "Networking",

    "concept": "TCP",

    "importance": "High"
  }
]

IMPORTANT:

- Return ONLY JSON.
- Return EXACTLY 10 questions.
- IDs must start from 1.
- Do NOT write any introduction.
- Do NOT write any ending text.
- Do NOT use markdown.
`;
};