"use strict";

const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  type: String,
  model: String,
  gasoline: String,
  deleted: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const carModel = mongoose.model("Car", carSchema);

module.exports = { carSchema, carModel };
