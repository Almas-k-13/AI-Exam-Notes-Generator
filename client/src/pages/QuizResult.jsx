import React from "react";
import { motion } from "motion/react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Trophy,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

function QuizResult() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [openQuestion, setOpenQuestion] = React.useState(null);

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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#16213E] via-[#0F3460] to-[#1A1A2E] p-10 shadow-[0_0_60px_rgba(34,211,238,0.15)]"
        >
          {/* Background Glow */}

          <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />

          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left */}

            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20">
                <Trophy className="text-yellow-400" size={18} />

                <span className="text-sm text-cyan-300">AI Quiz Completed</span>
              </div>

              <h1 className="text-5xl font-black mt-6">Congratulations 🎉</h1>

              <p className="text-gray-300 mt-4 max-w-xl leading-8">
                Your AI assessment has been completed successfully. Review your
                performance, identify weak areas, and continue improving your
                knowledge.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-3">
                  <p className="text-gray-400 text-sm">Questions</p>

                  <h3 className="text-2xl font-bold">{totalQuestions}</h3>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-3">
                  <p className="text-gray-400 text-sm">Score</p>

                  <h3 className="text-2xl font-bold">
                    {score}/{totalQuestions}
                  </h3>
                </div>
              </div>
            </div>

            {/* Right */}

            <div className="relative">
              <div className="w-56 h-56 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 p-[8px]">
                <div className="w-full h-full rounded-full bg-[#08111f] flex flex-col items-center justify-center">
                  <p className="text-gray-400 text-sm uppercase tracking-widest">
                    Accuracy
                  </p>

                  <h2 className="text-6xl font-black mt-2">{percentage}%</h2>

                  <div
                    className={`mt-5 px-5 py-2 rounded-full text-sm font-semibold ${
                      percentage >= 90
                        ? "bg-green-500/20 text-green-400"
                        : percentage >= 75
                          ? "bg-cyan-500/20 text-cyan-400"
                          : percentage >= 60
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {percentage >= 90
                      ? "🏆 Quiz Master"
                      : percentage >= 75
                        ? "⭐ Excellent"
                        : percentage >= 60
                          ? "👍 Good"
                          : "📚 Keep Practicing"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Statistics Cards */}

        {/* Premium Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7 mt-12">
          {[
            {
              title: "Score",
              value: `${score}/${totalQuestions}`,
              icon: "🏆",
              color: "from-cyan-500/20 to-cyan-600/5",
              border: "border-cyan-500/20",
            },
            {
              title: "Correct",
              value: correctAnswers,
              icon: "✅",
              color: "from-green-500/20 to-green-600/5",
              border: "border-green-500/20",
            },
            {
              title: "Wrong",
              value: wrongAnswers,
              icon: "❌",
              color: "from-red-500/20 to-red-600/5",
              border: "border-red-500/20",
            },
            {
              title: "Accuracy",
              value: `${percentage}%`,
              icon: "🎯",
              color: "from-yellow-500/20 to-yellow-600/5",
              border: "border-yellow-500/20",
            },
          ].map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className={`relative overflow-hidden rounded-3xl border ${card.border}
      bg-[#111827]/90 backdrop-blur-xl p-6`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-70`}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{card.title}</p>

                    <h2 className="text-4xl font-black mt-3">{card.value}</h2>
                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl backdrop-blur-xl">
                    {card.icon}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Strong & Weak Concepts */}

        {/* AI Learning Report */}

        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          {/* Strong Concepts */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl border border-green-500/20 bg-[#111827] overflow-hidden"
          >
            <div className="bg-gradient-to-r from-green-500/20 to-transparent px-6 py-5 border-b border-green-500/20">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                💪 Strong Concepts
              </h2>

              <p className="text-gray-400 text-sm mt-1">
                Areas where you performed really well.
              </p>
            </div>

            <div className="p-6 space-y-5">
              {strongConcepts.length === 0 ? (
                <p className="text-gray-400">No strong concepts found.</p>
              ) : (
                Object.values(
                  strongConcepts.reduce((acc, item) => {
                    if (!acc[item.concept]) {
                      acc[item.concept] = {
                        ...item,
                        count: 0,
                      };
                    }

                    acc[item.concept].count++;

                    return acc;
                  }, {}),
                ).map((item) => (
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                    }}
                    key={item.concept}
                    className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">
                          {item.concept}
                        </h3>

                        <p className="text-gray-400 mt-1">{item.topic}</p>
                      </div>

                      <span className="text-green-400 font-bold">
                        {item.count} Q
                      </span>
                    </div>

                    <div className="flex gap-2 mt-5 flex-wrap">
                      <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs">
                        ⭐ {item.importance}
                      </span>

                      <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs">
                        Excellent
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          {/* Weak Concepts */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl border border-red-500/20 bg-[#111827] overflow-hidden"
          >
            <div className="bg-gradient-to-r from-red-500/20 to-transparent px-6 py-5 border-b border-red-500/20">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                ⚠ Needs Improvement
              </h2>

              <p className="text-gray-400 text-sm mt-1">
                Revise these concepts before your next quiz.
              </p>
            </div>

            <div className="p-6 space-y-5">
              {weakConcepts.length === 0 ? (
                <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-5">
                  <p className="text-green-400 font-semibold">
                    🎉 Amazing! No weak concepts found.
                  </p>
                </div>
              ) : (
                Object.values(
                  weakConcepts.reduce((acc, item) => {
                    if (!acc[item.concept]) {
                      acc[item.concept] = {
                        ...item,
                        count: 0,
                      };
                    }

                    acc[item.concept].count++;

                    return acc;
                  }, {}),
                ).map((item) => (
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                    }}
                    key={item.concept}
                    className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">
                          {item.concept}
                        </h3>

                        <p className="text-gray-400 mt-1">{item.topic}</p>
                      </div>

                      <span className="text-red-400 font-bold">
                        {item.count} Q
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-5">
                      <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs">
                        ⭐ {item.importance}
                      </span>

                      <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs">
                        Recommended Revision
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
        {/* Question Review */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-14"
        >
          <h2 className="text-3xl font-bold mb-2">📝 Question Review</h2>

          <p className="text-gray-400 mb-8">
            Click on any question to see the complete explanation.
          </p>

          <div className="space-y-5">
            {result.map((item, index) => {
              const open = openQuestion === index;

              return (
                <motion.div
                  key={item.questionId}
                  layout
                  className="rounded-2xl border border-white/10 bg-[#111827] overflow-hidden"
                >
                  {/* Header */}

                  <button
                    onClick={() => setOpenQuestion(open ? null : index)}
                    className="w-full flex justify-between items-center px-6 py-5 hover:bg-white/5 transition"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                          item.isCorrect
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {index + 1}
                      </div>

                      <div className="text-left">
                        <h3 className="font-semibold text-lg">
                          {item.question}
                        </h3>

                        <p
                          className={`text-sm mt-1 ${
                            item.isCorrect ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {item.isCorrect ? "Correct Answer" : "Wrong Answer"}
                        </p>
                      </div>
                    </div>

                    {open ? <ChevronUp /> : <ChevronDown />}
                  </button>

                  {/* Expanded */}

                  {open && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                      }}
                      className="px-6 pb-6"
                    >
                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-5">
                          <p className="text-gray-400 text-sm">Your Answer</p>

                          <h4 className="mt-2 text-xl font-semibold">
                            {item.selected ?? "Not Answered"}
                          </h4>
                        </div>

                        <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-5">
                          <p className="text-gray-400 text-sm">
                            Correct Answer
                          </p>

                          <h4 className="mt-2 text-xl font-semibold text-green-400">
                            {item.correctAnswer}
                          </h4>
                        </div>
                      </div>

                      <div className="mt-6 rounded-xl bg-cyan-500/10 border border-cyan-500/20 p-5">
                        <h4 className="font-semibold text-cyan-300 mb-3">
                          💡 Explanation
                        </h4>

                        <p className="text-gray-300 leading-8">
                          {item.explanation}
                        </p>
                      </div>

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
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default QuizResult;
