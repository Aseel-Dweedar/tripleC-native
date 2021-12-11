"use strict";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    phone: String,
    image: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("cars", {
  ref: "Car",
  localField: "_id",
  foreignField: "user",
});

userSchema.virtual("requests", {
  ref: "Request",
  localField: "_id",
  foreignField: "user",
});

const userModel = mongoose.model("User", userSchema);
module.exports = { userModel, userSchema };
