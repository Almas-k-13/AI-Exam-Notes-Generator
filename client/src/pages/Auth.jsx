import React from "react";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);

      const User = response.user;
      const name = User.displayName;
      const email = User.email;

      const result = await axios.post(
        serverUrl + "/api/auth/google",
        {
          name,
          email,
        },
        {
          withCredentials: true,
        },
      );

      console.log("Login Response:", result.data);

      dispatch(setUserData(result.data));

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-black">
      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="absolute right-[-120px] top-[-80px] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />

        <div className="absolute bottom-[-150px] left-1/3 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-3xl" />

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* ================= HEADER ================= */}

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-20 mx-auto mt-6 max-w-7xl px-6"
      >
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/90 px-6 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl md:px-8">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white md:text-2xl">
              ExamNotes{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                AI
              </span>
            </h1>

            <p className="mt-1 text-xs text-gray-400 md:text-sm">
              AI-powered exam preparation
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium text-cyan-300 sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
            AI Powered
          </div>
        </div>
      </motion.header>

      {/* ================= MAIN ================= */}

      <main className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-16 md:px-8 lg:grid-cols-2 lg:gap-20 lg:py-24">
        {/* ================= LEFT ================= */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700"
          >
            <span>✨</span>
            Smart Exam Preparation
          </motion.div>

          {/* Heading */}

          <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Unlock{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Smart
            </span>
            <br />
            AI Notes.
          </h1>

          {/* Description */}

          <p className="mt-7 max-w-xl text-lg leading-8 text-gray-600">
            Generate exam-focused notes, project documentation, diagrams,
            charts, revision points and clean PDFs — all powered by AI.
          </p>

          {/* Free Credits Highlight */}

          <div className="mt-8 flex max-w-xl items-center gap-4 rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-[0_15px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-2xl shadow-lg">
              🎁
            </div>

            <div>
              <p className="font-bold text-gray-900">Get 50 FREE credits</p>

              <p className="mt-1 text-sm text-gray-500">
                Start generating notes instantly — no payment required.
              </p>
            </div>
          </div>

          {/* Google Button */}

          <motion.button
            whileHover={{
              y: -4,
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.97,
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 18,
            }}
            onClick={handleGoogleAuth}
            className="group mt-8 flex w-full max-w-xl cursor-pointer items-center justify-center gap-3 rounded-2xl bg-black px-8 py-4 text-lg font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all hover:shadow-[0_25px_60px_rgba(0,0,0,0.45)] sm:w-auto"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
              <FcGoogle size={21} />
            </span>

            <span>Continue with Google</span>

            <motion.span className="ml-1 text-gray-400" whileHover={{ x: 5 }}>
              →
            </motion.span>
          </motion.button>

          {/* Small Info */}

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500">
            <span>✓ 50 Free Credits</span>
            <span>✓ Instant Access</span>
            <span>✓ Upgrade Anytime</span>
          </div>
        </motion.div>

        {/* ================= RIGHT ================= */}

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          {/* Background Glow */}

          <div className="absolute -inset-10 rounded-[50px] bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-purple-500/10 blur-3xl" />

          {/* Feature Grid */}

          <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Feature
              icon="🎁"
              title="50 Free Credits"
              des="Start with 50 credits to generate notes without paying."
              accent="cyan"
            />

            <Feature
              icon="📘"
              title="Exam Notes"
              des="High-yield, revision-ready exam-oriented notes."
              accent="blue"
            />

            <Feature
              icon="📂"
              title="Project Notes"
              des="Well-structured documentation for assignments and projects."
              accent="purple"
            />

            <Feature
              icon="📊"
              title="Charts & Graphs"
              des="Auto-generated diagrams, charts and visual explanations."
              accent="cyan"
            />

            <Feature
              icon="⬇️"
              title="Free PDF Download"
              des="Download clean, printable PDFs instantly."
              accent="blue"
              fullWidth
            />
          </div>
        </motion.div>
      </main>

      {/* ================= FOOTER TEXT ================= */}

      <div className="relative z-10 pb-8 text-center text-xs text-gray-400">
        Built for smarter learning • Powered by AI
      </div>
    </div>
  );
}

/* ========================================================= */
/* FEATURE CARD */
/* ========================================================= */

function Feature({ icon, title, des, accent = "cyan", fullWidth = false }) {
  const accentStyles = {
    cyan: {
      glow: "bg-cyan-500/10",
      icon: "from-cyan-400/20 to-cyan-600/20",
      border: "border-cyan-500/20",
      text: "text-cyan-300",
    },

    blue: {
      glow: "bg-blue-500/10",
      icon: "from-blue-400/20 to-blue-600/20",
      border: "border-blue-500/20",
      text: "text-blue-300",
    },

    purple: {
      glow: "bg-purple-500/10",
      icon: "from-purple-400/20 to-purple-600/20",
      border: "border-purple-500/20",
      text: "text-purple-300",
    },
  };

  const style = accentStyles[accent];

  return (
    <motion.div
      whileHover={{
        y: -10,
        rotateX: 3,
        rotateY: -3,
        scale: 1.025,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 18,
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className={`group relative overflow-hidden rounded-3xl border ${style.border} bg-gradient-to-br from-[#09090b] via-[#111827] to-[#09090b] p-6 text-white shadow-[0_25px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl ${
        fullWidth ? "sm:col-span-2" : ""
      }`}
    >
      {/* Glow */}

      <div
        className={`absolute -right-12 -top-12 h-36 w-36 rounded-full ${style.glow} blur-3xl transition-all duration-500 group-hover:scale-150`}
      />

      {/* Shine */}

      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      {/* Content */}

      <div
        className="relative z-10"
        style={{
          transform: "translateZ(25px)",
        }}
      >
        {/* Icon */}

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br ${style.icon} text-3xl shadow-lg backdrop-blur-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
        >
          {icon}
        </div>

        {/* Title */}

        <h3 className="mt-5 text-xl font-bold tracking-tight">{title}</h3>

        {/* Description */}

        <p className="mt-2 text-sm leading-6 text-gray-400">{des}</p>

        {/* Bottom */}

        <div className="mt-5 flex items-center justify-between">
          <span className={`text-xs font-semibold ${style.text}`}>
            Available from day one
          </span>

          <motion.span
            whileHover={{ x: 5 }}
            className="text-lg text-gray-500 transition-colors group-hover:text-white"
          >
            →
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

export default Auth;
