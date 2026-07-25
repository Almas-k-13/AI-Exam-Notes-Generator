import React, { useState } from "react";
import { motion } from "motion/react";
import TopicForm from "../components/TopicForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import FinalResult from "../components/FinalResult";

function Notes() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const credits = userData.credits;
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 px-6 py-8">
      <motion.header
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-black border border-slate-700 shadow-[0_25px_70px_rgba(0,0,0,0.45)] mb-10"
      >
        {/* Background Glow */}

        <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl" />

        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />

        <div className="relative z-10 px-8 py-8 flex flex-col lg:flex-row justify-between gap-8">
          {/* Left */}

          <div
            // onClick={() => navigate("/")}
            className="cursor-pointer max-w-2xl"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 mb-5"
            >
              <span>🚀</span>

              <span className="text-cyan-300 text-sm font-medium">
                AI Powered Study Assistant
              </span>
            </motion.div>

            <h1 className="text-5xl font-black text-white">ExamNotes AI</h1>

            <p className="mt-5 text-slate-300 leading-8 text-lg">
              Generate exam-oriented notes, revise smarter, create AI quizzes,
              export PDFs and boost your preparation in just a few seconds.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white">
                📄 PDF Export
              </span>

              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white">
                🤖 AI Quiz
              </span>

              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white">
                ⚡ Instant Notes
              </span>

              <span
              onClick={() => navigate("/history")}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white">
                📚 History
              </span>
            </div>
          </div>

          {/* Right */}

          <div className="flex flex-col gap-4 justify-center">
            <button
              onClick={() => navigate("/pricing")}
              className="group flex items-center justify-between gap-5 rounded-2xl bg-white/5 border border-white/10 px-5 py-4 hover:bg-cyan-500/10 transition-all"
            >
              <div>
                <p className="text-slate-400 text-sm">Available Credits</p>

                <h2 className="text-3xl font-bold text-white">{credits}</h2>
              </div>

              <div className="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition">
                💎
              </div>
            </button>

            <button
              onClick={() => navigate("/history")}
              className="rounded-2xl bg-white/5 border border-white/10 px-5 py-4 hover:bg-white/10 transition text-left"
            >
              <p className="text-white font-semibold">📚 Notes History</p>

              <p className="text-slate-400 text-sm mt-1">
                View previously generated notes
              </p>
            </button>
          </div>
        </div>
      </motion.header>

      <motion.div className="mb-12">
        <TopicForm
          loading={loading}
          setResult={setResult}
          setLoading={setLoading}
          setError={setError}
        />
      </motion.div>

      {loading && (
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="text-center text-black font-medium mb-6"
        >
          Generating exam-focused notes...
        </motion.div>
      )}

      {error && (
        <div className="mb-6 text-center text-red-600 font-medium">{error}</div>
      )}

      {!result && (
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="h-64 rounded-2xl flex flex-col items-center justify-center bg-white/60 backdrop-blur-lg border border-dashed border-gray-300 text-gray-500 shadow-inner"
        >
          <span className="text-4xl mb-3">📘</span>
          <p className="text-sm">Generated notes will appear here</p>
        </motion.div>
      )}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col lg:grid lg:grid-cols-4 gap-6"
        >
          <div className="lg:col-span-1">
            <Sidebar result={result} />
          </div>

          <div className="lg:col-span-3 rounded-2xl bg-white shadow-[0_15px_40px_rgba(0,0,0,0.15)] p-6">
            <FinalResult result={result} />
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Notes;
