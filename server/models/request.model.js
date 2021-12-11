"use strict";

const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  name: String,
  description: String,
  phone: String,
  isTaken: Boolean,
  location: Object,
  deleted: Boolean,
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const requestModel = mongoose.model("Request", requestSchema);

module.exports = { requestSchema, requestModel };
