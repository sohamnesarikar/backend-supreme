import express from "express";
import session from "express-session";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { initAppFiles, readData, writeData } from "./utils/file.utils.js";

const app = express();

// check users.json file present, if not create it and add [] to it
await initAppFiles();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// read users.json file
const users = await readData();

// creating data folder path
const filePath = fileURLToPath(import.meta.url);
const dirPath = path.dirname(filePath);
const dataFolderPath = path.join(dirPath, "data");

if (!fs.existsSync(dataFolderPath)) {
  fs.mkdir(dataFolderPath, (err) => {
    if (err) console.log(err);
  });
}

// home
app.get("/", (req, res) => {
  res.status(200).send(`<h1>Welcome Mini Auth App</h1>
    <a href="/login">Login</a>
    <a href='/register'>Register</a>
    `);
});

// login get
app.get("/login", (req, res) => {
  res.status(200).send(`<h1>Login Page</h1>
      <form method="POST" action="/login">
          <div>
            <label>username: </label>
            <input type="text" name="username" required >
        </div>
        <div>
            <label>password: </label>
            <input type="password" name="password" required >
        </div>
        <button type="submit">Login</button>
      </form>
       <a href="/">Go to home page</a>
        `);
});

// login post
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.send(
      `<h2>Invalid Credentials, Please <a href="/login">Login</a> again.</h2>`
    );
  }

  req.session.user = user;
  res.redirect("/dashboard");
});

// register get
app.get("/register", (req, res) => {
  res.status(200).send(`<h1>Register Page</h1>
      <form method="POST" action="/register">
          <div>
            <label>username: </label>
            <input type="text" name="username" required >
        </div>
        <div>
            <label>password: </label>
            <input type="password" name="password" required >
        </div>
        <button type="submit">Register</button>
      </form>
       <a href="/">Go to home page</a>
        `);
});

// register post
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = {
    id: crypto.randomUUID(),
    username,
    password,
  };

  users.push(user);

  await writeData(users);

  res.send(
    `<h2>Registration Successfull, <a href="/login">Go back to Login page</a>.</h2>`
  );
});

// dashboard
app.get("/dashboard", (req, res) => {
  if (req.session.user && req.session.user.username) {
    return res.send(
      `<h2>Welcome To dashboard ${req.session.user.username}</h2>
       <a href="/logout">Logout</a>`
    );
  } else {
    res.send(`<h3>Access Denied. <a href="/login">Login first</a></h3>`);
  }
});

// logout
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send(
        '<h3>Something went wrong, <a href="/dashboard">Go to dashboard</a>.</h3>'
      );
    } else {
      res.send(
        '<h3>Logout Successfully, <a href="/login">login again</a></h3>'
      );
    }
  });
});

app.listen(3000, () => {
  console.log(`server is listening on port 3000`);
});
