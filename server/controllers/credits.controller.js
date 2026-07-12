import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const CREDIT_MAP = {
  100: 50,
  200: 120,
  500: 300,
};

// ==============================
// Create Razorpay Order
// ==============================
export const createCreditsOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { amount } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!CREDIT_MAP[amount]) {
      return res.status(400).json({
        success: false,
        message: "Invalid credit plan",
      });
    }

    const options = {
      amount: amount * 100, // Razorpay amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId,
        credits: CREDIT_MAP[amount],
      },
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
    });
  }
};

// ==============================
// Verify Razorpay Payment
// ==============================
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
    } = req.body;

    const userId = req.userId;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    const creditsToAdd = CREDIT_MAP[amount];

    if (!creditsToAdd) {
      return res.status(400).json({
        success: false,
        message: "Invalid credit amount",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $inc: {
          credits: creditsToAdd,
        },
        $set: {
          isCreditAvailable: true,
        },
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      user,
    });
  } catch (error) {
    console.error("Verify Payment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};