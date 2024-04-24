import { Location } from "../models/location.model.js";

export const create = function (req, res) {
  // Create and Save a new Location
  if (!req.body.points) {
    res.status(400).send({ message: "location can not be empty" });
  }
  console.log(req.body);
  const location = new Location({
    location_name: req.body.location_name,
    points: req.body.points,
    emotion: req.body.emotion,
  });

  location.save(function (err, data) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occurred while creating the Location." });
    } else {
      res.send(data);
    }
  });
};

export const findAll = function (req, res) {
  // Retrieve and return all notes from the database.
  Location.find(function (err, notes) {
    if (err) {
      res
        .status(500)
        .send({ message: "Some error occurred while retrieving locations." });
    } else {
      res.send(notes);
    }
  });
};

export const findOne = function (req, res) {
  // Find a single note with a noteId
  Location.findById(req.params.noteId, function (err, data) {
    if (err) {
      res.status(500).send({
        message: "Could not retrieve location with id " + req.params.noteId,
      });
    } else {
      res.send(data);
    }
  });
};

export const findLocation = function (req, res, next) {
  let limit = req.query.limit || 10;

  // get the max distance or set it to 8 kilometers
  let maxDistance = req.query.distance || 8;

  // we need to convert the distance to radians
  // the raduis of Earth is approximately 6371 kilometers
  maxDistance /= 6371;

  // get coordinates [ <longitude> , <latitude> ]
  let coords = [];
  coords[0] = parseFloat(req.query.longitude) || 0;
  coords[1] = parseFloat(req.query.latitude) || 0;

  // find a location
  Location.aggregate([
    {
      $geoNear: {
        near: { type: "Point", coordinates: coords },
        distanceField: "dist.calculated",
        includeLocs: "dist.location",
        spherical: true,
      },
    },
  ])
    .limit(limit)
    .exec(function (err, locations) {
      if (err) {
        console.log(err);
        res
          .status(500)
          .send({ message: "Some error occurred while retrieving locations." });
      }
      res.send(locations);
    });
};

export const update = function (req, res) {
  // Update a note identified by the noteId in the request
  Location.findById(req.params.noteId, function (err, note) {
    if (err) {
      res.status(500).send({
        message: "Could not find a note with id " + req.params.noteId,
      });
    }

    note.title = req.body.title;
    note.content = req.body.content;

    note.save(function (err, data) {
      if (err) {
        res.status(500).send({
          message: "Could not update note with id " + req.params.noteId,
        });
      } else {
        res.send(data);
      }
    });
  });
};

export const destroy = function (req, res) {
  // Delete a note with the specified noteId in the request
  Location.remove({ _id: req.params.noteId }, function (err, data) {
    if (err) {
      res
        .status(500)
        .send({ message: "Could not delete note with id " + req.params.id });
    } else {
      res.send({ message: "Note deleted successfully!" });
    }
  });
};
