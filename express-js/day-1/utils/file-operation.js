import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const filePath = fileURLToPath(import.meta.url);
const dirPath = path.dirname(filePath);

const usersFilePath = path.join(dirPath, "..", "data", "users.json");

export const readFileData = async () => {
  try {
    const data = await fs.readFile(usersFilePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.log(err.message);
  }
};

export const writeFileData = async (data) => {
  try {
    await fs.writeFile(usersFilePath, data);
  } catch (err) {
    console.log(err.message);
  }
};
