import React from "react";
import { motion } from "motion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, CheckCircle2, XCircle } from "lucide-react";

function QuizResult() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1120] text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">No Quiz Result Found</h2>

          <button
            onClick={() => navigate("/history")}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition"
          >
            Back To History
          </button>
        </div>
      </div>
    );
  }

  const {
    score,
    percentage,
    correctAnswers,
    wrongAnswers,
    totalQuestions,
    strongConcepts,
    weakConcepts,
    result,
  } = state;

  return (
    <div className="min-h-screen bg-[#0b1120] text-white">
      {/* Header */}

      <div className="border-b border-white/10 bg-[#111827]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <button
            onClick={() => navigate("/history")}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <h1 className="text-2xl font-bold">Quiz Result</h1>

          <div />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-gradient-to-r from-cyan-600 to-blue-700 p-10 shadow-2xl"
        >
          <div className="flex flex-col items-center">
            <Trophy size={60} className="mb-5 text-yellow-300" />

            <h2 className="text-4xl font-bold">Quiz Completed</h2>

            <p className="text-white/80 mt-2">Great Job 🎉</p>

            <div className="mt-8 text-7xl font-extrabold">{percentage}%</div>
          </div>
        </motion.div>
        {/* Statistics Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-[#111827] border border-white/10 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Score</p>

                <h2 className="text-4xl font-bold mt-2">{score}</h2>

                <p className="text-gray-500 mt-2">out of {totalQuestions}</p>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                <Trophy size={32} className="text-cyan-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-[#111827] border border-white/10 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Correct</p>

                <h2 className="text-4xl font-bold mt-2 text-green-400">
                  {correctAnswers}
                </h2>

                <p className="text-gray-500 mt-2">Correct Answers</p>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 size={32} className="text-green-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl bg-[#111827] border border-white/10 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Wrong</p>

                <h2 className="text-4xl font-bold mt-2 text-red-400">
                  {wrongAnswers}
                </h2>

                <p className="text-gray-500 mt-2">Wrong Answers</p>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center">
                <XCircle size={32} className="text-red-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl bg-[#111827] border border-white/10 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Accuracy</p>

                <h2 className="text-4xl font-bold mt-2 text-yellow-400">
                  {percentage}%
                </h2>

                <p className="text-gray-500 mt-2">Overall Performance</p>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 flex items-center justify-center">
                🎯
              </div>
            </div>
          </motion.div>
        </div>
        {/* Strong & Weak Concepts */}

        <div className="grid lg:grid-cols-2 gap-8 mt-10">
          {/* Strong Concepts */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#111827] rounded-2xl border border-green-500/20 p-6"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              💪 Strong Concepts
            </h2>

            {strongConcepts.length === 0 ? (
              <p className="text-gray-400">No strong concepts found.</p>
            ) : (
              <div className="space-y-4">
                {Object.entries(
                  strongConcepts.reduce((acc, item) => {
                    const key = item.concept;

                    if (!acc[key]) {
                      acc[key] = {
                        ...item,
                        count: 0,
                      };
                    }

                    acc[key].count++;

                    return acc;
                  }, {}),
                ).map(([_, item]) => (
                  <div
                    key={item.concept}
                    className="rounded-xl bg-green-500/10 border border-green-500/20 p-4"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {item.concept}
                        </h3>

                        <p className="text-sm text-gray-400 mt-1">
                          {item.topic}
                        </p>
                      </div>

                      <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                        {item.count} Question{item.count > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Weak Concepts */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-[#111827] rounded-2xl border border-red-500/20 p-6"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              ⚠ Weak Concepts
            </h2>

            {weakConcepts.length === 0 ? (
              <p className="text-gray-400">Amazing! No weak concepts.</p>
            ) : (
              <div className="space-y-4">
                {Object.entries(
                  weakConcepts.reduce((acc, item) => {
                    const key = item.concept;

                    if (!acc[key]) {
                      acc[key] = {
                        ...item,
                        count: 0,
                      };
                    }

                    acc[key].count++;

                    return acc;
                  }, {}),
                ).map(([_, item]) => (
                  <div
                    key={item.concept}
                    className="rounded-xl bg-red-500/10 border border-red-500/20 p-4"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {item.concept}
                        </h3>

                        <p className="text-sm text-gray-400 mt-1">
                          {item.topic}
                        </p>
                      </div>

                      <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm">
                        {item.count} Question{item.count > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
        {/* Question Review */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-bold mb-6">📝 Question Review</h2>

          <div className="space-y-6">
            {result.map((item, index) => (
              <div
                key={item.questionId}
                className="rounded-2xl bg-[#111827] border border-white/10 p-6"
              >
                {/* Header */}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <h3 className="text-xl font-semibold">
                    Q{index + 1}. {item.question}
                  </h3>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      item.isCorrect
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {item.isCorrect ? "✅ Correct" : "❌ Wrong"}
                  </span>
                </div>

                {/* Answer Section */}

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  {/* User Answer */}

                  <div className="rounded-xl bg-[#0f172a] p-5 border border-white/5">
                    <p className="text-gray-400 text-sm mb-2">Your Answer</p>

                    <p
                      className={`font-medium ${
                        item.isCorrect ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {item.selected !== null ? item.selected : "Not Answered"}
                    </p>
                  </div>

                  {/* Correct Answer */}

                  <div className="rounded-xl bg-[#0f172a] p-5 border border-white/5">
                    <p className="text-gray-400 text-sm mb-2">Correct Answer</p>

                    <p className="font-medium text-green-400">
                      {item.correctAnswer}
                    </p>
                  </div>
                </div>

                {/* Explanation */}

                <div className="mt-6 rounded-xl bg-cyan-500/10 border border-cyan-500/20 p-5">
                  <h4 className="font-semibold text-cyan-300 mb-2">
                    💡 Explanation
                  </h4>

                  <p className="text-gray-300 leading-7">{item.explanation}</p>
                </div>

                {/* Meta Information */}

                <div className="flex flex-wrap gap-3 mt-6">
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm">
                    📚 {item.topic}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">
                    🧠 {item.concept}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.importance === "High"
                        ? "bg-red-500/20 text-red-300"
                        : item.importance === "Medium"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : "bg-green-500/20 text-green-300"
                    }`}
                  >
                    ⭐ {item.importance}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default QuizResult;
