import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const filePath = fileURLToPath(import.meta.url);
const dirPath = path.dirname(filePath);
const usersFilePath = path.join(dirPath, "..", "data", "users.json");

export const readData = async () => {
  try {
    const data = await fs.readFile(usersFilePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.log(err.message);
  }
};

export const writeData = async (data) => {
  try {
    await fs.writeFile(usersFilePath, JSON.stringify(data));
  } catch (err) {
    console.log(err.message);
  }
};

export const isFilePresent = async () => {
  try {
    await fs.access(usersFilePath, fs.constants.R_OK);
  } catch (err) {
    await writeData([]);
  }
};

export const initAppFiles = async () => {
  await isFilePresent();
};
