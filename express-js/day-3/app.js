import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser("secret"));

const PORT = 3000;

app.get("/login", (req, res) => {
  res.cookie("username", "soham", {
    maxAge: 1000 * 60 * 60 * 1, // 1 hour
    signed: true, // secret
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: "You are logged in" });
});

app.get("/dashboard", (req, res) => {
  // console.log(req.cookies); // without cookieParser its gives undefind
  // console.log(req.headers.cookie); // its gives in plain text format
  // console.log(req.signedCookies); // for accessing signed cookies
  if (req.signedCookies.username && req.signedCookies.username === "soham") {
    return res.status(200).send("welcome to dashboard");
  }

  res.status(403).send("you are not authorized to view this page");
});

app.get("/logout", (req, res) => {
  res.clearCookie("username");
  res.status(200).send("you are successfully logout");
});

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
