import express from "express";
import fs from "fs/promises";
import crypto from "crypto";

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));

const users = JSON.parse(
  await fs.readFile(new URL("./data/users.json", import.meta.url), "utf-8")
);

app.get("/api/v1/users", (req, res) => {
  res.json(users);
});

app.post("/api/v1/users", async (req, res) => {
  const body = req.body;
  try {
    const user = {
      id: crypto.randomUUID(),
      ...body,
    };

    users.push(user);

    await fs.writeFile("./data/users.json", JSON.stringify(users));
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app
  .route("/api/v1/users/:id")
  .get((req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id === id);
    if (user) {
      res.json({ success: true, data: user });
    } else {
      res.status(404).json({ success: false, message: "user not found" });
    }
  })
  .delete(async (req, res) => {
    const id = req.params.id;

    try {
      const index = users.findIndex((user) => user.id === id);
      if (index !== -1) {
        users.splice(index, 1);
        await fs.writeFile("./data/users.json", JSON.stringify(users));
        res.json({ success: true, message: "user successfully deleted" });
      } else {
        res.status(404).json({ success: false, message: "user not found" });
      }
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  })
  .patch(async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
      const index = users.findIndex((user) => user.id === id);
      if (index !== -1) {
        const user = users.find((user) => user.id === id);
        users[index] = {
          ...user,
          ...body,
        };
        await fs.writeFile("./data/users.json", JSON.stringify(users));
        res.json({ success: true, data: users[index] });
      } else {
        res.status(404).json({ success: false, message: "user not found" });
      }
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  })
  .put(async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
      const index = users.findIndex((user) => user.id === id);
      if (index !== -1) {
        users[index] = {
          id: id,
          ...body,
        };
        await fs.writeFile("./data/users.json", JSON.stringify(users));
        res.json({ success: true, data: users[index] });
      } else {
        res.status(404).json({ success: false, message: "user not found" });
      }
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  });

app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
