"use strict";

const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  token: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const tokenModel = mongoose.model("Token", tokenSchema);

module.exports = tokenModel;
