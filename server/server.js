"use strict";

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const tokenModel = require("./models/token.model");

const { creatRequest, getRequest, deleteRequest } = require("./controllers/request.controller");
const { creatUser, getUser, userLogin } = require("./controllers/user.controller");
const { creatCar, getCar, deleteCar } = require("./controllers/car.controller");
const { creatLocation, getLocation } = require("./controllers/location.controller");

mongoose
  .connect("mongodb://localhost:27017/car-care", { useNewUrlParser: true })
  .then((result) => {
    console.log("Working");
  })
  .catch((err) => {
    console.log("NOOOOOOOOO !!");
    console.log(err);
  });

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello Hello !!");
});

// app.get("/tokens", async (req, res) => {
//   let data = await tokenModel.find({});
//   res.send(data);
// });

// app.delete("/tokens/delete", async (req, res) => {
//   await tokenModel.deleteMany({});
//   res.send("done");
// });

// // // // // // // User endpoint // // // // // //
app.post("/user", creatUser);
app.post("/user/login", userLogin);

// // // // // // // Authentication middleware // // // // // //
app.use(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    let bearerToken = authHeader.split(" ")[1];
    const userToken = await tokenModel.findOne({ token: bearerToken });
    if (bearerToken === userToken.token) {
      next();
    }
  } else {
    res.sendStatus(401);
  }
});

app.get("/user", getUser);

// // // // // // // Request endpoint // // // // // //
app.post("/request/:userId", creatRequest);
app.get("/request", getRequest);
app.delete("/request/:requestId", deleteRequest);

// // // // // // // Car endpoint // // // // // //
app.post("/car/:userId", creatCar);
app.get("/car", getCar);
app.delete("/car/:carId", deleteCar);

// // // // // // // Location endpoint // // // // // //
app.post("/location", creatLocation);
app.get("/location", getLocation);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
