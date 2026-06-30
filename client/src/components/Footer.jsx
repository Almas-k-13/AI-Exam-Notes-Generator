import React from "react";
import { motion } from "motion/react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../App";
import axios from "axios";
import { FaTwitter, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

function Footer() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="z-10 mx-6 mb-6 mt-24 rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-2xl border border-white/10 px-8 py-10 shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
    >
      {/* Top Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* Logo + Description */}
        <motion.div
          whileHover={{ rotateX: 6, rotateY: -6 }}
          className="flex flex-col gap-4 transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="flex items-center gap-3 cursor-pointer"
            style={{ transform: "translateZ(20px)" }}
          >
            <img src={logo} alt="logo" className="h-10 w-10 object-contain" />
            <span
              className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent"
              style={{ textShadow: "0 6px 18px rgba(0,0,0,0.4)" }}
            >
              ExamNotes <span className="text-gray-400">AI</span>
            </span>
          </div>
          <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
            ExamNotes AI helps students generate exam-focused notes, revision
            material, diagrams, and printable PDFs using AI.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 mt-2">
            {/* WhatsApp */}
            <a
              href="https://wa.me/almas_13__"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="text-gray-400 hover:text-green-400 transition-colors cursor-pointer" />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Almas-k-13"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="text-gray-400 hover:text-white transition-colors cursor-pointer" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/almaskureshi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-gray-400 hover:text-blue-500 transition-colors cursor-pointer" />
            </a>
          </div>

        </motion.div>

        {/* Quick Links */}
        <div className="text-center">
          <h1 className="text-sm font-semibold text-white mb-4 tracking-wide">
            Quick Links
          </h1>
          <ul className="space-y-2 text-sm">
            <li
              className="text-gray-300 hover:text-indigo-400 transition-colors cursor-pointer"
              onClick={() => navigate("/notes")}
            >
              Notes
            </li>
            <li
              className="text-gray-300 hover:text-indigo-400 transition-colors cursor-pointer"
              onClick={() => navigate("/history")}
            >
              History
            </li>
            <li
              className="text-gray-300 hover:text-indigo-400 transition-colors cursor-pointer"
              onClick={() => navigate("/pricing")}
            >
              Add Credits
            </li>
          </ul>
        </div>

        {/* Support & Account */}
        <div className="text-center">
          <h1 className="text-sm font-semibold text-white mb-4 tracking-wide">
            Support & Account
          </h1>
          <ul className="space-y-2 text-sm">
            <li
              className="text-gray-300 hover:text-indigo-400 transition-colors cursor-pointer"
              onClick={() => navigate("/auth")}
            >
              SignIn
            </li>
            <li
              className="text-red-400 hover:text-red-300 transition-colors cursor-pointer"
              onClick={handleSignout}
            >
              SignOut
            </li>
            <li className="text-gray-300 hover:text-indigo-400 transition-colors cursor-pointer">
              support@examnotes.com
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Copyright */}
      <p className="text-center text-xs text-gray-500 tracking-wide">
        © {new Date().getFullYear()} ExamNotes AI. All rights reserved.
      </p>
    </motion.footer>
  );
}

export default Footer;
