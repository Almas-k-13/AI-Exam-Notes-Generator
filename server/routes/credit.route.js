import express from "express";
import isAuth from "../middleware/isAuth.js";
import {
  createCreditsOrder,
  verifyPayment,
} from "../controllers/credits.controller.js";

const creditRouter = express.Router();

// Create Razorpay Order
creditRouter.post("/order", isAuth, createCreditsOrder);

// Verify Razorpay Payment
creditRouter.post("/verify", isAuth, verifyPayment);

export default creditRouter;