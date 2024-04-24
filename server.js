import express from "express";
import bodyParser from "body-parser";
import { config } from "./config/database.config.js";
import mongoose from "mongoose";

import { noteRoute } from "./app/routes/note.routes.js";
import { locationroute } from "./app/routes/location.routes.js";

// create express app
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Configuring the database

mongoose.Promise = global.Promise;

mongoose.connect(config.url, {
  useMongoClient: true,
});

mongoose.connection.on("error", function () {
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});
mongoose.connection.once("open", function () {
  console.log("Successfully connected to the database");
});

// define a simple route
app.get("/", function (req, res) {
  res.json({
    message:
      "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.",
  });
});

noteRoute(app);
locationroute(app);

// listen for requests
app.listen(3000, function () {
  console.log("Server is listening on port 3000");
});
