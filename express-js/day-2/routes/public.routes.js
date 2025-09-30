import express from "express";
import { generateToken } from "../utils/token.utils.js";

const router = express.Router();

router.get("/home", (req, res) => {
  res.send("This is home page");
});

router.get("/generate-token", (req, res) => {
  const token = generateToken();
  res.status(200).json({ success: true, token: token });
});

export default router;
