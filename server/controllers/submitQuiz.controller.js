import Quiz from "../models/quiz.model.js";

export const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    // Validate Request
    if (!quizId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Quiz ID and answers are required.",
      });
    }

    // Find Quiz
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

    // Prevent Multiple Submission
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
      const userAnswer = answers.find((a) => a.questionId === question.id);

      const selected =
        userAnswer?.selected !== undefined ? userAnswer.selected : null;

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

    // Update Quiz
    quiz.status = "completed";

    await quiz.save();

    return res.status(200).json({
      success: true,

      score,

      totalQuestions: quiz.questions.length,

      correctAnswers: score,

      wrongAnswers: quiz.questions.length - score,

      percentage: Number(((score / quiz.questions.length) * 100).toFixed(2)),

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
