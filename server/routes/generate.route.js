import express from "express";
import isAuth from "../middleware/isAuth.js";
import { generateNotes } from "../controllers/generate.controller.js";
import {
  getMyNotes,
  getSingleNotes,
  toggleFavorite,
  deleteNote,
} from "../controllers/notes.controller.js";

const notesRouter = express.Router();

notesRouter.post("/generate-notes", isAuth, generateNotes);
notesRouter.get("/getnotes", isAuth, getMyNotes);
notesRouter.get("/:id", isAuth, getSingleNotes);
// ⭐ Toggle Favorite
notesRouter.patch("/favorite/:id", isAuth, toggleFavorite);

// 🗑 Delete Note
notesRouter.delete("/:id", isAuth, deleteNote);

export default notesRouter;
