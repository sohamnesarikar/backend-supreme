import { verifyToken } from "../utils/token.utils.js";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  const user = {
    id: "gafs51442g",
    username: "John Doe",
  };

  if (token && verifyToken(token)) {
    req.user = user;
    next();
  } else {
    res.status(400).json({ success: false, message: "Invalid token" });
  }
};
