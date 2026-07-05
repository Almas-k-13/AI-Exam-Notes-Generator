import React, { useEffect } from "react";
import { motion } from "motion/react";
import { FiCheckCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../services/api";
import { useNavigate } from "react-router-dom";
function PaymentSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getCurrentUser(dispatch);
    const t = setTimeout(() => {
      navigate("/");
    }, 5000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-center">
      {/* Animated success icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-green-400 text-7xl drop-shadow-[0_0_20px_rgba(34,197,94,0.6)]"
      >
        <FiCheckCircle />
      </motion.div>

      {/* Success heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent tracking-wide"
      >
        Payment Successful! Credits Added 🎉
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-gray-400 text-sm"
      >
        Redirecting to home...
      </motion.p>

      {/* Decorative glow ring */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-20 w-64 h-64 rounded-full bg-green-500/10 blur-3xl"
      />
    </div>
  );
}

export default PaymentSuccess;