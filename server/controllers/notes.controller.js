import Notes from "../models/notes.model.js";
import User from "../models/user.model.js";

export const getMyNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.userId })
      .select(
        "topic classLevel examType revisionMode includeDiagram includeChart favorite createdAt",
      )
      .sort({ createdAt: -1 });

    return res.status(200).json(notes);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `getCurrentUser notes error ${error}` });
  }
};

export const getSingleNotes = async (req, res) => {
  try {
    const notes = await Notes.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!notes) {
      return res.status(404).json({ error: "Notes not found" });
    }

    return res.json({
      content: notes.content,
      topic: notes.topic,
      createdAt: notes.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ message: `getSingleNotes error ${error}` });
  }
};

// ⭐ Toggle Favorite
export const toggleFavorite = async (req, res) => {
  try {
    const note = await Notes.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    note.favorite = !note.favorite;

    await note.save();

    return res.status(200).json({
      success: true,
      favorite: note.favorite,
      message: note.favorite ? "Added to favorites" : "Removed from favorites",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🗑 Delete Note
export const deleteNote = async (req, res) => {
  try {
    const note = await Notes.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    await User.findByIdAndUpdate(req.userId, {
      $pull: {
        notes: note._id,
      },
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
