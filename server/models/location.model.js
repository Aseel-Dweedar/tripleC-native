"use strict";

const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    countryName: String,
    cityName: String,
    longitude: Number,
    latitude: Number,
});
const locationModel = mongoose.model("locations", locationSchema);
module.exports = { locationSchema, locationModel };