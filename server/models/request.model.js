"use strict";

const mongoose = require("mongoose");
const { locationModel } = require("./location.model");

const requestSchema = new mongoose.Schema({
    name: String,
    description: String,
    phone: String,
    isTaken: Boolean,
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cars",
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: locationModel,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
});

const requestModel = mongoose.model("requests", requestSchema);

module.exports = { requestSchema, requestModel };