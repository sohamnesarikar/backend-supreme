import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/dashboard", authMiddleware, (req, res) => {
  res.send(`welcome to dashboard ${req.user.username}`);
});

export default router;
