import express from "express";
import { generateQuiz } from "../controllers/quiz.controller.js";
import authUser from "../middleware/isAuth.js";

const quizRouter = express.Router();

// Generate AI Quiz from Notes
quizRouter.post("/generate/:noteId", authUser, generateQuiz);

export default quizRouter;