import Notes from "../models/notes.model.js";
import Quiz from "../models/quiz.model.js";
import { generateGeminiResponse } from "../services/gemini.services.js";
import { buildQuizPrompt } from "../utils/quizPromptBuilder.js";

export const generateQuiz = async (req, res) => {
  try {
    const { noteId } = req.params;

    // Validate Note ID
    if (!noteId) {
      return res.status(400).json({
        success: false,
        message: "Note ID is required.",
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
        message: "Note not found.",
      });
    }

    // Check if a pending quiz already exists
    const existingQuiz = await Quiz.findOne({
      user: req.userId,
      note: note._id,
      status: "pending",
    });

    if (existingQuiz) {
      return res.status(200).json({
        success: true,
        message: "Existing quiz found.",
        quizId: existingQuiz._id,
        noteId: note._id,
        topic: existingQuiz.topic,
        totalQuestions: existingQuiz.totalQuestions,
        quiz: existingQuiz.questions,
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
        message: "Invalid quiz response received from AI.",
      });
    }

    // Normalize Importance Values
    // quiz.forEach((q) => {
    //   if (typeof q.importance === "string") {
    //     q.importance =
    //       q.importance.charAt(0).toUpperCase() +
    //       q.importance.slice(1).toLowerCase();
    //   }
    // });

    // Validate Question Count
    if (quiz.length !== 10) {
      return res.status(500).json({
        success: false,
        message: "AI failed to generate exactly 10 questions.",
      });
    }

    // Validate Quiz Structure
    const isValidQuiz = quiz.every((q) => {
      return (
        typeof q.id === "number" &&
        typeof q.question === "string" &&
        Array.isArray(q.options) &&
        q.options.length === 4 &&
        typeof q.answer === "number" &&
        typeof q.explanation === "string" &&
        typeof q.difficulty === "string" &&
        typeof q.topic === "string" &&
        typeof q.concept === "string" &&
        ["High", "Medium", "Low"].includes(q.importance)
      );
    });

    if (!isValidQuiz) {
      return res.status(500).json({
        success: false,
        message: "AI returned an invalid quiz structure.",
      });
    }

    // Save Quiz
    const savedQuiz = await Quiz.create({
      user: req.userId,
      note: note._id,
      topic: note.topic,
      totalQuestions: quiz.length,
      questions: quiz,
    });

    return res.status(200).json({
      success: true,
      quizId: savedQuiz._id,
      noteId: note._id,
      topic: note.topic,
      totalQuestions: quiz.length,
      quiz,
    });
  } catch (error) {
    console.error("Quiz Generation Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate quiz.",
      error: error.message,
    });
  }
};


export const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    if (!quizId || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Quiz ID and answers are required.",
      });
    }

    const quiz = await Quiz.findOne({
      _id: quizId,
      user: req.userId,
    });

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found.",
      });
    }

    if (quiz.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Quiz already submitted.",
      });
    }

    let score = 0;

    const result = [];
    const weakConcepts = [];
    const strongConcepts = [];

    quiz.questions.forEach((question) => {
      const userAnswer = answers.find(
        (a) => a.questionId === question.id
      );

      const selected =
        userAnswer?.selected !== undefined
          ? userAnswer.selected
          : null;

      const isCorrect = selected === question.answer;

      if (isCorrect) {
        score++;

        strongConcepts.push({
          topic: question.topic,
          concept: question.concept,
          importance: question.importance,
        });
      } else {
        weakConcepts.push({
          topic: question.topic,
          concept: question.concept,
          importance: question.importance,
        });
      }

      result.push({
        questionId: question.id,
        question: question.question,
        selected,
        correctAnswer: question.answer,
        isCorrect,
        explanation: question.explanation,
        topic: question.topic,
        concept: question.concept,
        importance: question.importance,
      });
    });

    quiz.status = "completed";
    await quiz.save();

    return res.status(200).json({
      success: true,
      score,
      totalQuestions: quiz.questions.length,
      correctAnswers: score,
      wrongAnswers: quiz.questions.length - score,
      percentage: Number(
        ((score / quiz.questions.length) * 100).toFixed(2)
      ),
      weakConcepts,
      strongConcepts,
      result,
    });
  } catch (error) {
    console.error("Submit Quiz Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit quiz.",
      error: error.message,
    });
  }
};