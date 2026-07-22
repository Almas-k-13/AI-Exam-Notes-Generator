import express from "express";
import { generateQuiz, submitQuiz } from "../controllers/quiz.controller.js";
import authUser from "../middleware/isAuth.js";

const quizRouter = express.Router();

// Generate AI Quiz from Notes
quizRouter.post("/generate/:noteId", authUser, generateQuiz);
quizRouter.post("/submit", authUser, submitQuiz);

export default quizRouter;