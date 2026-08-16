import express from "express";

import { requireAuth } from "../middleware/auth.js";
import {
  listPackages,
  createSession,
  verifySession,
  listHistory,
} from "../controllers/paymentsController.js";

const paymentRouter = express.Router();

paymentRouter.get("/packages", listPackages);

paymentRouter.post("/create-checkout-session", requireAuth, createSession);
paymentRouter.post("/verify-session", requireAuth, verifySession);
paymentRouter.get("/history", requireAuth, listHistory);

export default paymentRouter;
