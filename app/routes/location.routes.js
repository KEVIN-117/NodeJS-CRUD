import {
  create,
  destroy,
  findAll,
  findLocation,
  findOne,
  update,
} from "../controllers/location.controller.js";
export function locationroute(app) {
  // Create a new Note
  app.post("/location", create);

  // Retrieve all Notes
  app.get("/location", findAll);

  // Retrieve a single Note with noteId
  app.get("/location/:noteId", findOne);

  // Retrieve a lat-long for finding nerarest locations
  app.get("/locationFinder", findLocation);

  // Update a Note with noteId
  app.put("/location/:noteId", update);

  // Delete a Note with noteId
  app.delete("/location/:noteId", destroy);
}
