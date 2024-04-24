import {
  create,
  destroy,
  findAll,
  findOne,
  update,
} from "../controllers/note.controller.js";

export function noteRoute(app) {
  // Create a new Note
  app.post("/notes", create);

  // Retrieve all Notes
  app.get("/notes", findAll);

  // Retrieve a single Note with noteId
  app.get("/notes/:noteId", findOne);

  // Update a Note with noteId
  app.put("/notes/:noteId", update);

  // Delete a Note with noteId
  app.delete("/notes/:noteId", destroy);
}
