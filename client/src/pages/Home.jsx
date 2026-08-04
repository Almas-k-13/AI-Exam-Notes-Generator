import React from "react";
import Navbar from "../components/Navbar";
import { motion } from "motion/react";
import img from "../assets/image.png";
// import img from "../assets/img1.png";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen overflow-hidden bg-white text-black">
      <Navbar />
      <main className="pt-28">
        {/* top */}
        <section className="max-w-7xl mx-auto px-8 pt-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              whileHover={{ rotateX: 6, rotateY: -6 }}
              className="transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.h1
                className="text-5xl lg:text-6xl font-extrabold leading-tight bg-linear-to-br from-black/90 via-black/60 to-black/90 bg-clip-text text-transparent"
                whileHover={{ y: -4 }}
                style={{
                  transform: "translateZ(40px)",
                  textShadow: "0 18px 40px rgba(0,0,0,0.25)",
                }}
              >
                Create Smart <br /> AI Notes in Seconds.
              </motion.h1>
              <motion.p
                whileHover={{ y: -2 }}
                className="mt-6 max-w-xl text-lg bg-linear-to-br from-gray-700 via-gray-500/80 to-gray-700 bg-clip-text text-transparent"
                style={{
                  transform: "translateZ(40px)",
                  textShadow: "0 18px 40px rgba(0,0,0,0.25)",
                }}
              >
                Generate exam-focused notes, project documentation, flow
                diagrams and revision-ready content using AI - faster, cleaner
                and smarter.
              </motion.p>
            </motion.div>
            <motion.button
              whileHover={{
                scale: 1.07,
              }}
              whileTap={{ scale: 0.97 }}
              className="mt-10 px-10 py-3 rounded-xl flex items-center gap-3 bg-linear-to-br from-black/90 via-black/80 to-black/90 border border-white/10 text-white font-semibold text-lg shadow-[0_25px_60px_rgba(0,0,0,0.6)] cursor-pointer"
              onClick={() => navigate("/notes")}
            >
              Get Started
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{
              y: -12,
              rotateX: 8,
              rotateY: -8,
              scale: 1.05,
            }}
            className="transform-gpu"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="overflow-hidden">
              <img
                src={img}
                alt="img"
                style={{ transform: "translateZ(35px)" }}
              />
            </div>
          </motion.div>
        </section>
        {/* bottom */}
        {/* Features */}

        <section className="relative max-w-7xl mx-auto px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <span className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-600">
              🚀 Why Choose ExamNotes AI?
            </span>

            <h2 className="mt-6 text-5xl font-black">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
                Ace Your Exams
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              Generate smart AI notes, create quizzes, visualize concepts,
              download PDFs and prepare for exams faster than ever.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            <Feature
              icon="📘"
              title="Exam Notes"
              des="Generate exam-focused notes with revision points and structured formatting."
            />

            <Feature
              icon="🧠"
              title="AI Quiz"
              des="Convert every note into an AI-generated quiz with instant performance analysis."
            />

            <Feature
              icon="📊"
              title="Charts & Diagrams"
              des="Visualize complex concepts using AI-generated charts and diagrams."
            />

            <Feature
              icon="📄"
              title="PDF Export"
              des="Download beautifully formatted PDFs for offline study and printing."
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Feature({ icon, title, des }) {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 18,
      }}
      className="group relative overflow-hidden rounded-3xl border border-cyan-500/10 bg-white p-7 shadow-xl"
    >
      {/* Background Glow */}

      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-500 group-hover:scale-150" />

      {/* Top Badge */}

      <div className="inline-flex items-center rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
        AI Powered
      </div>

      {/* Icon */}

      <div className="mt-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-3xl shadow-lg">
        {icon}
      </div>

      {/* Title */}

      <h3 className="mt-6 text-2xl font-bold text-gray-900">{title}</h3>

      {/* Description */}

      <p className="mt-4 leading-7 text-gray-600">{des}</p>

      {/* Footer */}

      <div className="mt-8 flex items-center justify-between">
        <span className="font-semibold text-cyan-600">Explore</span>

        <motion.div
          whileHover={{ x: 5 }}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-50 text-cyan-600"
        >
          →
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Home;
