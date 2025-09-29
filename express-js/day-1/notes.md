## 🧠 What is Express.js?

**Express.js** is a **minimal and flexible Node.js web application framework** that provides a robust set of features to build web and mobile applications.

> 📦 Built on top of Node.js HTTP module, it simplifies routing, middleware, and server setup.

---

## ✅ Why Use Express.js?

| Feature          | Why It’s Useful                                         |
| ---------------- | ------------------------------------------------------- |
| 🌐 Routing       | Easily handle different routes (URLs) with logic.       |
| 🔌 Middleware    | Use middlewares for logging, auth, error handling, etc. |
| 🏗 API Creation   | Ideal for RESTful API development.                      |
| ⚙️ Configuration | Easy to configure server behaviors.                     |
| 📦 Ecosystem     | Huge support via NPM packages like `cors`, `morgan`.    |
| 🧹 Cleaner Code  | Less boilerplate than vanilla Node.js.                  |

---

## 🚀 Getting Started

```bash
npm init -y
npm install express
```

```js
// index.js
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
```

---

## 📥 HTTP Methods in Express.js

---

### 1. **GET** (Read Data)

#### ➕ With Query Params

```js
// Route: GET /user?name=John&age=25
app.get("/user", (req, res) => {
  const { name, age } = req.query;
  res.send(`User name is ${name}, age is ${age}`);
});
```

#### ➕ With Route Params

```js
// Route: GET /user/123
app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  res.send(`User ID is ${id}`);
});
```

---

### 2. **POST** (Create Data)

```js
// Route: POST /user
// Body: { "name": "Alice", "email": "alice@example.com" }

app.post("/user", (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({ message: "User created", name, email });
});
```

---

### 3. **PUT** (Replace Entire Data)

```js
// Route: PUT /user/123
// Body: { "name": "Bob", "email": "bob@example.com" }

app.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  res.json({ message: `User ${id} replaced`, updatedUser });
});
```

> ✅ Use `PUT` when replacing **entire object**.

---

### 4. **PATCH** (Update Partial Data)

```js
// Route: PATCH /user/123
// Body: { "email": "newemail@example.com" }

app.patch("/user/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  res.json({ message: `User ${id} updated`, changes });
});
```

> ✅ Use `PATCH` for **partial updates**.

---

### 5. **DELETE** (Delete Resource)

```js
// Route: DELETE /user/123

app.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `User ${id} deleted` });
});
```

---

## 📦 Full Example Code

```js
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/user", (req, res) => {
  const { name, age } = req.query;
  res.send(`User: ${name}, Age: ${age}`);
});

app.get("/user/:id", (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});

app.post("/user", (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({ message: "User created", name, email });
});

app.put("/user/:id", (req, res) => {
  res.json({ message: `User ${req.params.id} replaced`, data: req.body });
});

app.patch("/user/:id", (req, res) => {
  res.json({
    message: `User ${req.params.id} partially updated`,
    data: req.body,
  });
});

app.delete("/user/:id", (req, res) => {
  res.json({ message: `User ${req.params.id} deleted` });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
```

---

## 📌 Summary Table

| Method | Use Case             | Syntax                              |
| ------ | -------------------- | ----------------------------------- |
| GET    | Fetch data           | `app.get('/route', handler)`        |
| POST   | Create new data      | `app.post('/route', handler)`       |
| PUT    | Replace whole object | `app.put('/route/:id', handler)`    |
| PATCH  | Update part of data  | `app.patch('/route/:id', handler)`  |
| DELETE | Remove a resource    | `app.delete('/route/:id', handler)` |
