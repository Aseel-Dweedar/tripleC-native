"use strict";

const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    type: String,
    model: String,
    gasoline: String,
});

const carModel = mongoose.model("cars", carSchema);

module.exports = { carSchema, carModel };