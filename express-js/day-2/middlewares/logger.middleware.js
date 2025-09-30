import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const filePath = fileURLToPath(import.meta.url);
const dirPath = path.dirname(filePath);

const logsFolderPath = path.join(dirPath, "..", "logs");

export const loggerMiddleware = (req, res, next) => {
  const log = `${new Date().toISOString()} ${req.url} ${req.method}\n`;
  fs.appendFileSync(`${logsFolderPath}/log.txt`, log);
  next();
};
