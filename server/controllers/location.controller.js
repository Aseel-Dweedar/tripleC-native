"use strict";

const { locationModel } = require("../models/location.model");

// // // // // // // CRETE // // // // // //
const creatLocation = (req, res) => {
  let { descriptions, longitude, latitude } = req.body;
  let newLocation = new locationModel({ descriptions, longitude, latitude });
  newLocation.save();
  res.send(newLocation);
};

// // // // // // // GET // // // // // //
const getLocation = (req, res) => {
  locationModel.find({}, (error, data) => {
    if (error) {
      res.send(error.message);
    } else {
      res.send(data);
    }
  });
};

module.exports = { creatLocation, getLocation };
