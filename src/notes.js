import { insertDB, saveDB, getDB } from "./db.js";

export const newNote = async (note, tags) => {
  const newNote = {
    content: note,
    id: Date.now(),
    tags,
  };
  try {
    await insertDB(newNote);
    return newNote;
  } catch (error) {
    console.log({ error });
  }
};

export const getAllNotes = async () => {
  try {
    const { notes } = await getDB();
    return notes;
  } catch (error) {
    console.log({ error });
  }
};

export const findNotes = async (filter) => {
  try {
    const { notes } = await getDB();
    return notes.filter((note) =>
      note.content.toLowerCase().includes(filter.toLowerCase())
    );
  } catch (error) {
    console.log({ error });
  }
};

export const removeNote = async (id) => {
  const { notes } = await getDB();
  const match = notes.find((note) => note.id === id);

  try {
    if (match) {
      const newNotes = notes.filter((note) => note.id !== id);
      await saveDB({ notes: newNotes });
      return id;
    }
  } catch (error) {
    console.log({ error });
  }
};

export const removeAllNotes = async () => {
  try {
    await saveDB({ notes: [] });
  } catch (error) {
    console.log({ error });
  }
};
