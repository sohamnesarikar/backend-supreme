import express from "express";
import crypto from "crypto";
import { readFileData, writeFileData } from "./utils/file-operation.js";

const app = express();

app.use(express.json());

const PORT = 3000;

// get all users
app.get("/api/v1/users", async (req, res) => {
  const users = await readFileData();
  res.status(200).json({ success: true, data: users });
});

// get user by id
app.get("/api/v1/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const users = await readFileData();
    const user = users.find((user) => user.id === id);
    if (user) {
      return res.status(200).json({ success: true, data: user });
    }

    res
      .status(404)
      .json({ success: false, message: "user not found, Invalid id" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// create user
app.post("/api/v1/users", async (req, res) => {
  try {
    const data = req.body;
    const users = await readFileData();
    if (data && Object.keys(data).length === 4) {
      const user = {
        id: crypto.randomUUID(),
        ...data,
      };

      users.push(user);
      writeFileData(JSON.stringify(users));

      return res.status(201).json({
        success: true,
        data: user,
      });
    }

    res
      .status(400)
      .json({ success: false, message: "Please fill all the fields" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// edit user
app.put("/api/v1/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const users = await readFileData();
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
      users[index] = {
        id,
        ...data,
      };

      writeFileData(JSON.stringify(users));
      return res.status(200).json({ success: true, data: users[index] });
    }

    res
      .status(404)
      .json({ success: false, message: "user not found, Invalid id" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// delete user
app.delete("/api/v1/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const users = await readFileData();
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      writeFileData(JSON.stringify(users));
      return res
        .status(200)
        .json({ success: true, message: "user deleted successfully" });
    }

    res
      .status(404)
      .json({ success: false, message: "user not found, Invalid id" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// partially edit user
app.patch("/api/v1/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const users = await readFileData();
    const user = users.find((user) => user.id === id);
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
      users[index] = {
        id,
        ...user,
        ...data,
      };

      writeFileData(JSON.stringify(users));
      return res.status(200).json({ success: true, data: users[index] });
    }

    res
      .status(404)
      .json({ success: false, message: "user not found, Invalid id" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
