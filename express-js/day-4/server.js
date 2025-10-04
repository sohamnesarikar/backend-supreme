import express from "express";
import session from "express-session";

const app = express();

app.use(
  session({
    secret: "my-secret-key",
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 30, // 30 min
    },
  })
);

app.get("/login", (req, res) => {
  req.session.user = { username: "Soham", id: 1 };
  res.send("Login successfull");
});

app.get("/dashboard", (req, res) => {
  if (req.session.user && req.session.user.username === "Soham") {
    return res.send(`welcome to dashboard ${req.session.user.username}`);
  }
  res.status(401).send(`Unauthorized user, please login`);
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send("Something went wrong");
    } else {
      res.send("Logout successfully");
    }
  });
});

app.listen(3000, () => {
  console.log(`server is listening on port 3000`);
});
