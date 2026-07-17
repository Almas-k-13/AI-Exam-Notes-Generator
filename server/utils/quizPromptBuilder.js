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
7. Do NOT include markdown.
8. Do NOT wrap the response inside \`\`\`json.
9. Return ONLY valid JSON.

Response Format:

[
  {
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
    "topic": "TCP"
  }
]

IMPORTANT:

- Return ONLY JSON.
- Do NOT write any introduction.
- Do NOT write any ending text.
- Do NOT use markdown.
`;
};