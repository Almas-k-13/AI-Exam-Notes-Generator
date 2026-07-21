import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => value.length === 4,
        message: "Each question must have exactly 4 options.",
      },
    },

    answer: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
    },

    explanation: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },

    topic: {
      type: String,
      required: true,
    },

    concept: {
      type: String,
      required: true,
    },

    importance: {
      type: String,
      enum: ["High", "Medium", "Low"],
      required: true,
    },
  },
  { _id: false },
);

const quizSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    note: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notes",
      required: true,
    },

    topic: {
      type: String,
      required: true,
    },

    totalQuestions: {
      type: Number,
      default: 10,
    },

    questions: {
      type: [questionSchema],
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
