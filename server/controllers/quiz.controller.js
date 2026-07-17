import Notes from "../models/notes.model.js";
import { generateGeminiResponse } from "../services/gemini.services.js";
import { buildQuizPrompt } from "../utils/quizPromptBuilder.js";

export const generateQuiz = async (req, res) => {
  try {
    const { noteId } = req.params;

    // Validate Note ID
    if (!noteId) {
      return res.status(400).json({
        success: false,
        message: "Note ID is required",
      });
    }

    // Find Note (Only Owner)
    const note = await Notes.findOne({
      _id: noteId,
      user: req.userId,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    // Build Gemini Prompt
    const prompt = buildQuizPrompt(note.content);

    // Generate Quiz
    const quiz = await generateGeminiResponse(prompt);

    // Validate AI Response
    if (!Array.isArray(quiz)) {
      return res.status(500).json({
        success: false,
        message: "Invalid quiz response from AI",
      });
    }

    return res.status(200).json({
      success: true,
      noteId: note._id,
      topic: note.topic,
      totalQuestions: quiz.length,
      quiz,
    });

  } catch (error) {
    console.error("Quiz Generation Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate quiz",
      error: error.message,
    });
  }
};