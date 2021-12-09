"use strict";

const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    userId: String,
    token: String,
});

const tokenModel = mongoose.model("token", tokenSchema);

module.exports = tokenModel;