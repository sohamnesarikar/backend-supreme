import crypto from "crypto";

export const generateToken = () => {
  const token = crypto.randomBytes(16).toString("hex");
  return token;
};

export const verifyToken = (token) => {
  return token.length === 32;
};
