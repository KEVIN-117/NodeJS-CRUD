import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
  },
  {
    timestamps: true,
  }
);

export const Note = mongoose.model("Note", NoteSchema);
