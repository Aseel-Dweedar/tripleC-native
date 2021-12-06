"use strict";

const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    name: String,
});

const serviceModel = mongoose.model("services", serviceSchema);

module.exports = { serviceModel, serviceSchema };