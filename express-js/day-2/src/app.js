import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import publicRouter from "../routes/public.routes.js";
import privateRouter from "../routes/private.routes.js";

import { loggerMiddleware } from "../middlewares/logger.middleware.js";

const app = express();

const PORT = 3000;

app.use(express.json());

// creating logs folder
const filePath = fileURLToPath(import.meta.url);
const dirPath = path.dirname(filePath);

const logsFolderPath = path.join(dirPath, "..", "logs");

if (!fs.existsSync(logsFolderPath)) {
  fs.mkdir(logsFolderPath, (err) => {
    if (err) console.log(err);
  });
}

// custom middlewares
app.use(loggerMiddleware);

// routes
app.use("/public", publicRouter);
app.use("/private", privateRouter);

app.get("/", (req, res) => {
  res.send("helo world");
});

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
