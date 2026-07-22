import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../App";
import { toast } from "sonner";
import { FaArrowLeft } from "react-icons/fa";
import { PiExamBold } from "react-icons/pi";

function Quiz() {
  const { noteId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [quizId, setQuizId] = useState("");

  const [quiz, setQuiz] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    generateQuiz();
  }, []);

  const generateQuiz = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${serverUrl}/api/quiz/generate/${noteId}`,
        {},
        {
          withCredentials: true,
        },
      );

      setQuiz(res.data.quiz);
      setQuizId(res.data.quizId);
    } catch (error) {
      console.log(error);

      toast.error("Failed to generate quiz");

      navigate("/history");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (questionId, optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };
  const submitQuiz = async () => {
    try {
      setSubmitting(true);

      const answers = Object.entries(selectedAnswers).map(
        ([questionId, selected]) => ({
          questionId: Number(questionId),
          selected,
        }),
      );

      const res = await axios.post(
        `${serverUrl}/api/quiz/submit`,
        {
          quizId,
          answers,
        },
        {
          withCredentials: true,
        },
      );

      toast.success("Quiz submitted successfully");

      navigate(`/quiz-result/${quizId}`, {
        state: res.data,
      });
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to submit quiz");
    } finally {
      setSubmitting(false);
    }
  };

  const progress =
    quiz.length > 0 ? ((currentQuestion + 1) / quiz.length) * 100 : 0;

  const question = quiz[currentQuestion];

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
          className="w-14 h-14 rounded-full border-4 border-cyan-500 border-t-transparent"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1120] text-white">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-white/10 bg-[#0b1120]/90 backdrop-blur-lg">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <button
            onClick={() => navigate("/history")}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition"
          >
            <FaArrowLeft />
            Back
          </button>

          <div className="flex items-center gap-3">
            <PiExamBold className="text-cyan-400 text-3xl" />
            <div>
              <h1 className="text-xl font-bold">AI Quiz</h1>
              <p className="text-sm text-gray-400">
                Question {currentQuestion + 1} of {quiz.length}
              </p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="h-2 bg-white/10">
          <motion.div
            className="h-full bg-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {question && (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#111827] rounded-3xl p-8 shadow-xl"
          >
            <span className="inline-block bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm mb-5">
              {question.topic}
            </span>

            <h2 className="text-2xl font-semibold mb-8">{question.question}</h2>

            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(question.id, index)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-200
                  ${
                    selectedAnswers[question.id] === index
                      ? "border-cyan-500 bg-cyan-500/20"
                      : "border-white/10 hover:border-cyan-400 hover:bg-white/5"
                  }`}
                >
                  <span className="font-medium">
                    {String.fromCharCode(65 + index)}.
                  </span>{" "}
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
      {/* Footer */}
      <div className="max-w-5xl mx-auto px-6 pb-10">
        {/* Question Navigator */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {quiz.map((q, index) => (
            <button
              key={q.id}
              onClick={() => setCurrentQuestion(index)}
              className={`w-11 h-11 rounded-xl font-semibold transition-all
                ${
                  currentQuestion === index
                    ? "bg-cyan-500 text-white"
                    : selectedAnswers[q.id] !== undefined
                      ? "bg-green-500/20 border border-green-500 text-green-400"
                      : "bg-white/5 border border-white/10 hover:border-cyan-500"
                }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Previous
          </button>

          {currentQuestion === quiz.length - 1 ? (
            <button
              onClick={submitQuiz}
              disabled={submitting}
              className="px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 transition font-semibold"
            >
              {submitting ? "Submitting..." : "Submit Quiz"}
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition"
            >
              Next
            </button>
          )}
        </div>

        {/* Answer Counter */}
        <div className="mt-8 text-center text-gray-400">
          Answered{" "}
          <span className="text-cyan-400 font-semibold">
            {Object.keys(selectedAnswers).length}
          </span>{" "}
          / {quiz.length}
        </div>
      </div>
    </div>
  );
}

export default Quiz;