"use strict";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    image: String,
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    cars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "cars",
    }, ],
    requests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "requests",
    }, ],
});

const userModel = mongoose.model("users", userSchema);

module.exports = { userModel, userSchema };