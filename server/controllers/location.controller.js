"use strict";

const { locationModel } = require("../models/location.model");

// // // // // // // CRETE // // // // // //
const creatLocation = (req, res) => {
    let { countryName, cityName, longitude, latitude } = req.body;
    let newLocation = new locationModel({ countryName, cityName, longitude, latitude });
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

// // // // // // // DELETE // // // // // //
const deleteLocation = (req, res) => {
    let { locationId } = req.params.locationId;
    locationModel.deleteOne({ locationId }, (error, data) => {
        if (error) {
            res.send(error.message);
        } else {
            res.send("Done");
        }
    });
};

module.exports = { creatLocation, getLocation, deleteLocation };