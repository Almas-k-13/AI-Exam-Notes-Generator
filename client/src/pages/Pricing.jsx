import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react";
import axios from 'axios';
import { serverUrl } from '../App';

function Pricing() {
  const navigate = useNavigate();
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [paying, setPaying] = useState(false);
  const [payingAmount, setPayingAmount] = useState(null);

  const handlePaying = async (amount) => {
    try {
      setPayingAmount(amount);
      setPaying(true);
      const result = await axios.post(
        serverUrl + "/api/credit/order",
        { amount },
        { withCredentials: true },
      );
      if (result.data.url) {
        window.location.href = result.data.url;
      }
      setPaying(false);
    } catch (error) {
      setPaying(false);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-6 py-10 relative text-white">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 px-4 py-2 rounded-xl 
             bg-gradient-to-r from-gray-800 via-black to-gray-800 
             text-gray-300 hover:text-white 
             hover:from-indigo-600 hover:to-purple-600 
             transition-all duration-300 shadow-md 
             hover:shadow-[0_0_15px_rgba(99,102,241,0.6)]"
      >
        ⬅️ Back
      </button>


      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
          Buy Credits
        </h1>
        <p className="text-gray-400 mt-2">
          Choose a plan that fits your study needs
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <PricingCard
          title="Starter"
          price="Rs.100"
          amount={100}
          credits="50 Credits"
          description="Perfect for quick revisions"
          features={[
            "Generate AI notes",
            "Exam-focused answers",
            "Diagram & charts support",
            "Fast generation",
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
        />

        <PricingCard
          popular
          title="Popular"
          price="Rs.200"
          amount={200}
          credits="120 Credits"
          description="Best value for students"
          features={[
            "All Starter features",
            "More credits per Rs.",
            "Revision mode access",
            "Priority AI response",
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
        />

        <PricingCard
          title="Pro Learner"
          price="Rs.500"
          amount={500}
          credits="300 Credits"
          description="For serious exam preparation"
          features={[
            "Maximum credit value",
            "Unlimited revisions",
            "Charts & diagrams",
            "Ideal for full syllabus",
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
        />
      </div>
    </div>
  );
}

function PricingCard({
  title,
  price,
  amount,
  credits,
  description,
  features,
  popular,
  selectedPrice,
  setSelectedPrice,
  onBuy,
  paying,
  payingAmount,
}) {
  const isSelected = selectedPrice === amount;
  const isPayingThisCard = paying && payingAmount === amount;

  return (
    <motion.div
      onClick={() => setSelectedPrice(amount)}
      whileHover={{ y: -6, scale: 1.02 }}
      className={`relative cursor-pointer rounded-2xl p-6 transition-all shadow-lg border ${isSelected
          ? "border-indigo-400 bg-gradient-to-br from-indigo-900/40 via-black/60 to-indigo-900/40"
          : popular
            ? "border-indigo-500 bg-gradient-to-br from-gray-800 via-black to-gray-800"
            : "border-gray-700 bg-gradient-to-br from-gray-800 via-black to-gray-800"
        }`}
    >
      {popular && !isSelected && (
        <span className="absolute top-4 right-4 text-xs px-2 py-1 rounded bg-indigo-600 text-white shadow-md">
          Popular
        </span>
      )}
      {isSelected && (
        <span className="absolute top-4 right-4 text-xs px-2 py-1 rounded bg-indigo-400 text-black font-bold shadow-md">
          Selected
        </span>
      )}

      <h2 className="text-xl font-bold text-white">{title}</h2>
      <p className="text-sm text-gray-400 mt-1">{description}</p>

      <div className="mt-4">
        <p className="text-3xl font-extrabold text-indigo-400">{price}</p>
        <p className="text-sm text-green-400">{credits}</p>
      </div>

      <button
        disabled={isPayingThisCard}
        onClick={(e) => {
          e.stopPropagation();
          onBuy(amount);
        }}
        className={`w-full mt-6 py-2 rounded-xl font-semibold transition-all shadow-md ${isPayingThisCard
            ? "bg-gray-600 cursor-not-allowed text-gray-300"
            : isSelected
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90"
              : "bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:from-indigo-600 hover:to-purple-600"
          }`}
      >
        {isPayingThisCard ? "Redirecting..." : "Buy Now"}
      </button>

      <ul className="mt-6 space-y-2 text-sm text-gray-300">
        {features.map((f, i) => (
          <li
            key={i}
            className="flex gap-2 items-center bg-black/30 px-3 py-2 rounded-lg hover:bg-indigo-500/10 transition"
          >
            ✅ {f}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default Pricing;
