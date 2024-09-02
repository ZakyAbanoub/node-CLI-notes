import fs from "node:fs/promises";

const DB_PATH = new URL("../db.json", import.meta.url).pathname;

export const getDB = async () => {
  try {
    const db = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(db);
  } catch (error) {
    console.log({ error });
  }
};

export const saveDB = async (db) => {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
    return db;
  } catch (error) {
    console.log({ error });
  }
};

export const insertDB = async (note) => {
  try {
    const db = await getDB();
    db.notes.push(note);
    await saveDB(db);
    return note;
  } catch (error) {
    console.log(error);
  }
};
